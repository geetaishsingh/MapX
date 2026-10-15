import { useState, useRef, useEffect } from "react";
import { THEMES } from "../data/themes";

function ThemeSelector({ currentTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="theme-selector-container" ref={dropdownRef}>
      <button
        type="button"
        className="theme-selector-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select Color Theme"
      >
        <span
          className="theme-swatch-dot"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <span className="theme-name">{currentTheme.name}</span>
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
          <div className="theme-dropdown-header">Choose PPT Theme</div>
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
                >
                  <span
                    className="theme-option-swatch"
                    style={{
                      backgroundColor: theme.primary,
                      boxShadow: isSelected
                        ? `0 0 0 3px ${theme.accent}, 0 0 0 5px ${theme.primary}`
                        : "none",
                    }}
                  />
                  <span className="theme-option-label">{theme.name}</span>
                  {isSelected && (
                    <svg
                      className="theme-check-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={theme.primary}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
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
