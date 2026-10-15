import { useMemo, useState } from "react";
import JSZip from "jszip";
import { BOOK, CHAPTERS, PALETTES, buildSlides } from "./data";
import { makePptx, fileName } from "./pptBuilder";

function saveBlob(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function SlideView({ slide, ch }) {
  if (slide.type === "title")
    return (
      <div className="slide">
        <div className="slide-frame title-slide">
          <span className="pill p-lg">{BOOK.brand}</span>
          <div className="title-mid">
            <span className="pill p-md dark">{ch.className} - {ch.subject}</span>
            <span className="pill p-sm">{slide.subtitle || `Chapter ${ch.no}`}</span>
          </div>
          <h2>{slide.title}</h2>
          <i className="bar b1" />
          <i className="bar b2" />
        </div>
      </div>
    );
  const isQ = slide.type === "activity";
  const items = (isQ ? slide.questions : slide.points) || [];
  return (
    <div className="slide">
      <div className="slide-frame content-slide">
        <span className="pill p-title dark">{slide.title}</span>
        {isQ ? <ol>{items.map((b) => <li key={b}>{b}</li>)}</ol> : <ul>{items.map((b) => <li key={b}>{b}</li>)}</ul>}
        {!isQ && slide.examples?.length > 0 && (
          <div className="ex">{slide.examples.map((e) => <span key={e}>{e}</span>)}</div>
        )}
        <small>{BOOK.brand} | {ch.title} | {slide.slideNumber}</small>
      </div>
    </div>
  );
}

function Preview({ ch, onClose }) {
  const slides = useMemo(() => buildSlides(ch), [ch]);
  const [i, setI] = useState(0);
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <b>Chapter {ch.no}: {ch.title}</b>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <SlideView slide={slides[i]} ch={ch} />
        <div className="modal-nav">
          <button className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
          <span>{i + 1} / {slides.length}</span>
          <button className="btn ghost" disabled={i === slides.length - 1} onClick={() => setI(i + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [palKey, setPalKey] = useState("cosmic");
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("no");
  const [view, setView] = useState("grid");
  const [sel, setSel] = useState(new Set());
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState("");
  const pal = PALETTES[palKey];

  const list = useMemo(() => {
    const t = q.toLowerCase();
    const f = CHAPTERS.filter((c) => !t || [c.title, ...c.topics].join(" ").toLowerCase().includes(t));
    return [...f].sort((a, b) => (sort === "no" ? a.no - b.no : sort === "title" ? a.title.localeCompare(b.title) : b.slides - a.slides));
  }, [q, sort]);

  const totalSlides = CHAPTERS.reduce((n, c) => n + c.slides, 0);
  const toggle = (no) => setSel((s) => { const n = new Set(s); n.has(no) ? n.delete(no) : n.add(no); return n; });
  const selectAll = () => setSel(sel.size === list.length ? new Set() : new Set(list.map((c) => c.no)));

  const downloadOne = async (ch) => {
    setBusy(`Creating Chapter ${ch.no}...`);
    await makePptx(ch, pal).writeFile({ fileName: fileName(ch) });
    setBusy("");
  };

  const downloadZip = async (chs, zipName) => {
    const zip = new JSZip();
    for (let k = 0; k < chs.length; k++) {
      setBusy(`Creating ${k + 1} of ${chs.length}...`);
      const blob = await makePptx(chs[k], pal).write({ outputType: "blob" });
      zip.file(fileName(chs[k]), blob);
    }
    setBusy("Zipping files...");
    saveBlob(await zip.generateAsync({ type: "blob" }), zipName);
    setBusy("");
  };

  const style = { "--main": `#${pal.main}`, "--dark": `#${pal.dark}`, "--soft": `#${pal.soft}`, "--line": `#${pal.line}` };

  return (
    <div className={`app ${dark ? "is-dark" : ""}`} style={style}>
      <header className="card hero">
        <div className="logo">✦</div>
        <div className="hero-text">
          <span className="chip">● NEXT-GEN SLIDE STUDIO</span>
          <h1>{BOOK.title}</h1>
          <p>Curriculum Presentation Engine • Multi-Subject Interactive System</p>
        </div>
        <div className="hero-ctrl">
          <button className="btn ghost" onClick={() => setDark(!dark)}>{dark ? "Light Studio" : "Dark Studio"}</button>
          <label className="palette">
            <span className="dot" />
            <select value={palKey} onChange={(e) => setPalKey(e.target.value)}>
              {Object.entries(PALETTES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </label>
        </div>
      </header>

      <section className="stats">
        <div className="card philosophy">
          <span className="chip plain">CURRICULUM PHILOSOPHY</span>
          <p>"{BOOK.philosophy}"</p>
        </div>
        <div className="card stat"><b>{CHAPTERS.length}</b><span>CHAPTERS</span></div>
        <div className="card stat"><b>{totalSlides}</b><span>TOTAL SLIDES</span></div>
        <div className="card stat"><b>1</b><span>SUBJECTS</span></div>
        <div className="card stat"><b>{palKey[0].toUpperCase() + palKey.slice(1)}</b><span>ACTIVE PALETTE</span></div>
      </section>

      <div className="card tabs">
        <span className="tab active">All Subjects <em>{CHAPTERS.length}</em></span>
        <span className="tab">{BOOK.subject} <em>{CHAPTERS.length}</em></span>
      </div>

      <div className="card toolbar">
        <input className="search" placeholder="Search chapters, topics, slides..." value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="sort">Sort:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="no">Chapter Number</option>
            <option value="title">Title</option>
            <option value="slides">Slide Count</option>
          </select>
        </label>
        <div className="seg">
          <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} aria-label="Grid view">▦</button>
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} aria-label="List view">☰</button>
        </div>
        <div className="spacer" />
        <button className="btn ghost" onClick={selectAll}>Select All</button>
        <span className="chip plain">{sel.size} Selected</span>
        <button className="btn soft" disabled={!sel.size || !!busy} onClick={() => downloadZip(CHAPTERS.filter((c) => sel.has(c.no)), "Selected-Chapters.zip")}>Download Selected</button>
        <button className="btn dark" disabled={!!busy} onClick={() => downloadZip(CHAPTERS, `${BOOK.title.replace(/\s+/g, "-")}-All-Chapters.zip`)}>Download All</button>
      </div>

      <h2 className="section-title">All Curriculum Chapters <span className="chip">{list.length} Decks</span></h2>

      <main className={`grid ${view}`}>
        {list.map((ch) => (
          <article key={ch.no} className={`card chapter ${sel.has(ch.no) ? "picked" : ""}`}>
            <div className="ch-top">
              <span className="chip">CHAPTER {ch.no}</span>
              <span className="chip plain">{BOOK.subject}</span>
              <input type="checkbox" checked={sel.has(ch.no)} onChange={() => toggle(ch.no)} aria-label={`Select chapter ${ch.no}`} />
            </div>
            <h3>{ch.title}</h3>
            <div className="topics">
              <small>KEY TOPICS:</small>
              <div>{ch.topics.map((t) => <span key={t} className="topic">{t}</span>)}</div>
            </div>
            <div className="ch-foot">
              <div className="count"><b>{ch.slides}</b> Slides</div>
              <button className="btn ghost" onClick={() => setPreview(ch)}>Preview</button>
              <button className="btn main" disabled={!!busy} onClick={() => downloadOne(ch)}>Download</button>
            </div>
          </article>
        ))}
        {!list.length && <p className="empty">No chapters match "{q}". Try a different word.</p>}
      </main>

      {preview && <Preview ch={preview} onClose={() => setPreview(null)} />}
      {busy && <div className="toast">{busy}</div>}
    </div>
  );
}