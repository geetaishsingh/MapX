import PptxGenJS from "pptxgenjs";
import { BOOK, buildSlides } from "./data";

const FONT = "Poppins";

function frame(s, p) {
  s.background = { color: "FFFFFF" };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.14, fill: { color: p.main }, line: { color: p.main } });
  s.addShape("roundRect", { x: 0.6, y: 0.4, w: 8.8, h: 4.85, rectRadius: 0.6, fill: { color: "FFFFFF" }, line: { color: p.line, width: 1 } });
}

function pill(s, p, text, y, w, h, size, color) {
  const x = (10 - w) / 2;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.06, fill: { color: p.soft }, line: { color: p.line, width: 1 } });
  s.addText(text, { x, y, w, h, align: "center", valign: "middle", bold: true, fontFace: FONT, fontSize: size, color, fit: "shrink" });
}

export function makePptx(ch, p) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = `${BOOK.title} - Chapter ${ch.no} - ${ch.title}`;

  buildSlides(ch).forEach((sl) => {
    const s = pptx.addSlide();
    frame(s, p);

    if (sl.type === "title") {
      // tight, evenly spaced stack centred in the frame (no description)
      let y = 1.3;
      pill(s, p, BOOK.brand, y, 4.0, 0.4, 14, p.main);
      y += 0.55;
      pill(s, p, `${ch.className} - ${ch.subject}`, y, 4.3, 0.4, 12, p.dark);
      y += 0.52;
      pill(s, p, sl.subtitle || `Chapter ${ch.no}`, y, 3.0, 0.4, 12, p.main);
      y += 0.55;
      s.addText(sl.title, { x: 0.8, y, w: 8.4, h: 0.8, align: "center", valign: "middle", bold: true, fontFace: FONT, fontSize: 36, color: p.dark, fit: "shrink" });
      y += 0.85;
      s.addShape("roundRect", { x: 3.85, y, w: 2.3, h: 0.05, rectRadius: 0.02, fill: { color: p.main }, line: { color: p.main } });
      s.addShape("roundRect", { x: 2.75, y: y + 0.15, w: 4.5, h: 0.07, rectRadius: 0.03, fill: { color: p.main }, line: { color: p.main } });
      return;
    }

    pill(s, p, sl.title, 0.7, 6, 0.6, 22, p.dark);

    const isQ = sl.type === "activity";
    const items = isQ ? sl.questions : sl.points;
    const hasEx = !isQ && sl.examples?.length;
    s.addText(
      (items || []).map((t) => ({
        text: t,
        options: { bullet: isQ ? { type: "number" } : { code: "25CF" }, breakLine: true },
      })),
      { x: 1.2, y: 1.55, w: 7.6, h: hasEx ? 2.35 : 3.0, valign: "top", fontFace: FONT, fontSize: isQ ? 18 : 17, color: p.dark, paraSpaceAfter: 10, fit: "shrink" }
    );

    if (hasEx) {
      const w = 1.6, gap = 0.2, n = sl.examples.length;
      const x0 = (10 - (n * w + (n - 1) * gap)) / 2;
      sl.examples.forEach((e, i) => {
        const x = x0 + i * (w + gap);
        s.addShape("roundRect", { x, y: 4.0, w, h: 0.38, rectRadius: 0.1, fill: { color: p.main }, line: { color: p.main } });
        s.addText(e, { x, y: 4.0, w, h: 0.38, align: "center", valign: "middle", bold: true, fontFace: FONT, fontSize: 12, color: "FFFFFF" });
      });
    }
    s.addText(`${BOOK.brand}  |  ${ch.title}  |  ${sl.slideNumber ?? ""}`, { x: 0.8, y: 4.75, w: 8.4, h: 0.3, align: "center", fontFace: FONT, fontSize: 9, color: p.main });
  });
  return pptx;
}

export const fileName = (ch) => `Chapter-${String(ch.no).padStart(2, "0")}-${ch.title.replace(/[^\w]+/g, "_")}.pptx`;