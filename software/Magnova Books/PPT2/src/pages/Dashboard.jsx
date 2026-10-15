import { useState, useEffect, useMemo } from "react";

import pptData from "../data/pptData";
import { DEFAULT_THEME, getThemeById } from "../data/themes";

import ChapterGrid from "../components/ChapterGrid";
import PPTPreview from "../components/PPTPreview";
import ThemeSelector from "../components/ThemeSelector";

import buildPPT from "../ppt/generatePPT";
import downloadBlob from "../utils/downloadPPT";
import downloadZip from "../utils/downloadZip";

function Dashboard() {
  const chapters = useMemo(
    () => pptData.filter((item) => item.type === "chapter"),
    []
  );

  const getChapterId = (chapter) =>
    chapter.id || `${chapter.subject || "ch"}-${chapter.chapterNumber}`;

  // =========================
  // SUBJECT FILTERING
  // =========================

  const subjects = useMemo(() => {
    const list = ["All Subjects"];
    chapters.forEach((c) => {
      if (c.subject && !list.includes(c.subject)) {
        list.push(c.subject);
      }
    });
    return list;
  }, [chapters]);

  const [activeSubject, setActiveSubject] = useState("All Subjects");

  const visibleChapters = useMemo(() => {
    if (activeSubject === "All Subjects") {
      return chapters;
    }
    return chapters.filter((c) => c.subject === activeSubject);
  }, [chapters, activeSubject]);

  // =========================
  // THEME STATE
  // =========================

  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("ppt_selected_theme");
      return saved ? getThemeById(saved) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    try {
      localStorage.setItem("ppt_selected_theme", theme.id);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", selectedTheme.primary);
    root.style.setProperty("--primary-hover", selectedTheme.primaryHover);
    root.style.setProperty("--primary-light", selectedTheme.accent);
    root.style.setProperty("--primary-border", selectedTheme.accentBorder);
    root.style.setProperty("--color-heading", selectedTheme.heading);
  }, [selectedTheme]);

  // =========================
  // PREVIEW STATE
  // =========================

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // =========================
  // DOWNLOAD SELECTION
  // =========================

  const [selectedChapters, setSelectedChapters] = useState([]);

  // =========================
  // PREVIEW HANDLERS
  // =========================

  const handlePreview = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentSlide(0);
  };

  const handleClosePreview = () => {
    setSelectedChapter(null);
    setCurrentSlide(0);
  };

  // =========================
  // SINGLE DOWNLOAD
  // =========================

  const handleDownload = async (chapter) => {
    try {
      const { blob, fileName } = await buildPPT(
        chapter,
        selectedTheme
      );
      downloadBlob(blob, fileName);
    } catch (error) {
      console.error("PPT generation failed:", error);
    }
  };

  // =========================
  // SELECT / UNSELECT CHAPTER
  // =========================

  const toggleChapter = (chapterId) => {
    setSelectedChapters((prev) => {
      if (prev.includes(chapterId)) {
        return prev.filter((id) => id !== chapterId);
      }
      return [...prev, chapterId];
    });
  };

  // =========================
  // SELECT ALL (FOR VISIBLE SUBJECT)
  // =========================

  const visibleIds = visibleChapters.map(getChapterId);
  const areAllVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedChapters.includes(id));

  const handleSelectAll = () => {
    if (areAllVisibleSelected) {
      setSelectedChapters((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
    } else {
      setSelectedChapters((prev) =>
        Array.from(new Set([...prev, ...visibleIds]))
      );
    }
  };

  // =========================
  // DOWNLOAD ALL AS ZIP
  // =========================

  const handleDownloadAll = async () => {
    try {
      const zipName =
        activeSubject !== "All Subjects"
          ? `${activeSubject.replace(/[^a-zA-Z0-9]/g, "-")}-All-Chapters.zip`
          : "All-Subjects-Chapters.zip";

      await downloadZip(
        visibleChapters,
        zipName,
        selectedTheme
      );
    } catch (error) {
      console.error("Download all failed:", error);
    }
  };

  // =========================
  // DOWNLOAD SELECTED AS ZIP
  // =========================

  const handleDownloadSelected = async () => {
    if (selectedChapters.length === 0) {
      alert("Please select at least one chapter.");
      return;
    }

    try {
      const selected = chapters.filter((chapter) =>
        selectedChapters.includes(getChapterId(chapter))
      );

      const zipName =
        activeSubject !== "All Subjects"
          ? `${activeSubject.replace(/[^a-zA-Z0-9]/g, "-")}-Selected-Chapters.zip`
          : "Selected-Chapters.zip";

      await downloadZip(
        selected,
        zipName,
        selectedTheme
      );
    } catch (error) {
      console.error("Download selected failed:", error);
    }
  };

  const publicationName =
    chapters[0]?.publication || "Brilliant brain publication";
  const motivationText =
    chapters[0]?.motivation ||
    "Plants are our green friends. Learn how they grow and care for them!";

  return (
    <div className="dashboard">
      {/* =========================
          HEADER
      ========================= */}
      <header className="dashboard-header">
        <div>
          <h1>{publicationName}</h1>
          <p>
            Curriculum Presentation Generator • Multi-Subject Support
          </p>
        </div>

        <ThemeSelector
          currentTheme={selectedTheme}
          onSelectTheme={handleThemeChange}
        />
      </header>

      {/* =========================
          MOTIVATION / BANNER
      ========================= */}
      <section className="motivation">
        <p>{motivationText}</p>
      </section>

      {/* =========================
          SUBJECT FILTER TABS
      ========================= */}
      <section className="subject-filter-container">
        <div className="subject-filter-bar">
          {subjects.map((sub) => {
            const count =
              sub === "All Subjects"
                ? chapters.length
                : chapters.filter((c) => c.subject === sub).length;

            return (
              <button
                key={sub}
                type="button"
                className={`subject-filter-btn ${
                  activeSubject === sub ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >
                <span>{sub}</span>
                <span className="subject-count-pill">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================
          DOWNLOAD & ACTION BAR
      ========================= */}
      <section className="download-bar">
        <div className="selection-info">
          <button
            type="button"
            className="btn-select-all"
            onClick={handleSelectAll}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            {areAllVisibleSelected ? "Unselect All" : "Select All"}
          </button>

          <span
            className={
              selectedChapters.length > 0 ? "has-selection" : ""
            }
          >
            {selectedChapters.length} Selected
          </span>
        </div>

        <div className="download-actions">
          <button
            type="button"
            className="btn-download-selected"
            onClick={handleDownloadSelected}
            disabled={selectedChapters.length === 0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Selected
          </button>

          <button
            type="button"
            className="btn-download-all"
            onClick={handleDownloadAll}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download {activeSubject === "All Subjects" ? "All" : activeSubject}
          </button>
        </div>
      </section>

      {/* =========================
          CHAPTERS GRID
      ========================= */}
      <main>
        <div className="chapters-heading-row">
          <h2>
            {activeSubject === "All Subjects"
              ? "All Chapters"
              : `${activeSubject} Chapters`}
          </h2>
          <span className="chapters-count-text">
            Showing {visibleChapters.length} chapter
            {visibleChapters.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ChapterGrid
          chapters={visibleChapters}
          selectedChapters={selectedChapters}
          onSelect={toggleChapter}
          onPreview={handlePreview}
          onDownload={handleDownload}
        />
      </main>

      {/* =========================
          PREVIEW MODAL
      ========================= */}
      {selectedChapter && (
        <PPTPreview
          chapter={selectedChapter}
          theme={selectedTheme}
          onSelectTheme={handleThemeChange}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}

export default Dashboard;