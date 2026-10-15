import { useMemo, useState } from "react";
import { THEMES, CHAPTERS, SLIDE_COUNT, buildSlides } from "./data";
import { exportChapter } from "./export";
import SlideView from "./Slide";
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
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState(false);

  const subjects = useMemo(() => [...new Set(CHAPTERS.map((c) => c.subject))], []);
  const shown = CHAPTERS.filter((c) => tab === "All Subjects" || c.subject === tab);
  const slides = preview ? buildSlides(preview) : [];

  const toggle = (id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOn = shown.length > 0 && shown.every((c) => picked.has(c.id));
  const selectAll = () => setPicked(allOn ? new Set() : new Set(shown.map((c) => c.id)));

  const run = async (list) => {
    setBusy(true);
    for (const c of list) await exportChapter(c, theme);
    setBusy(false);
  };

  return (
    <div className="app" style={{ "--main": theme.main, "--dark": theme.dark, "--soft": theme.soft }}>
      <header className="top">
        <div>
          <h1>Maths 3</h1>
          <p className="muted">Curriculum Presentation Generator • Multi-Subject Support</p>
        </div>
        <ThemePicker theme={theme} onChange={setTheme} />
      </header>

      <div className="banner">Plants are our green friends. Learn how they grow and care for them!</div>

      <nav className="tabs">
        {["All Subjects", ...subjects].map((s) => (
          <button key={s} className={tab === s ? "tab on" : "tab"} onClick={() => setTab(s)}>
            {s} <span className="count">{s === "All Subjects" ? CHAPTERS.length : CHAPTERS.filter((c) => c.subject === s).length}</span>
          </button>
        ))}
      </nav>

      <section className="toolbar">
        <button className="ghost" onClick={selectAll}>{allOn ? "Clear All" : "Select All"}</button>
        <span className="count">{picked.size} Selected</span>
        <div className="spacer" />
        <button className="ghost" disabled={!picked.size || busy} onClick={() => run(CHAPTERS.filter((c) => picked.has(c.id)))}>Download Selected</button>
        <button className="solid-dark" disabled={busy} onClick={() => run(shown)}>{busy ? "Preparing…" : "Download All"}</button>
      </section>

      <div className="row">
        <h2 className="heading">All Chapters</h2>
        <span className="muted">Showing {shown.length} chapters</span>
      </div>

      <div className="grid">
        {shown.map((c) => (
          <article className="card" key={c.id}>
            <div className="card-top">
              <span className="chip">Chapter {c.id}</span>
              <span className="chip alt">{c.subject.toUpperCase()}</span>
              <input type="checkbox" checked={picked.has(c.id)} onChange={() => toggle(c.id)} aria-label={`Select ${c.title}`} />
            </div>
            <h3>{c.title}</h3>
            <p className="muted">{SLIDE_COUNT} Slides</p>
            <div className="actions">
              <button className="ghost grey" onClick={() => { setPreview(c); setIdx(0); }}>Preview</button>
              <button className="solid" disabled={busy} onClick={() => run([c])}>Save PDF</button>
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
                <p className="muted small">{preview.subject} • Slide {idx + 1} of {slides.length}</p>
              </div>
              <div className="head-right">
                <ThemePicker theme={theme} onChange={setTheme} />
                <button className="close" onClick={() => setPreview(null)} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="stage"><SlideView fit slide={slides[idx]} index={idx} total={slides.length} /></div>
            <div className="modal-foot">
              <button className="solid" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Previous</button>
              <strong>{idx + 1} / {slides.length}</strong>
              <button className="solid" disabled={idx === slides.length - 1} onClick={() => setIdx(idx + 1)}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}