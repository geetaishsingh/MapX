import { pptData } from "./pptData";

export const BOOK = {
  brand: "GYAN SETU",
  title: pptData[0].publication,
  subject: pptData[0].subject,
  philosophy: "Empowering interactive classroom learning with modern, presentation-ready slide decks.",
};

export const PALETTES = {
  cosmic: { name: "Cosmic Amethyst & Neon", tag: "DEEP GALAXY", main: "7C3AED", dark: "4C1D95", soft: "FAF5FF", line: "E9D5FF" },
  ocean:  { name: "Ocean Breeze", tag: "AQUA", main: "0284C7", dark: "0C4A6E", soft: "F0F9FF", line: "BAE6FD" },
  sunset: { name: "Sunset Glow", tag: "WARM", main: "EA580C", dark: "9A3412", soft: "FFF7ED", line: "FED7AA" },
};

// Every chapter in pptData becomes a card automatically
export const CHAPTERS = pptData.map((c) => ({
  id: c.id,
  no: c.chapterNumber,
  title: c.chapterName,
  className: c.className,
  subject: c.subject,
  slides: c.slides.length,
  // title slide par description line nahi dikhani, isliye uske points khali kar diye
  raw: c.slides.map((sl) => (sl.type === "title" ? { ...sl, points: [] } : sl)),
  topics: c.slides.filter((s) => s.type === "concept").map((s) => s.title),
}));

export const buildSlides = (ch) => ch.raw;