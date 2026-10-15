import "./lessonPage.scss";

function Section({ title, tone = "blue", children }) {
  return (
    <section className="lesson__sec">
      <h3 className={`lesson__h lesson__h--${tone}`}>{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="lesson__list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function LessonPage({ book, chapter, id }) {
  const {
    number,
    name,
    objectives,
    content,
    activities, // Teaching Method & Activities
    resources, // Teaching Resources (new, optional)
    assessment, // Assessment questions (new, optional)
    outcomes, // Expected Learning Outcome (new, optional)
    homework,
  } = chapter;

  const clean = (arr) => (arr || []).filter((item) => item && item.trim());
  const objs = clean(objectives);
  const acts = clean(activities);
  const res = clean(resources);
  const asmt = clean(assessment);
  const outs = clean(outcomes);
  const rows = (content || []).filter(
    (row) => row.topic.trim() || row.points.trim(),
  );
  const hw = clean(
    Array.isArray(homework) ? homework : String(homework || "").split(/\r?\n/),
  );
  const chapterLabel = name ? `${number} — ${name}` : `${number}`;

  return (
    <article className="lesson" id={id}>
      <header className="lesson__head">
        <img
          className="lesson__logo"
          src="/matrix-logo.png"
          alt="Matrix"
        />
        <h2 className="lesson__kind">{book.planTitle}</h2>
        <p className="lesson__sub">
          {book.className} &bull; {book.subject} &bull; {chapterLabel}
        </p>
      </header>

      <table className="lesson__facts">
        <tbody>
          <tr>
            <th scope="row">Subject</th>
            <td>{book.subject}</td>
            <th scope="row">Class</th>
            <td>{book.className}</td>
          </tr>
          <tr>
            <th scope="row">Chapter</th>
            <td>{chapterLabel}</td>
            <th scope="row">Format</th>
            <td>{book.format}</td>
          </tr>
        </tbody>
      </table>

      {objs.length > 0 && (
        <Section title="Learning Objectives">
          <BulletList items={objs} />
        </Section>
      )}

      {rows.length > 0 && (
        <Section title="Content to be Covered">
          <table className="lesson__table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Key Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.topic}</td>
                  <td>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {acts.length > 0 && (
        <Section title="Teaching Method & Activities">
          <BulletList items={acts} />
        </Section>
      )}

      {res.length > 0 && (
        <Section title="Teaching Resources">
          <BulletList items={res} />
        </Section>
      )}

      {asmt.length > 0 && (
        <Section title="Assessment" tone="purple">
          <BulletList items={asmt} />
        </Section>
      )}

      {outs.length > 0 && (
        <Section title="Expected Learning Outcome" tone="orange">
          <BulletList items={outs} />
        </Section>
      )}

      {hw.length > 0 && (
        <Section title="Homework / Extension" tone="pink">
          <BulletList items={hw} />
        </Section>
      )}
    </article>
  );
}