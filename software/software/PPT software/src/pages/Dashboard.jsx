import { useState, useEffect, useMemo } from "react";

import pptData from "../data/pptData";
import { DEFAULT_THEME, getThemeById } from "../data/themes";

import ChapterGrid from "../components/ChapterGrid";
import PPTPreview from "../components/PPTPreview";
import ThemeSelector from "../components/ThemeSelector";

import buildPPT from "../ppt/generatePPT";
import downloadBlob from "../utils/downloadPPT";
import downloadZip from "../utils/downloadZip";

const getSubjectIcon = (subject = "") => {
  const s = subject.toLowerCase();
  if (s.includes("english") || s.includes("grammar") || s.includes("language")) return "📚";
  if (s.includes("sci") || s.includes("env") || s.includes("evs") || s.includes("bio")) return "🔬";
  if (s.includes("math")) return "📐";
  if (s.includes("social") || s.includes("history") || s.includes("geog")) return "🌍";
  if (s.includes("art") || s.includes("craft")) return "🎨";
  if (s.includes("comput") || s.includes("tech") || s.includes("code")) return "💻";
  return "📖";
};

function Dashboard() {
  const chapters = useMemo(
    () => pptData.filter((item) => item.type === "chapter"),
    []
  );

  const getChapterId = (chapter) =>
    chapter.id || `${chapter.subject || "ch"}-${chapter.chapterNumber}`;

  // =========================
  // THEME & COLOR MODE STATE
  // =========================

  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("ppt_selected_theme");
      return saved ? getThemeById(saved) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const [colorMode, setColorMode] = useState(() => {
    try {
      return localStorage.getItem("ppt_color_mode") || "light";
    } catch {
      return "light";
    }
  });

  const [viewMode, setViewMode] = useState("grid"); // "grid" | "compact"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("chapterNumber"); // "chapterNumber" | "name" | "slides"

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Apply theme and color mode to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme-mode", colorMode);

    root.style.setProperty("--primary", selectedTheme.primary);
    root.style.setProperty("--primary-hover", selectedTheme.primaryHover);
    root.style.setProperty(
      "--primary-gradient",
      selectedTheme.primaryGradient ||
        `linear-gradient(135deg, ${selectedTheme.primary} 0%, ${selectedTheme.primaryHover} 100%)`
    );
    root.style.setProperty("--primary-light", selectedTheme.accent);
    root.style.setProperty("--primary-border", selectedTheme.accentBorder);
    root.style.setProperty(
      "--primary-glow",
      selectedTheme.glow || "rgba(99, 102, 241, 0.3)"
    );
    root.style.setProperty(
      "--secondary-accent",
      selectedTheme.secondaryAccent || "#EC4899"
    );
    root.style.setProperty("--color-heading", selectedTheme.heading);
    root.style.setProperty("--color-body", selectedTheme.body);
    root.style.setProperty("--color-muted", selectedTheme.muted);
  }, [selectedTheme, colorMode]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    showToast(`Palette switched to ${theme.name}`, "theme");
    try {
      localStorage.setItem("ppt_selected_theme", theme.id);
    } catch {
      // ignore
    }
  };

  const toggleColorMode = () => {
    const nextMode = colorMode === "light" ? "dark" : "light";
    setColorMode(nextMode);
    try {
      localStorage.setItem("ppt_color_mode", nextMode);
    } catch {
      // ignore
    }
    showToast(
      `Switched to ${nextMode === "dark" ? "Dark Studio" : "Light Creative"} Mode`,
      "info"
    );
  };

  // =========================
  // SUBJECT FILTERING & STATS
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

  // Filtered & Sorted Chapters
  const visibleChapters = useMemo(() => {
    let result = chapters;

    // Filter by Subject
    if (activeSubject !== "All Subjects") {
      result = result.filter((c) => c.subject === activeSubject);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((c) => {
        const nameMatch = c.chapterName?.toLowerCase().includes(q);
        const numMatch = String(c.chapterNumber).includes(q);
        const subMatch = c.subject?.toLowerCase().includes(q);
        const topicMatch = c.slides?.some((s) =>
          s.title?.toLowerCase().includes(q)
        );
        return nameMatch || numMatch || subMatch || topicMatch;
      });
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return (a.chapterName || "").localeCompare(b.chapterName || "");
      }
      if (sortBy === "slides") {
        const countA = a.slides?.length || 0;
        const countB = b.slides?.length || 0;
        return countB - countA;
      }
      // default: chapterNumber
      return (a.chapterNumber || 0) - (b.chapterNumber || 0);
    });
  }, [chapters, activeSubject, searchQuery, sortBy]);

  // Overall system statistics
  const totalSlidesCount = useMemo(() => {
    return chapters.reduce((acc, c) => {
      const hasThankYou = c.slides?.some((s) => s.type === "thankYou");
      return acc + (c.slides?.length || 0) + (hasThankYou ? 0 : 1);
    }, 0);
  }, [chapters]);

  // =========================
  // PREVIEW STATE
  // =========================

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // =========================
  // DOWNLOAD SELECTION
  // =========================

  const [selectedChapters, setSelectedChapters] = useState([]);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Preview Handlers
  const handlePreview = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentSlide(0);
  };

  const handleClosePreview = () => {
    setSelectedChapter(null);
    setCurrentSlide(0);
  };

  // Single Download
  const handleDownload = async (chapter) => {
    showToast(`Generating ${chapter.chapterName} PPT...`, "info");
    try {
      const { blob, fileName } = await buildPPT(chapter, selectedTheme);
      downloadBlob(blob, fileName);
      showToast(`Downloaded ${fileName}`, "success");
    } catch (error) {
      console.error("PPT generation failed:", error);
      showToast("Download failed. Please try again.", "error");
    }
  };

  // Toggle selection
  const toggleChapter = (chapterId) => {
    setSelectedChapters((prev) => {
      if (prev.includes(chapterId)) {
        return prev.filter((id) => id !== chapterId);
      }
      return [...prev, chapterId];
    });
  };

  // Select All visible
  const visibleIds = visibleChapters.map(getChapterId);
  const areAllVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedChapters.includes(id));

  const handleSelectAll = () => {
    if (areAllVisibleSelected) {
      setSelectedChapters((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
      showToast("Deselected all visible chapters", "info");
    } else {
      setSelectedChapters((prev) =>
        Array.from(new Set([...prev, ...visibleIds]))
      );
      showToast(`Selected all ${visibleIds.length} visible chapters`, "info");
    }
  };

  // Download All as ZIP
  const handleDownloadAll = async () => {
    setIsDownloadingZip(true);
    showToast("Packaging all chapters into ZIP archive...", "info");
    try {
      const zipName =
        activeSubject !== "All Subjects"
          ? `${activeSubject.replace(/[^a-zA-Z0-9]/g, "-")}-Curriculum-Decks.zip`
          : "Full-Curriculum-All-Chapters.zip";

      await downloadZip(visibleChapters, zipName, selectedTheme);
      showToast(`ZIP package downloaded: ${zipName}`, "success");
    } catch (error) {
      console.error("Download all failed:", error);
      showToast("ZIP export failed. Please try again.", "error");
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // Download Selected as ZIP
  const handleDownloadSelected = async () => {
    if (selectedChapters.length === 0) {
      showToast("Please select at least one chapter to download.", "error");
      return;
    }

    setIsDownloadingZip(true);
    showToast(`Packaging ${selectedChapters.length} selected chapters...`, "info");
    try {
      const selected = chapters.filter((chapter) =>
        selectedChapters.includes(getChapterId(chapter))
      );

      const zipName =
        activeSubject !== "All Subjects"
          ? `${activeSubject.replace(/[^a-zA-Z0-9]/g, "-")}-Selected-Decks.zip`
          : "Selected-Curriculum-Decks.zip";

      await downloadZip(selected, zipName, selectedTheme);
      showToast(`Downloaded ${selectedChapters.length} chapters as ZIP!`, "success");
    } catch (error) {
      console.error("Download selected failed:", error);
      showToast("Failed to package selected chapters.", "error");
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const publicationName = chapters[0]?.publication || "GYAN SETU";
  const motivationText =
    chapters[0]?.motivation ||
    "Empowering interactive classroom learning with modern, presentation-ready slide decks.";

  return (
    <div className="dashboard-wrapper">
      {/* Background ambient creative glow */}
      <div className="ambient-background-glow glow-1" />
      <div className="ambient-background-glow glow-2" />

      <div className="dashboard">
        {/* =========================================================
            1. TOP BRAND HEADER & CONTROL BAR
        ========================================================= */}
        <header className="dashboard-header">
          <div className="brand-lockup">
            <div className="brand-logo-badge">
              <span className="brand-icon-sparkle">✦</span>
            </div>
            <div className="brand-titles">
              <div className="brand-badge-pill">
                <span className="live-pulse-dot" />
                <span>Next-Gen Slide Studio</span>
              </div>
              <h1>{publicationName}</h1>
              <p className="brand-subtitle">
                Curriculum Presentation Engine • Multi-Subject Interactive System
              </p>
            </div>
          </div>

          <div className="header-controls">
            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              className="color-mode-toggle-btn"
              onClick={toggleColorMode}
              title={`Switch to ${colorMode === "light" ? "Dark Studio" : "Light Creative"} Mode`}
              aria-label="Toggle Color Mode"
            >
              {colorMode === "light" ? (
                <>
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
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Dark Studio</span>
                </>
              ) : (
                <>
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
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Light Mode</span>
                </>
              )}
            </button>

            {/* Theme Selector */}
            <ThemeSelector
              currentTheme={selectedTheme}
              onSelectTheme={handleThemeChange}
            />
          </div>
        </header>

        {/* =========================================================
            2. CREATIVE HERO & METRICS SHOWCASE
        ========================================================= */}
        <section className="creative-hero-showcase">
          <div className="hero-quote-card">
            <div className="quote-header">
              <span className="quote-sparkle">💡</span>
              <span className="quote-category">Curriculum Philosophy</span>
            </div>
            <p className="quote-body">"{motivationText}"</p>
          </div>

          <div className="hero-metrics-grid">
            <div className="metric-pill-card">
              <div className="metric-icon-bubble">📚</div>
              <div className="metric-data">
                <span className="metric-number">{chapters.length}</span>
                <span className="metric-label">Chapters</span>
              </div>
            </div>

            <div className="metric-pill-card">
              <div className="metric-icon-bubble">🎞️</div>
              <div className="metric-data">
                <span className="metric-number">{totalSlidesCount}</span>
                <span className="metric-label">Total Slides</span>
              </div>
            </div>

            <div className="metric-pill-card">
              <div className="metric-icon-bubble">🏷️</div>
              <div className="metric-data">
                <span className="metric-number">{subjects.length - 1}</span>
                <span className="metric-label">Subjects</span>
              </div>
            </div>

            <div className="metric-pill-card">
              <div
                className="metric-swatch-bubble"
                style={{
                  background:
                    selectedTheme.primaryGradient || selectedTheme.primary,
                }}
              />
              <div className="metric-data">
                <span className="metric-number theme-name-metric">
                  {selectedTheme.name.split(" ")[0]}
                </span>
                <span className="metric-label">Active Palette</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. SUBJECT FILTER TABS
        ========================================================= */}
        <section className="subject-filter-container">
          <div className="subject-filter-bar">
            {subjects.map((sub) => {
              const count =
                sub === "All Subjects"
                  ? chapters.length
                  : chapters.filter((c) => c.subject === sub).length;

              const icon = sub === "All Subjects" ? "🌟" : getSubjectIcon(sub);

              return (
                <button
                  key={sub}
                  type="button"
                  className={`subject-filter-btn ${
                    activeSubject === sub ? "active" : ""
                  }`}
                  onClick={() => setActiveSubject(sub)}
                >
                  <span className="filter-btn-icon">{icon}</span>
                  <span className="filter-btn-text">{sub}</span>
                  <span className="subject-count-pill">{count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            4. SEARCH, SORT & DOWNLOAD COMMAND DOCK
        ========================================================= */}
        <section className="command-dock">
          {/* Left: Search & Filter Tools */}
          <div className="dock-left-tools">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search chapters, topics, slides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <label htmlFor="sort-select" className="sort-label">
                Sort:
              </label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="chapterNumber">Chapter Number</option>
                <option value="name">Title (A-Z)</option>
                <option value="slides">Most Slides</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "compact" ? "active" : ""}`}
                onClick={() => setViewMode("compact")}
                title="Compact List View"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Bulk Selection & Batch Actions */}
          <div className="dock-right-actions">
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
              <span>{areAllVisibleSelected ? "Deselect All" : "Select All"}</span>
            </button>

            <span
              className={`selection-count-pill ${
                selectedChapters.length > 0 ? "has-selection" : ""
              }`}
            >
              {selectedChapters.length} Selected
            </span>

            <button
              type="button"
              className="btn-download-selected"
              onClick={handleDownloadSelected}
              disabled={selectedChapters.length === 0 || isDownloadingZip}
              title="Download selected chapters in a ZIP file"
            >
              {isDownloadingZip ? (
                <span className="btn-spinner" />
              ) : (
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
              )}
              <span>Download Selected</span>
            </button>

            <button
              type="button"
              className="btn-download-all"
              onClick={handleDownloadAll}
              disabled={isDownloadingZip}
              title="Download all chapters in this subject"
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
              <span>
                Download {activeSubject === "All Subjects" ? "All" : activeSubject}
              </span>
            </button>
          </div>
        </section>

        {/* =========================================================
            5. CHAPTERS SHOWCASE
        ========================================================= */}
        <main className="dashboard-main">
          <div className="chapters-heading-row">
            <div className="heading-title-group">
              <h2>
                {activeSubject === "All Subjects"
                  ? "All Curriculum Chapters"
                  : `${activeSubject} Chapters`}
              </h2>
              <span className="chapters-count-pill">
                {visibleChapters.length} Deck{visibleChapters.length !== 1 ? "s" : ""}
              </span>
            </div>

            {searchQuery && (
              <span className="search-status-label">
                Filtered by "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          <ChapterGrid
            chapters={visibleChapters}
            selectedChapters={selectedChapters}
            onSelect={toggleChapter}
            onPreview={handlePreview}
            onDownload={handleDownload}
            viewMode={viewMode}
          />
        </main>

        {/* =========================================================
            6. PREVIEW MODAL
        ========================================================= */}
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

        {/* =========================================================
            7. TOAST NOTIFICATION
        ========================================================= */}
        {toast && (
          <div className={`system-toast-alert toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "⚠"}
              {toast.type === "theme" && "🎨"}
              {toast.type === "info" && "ℹ"}
            </span>
            <span className="toast-text">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;