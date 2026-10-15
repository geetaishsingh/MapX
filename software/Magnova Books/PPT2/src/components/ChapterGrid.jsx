import ChapterCard from "./ChapterCard";

function ChapterGrid({
  chapters,
  selectedChapters,
  onSelect,
  onPreview,
  onDownload,
}) {
  return (
    <div className="chapter-grid">
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
          />
        );
      })}
    </div>
  );
}

export default ChapterGrid;