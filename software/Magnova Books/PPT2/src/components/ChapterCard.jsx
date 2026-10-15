function ChapterCard({
  chapter,
  selected,
  onSelect,
  onPreview,
  onDownload,
}) {
  const chapterId =
    chapter.id || `${chapter.subject || "ch"}-${chapter.chapterNumber}`;

  const hasThankYou = chapter.slides?.some((s) => s.type === "thankYou");
  const totalSlides = (chapter.slides?.length || 0) + (hasThankYou ? 0 : 1);

  return (
    <div className={`chapter-card ${selected ? "selected" : ""}`}>
      <div className="chapter-card-header">
        <div className="chapter-header-info">
          <div className="chapter-number">
            Chapter {chapter.chapterNumber}
          </div>
          {chapter.subject && (
            <span className="chapter-subject-pill">
              {chapter.subject}
            </span>
          )}
        </div>

        <input
          type="checkbox"
          className="chapter-checkbox"
          checked={selected}
          onChange={() => onSelect(chapterId)}
          aria-label={`Select Chapter ${chapter.chapterNumber} - ${chapter.chapterName}`}
        />
      </div>

      <h2>{chapter.chapterName}</h2>

      <p className="chapter-slides-count">
        {totalSlides} Slides
      </p>

      <div className="chapter-actions">
        <button type="button" onClick={() => onPreview(chapter)}>
          Preview
        </button>

        <button type="button" onClick={() => onDownload(chapter)}>
          Download
        </button>
      </div>
    </div>
  );
}

export default ChapterCard;