import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stageMode, setStageMode] = useState("dark"); // "dark" | "light"
  const containerRef = useRef(null);

  const effectiveInfo = {
    className: chapter?.className || "Class 1",
    subject: chapter?.subject || "Science",
    publication: chapter?.publication || "GYAN SETU",
    chapterNumber: chapter?.chapterNumber,
    chapterName: chapter?.chapterName || "",
    motivation: chapter?.motivation || "",
    thankYou: chapter?.thankYou || "Thank You!",
  };

  const hasThankYou = chapter?.slides?.some((s) => s.type === "thankYou");
  const slides = hasThankYou
    ? chapter.slides
    : [
        ...(chapter?.slides || []),
        {
          slideNumber: (chapter?.slides?.length || 0) + 1,
          type: "thankYou",
          title: "Thank You!",
          content: effectiveInfo.thankYou,
        },
      ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) return prev + 1;
      setIsPlaying(false);
      return prev;
    });
  }, [totalSlides, setCurrentSlide]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  }, [setCurrentSlide]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        previousSlide();
      } else if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, onClose]);

  // Autoplay slideshow timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < totalSlides - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0; // Loop or stop
          }
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSlides, setCurrentSlide]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide] || slides[0];
  const progressPercent =
    totalSlides > 0 ? Math.round(((currentSlide + 1) / totalSlides) * 100) : 0;

  if (!chapter) return null;

  return (
    <div className={`preview-overlay ${stageMode}-backdrop`}>
      <div
        className={`preview-container ${isFullscreen ? "fullscreen-container" : ""}`}
        ref={containerRef}
      >
        {/* Progress Bar Header */}
        <div className="preview-top-progress-bar">
          <div
            className="preview-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="preview-header">
          <div className="preview-header-left">
            <span className="preview-chapter-badge">
              Ch {chapter.chapterNumber}
            </span>
            <div>
              <h2 className="preview-title">{chapter.chapterName}</h2>
              <p className="preview-subtitle">
                <span className="preview-sub-pill">{effectiveInfo.subject}</span>
                <span className="preview-slide-indicator">
                  Slide {currentSlide + 1} of {totalSlides} ({progressPercent}%)
                </span>
              </p>
            </div>
          </div>

          <div className="preview-header-actions">
            {/* Stage mode switch */}
            <button
              type="button"
              className="preview-tool-btn"
              onClick={() =>
                setStageMode((prev) => (prev === "dark" ? "light" : "dark"))
              }
              title={`Switch to ${stageMode === "dark" ? "Light" : "Dark"} backdrop`}
            >
              {stageMode === "dark" ? "☀️ Light Stage" : "🌙 Dark Stage"}
            </button>

            {/* Thumbnails drawer toggle */}
            <button
              type="button"
              className={`preview-tool-btn ${showThumbnails ? "active" : ""}`}
              onClick={() => setShowThumbnails((prev) => !prev)}
              title="Toggle Slide Thumbnails Drawer"
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Deck Grid
            </button>

            {/* Slideshow autoplay */}
            <button
              type="button"
              className={`preview-tool-btn ${isPlaying ? "active-playing" : ""}`}
              onClick={() => setIsPlaying((prev) => !prev)}
              title={isPlaying ? "Pause Slideshow" : "Start Auto Slideshow"}
            >
              {isPlaying ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Auto Play
                </>
              )}
            </button>

            {/* Theme Selector */}
            {theme && onSelectTheme && (
              <ThemeSelector
                currentTheme={theme}
                onSelectTheme={onSelectTheme}
              />
            )}

            {/* Fullscreen button */}
            <button
              type="button"
              className="preview-tool-btn icon-only"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
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
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            {/* Close button */}
            <button
              type="button"
              className="close-button"
              onClick={onClose}
              title="Close Preview (Esc)"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Slide Stage Body */}
        <div className={`preview-body ${showThumbnails ? "with-thumbnails" : ""}`}>
          <div className="preview-slide-stage">
            <div className="slide-widescreen-frame">
              <div className="slide-canvas-top-accent" />
              <SlideRenderer slide={slide} chapterInfo={effectiveInfo} />
              <div className="slide-canvas-footer-strip">
                <span className="slide-footer-pub">
                  {effectiveInfo.publication} • {effectiveInfo.subject}
                </span>
                <span className="slide-footer-page">
                  Slide {currentSlide + 1} of {totalSlides}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Jump Slide Thumbnails Drawer */}
          {showThumbnails && (
            <div className="preview-thumbnails-drawer">
              <div className="drawer-header">
                <span>All Slides ({totalSlides})</span>
                <span className="drawer-hint">Click any slide to jump</span>
              </div>
              <div className="drawer-grid">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-card ${currentSlide === idx ? "active-thumb" : ""}`}
                    onClick={() => setCurrentSlide(idx)}
                  >
                    <div className="thumb-num">#{idx + 1}</div>
                    <div className="thumb-type">{s.type}</div>
                    <div className="thumb-title">
                      {s.title || (s.type === "title" ? "Title Slide" : `Slide ${idx + 1}`)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Controls Dock */}
        <div className="preview-controls-dock">
          <button
            type="button"
            className="btn-dock-nav"
            onClick={previousSlide}
            disabled={currentSlide === 0}
            title="Previous Slide (Left Arrow)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Previous</span>
          </button>

          <div className="preview-indicator-chip">
            <span className="current-num">{currentSlide + 1}</span>
            <span className="divider">/</span>
            <span className="total-num">{totalSlides}</span>
          </div>

          <button
            type="button"
            className="btn-dock-nav"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            title="Next Slide (Right Arrow)"
          >
            <span>Next</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PPTPreview;
