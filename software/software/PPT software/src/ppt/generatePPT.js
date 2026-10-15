import pptxgen from "pptxgenjs";
import createPPTSlide from "./createPPTSlide.js";

import { DEFAULT_THEME } from "../data/themes.js";

const buildPPT = async (chapter, theme = DEFAULT_THEME) => {
  const pptx = new pptxgen();

  const effectiveInfo = {
    className: chapter.className || "Class 1",
    subject: chapter.subject || "Science",
    publication: chapter.publication || "GYAN SETU",
    chapterNumber: chapter.chapterNumber,
    chapterName: chapter.chapterName || chapter.title || "",
    motivation: chapter.motivation || "",
    thankYou: chapter.thankYou || "Thank You!",
  };

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = effectiveInfo.publication || "PPT Maker";
  pptx.subject = `${effectiveInfo.subject} - ${chapter.chapterName}`;
  pptx.title = chapter.chapterName;

  // Create chapter slides
  chapter.slides.forEach((slideData) => {
    createPPTSlide(pptx, slideData, theme, effectiveInfo);
  });

  // Thank You slide
  // Only add if chapter slides don't already include one
  const hasThankYou = chapter.slides.some(
    (s) => s.type === "thankYou"
  );

  if (!hasThankYou) {
    createPPTSlide(
      pptx,
      {
        slideNumber: chapter.slides.length + 1,
        type: "thankYou",
        title: "Thank You!",
        content: effectiveInfo.thankYou,
      },
      theme,
      effectiveInfo
    );
  }

  // Generate PPTX as Blob
  const blob = await pptx.write({
    outputType: "blob",
  });

  // File name:
  // Class 1 - Science PPT - Chapter 1.pptx
  const fileName = `${effectiveInfo.className} - ${effectiveInfo.subject} PPT - Chapter ${chapter.chapterNumber}`;

  return {
    blob,
    fileName: `${fileName}.pptx`,
  };
};

export default buildPPT;