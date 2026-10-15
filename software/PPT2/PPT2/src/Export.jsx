import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";
import JSZip from "jszip";
import SlideView from "./slides";

const W = 1280, H = 720;

// Renders each slide with the SAME component as the preview and captures it as an image
async function renderSlides(slides, theme) {
  if (!Array.isArray(slides) || slides.length === 0) {
    throw new Error("PPT export requires at least one slide.");
  }
  slides.forEach((slide, index) => {
    const missing = [];
    if (!Number.isInteger(slide?.slideNumber) || slide.slideNumber < 1) missing.push("slideNumber");
    if (!slide?.title?.trim()) missing.push("title");
    if (!slide?.tag?.trim()) missing.push("tag");
    if (!Array.isArray(slide?.lines) || !slide.lines.length || slide.lines.some((line) => typeof line !== "string" || !line.trim())) {
      missing.push("lines");
    }
    if (missing.length) {
      throw new Error(`Cannot export slide ${index + 1}: missing ${missing.join(", ")}.`);
    }
  });
  const host = document.createElement("div");
  host.className = "capture";
  host.style.setProperty("--main", theme.main);
  host.style.setProperty("--dark", theme.dark);
  host.style.setProperty("--soft", theme.soft);
  document.body.appendChild(host);
  const root = createRoot(host);
  const images = [];
  try {
    await document.fonts.ready;
    for (const [i, s] of slides.entries()) {
      flushSync(() => root.render(<SlideView slide={s} index={i} total={slides.length} />));
      await new Promise((r) => requestAnimationFrame(() => r()));
      await Promise.all([...host.querySelectorAll("img")].map((im) => (im.decode ? im.decode() : null)));
      const canvas = await html2canvas(host, {
        scale: 2, backgroundColor: "#ffffff", width: W, height: H, x: 0, y: 0, scrollX: 0, scrollY: 0,
        onclone: (_, el) => { el.style.left = "0px"; el.style.top = "0px"; },
      });
      images.push(canvas.toDataURL("image/jpeg", 0.92));
    }
  } finally {
    root.unmount();
    host.remove();
  }
  return { slides, images };
}

const safeName = (value) => Array.from(value)
  .filter((character) => character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127)
  .join("")
  .replace(/[<>:"/\\|?*]/g, "-")
  .replace(/\s+/g, "-");
const fileName = (c) => {
  return `${safeName(c.className)}-Chapter-${safeName(c.id)}-${safeName(c.title)}.pptx`;
};

function saveBlob(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// builds a .pptx (one full-slide picture per slide, same design as preview)
async function chapterPptx(deck, theme) {
  const { slides, images } = await renderSlides(deck.slides, theme);
  if (images.length !== slides.length || images.some((image) => !image)) {
    throw new Error(`PPT rendering failed for chapter "${deck.title}": not every slide produced an image.`);
  }
  const p = new PptxGenJS();
  p.layout = "LAYOUT_16x9";
  images.forEach((img, i) => {
    const sl = p.addSlide();
    sl.addImage({ data: img, x: 0, y: 0, w: 10, h: 5.625 });
    if (slides[i].kind === "quiz") sl.addNotes(`Answer: ${slides[i].lines[slides[i].answer]}`);
  });
  return p.write({ outputType: "blob" });
}

// one chapter -> one PPT file
export async function exportChapter(deck, theme) {
  saveBlob(await chapterPptx(deck, theme), fileName(deck));
}

// many chapters -> one ZIP containing a PPT per chapter
export async function exportZip(list, theme, zipName, onProgress) {
  const zip = new JSZip();
  for (const [i, c] of list.entries()) {
    zip.file(fileName(c), await chapterPptx(c, theme));
    onProgress?.(i + 1);
  }
  saveBlob(await zip.generateAsync({ type: "blob" }), `${zipName}.zip`);
}