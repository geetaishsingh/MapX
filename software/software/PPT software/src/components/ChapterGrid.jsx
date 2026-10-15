import ChapterCard from "./ChapterCard";

function ChapterGrid({
  chapters,
  selectedChapters,
  onSelect,
  onPreview,
  onDownload,
  viewMode = "grid",
}) {
  if (chapters.length === 0) {
    return (
      <div className="empty-chapters-state">
        <div className="empty-icon-wrap">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3>No chapters found</h3>
        <p>Try searching for a different keyword or select another subject tab.</p>
      </div>
    );
  }

  return (
    <div className={`chapter-grid ${viewMode === "compact" ? "compact-grid" : ""}`}>
      {chapters.map((chapter) => {
        const chapterId =
          chapter.id || `${chapter.subject || "ch"}-${chapter.chapterNumber}`;

        return (
          <ChapterCard
            key={chapterId}
            chapter={chapter}
            selected={selectedChapters.includes(chapterId)}
            onSelect={onSelect}
            onPreview={onPreview}
            onDownload={onDownload}
            viewMode={viewMode}
          />
        );
      })}
    </div>
  );
}

export default ChapterGrid;