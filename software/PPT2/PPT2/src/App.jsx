import { useMemo, useState } from "react";
import { THEMES, CLASS_NAME } from "./data";
import { SLIDE_DECKS } from "./slidesData";
import { exportChapter, exportZip } from "./Export";
import SlideView from "./slides";
import logo from "./assets/logo.png";
import "./App.css";

function ThemePicker({ theme, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="picker">
      <button className="picker-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="dot" style={{ background: theme.main }} />
        {theme.name}
        <span className="chev">▾</span>
      </button>
      {open && (
        <ul className="picker-list">
          {THEMES.map((t) => (
            <li key={t.id}>
              <button onClick={() => { onChange(t); setOpen(false); }} className={t.id === theme.id ? "on" : ""}>
                <span className="dot" style={{ background: t.main }} />
                {t.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(THEMES[0]);
  const [tab, setTab] = useState("All Subjects");
  const [picked, setPicked] = useState(new Set());
  const [preview, setPreview] = useState(null);
  const [previewSlides, setPreviewSlides] = useState([]);
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const chapters = useMemo(() => SLIDE_DECKS, []);
  const classNames = useMemo(() => [...new Set(chapters.map((chapter) => chapter.className))], [chapters]);
  const className = classNames.length === 1 ? classNames[0] : classNames.length ? "Multiple Classes" : CLASS_NAME;
  const subjects = useMemo(() => [...new Set(chapters.map((c) => c.subject))], [chapters]);
  const shown = chapters.filter((c) => tab === "All Subjects" || c.subject === tab);
  const base = (classNames.length === 1 ? classNames[0] : "Curriculum").replace(/\s+/g, "-");

  const toggle = (id) => setPicked((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  });
  const allOn = shown.length > 0 && shown.every((c) => picked.has(c.key));
  const selectAll = () => setPicked(allOn ? new Set() : new Set(shown.map((c) => c.key)));

  const run = async (list, zipName) => {
    if (!list.length) return;
    setBusy(true);
    setError("");
    try {
      if (zipName) await exportZip(list, theme, zipName, (n) => setProgress(`${n}/${list.length}`));
      else await exportChapter(list[0], theme);
    } catch (e) {
      console.error(e);
      setError(`Export failed: ${e?.message || "unknown error"}. Check the browser console (F12).`);
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  const openPreview = (chapter) => {
    setPreviewSlides(chapter.slides);
    setPreview(chapter);
    setIdx(0);
    setError("");
  };

  const slideCountLabel = (chapter) => `${chapter.slides.length} Slides`;

  return (
    <div className="app" style={{ "--main": theme.main, "--dark": theme.dark, "--soft": theme.soft }}>
      <header className="top">
        <div className="brand">
          <img src={logo} alt="Brilliant Brain Publishing House" />
          <div>
            <h1>{className}</h1>
            <p className="muted">Curriculum Presentation Generator • Multi-Subject Support</p>
          </div>
        </div>
        <ThemePicker theme={theme} onChange={setTheme} />
      </header>

      <div className="banner">Create classroom-ready presentations from your chapter data.</div>

      <nav className="tabs">
        {["All Subjects", ...subjects].map((s) => (
          <button key={s} className={tab === s ? "tab on" : "tab"} onClick={() => setTab(s)}>
            {s} <span className="count">{s === "All Subjects" ? chapters.length : chapters.filter((c) => c.subject === s).length}</span>
          </button>
        ))}
      </nav>

      <section className="toolbar">
        <button className="ghost" onClick={selectAll}>{allOn ? "Clear All" : "Select All"}</button>
        <span className="count">{picked.size} Selected</span>
        <div className="spacer" />
        <button className="ghost" disabled={!picked.size || busy} onClick={() => run(chapters.filter((c) => picked.has(c.key)), `${base}-Selected-Chapters`)}>Download Selected (PPT ZIP)</button>
        <button className="solid-dark" disabled={busy} onClick={() => run(shown, `${base}-All-Chapters`)}>{busy ? `Preparing ${progress}…` : "Download All (PPT ZIP)"}</button>
      </section>
      {error && <p className="export-error" role="alert">{error}</p>}

      <div className="row">
        <h2 className="heading">All Chapters</h2>
        <span className="muted">Showing {shown.length} chapters</span>
      </div>

      <div className="grid">
        {shown.map((c) => (
          <article className="card" key={c.key}>
            <div className="card-top">
              <span className="chip">Chapter {c.id}</span>
              <span className="chip alt">{c.subject.toUpperCase()}</span>
              <input type="checkbox" checked={picked.has(c.key)} onChange={() => toggle(c.key)} aria-label={`Select ${c.title}`} />
            </div>
            <h3>{c.title}</h3>
            <p className="muted">{slideCountLabel(c)}</p>
            <div className="actions">
              <button className="ghost grey" onClick={() => openPreview(c)}>Preview</button>
              <button className="solid" disabled={busy} onClick={() => run([c])}>Save PPT</button>
            </div>
          </article>
        ))}
      </div>

      {preview && (
        <div className="overlay" onClick={() => setPreview(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-head">
              <div>
                <h4>{preview.title}</h4>
                <p className="muted small">{preview.subject} • Slide {idx + 1} of {previewSlides.length}</p>
              </div>
              <div className="head-right">
                <ThemePicker theme={theme} onChange={setTheme} />
                <button className="close" onClick={() => setPreview(null)} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="stage"><SlideView fit slide={previewSlides[idx]} index={idx} total={previewSlides.length} /></div>
            <div className="modal-foot">
              <button className="solid" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Previous</button>
              <strong>{idx + 1} / {previewSlides.length}</strong>
              <button className="solid" disabled={idx === previewSlides.length - 1} onClick={() => setIdx(idx + 1)}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}