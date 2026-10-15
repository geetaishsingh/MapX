import { useEffect, useRef, useState } from "react";
import LessonPage from "./lessonPage";
import { downloadSinglePdf, downloadZip } from "./exporters";
import initial from "./initialData";
import "./App.scss";

const blankChapter = (number = 1) => ({
  number,
  name: "",
  objectives: [""],
  content: [{ topic: "", points: "" }],
  activities: [""],
  resources: [""],
  assessment: [""],
  outcomes: [""],
  homework: "",
});

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ListEditor({ items, onChange, placeholder, addLabel }) {
  const set = (index, value) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <div className="list">
      {items.map((value, index) => (
        <div className="list__row" key={index}>
          <input
            value={value}
            placeholder={placeholder}
            onChange={(event) => set(index, event.target.value)}
          />
          <button
            className="icon"
            aria-label="Remove"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            ×
          </button>
        </div>
      ))}
      <button className="link" onClick={() => onChange([...items, ""])}>
        + {addLabel}
      </button>
    </div>
  );
}

export default function App() {
  // Data sirf initialData.js se aata hai (localStorage use nahi hota)
  const [state, setState] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState("");
  const [tab, setTab] = useState("book");
  const [view, setView] = useState("edit");
  const exportRef = useRef(null);

  const { book, chapters } = state;
  const ch = chapters[idx];

  useEffect(() => {
    const onKey = (event) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
      if (event.key === "ArrowRight") {
        setIdx((current) => Math.min(current + 1, chapters.length - 1));
      }
      if (event.key === "ArrowLeft") {
        setIdx((current) => Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapters.length]);

  const setBook = (key, value) =>
    setState((current) => ({
      ...current,
      book: { ...current.book, [key]: value },
    }));

  const setCh = (patch) =>
    setState((current) => ({
      ...current,
      chapters: current.chapters.map((chapter, index) =>
        index === idx ? { ...chapter, ...patch } : chapter,
      ),
    }));

  const addChapter = () => {
    setState((current) => ({
      ...current,
      chapters: [
        ...current.chapters,
        blankChapter(current.chapters.length + 1),
      ],
    }));
    setIdx(chapters.length);
  };

  const removeChapter = () => {
    if (chapters.length === 1) return;
    setState((current) => ({
      ...current,
      chapters: current.chapters.filter((_, index) => index !== idx),
    }));
    setIdx(Math.max(0, idx - 1));
  };

  const reset = () => {
    if (
      window.confirm(
        "Restore the default lesson plan from initialData.js? Your edits will be lost.",
      )
    ) {
      setState(initial);
      setIdx(0);
    }
  };

  const waitForPaint = () =>
    new Promise((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, 100)),
    );

  const exportPdf = async () => {
    setBusy("pdf");
    await waitForPaint();
    try {
      await downloadSinglePdf(
        exportRef.current.children[0],
        `${book.className} ${ch.name}`,
      );
    } finally {
      setBusy("");
    }
  };

  const exportZip = async () => {
    setBusy("zip");
    await waitForPaint();
    try {
      const elements = [...exportRef.current.children];
      await downloadZip(
        elements,
        chapters.map(
          (chapter) =>
            `${book.className} CH.${chapter.number} ${chapter.name}`,
        ),
        `${book.className} Lesson Plan`,
      );
    } finally {
      setBusy("");
    }
  };

  const exportList =
    busy === "pdf" ? [ch] : busy === "zip" ? chapters : [];

  const titles = {
    book: ["Book details", "Shown on every chapter page"],
    chapter: ["Chapter", `Editing ${idx + 1} of ${chapters.length}`],
    obj: ["Learning objectives", "What students will learn"],
    content: ["Content to be covered", "Topics and key points"],
    act: ["Activities", "Classroom tasks"],
    resources: ["Teaching resources", "Materials used in the lesson"],
    assessment: ["Assessment", "Questions to check understanding"],
    outcomes: ["Expected learning outcomes", "What students will achieve"],
    hw: ["Homework", "Work to do at home"],
  };
  const tabs = [
    ["book", "Book"],
    ["chapter", "Chapter"],
    ["obj", "Objectives"],
    ["content", "Content"],
    ["act", "Activities"],
    ["resources", "Resources"],
    ["assessment", "Assessment"],
    ["outcomes", "Outcomes"],
    ["hw", "Homework"],
  ];

  return (
    <div className={`app app--${view}`}>
      <div className="switch" role="tablist">
        <button
          role="tab"
          aria-selected={view === "edit"}
          className={view === "edit" ? "is-on" : ""}
          onClick={() => setView("edit")}
        >
          Edit
        </button>
        <button
          role="tab"
          aria-selected={view === "preview"}
          className={view === "preview" ? "is-on" : ""}
          onClick={() => setView("preview")}
        >
          Preview
        </button>
      </div>

      <aside className="side">
        <header className="side__head">
          <div>
            <h1>Lesson plan editor</h1>
            <p>
              Chapter {ch.number}: {ch.name || "Untitled"}
            </p>
          </div>
          <button className="btn btn--soft" onClick={reset}>
            Restore defaults
          </button>
        </header>

        <div className="tabs" role="tablist">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`tab ${tab === key ? "is-on" : ""}`}
              onClick={() => setTab(key)}
            >
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
                <Field label="Book name">
                  <input
                    value={book.bookName}
                    onChange={(event) =>
                      setBook("bookName", event.target.value)
                    }
                  />
                </Field>
                <Field label="Plan title">
                  <input
                    value={book.planTitle}
                    onChange={(event) =>
                      setBook("planTitle", event.target.value)
                    }
                  />
                </Field>
                <div className="two">
                  <Field label="Class">
                    <input
                      value={book.className}
                      onChange={(event) =>
                        setBook("className", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Subject">
                    <input
                      value={book.subject}
                      onChange={(event) =>
                        setBook("subject", event.target.value)
                      }
                    />
                  </Field>
                </div>
                <Field label="Format">
                  <input
                    value={book.format}
                    onChange={(event) => setBook("format", event.target.value)}
                  />
                </Field>
              </>
            )}

            {tab === "chapter" && (
              <>
                <div className="two two--narrow">
                  <Field label="Number">
                    <input
                      type="number"
                      value={ch.number}
                      onChange={(event) =>
                        setCh({ number: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="Name">
                    <input
                      value={ch.name}
                      onChange={(event) => setCh({ name: event.target.value })}
                    />
                  </Field>
                </div>
                <div className="two">
                  <button className="btn btn--solid" onClick={addChapter}>
                    Add chapter
                  </button>
                  <button
                    className="btn btn--soft"
                    onClick={removeChapter}
                    disabled={chapters.length === 1}
                  >
                    Delete chapter
                  </button>
                </div>
              </>
            )}

            {tab === "obj" && (
              <ListEditor
                items={ch.objectives}
                onChange={(value) => setCh({ objectives: value })}
                placeholder="Students will be able to…"
                addLabel="Add objective"
              />
            )}

            {tab === "content" && (
              <>
                {ch.content.map((row, index) => (
                  <div className="rowbox" key={index}>
                    <input
                      placeholder="Topic"
                      value={row.topic}
                      onChange={(event) =>
                        setCh({
                          content: ch.content.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, topic: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                    <textarea
                      rows={2}
                      placeholder="Key points"
                      value={row.points}
                      onChange={(event) =>
                        setCh({
                          content: ch.content.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, points: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                    <button
                      className="icon"
                      aria-label="Remove topic"
                      onClick={() =>
                        setCh({
                          content: ch.content.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        })
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  className="link"
                  onClick={() =>
                    setCh({
                      content: [...ch.content, { topic: "", points: "" }],
                    })
                  }
                >
                  + Add topic
                </button>
              </>
            )}

            {tab === "act" && (
              <ListEditor
                items={ch.activities}
                onChange={(value) => setCh({ activities: value })}
                placeholder="Describe the activity"
                addLabel="Add activity"
              />
            )}

            {tab === "resources" && (
              <ListEditor
                items={ch.resources || []}
                onChange={(value) => setCh({ resources: value })}
                placeholder="Enter a teaching resource"
                addLabel="Add resource"
              />
            )}

            {tab === "assessment" && (
              <ListEditor
                items={ch.assessment || []}
                onChange={(value) => setCh({ assessment: value })}
                placeholder="Enter an assessment question"
                addLabel="Add assessment question"
              />
            )}

            {tab === "outcomes" && (
              <ListEditor
                items={ch.outcomes || []}
                onChange={(value) => setCh({ outcomes: value })}
                placeholder="Enter an expected learning outcome"
                addLabel="Add outcome"
              />
            )}

            {tab === "hw" && (
              <textarea
                rows={6}
                value={ch.homework}
                onChange={(event) => setCh({ homework: event.target.value })}
                placeholder="What should students do at home?"
              />
            )}
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="bar">
          <div className="bar__title">
            <h2>Preview</h2>
            <p>{ch.name || "Untitled"}</p>
          </div>

          <div className="pager" role="group" aria-label="Chapter navigation">
            <button
              disabled={idx === 0}
              onClick={() => setIdx(idx - 1)}
              aria-label="Previous chapter"
            >
              ‹
            </button>
            <select
              value={idx}
              onChange={(event) => setIdx(Number(event.target.value))}
              aria-label="Jump to chapter"
            >
              {chapters.map((chapter, index) => (
                <option key={index} value={index}>
                  Chapter {chapter.number}: {chapter.name || "Untitled"}
                </option>
              ))}
            </select>
            <span className="pager__count">
              {idx + 1} of {chapters.length}
            </span>
            <button
              disabled={idx === chapters.length - 1}
              onClick={() => setIdx(idx + 1)}
              aria-label="Next chapter"
            >
              ›
            </button>
          </div>

          <button
            className="btn btn--line"
            disabled={Boolean(busy)}
            onClick={exportPdf}
          >
            {busy === "pdf" ? "Preparing…" : "Download PDF"}
          </button>
          <button
            className="btn btn--solid"
            disabled={Boolean(busy)}
            onClick={exportZip}
          >
            {busy === "zip" ? "Preparing…" : "Download all (ZIP)"}
          </button>
        </header>

        <div className="stage">
          <LessonPage book={book} chapter={ch} id="preview-page" />
        </div>
      </main>

      <div className="offscreen" ref={exportRef} aria-hidden="true">
        {exportList.map((chapter, index) => (
          <LessonPage
            key={index}
            book={book}
            chapter={chapter}
            pageNo={chapters.indexOf(chapter) + 1}
            total={chapters.length}
          />
        ))}
      </div>
    </div>
  );
}