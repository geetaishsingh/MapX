export function normalizeChapterData(chapter) {
  const label = chapter?.chapterName || "Untitled chapter";
  const missingMetadata = ["className", "subject", "chapterNumber", "chapterName"]
    .filter((key) => chapter?.[key] === undefined || chapter[key] === null || chapter[key] === "");
  if (missingMetadata.length) {
    throw new Error(`Invalid chapter "${label}": missing ${missingMetadata.join(", ")}.`);
  }
  if (!chapter.slides || typeof chapter.slides !== "object" || Array.isArray(chapter.slides)) {
    throw new Error(`Invalid chapter "${label}": slides must be an object containing slide1, slide2, etc.`);
  }

  const slideEntries = Object.entries(chapter.slides)
    .sort(([left], [right]) => Number(left.replace(/^slide/i, "")) - Number(right.replace(/^slide/i, "")));
  if (!slideEntries.length) throw new Error(`Invalid chapter "${label}": no slides were provided.`);

  const slides = slideEntries.map(([key, slide], index) => {
    const slideLabel = `${label}, ${key}`;
    if (key !== `slide${index + 1}`) {
      throw new Error(`Invalid chapter "${label}": expected slide${index + 1}, received ${key}.`);
    }
    const missing = [];
    if (slide?.slideNumber !== index + 1) missing.push(`slideNumber ${index + 1}`);
    if (!slide?.kind) missing.push("kind");
    if (!slide?.title?.trim()) missing.push("title");
    if (!slide?.tag?.trim()) missing.push("tag");
    if (!Array.isArray(slide?.lines) || !slide.lines.length || slide.lines.some((line) => typeof line !== "string" || !line.trim())) {
      missing.push("lines");
    }
    if (missing.length) throw new Error(`Invalid ${slideLabel}: missing or invalid ${missing.join(", ")}.`);
    return { ...slide };
  });

  const id = String(chapter.chapterNumber);
  return {
    ...chapter,
    id,
    key: `${chapter.className}|${chapter.subject}|${id}`,
    title: chapter.chapterName,
    slides,
  };
}
