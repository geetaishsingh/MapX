import { normalizeChapterData } from "./chapterData";

const chapterFiles = import.meta.glob("./chapters/*.js", {
  eager: true,
  import: "default",
});

export const SLIDE_DECKS = Object.values(chapterFiles)
  .map(normalizeChapterData)
  .sort((left, right) => Number(left.chapterNumber) - Number(right.chapterNumber));
