import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";

const SW = 1280, SH = 720; // slide design size (px)
const after = (t) => t.replace(/^[^:]+:\s*/, "");

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
          <div className="box"><small>Problem</small>{lines[0]}</div>
          <span className="arr">➜</span>
          <div className="box ans"><small>Answer</small>{after(lines[1])}</div>
        </div>
      );
    case "practice":
      return (
        <>
          <div className="box"><small>Try this</small>{after(lines[0])}</div>
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
    return (
      <div className="sl sl-cover">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" />
        <div className="badge"><img src={logo} alt="Matrix" /></div>
        <span className="chip-w">{slide.tag}</span>
        <h1>{slide.title}</h1>
        <p>{slide.lines[0]}</p>
      </div>
    );
  }
  return (
    <div className={`sl sl-${slide.kind}`}>
      <aside className="rail">
        <span className="no">{index + 1}</span>
        <span className="rt">{slide.tag}</span>
        <span className="of">of {total}</span>
      </aside>
      <main className="body">
        <h2>{slide.title}</h2>
        <Body slide={slide} />
      </main>
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