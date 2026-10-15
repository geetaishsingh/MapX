import { useEffect, useRef, useState } from "react";
import WorksheetPage from "./WorksheetPage";
import { downloadSinglePdf, downloadZip } from "./exporters";
import initialChapters from "./worksheetdata.js";
import "./App.scss";

const initialState = {
  book: { bookName: "Vedant", sheetTitle: "Worksheet" },
  chapters: initialChapters,
};

const blankMcq = () => ({ question: "", options: ["", "", "", ""], answer: "" });

const blankChapter = (prev) => ({
  classNumber: prev?.classNumber ?? 5,
  subject: prev?.subject ?? "English",
  chapter: (Number(prev?.chapter) || 0) + 1,
  title: "",
  fillInTheBlanks: [""],
  chooseTheCorrectAnswer: [blankMcq()],
  trueOrFalse: [""],
  answerInShort: [""],
  thinkAndAnswer: [""],
});

/* ---------- small reusable editors ---------- */
function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ListEditor({ items, onChange, placeholder, addLabel }) {
  const set = (i, v) => onChange(items.map((x, k) => (k === i ? v : x)));
  return (
    <div className="list">
      {items.map((v, i) => (
        <div className="list__row" key={i}>
          <input value={v} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          <button className="icon" aria-label="Remove" onClick={() => onChange(items.filter((_, k) => k !== i))}>×</button>
        </div>
      ))}
      <button className="link" onClick={() => onChange([...items, ""])}>+ {addLabel}</button>
    </div>
  );
}

// Multiple-choice editor: question, four options, the radio marks the correct one
function McqEditor({ items, onChange, group }) {
  const upd = (i, patch) => onChange(items.map((q, k) => (k === i ? { ...q, ...patch } : q)));
  const setOpt = (i, j, val) => {
    const q = items[i];
    const options = q.options.map((o, k) => (k === j ? val : o));
    upd(i, { options, answer: q.answer === q.options[j] ? val : q.answer }); // keep answer in sync
  };
  return (
    <div>
      {items.map((q, i) => (
        <div className="qbox" key={i}>
          <div className="qbox__top">
            <b>Question {i + 1}</b>
            <button className="icon" aria-label="Remove question" onClick={() => onChange(items.filter((_, k) => k !== i))}>×</button>
          </div>
          <textarea rows={2} placeholder="Type the question" value={q.question} onChange={(e) => upd(i, { question: e.target.value })} />
          {q.options.map((o, j) => (
            <div className="opt-edit" key={j}>
              <input
                type="radio" name={`${group}-${i}`} checked={!!o && q.answer === o}
                onChange={() => upd(i, { answer: o })} aria-label={`Mark option ${"ABCD"[j]} as correct`}
              />
              <input type="text" value={o} placeholder={`Option ${"ABCD"[j]}`} onChange={(e) => setOpt(i, j, e.target.value)} />
            </div>
          ))}
          <p className="qbox__hint">Select the circle next to the correct answer.</p>
        </div>
      ))}
      <button className="link" onClick={() => onChange([...items, blankMcq()])}>+ Add question</button>
    </div>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [state, setState] = useState(initialState);
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState("");              // "", "pdf", "zip"
  const [showAnswers, setShowAnswers] = useState(false);
  const [tab, setTab] = useState("chapter");
  const [view, setView] = useState("edit");          // small screens: "edit" | "preview"
  const exportRef = useRef(null);

  const { book, chapters } = state;
  const ch = chapters[idx] || chapters[0];

  useEffect(() => {
    localStorage.removeItem("worksheet-app-v1");
  }, []);

  // Left / right arrow keys turn pages (ignored while typing in a field)
  useEffect(() => {
    const onKey = (e) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, chapters.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapters.length]);

  const setBook = (k, v) => setState((s) => ({ ...s, book: { ...s.book, [k]: v } }));
  const setCh = (patch) =>
    setState((s) => ({ ...s, chapters: s.chapters.map((c, i) => (i === idx ? { ...c, ...patch } : c)) }));

  const addChapter = () => {
    setState((s) => ({ ...s, chapters: [...s.chapters, blankChapter(s.chapters[s.chapters.length - 1])] }));
    setIdx(chapters.length);
    setTab("chapter");
  };
  const removeChapter = () => {
    if (chapters.length === 1) return;
    if (!window.confirm(`Delete chapter ${ch.chapter}: ${ch.title || "Untitled"}?`)) return;
    setState((s) => ({ ...s, chapters: s.chapters.filter((_, i) => i !== idx) }));
    setIdx(Math.max(0, idx - 1));
  };
  const restore = () => {
    if (window.confirm("Restore the default data? Your changes will be lost.")) {
      setState(initialState); setIdx(0);
    }
  };

  // Export: mount hidden full-size pages, wait for paint, capture, unmount
  const wait = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 200)));

  const exportPdf = async () => {
    setBusy("pdf"); await wait();
    try {
      await downloadSinglePdf(exportRef.current.children[0], `Class${ch.classNumber}_${ch.subject}_Ch${ch.chapter}_${ch.title}`);
    } finally { setBusy(""); }
  };
  const exportZip = async () => {
    setBusy("zip"); await wait();
    try {
      await downloadZip(
        [...exportRef.current.children],
        chapters.map((c) => `Ch${c.chapter}_${c.title}`),
        `${book.bookName}_Class${ch.classNumber}_${ch.subject}_worksheets`
      );
    } finally { setBusy(""); }
  };
  const exportList = busy === "pdf" ? [ch] : busy === "zip" ? chapters : [];

  const tabs = [
    ["book", "Book"], ["chapter", "Chapter"], ["blank", "Blanks"], ["mcq", "MCQ"],
    ["tf", "True/False"], ["short", "Short"], ["think", "Think"],
  ];
  const titles = {
    book: ["Book details", "Shown on every worksheet"],
    chapter: ["Chapter details", "Class, subject and chapter name"],
    blank: ["Fill in the blanks", "Type ______ where the blank goes"],
    mcq: ["Choose the correct answer", `${ch.chooseTheCorrectAnswer.length} questions in this chapter`],
    tf: ["True or False", "Write each statement"],
    short: ["Answer in short", "Questions with a line to answer"],
    think: ["Think and answer", "Questions with two lines to answer"],
  };

  return (
    <div className={`app app--${view}`}>
      {/* edit / preview switch, visible on small screens only */}
      <div className="switch" role="tablist">
        <button role="tab" aria-selected={view === "edit"} className={view === "edit" ? "is-on" : ""} onClick={() => setView("edit")}>Edit</button>
        <button role="tab" aria-selected={view === "preview"} className={view === "preview" ? "is-on" : ""} onClick={() => setView("preview")}>Preview</button>
      </div>

      {/* ---------------- LEFT: editor ---------------- */}
      <aside className="side">
        <header className="side__head">
          <div>
            <h1>Worksheet Editor</h1>
            <p>Chapter {idx + 1} of {chapters.length}</p>
          </div>
          <button className="btn btn--primary" onClick={addChapter}>+ Add Chapter</button>
        </header>

        <div className="tabs" role="tablist">
          {tabs.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={`tab ${tab === k ? "is-on" : ""}`} onClick={() => setTab(k)}>
              {label}
            </button>
          ))}
        </div>

        <div className="panel">
          <div className="card">
            <div className="card__head">
              <h3>{titles[tab][0]}</h3>
              <span>{titles[tab][1]}</span>
            </div>

            {tab === "book" && (
              <>
                <Field label="Book name"><input value={book.bookName} onChange={(e) => setBook("bookName", e.target.value)} /></Field>
                <Field label="Worksheet title"><input value={book.sheetTitle} onChange={(e) => setBook("sheetTitle", e.target.value)} /></Field>
                <button className="btn btn--soft restore" onClick={restore}>Restore defaults</button>
              </>
            )}

            {tab === "chapter" && (
              <>
                <div className="two">
                  <Field label="Class"><input value={ch.classNumber} onChange={(e) => setCh({ classNumber: e.target.value })} /></Field>
                  <Field label="Subject"><input value={ch.subject} onChange={(e) => setCh({ subject: e.target.value })} /></Field>
                </div>
                <div className="two two--narrow">
                  <Field label="Number"><input value={ch.chapter} onChange={(e) => setCh({ chapter: e.target.value })} /></Field>
                  <Field label="Chapter name"><input value={ch.title} onChange={(e) => setCh({ title: e.target.value })} /></Field>
                </div>
                <button className="btn btn--soft btn--danger" onClick={removeChapter} disabled={chapters.length === 1}>Delete this chapter</button>
              </>
            )}

            {tab === "blank" && (
              <ListEditor items={ch.fillInTheBlanks} onChange={(v) => setCh({ fillInTheBlanks: v })} placeholder="The village ______ is here." addLabel="Add sentence" />
            )}
            {tab === "mcq" && (
              <McqEditor group={`c${idx}`} items={ch.chooseTheCorrectAnswer} onChange={(v) => setCh({ chooseTheCorrectAnswer: v })} />
            )}
            {tab === "tf" && (
              <ListEditor items={ch.trueOrFalse} onChange={(v) => setCh({ trueOrFalse: v })} placeholder="Type a statement" addLabel="Add statement" />
            )}
            {tab === "short" && (
              <ListEditor items={ch.answerInShort} onChange={(v) => setCh({ answerInShort: v })} placeholder="Type a question" addLabel="Add question" />
            )}
            {tab === "think" && (
              <ListEditor items={ch.thinkAndAnswer} onChange={(v) => setCh({ thinkAndAnswer: v })} placeholder="Type a question" addLabel="Add question" />
            )}
          </div>
        </div>
      </aside>

      {/* ---------------- RIGHT: preview ---------------- */}
      <main className="main">
        <header className="bar">
          <div className="pager" role="group" aria-label="Chapter navigation">
            <button disabled={idx === 0} onClick={() => setIdx(idx - 1)} aria-label="Previous chapter">‹</button>
            <select value={idx} onChange={(e) => setIdx(+e.target.value)} aria-label="Jump to chapter">
              {chapters.map((c, i) => <option key={i} value={i}>Chapter {c.chapter}: {c.title || "Untitled"}</option>)}
            </select>
            <button disabled={idx === chapters.length - 1} onClick={() => setIdx(idx + 1)} aria-label="Next chapter">›</button>
          </div>

          <label className="toggle">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} />
            <span>Show answers</span>
          </label>

          <div className="bar__actions">
            <button className="btn btn--teal" disabled={!!busy} onClick={exportPdf}>
              {busy === "pdf" ? "Preparing…" : "Download PDF"}
            </button>
            <button className="btn btn--teal" disabled={!!busy} onClick={exportZip}>
              {busy === "zip" ? "Preparing…" : "Download All Chapters"}
            </button>
          </div>
        </header>

        <div className="stage">
          <WorksheetPage book={book} chapter={ch} showAnswers={showAnswers} id="preview-page" />
        </div>
      </main>

      {/* Off-screen, fixed-width copies used only for export */}
      <div className="offscreen" ref={exportRef} aria-hidden="true">
        {exportList.map((c, i) => <WorksheetPage key={i} book={book} chapter={c} showAnswers={showAnswers} />)}
      </div>
    </div>
  );
}