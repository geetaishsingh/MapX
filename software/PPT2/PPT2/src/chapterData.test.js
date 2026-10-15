import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { normalizeChapterData } from "./chapterData.js";

const chapterDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "chapters");
const chapterFiles = readdirSync(chapterDirectory).filter((file) => file.endsWith(".js")).sort();
const SLIDE_DECKS = await Promise.all(chapterFiles.map(async (file) => {
  const moduleUrl = pathToFileURL(path.join(chapterDirectory, file));
  return normalizeChapterData((await import(moduleUrl.href)).default);
}));

test("every chapter data file provides complete slide objects in slide-number order", () => {
  assert.equal(SLIDE_DECKS.length, chapterFiles.length);
  assert.ok(SLIDE_DECKS.length > 0);

  for (const chapter of SLIDE_DECKS) {
    assert.ok(chapter.className);
    assert.ok(chapter.subject);
    assert.ok(chapter.chapterName);
    assert.ok(chapter.slides.length > 0);

    for (const [index, slide] of chapter.slides.entries()) {
      assert.equal(slide.slideNumber, index + 1, `${chapter.chapterName} slide number`);
      assert.ok(slide.kind, `${chapter.chapterName}, slide ${index + 1} kind`);
      assert.ok(slide.title.trim(), `${chapter.chapterName}, slide ${index + 1} title`);
      assert.ok(slide.tag.trim(), `${chapter.chapterName}, slide ${index + 1} tag`);
      assert.ok(slide.lines.length > 0, `${chapter.chapterName}, slide ${index + 1} content`);
      assert.ok(slide.lines.every((line) => typeof line === "string" && line.trim()));
    }
  }
});

test("normalizes named slide objects without changing their content", () => {
  const input = {
    className: "Class 4",
    subject: "Mathematics",
    chapterNumber: 3,
    chapterName: "Fractions",
    slides: {
      slide2: { slideNumber: 2, kind: "concept", title: "Equal parts", tag: "Concept", lines: ["A whole split evenly."] },
      slide1: { slideNumber: 1, kind: "cover", title: "Fractions", tag: "Chapter 3", lines: ["Parts of a whole."] },
    },
  };
  const deck = normalizeChapterData(input);

  assert.equal(deck.id, "3");
  assert.equal(deck.title, "Fractions");
  assert.deepEqual(deck.slides.map((slide) => slide.slideNumber), [1, 2]);
  assert.equal(deck.slides[1].lines[0], "A whole split evenly.");
});

test("reports chapter and exact slide key when required slide data is missing", () => {
  assert.throws(
    () => normalizeChapterData({
      className: "Class 1",
      subject: "Science",
      chapterNumber: 2,
      chapterName: "Plants",
      slides: {
        slide1: { slideNumber: 1, kind: "cover", title: "Plants", tag: "Intro", lines: ["Living things."] },
        slide2: { slideNumber: 2, kind: "concept", title: "Needs", tag: "Core", lines: [] },
      },
    }),
    /Invalid Plants, slide2: missing or invalid lines/,
  );
});
