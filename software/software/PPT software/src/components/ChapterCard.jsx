import { useState } from "react";

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

function ChapterCard({
  chapter,
  selected,
  onSelect,
  onPreview,
  onDownload,
  viewMode = "grid",
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const chapterId =
    chapter.id || `${chapter.subject || "ch"}-${chapter.chapterNumber}`;

  const hasThankYou = chapter.slides?.some((s) => s.type === "thankYou");
  const totalSlides = (chapter.slides?.length || 0) + (hasThankYou ? 0 : 1);

  // Extract up to 3 interesting topic titles from slides
  const topicHighlights = (chapter.slides || [])
    .filter((s) => s.type !== "title" && s.type !== "thankYou" && s.title)
    .slice(0, 3)
    .map((s) => s.title);

  const handleDownloadClick = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      await onDownload(chapter);
    } finally {
      setIsDownloading(false);
    }
  };

  const subjectIcon = getSubjectIcon(chapter.subject);

  if (viewMode === "compact") {
    return (
      <div
        className={`chapter-card compact ${selected ? "selected" : ""}`}
        onClick={() => onSelect(chapterId)}
      >
        <div className="compact-left">
          <label
            className="custom-checkbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              className="chapter-checkbox-hidden"
              checked={selected}
              onChange={() => onSelect(chapterId)}
              aria-label={`Select Chapter ${chapter.chapterNumber} - ${chapter.chapterName}`}
            />
            <span className="custom-checkbox-box">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </label>

          <span className="compact-chapter-badge">Ch {chapter.chapterNumber}</span>

          <div className="compact-info">
            <h3 className="compact-title">{chapter.chapterName}</h3>
            {chapter.subject && (
              <span className="compact-subject">
                {subjectIcon} {chapter.subject}
              </span>
            )}
          </div>
        </div>

        <div className="compact-right" onClick={(e) => e.stopPropagation()}>
          <span className="compact-slides-pill">{totalSlides} Slides</span>

          <button
            type="button"
            className="btn-card-preview"
            onClick={() => onPreview(chapter)}
            title="Preview Chapter Deck"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview
          </button>

          <button
            type="button"
            className="btn-card-download"
            onClick={handleDownloadClick}
            disabled={isDownloading}
            title="Download PowerPoint Presentation"
          >
            {isDownloading ? (
              <span className="btn-spinner" />
            ) : (
              <svg
                width="15"
                height="15"
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
            Download
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`chapter-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(chapterId)}
    >
      {/* Decorative top accent line */}
      <div className="chapter-card-accent-bar" />

      <div className="chapter-card-header">
        <div className="chapter-header-info">
          <span className="chapter-number-pill">
            Chapter {chapter.chapterNumber}
          </span>
          {chapter.subject && (
            <span className="chapter-subject-pill">
              <span className="subject-icon">{subjectIcon}</span>
              {chapter.subject}
            </span>
          )}
        </div>

        <label
          className="custom-checkbox-container"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="chapter-checkbox-hidden"
            checked={selected}
            onChange={() => onSelect(chapterId)}
            aria-label={`Select Chapter ${chapter.chapterNumber} - ${chapter.chapterName}`}
          />
          <span className="custom-checkbox-box">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </label>
      </div>

      <div className="chapter-card-body">
        <h2 className="chapter-title">{chapter.chapterName}</h2>

        {topicHighlights.length > 0 && (
          <div className="chapter-topics-preview">
            <span className="topics-label">Key Topics:</span>
            <div className="topics-tags-wrap">
              {topicHighlights.map((topic, i) => (
                <span key={i} className="topic-chip" title={topic}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="chapter-card-footer">
        <div className="chapter-meta">
          <div className="slides-indicator">
            <span className="chapter-slides-count">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              {totalSlides} Slides
            </span>
            <div className="slide-dots-indicator" aria-hidden="true">
              {Array.from({ length: Math.min(5, totalSlides) }).map((_, i) => (
                <span key={i} className="slide-dot" />
              ))}
              {totalSlides > 5 && <span className="slide-dot-more">+</span>}
            </div>
          </div>
        </div>

        <div className="chapter-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn-card-preview"
            onClick={() => onPreview(chapter)}
            title="Preview Presentation Deck"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview
          </button>

          <button
            type="button"
            className="btn-card-download"
            onClick={handleDownloadClick}
            disabled={isDownloading}
            title="Download PowerPoint Presentation"
          >
            {isDownloading ? (
              <span className="btn-spinner" />
            ) : (
              <svg
                width="15"
                height="15"
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
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChapterCard;