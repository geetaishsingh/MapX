import SlideRenderer from "./SlideRenderer";
import ThemeSelector from "./ThemeSelector";

function PPTPreview({
  chapter,
  theme,
  onSelectTheme,
  currentSlide,
  setCurrentSlide,
  onClose,
}) {
  if (!chapter) return null;

  const effectiveInfo = {
    className: chapter.className || "Class 1",
    subject: chapter.subject || "Science",
    publication: chapter.publication || "Brilliant brain publication",
    motivation: chapter.motivation || "",
    thankYou: chapter.thankYou || "Thank You!",
  };

  const hasThankYou = chapter.slides?.some((s) => s.type === "thankYou");
  const slides = hasThankYou
    ? chapter.slides
    : [
        ...(chapter.slides || []),
        {
          slideNumber: (chapter.slides?.length || 0) + 1,
          type: "thankYou",
          title: "Thank You!",
          content: effectiveInfo.thankYou,
        },
      ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = slides[currentSlide] || slides[0];


        
  return (
    <div className="preview-overlay">
      <div className="preview-container">
        {/* Header */}

        <div className="preview-header">
          <div>
            <h2>{chapter.chapterName}</h2>

            <p>
              {effectiveInfo.subject} • Slide {currentSlide + 1} of {totalSlides}
            </p>
          </div>

          <div className="preview-header-actions">
            {theme && onSelectTheme && (
              <ThemeSelector
                currentTheme={theme}
                onSelectTheme={onSelectTheme}
              />
            )}

            <button className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Slide */}

        <div className="preview-slide">
          <SlideRenderer slide={slide} chapterInfo={effectiveInfo} />
        </div>

        {/* Controls */}

        <div className="preview-controls">
          <button onClick={previousSlide} disabled={currentSlide === 0}>
            ← Previous
          </button>

          <span>
            {currentSlide + 1} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PPTPreview;
