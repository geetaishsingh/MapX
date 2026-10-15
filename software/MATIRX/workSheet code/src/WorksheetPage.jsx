const LETTERS = "ABCDEFGH";
const OPT = "abcdefgh";

// colour theme for each question type
const TONES = { fill: "orange", mcq: "blue", tf: "green", short: "purple", think: "pink" };

// "______" inside a sentence becomes a writing line
const withBlanks = (text) =>
  text.split(/(_{2,})/).map((part, i) => (/^_{2,}$/.test(part) ? <span className="blank" key={i} /> : part));

function Q({ n, children }) {
  return (
    <li className="q">
      <div className="q__text"><b className="n">{n}.</b> {children}</div>
    </li>
  );
}

export default function WorksheetPage({ book, chapter, showAnswers = false, id }) {
  const { classNumber, subject, chapter: no, title } = chapter;
  const clean = (arr) => (arr || []).filter((x) => x.trim());

  const blanks = clean(chapter.fillInTheBlanks);
  const mcq = (chapter.chooseTheCorrectAnswer || []).filter((q) => q.question.trim());
  const tf = clean(chapter.trueOrFalse);
  const short = clean(chapter.answerInShort);
  const think = clean(chapter.thinkAndAnswer);

  const blocks = [];
  if (blanks.length)
    blocks.push({ key: "fill", title: "Fill in the blanks", body: blanks.map((t, i) => (
      <Q key={i} n={i + 1}>{withBlanks(t)}<i className="line" /></Q>
    )) });
  if (mcq.length)
    blocks.push({ key: "mcq", title: "Choose the correct answer", body: mcq.map((q, i) => (
      <Q key={i} n={i + 1}>
        {q.question}
        <span className="opts">
          {q.options.filter((o) => o.trim()).map((o, j) => (
            <span key={j} className={`opt ${showAnswers && o === q.answer ? "is-right" : ""}`}>
              <b>{OPT[j]}.</b> {o}
            </span>
          ))}
        </span>
      </Q>
    )) });
  if (tf.length)
    blocks.push({ key: "tf", title: "True or False", body: tf.map((t, i) => (
      <Q key={i} n={i + 1}>
        {t}
        <span className="opts">
          <span className="opt"><b>a.</b> True</span>
          <span className="opt"><b>b.</b> False</span>
        </span>
      </Q>
    )) });
  if (short.length)
    blocks.push({ key: "short", title: "Answer in short", body: short.map((t, i) => (
      <Q key={i} n={i + 1}>{t}<i className="line" /></Q>
    )) });
  if (think.length)
    blocks.push({ key: "think", title: "Think and answer", body: think.map((t, i) => (
      <Q key={i} n={i + 1}>{t}<i className="line" /><i className="line" /></Q>
    )) });

  return (
    <article className="ws" id={id}>
      <img className="ws__logo" src="/matrix-logo.png" alt="Matrix" />
      <h2 className="ws__sheet">{book.sheetTitle}</h2>

      <p className="ws__meta">
        <span>Class: {classNumber}</span>
        <span>Subject: {subject}</span>
        <span>Chapter: {no}- {title}</span>
      </p>

      {blocks.map((b, i) => (
        <section key={b.key} className={`sec sec--${TONES[b.key]}`}>
          <h3 className="sec__head">
            <span className="sec__badge">{LETTERS[i]}</span>
            <span className="sec__title">{b.title}</span>
          </h3>
          <ol className="sec__body">{b.body}</ol>
        </section>
      ))}

      {blocks.length === 0 && <p className="ws__empty">Add questions from the editor on the left.</p>}
    </article>
  );
}