import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import SlideView from "./Slide";
import { buildSlides } from "./data";

const W = 1280, H = 720;

// Renders each slide with the SAME component as the preview and captures it as an image
async function renderSlides(c, theme) {
  const host = document.createElement("div");
  host.className = "capture";
  host.style.setProperty("--main", theme.main);
  host.style.setProperty("--dark", theme.dark);
  host.style.setProperty("--soft", theme.soft);
  document.body.appendChild(host);
  const root = createRoot(host);
  await document.fonts.ready;
  const slides = buildSlides(c);
  const images = [];
  for (const [i, s] of slides.entries()) {
    flushSync(() => root.render(<SlideView slide={s} index={i} total={slides.length} />));
    await new Promise((r) => requestAnimationFrame(() => r()));
    await Promise.all([...host.querySelectorAll("img")].map((im) => (im.decode ? im.decode().catch(() => { }) : null)));
    const canvas = await html2canvas(host, {
      scale: 2, backgroundColor: "#ffffff", width: W, height: H, x: 0, y: 0, scrollX: 0, scrollY: 0,
      onclone: (_, el) => { el.style.left = "0px"; el.style.top = "0px"; },
    });
    images.push(canvas.toDataURL("image/jpeg", 0.92));
  }
  root.unmount();
  host.remove();
  return { slides, images };
}

export async function exportChapter(c, theme) {
  const { images } = await renderSlides(c, theme);
  const name = `Chapter-${c.id}-${c.title.replace(/\s+/g, "-")}`;
  const doc = new jsPDF({ orientation: "landscape", unit: "px", format: [W, H], compress: true });
  images.forEach((img, i) => {
    if (i) doc.addPage([W, H], "landscape");
    doc.addImage(img, "JPEG", 0, 0, W, H);
  });
  doc.save(`${name}.pdf`);
}