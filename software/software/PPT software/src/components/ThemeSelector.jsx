import { useState, useRef, useEffect } from "react";
import { THEMES } from "../data/themes";

function ThemeSelector({ currentTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside or on Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="theme-selector-container" ref={dropdownRef}>
      <button
        type="button"
        className="theme-selector-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select Creative Color Theme"
        aria-expanded={isOpen}
      >
        <span
          className="theme-swatch-dot"
          style={{
            background: currentTheme.primaryGradient || currentTheme.primary,
            boxShadow: `0 0 10px ${currentTheme.glow || currentTheme.primary + "60"}`,
          }}
        />
        <span className="theme-name">{currentTheme.name}</span>
        {currentTheme.tag && (
          <span className="theme-tag-pill">{currentTheme.tag}</span>
        )}
        <svg
          className={`theme-chevron ${isOpen ? "open" : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown-menu">
          <div className="theme-dropdown-header">
            <div>
              <span className="theme-dropdown-title">System Color Themes</span>
              <span className="theme-dropdown-subtitle">
                Select palette to transform the entire UI & PPT deck
              </span>
            </div>
            <span className="theme-count-badge">{THEMES.length} Themes</span>
          </div>

          <div className="theme-options-grid">
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-option-item ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    onSelectTheme(theme);
                    setIsOpen(false);
                  }}
                  style={{
                    borderColor: isSelected ? theme.primary : undefined,
                    background: isSelected ? theme.accent : undefined,
                  }}
                >
                  <div className="theme-option-swatch-wrapper">
                    <span
                      className="theme-option-swatch"
                      style={{
                        background: theme.primaryGradient || theme.primary,
                        boxShadow: isSelected
                          ? `0 0 0 2px #fff, 0 0 12px ${theme.glow}`
                          : `0 2px 6px rgba(0,0,0,0.15)`,
                      }}
                    />
                    {theme.secondaryAccent && (
                      <span
                        className="theme-secondary-dot"
                        style={{ backgroundColor: theme.secondaryAccent }}
                      />
                    )}
                  </div>

                  <div className="theme-option-info">
                    <span
                      className="theme-option-label"
                      style={{
                        color: isSelected ? theme.primary : undefined,
                        fontWeight: isSelected ? 700 : 600,
                      }}
                    >
                      {theme.name}
                    </span>
                    {theme.tag && (
                      <span className="theme-option-tag">{theme.tag}</span>
                    )}
                  </div>

                  {isSelected ? (
                    <div
                      className="theme-check-badge"
                      style={{ background: theme.primary }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;
