import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./slides.css";

const SW = 1280, SH = 720; // slide design size (px)
const after = (t) => t.replace(/^[^:]+:\s*/, "");
const fs = (t, a = 32, b = 28) => (t.length > 90 ? { fontSize: b } : t.length > 45 ? { fontSize: a } : undefined);
const hs = (t) => (t.length > 70 ? { fontSize: 36 } : t.length > 40 ? { fontSize: 44 } : undefined);

function Body({ slide }) {
  const { kind, lines } = slide;
  switch (kind) {
    case "goals":
      return <div className="cards">{lines.map((l, i) => <div className="tile" key={i}><b>✓</b><p>{after(l)}</p></div>)}</div>;
    case "warmup":
      return <><div className="bubble">{lines[0]}</div><p className="note">{lines[1]}</p></>;
    case "words":
      return <div className="cards">{lines.map((w, i) => <div className="tile word" key={i}>{w}</div>)}</div>;
    case "concept":
      return <ul className="bars">{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>;
    case "example":
      return (
        <div className="qa">
          <div className="box" style={fs(lines[0])}><small>Problem</small>{lines[0]}</div>
          <span className="arr">➜</span>
          <div className="box ans" style={fs(after(lines[1]))}><small>Answer</small>{after(lines[1])}</div>
        </div>
      );
    case "practice":
      return (
        <>
          <div className="box" style={fs(after(lines[0]))}><small>Try this</small>{after(lines[0])}</div>
          <div className="box dash">{lines[1]}</div>
        </>
      );
    case "quiz":
      return <div className="opts">{lines.map((l, i) => <div className="opt" key={i}><b>{l[0]}</b>{l.slice(3)}</div>)}</div>;
    default:
      return <ul className="marks">{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>;
  }
}

function Slide({ slide, index, total }) {
  if (slide.kind === "cover") {
    const t = slide.title;
    const no = (slide.tag.match(/\d+/) || [""])[0];
    return (
      <div className="sl cv4">
        <div className="cv-l">
          <img className="cv-logo" src={logo} alt="Brilliant Brain Publishing House" />
          <span className="cv-tag">{slide.tag}</span>
          <h1 style={t.length > 30 ? { fontSize: 52 } : t.length > 20 ? { fontSize: 62 } : undefined}>{t}</h1>
          <p>{slide.lines[0]}</p>
        </div>
        <div className="cv-r">
          <i className="r1" /><i className="r2" /><i className="r3" />
          <div className="cv-no"><b>{no}</b><span>Chapter</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className={`sl v4 sl-${slide.kind}`}>
      <aside className="lp">
        <span className="num">{slide.slideNumber ?? index + 1}</span>
        <span className="tag">{slide.tag}</span>
        <h2 style={hs(slide.title)}>{slide.title}</h2>
        <img className="lg" src={logo} alt="Brilliant Brain Publishing House" />
      </aside>
      <section className="rp">
        <main className="bd"><Body slide={slide} /></main>
        <footer className="ft">
          {Array.from({ length: total }, (_, i) => <i key={i} className={i === index ? "on" : ""} />)}
        </footer>
      </section>
    </div>
  );
}

// fit = scale the fixed 1280x720 slide to the preview width. Export uses it unscaled.
export default function SlideView({ slide, index = 0, total = 10, fit = false }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.8);
  useEffect(() => {
    if (!fit || !ref.current) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / SW));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [fit]);
  const s = <Slide slide={slide} index={index} total={total} />;
  if (!fit) return s;
  return (
    <div ref={ref} className="fit" style={{ height: SH * k }}>
      <div style={{ width: SW, height: SH, transform: `scale(${k})`, transformOrigin: "top left" }}>{s}</div>
    </div>
  );
}