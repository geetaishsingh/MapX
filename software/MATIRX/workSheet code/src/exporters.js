import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN = 3;   // top and bottom margin on every PDF page, mm

// One DOM element -> A4 PDF. Long worksheets are cut between sections/questions, never through a line.
export async function elementToPdf(el) {
  if (document.fonts?.ready) await document.fonts.ready; // wait for Hindi / Sanskrit web fonts
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  const elW = el.offsetWidth;
  const elH = el.offsetHeight;
  const ratio = canvas.width / elW;
  const pageHpx = ((PAGE_H - 2 * MARGIN) * elW) / PAGE_W;
  const top = el.getBoundingClientRect().top;
  const rel = (sel) =>
    [...el.querySelectorAll(sel)].map((n) => n.getBoundingClientRect().top - top).filter((b) => b > 0).sort((a, b) => a - b);

  const safeBreaks = [...rel("section"), ...rel(".q:not(:first-child)")]
    .sort((a, b) => a - b);

  const pdf = new jsPDF("p", "mm", "a4");

  // slightly taller than one page? shrink to fit instead of spilling a few lines onto page 2
  const overflow = elH / pageHpx;
  if (overflow <= 1.12) {
    const k = Math.min(1, 1 / overflow);
    const w = PAGE_W * k;
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", (PAGE_W - w) / 2, MARGIN, w, (elH * PAGE_W * k) / elW);
    return pdf;
  }

  let start = 0;
  let first = true;
  while (start < elH - 2) {
    let end = Math.min(start + pageHpx, elH);
    if (start + pageHpx < elH) {
      const minBreak = start + pageHpx * 0.25;
      const candidates = safeBreaks.filter(
        (b) => b > minBreak && b <= start + pageHpx,
      );
      if (candidates.length) end = candidates[candidates.length - 1];
    }
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = Math.max(1, Math.round((end - start) * ratio));
    slice.getContext("2d").drawImage(canvas, 0, Math.round(start * ratio), canvas.width, slice.height, 0, 0, canvas.width, slice.height);

    if (!first) pdf.addPage();
    first = false;
    pdf.addImage(slice.toDataURL("image/jpeg", 0.95), "JPEG", 0, MARGIN, PAGE_W, ((end - start) * PAGE_W) / elW);
    start = end;
  }
  return pdf;
}

const safe = (s) => String(s || "page").replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "");

export async function downloadSinglePdf(el, name) {
  const pdf = await elementToPdf(el);
  pdf.save(`${safe(name)}.pdf`);
}

export async function downloadZip(elements, names, zipName = "worksheets") {
  const zip = new JSZip();
  for (let i = 0; i < elements.length; i++) {
    const pdf = await elementToPdf(elements[i]);
    zip.file(`${String(i + 1).padStart(2, "0")}_${safe(names[i])}.pdf`, pdf.output("blob"));
  }
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${safe(zipName)}.zip`);
}