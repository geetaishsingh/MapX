import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN = 10;  // top and bottom margin on every PDF page, mm

// One DOM element -> A4 PDF. Long pages are cut between questions/sections, never through a line.
export async function elementToPdf(el) {
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  const elW = el.offsetWidth;
  const elH = el.offsetHeight;
  const ratio = canvas.width / elW;                          // canvas px per css px
  const mmToCss = elW / PAGE_W;                              // css px per mm
  const pageHpx = (PAGE_H - 2 * MARGIN) * mmToCss;           // usable css px per PDF page
  const top = el.getBoundingClientRect().top;

  // safe places to cut: start of a section, or start of any question except the first in its list
  const breaks = [...el.querySelectorAll("section, .q:not(:first-child)")]
    .map((n) => n.getBoundingClientRect().top - top)
    .filter((b) => b > 0)
    .sort((a, b) => a - b);

  const pdf = new jsPDF("p", "mm", "a4");

  // Content only slightly taller than one page? Shrink it to fit instead of spilling a few lines onto page 2.
  const overflow = elH / pageHpx;
  if (overflow <= 1.15) {
    const k = Math.min(1, 1 / overflow);          // scale factor, 1 = no shrink
    const w = PAGE_W * k;
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", (PAGE_W - w) / 2, MARGIN, w, (elH * PAGE_W * k) / elW);
    return pdf;
  }

  let start = 0;
  let first = true;
  while (start < elH - 2) {
    let end = Math.min(start + pageHpx, elH);
    if (start + pageHpx < elH) {
      const ok = breaks.filter((b) => b > start + pageHpx * 0.5 && b <= start + pageHpx);
      if (ok.length) end = ok[ok.length - 1];
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

const safe = (s) =>
  String(s || "page")
    .replace(/[<>:"/\\|?*\x00-\x1f_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[. ]+$/g, "")
    .trim();

export async function downloadSinglePdf(el, name) {
  const pdf = await elementToPdf(el);
  pdf.save(`${safe(name)}.pdf`);
}

export async function downloadZip(elements, names, zipName = "worksheets") {
  const zip = new JSZip();
  for (let i = 0; i < elements.length; i++) {
    const pdf = await elementToPdf(elements[i]);
    zip.file(`${safe(names[i])}.pdf`, pdf.output("blob"));
  }
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${safe(zipName)}.zip`);
}