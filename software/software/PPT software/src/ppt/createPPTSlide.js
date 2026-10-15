import { DEFAULT_THEME } from "../data/themes.js";

const FONT = "Poppins";

function createPPTSlide(pptx, data, theme = DEFAULT_THEME, chapterInfo = null) {
  const COLOR_PRIMARY = theme?.ppt?.primary || "4F46E5";
  const COLOR_HEADING = theme?.ppt?.heading || "111827";
  const COLOR_BODY = theme?.ppt?.body || "374151";
  const COLOR_MUTED = theme?.ppt?.muted || "6B7280";
  const BG_CARD = theme?.ppt?.cardBg || "F8FAFC";
  const BORDER_CARD = theme?.ppt?.cardBorder || "E2E8F0";
  const BG_ACCENT = theme?.ppt?.accent || "EEF2FF";
  const BORDER_ACCENT = theme?.ppt?.accentBorder || "C7D2FE";
  const TITLE_PURPLE = "7C3AED";
  const TITLE_LAVENDER = "FAF5FF";
  const TITLE_BORDER = "E9D5FF";

  const slide = pptx.addSlide();

  slide.background = {
    color: "FFFFFF",
  };

  // Top brand accent stripe across top of slide
  const topBarH = data.type === "title" ? 0.16 : 0.10;
  const topBarColor = data.type === "title" ? TITLE_PURPLE : COLOR_PRIMARY;
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 13.33,
    h: topBarH,
    fill: { color: topBarColor },
    line: { color: topBarColor },
  });

  // Secondary fine accent ribbon underneath
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: topBarH,
    w: 13.33,
    h: 0.03,
    fill: { color: data.type === "title" ? TITLE_BORDER : BORDER_ACCENT },
    line: { color: data.type === "title" ? TITLE_BORDER : BORDER_ACCENT },
  });

  // Presentation deck footer watermark (on all content slides)
  if (data.type !== "title") {
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 7.02,
      w: 11.73,
      h: 0.015,
      fill: { color: BORDER_CARD },
      line: { color: BORDER_CARD },
    });

    const pubName = chapterInfo?.publication || "";
    const subName = chapterInfo?.subject || "";
    const footerLabel = [pubName, subName].filter(Boolean).join("  •  ");

    if (footerLabel) {
      slide.addText(footerLabel, {
        x: 0.8,
        y: 7.05,
        w: 8.5,
        h: 0.32,
        fontFace: FONT,
        fontSize: 9.5,
        color: COLOR_MUTED,
        valign: "middle",
      });
    }

    if (data.slideNumber) {
      slide.addText(`Slide ${data.slideNumber}`, {
        x: 10.03,
        y: 7.05,
        w: 2.5,
        h: 0.32,
        fontFace: FONT,
        fontSize: 9.5,
        bold: true,
        color: COLOR_PRIMARY,
        align: "right",
        valign: "middle",
      });
    }
  }

  // Universal clean header: title + accent underline (never overlaps content)
  const addHeader = (title, subtitle = null) => {
    if (!title) return;

    slide.addText(title, {
      x: 0.8,
      y: 0.40,
      w: 11.73,
      h: 0.58,
      fontFace: FONT,
      fontSize: 26,
      bold: true,
      color: COLOR_PRIMARY,
      valign: "middle",
    });

    // Colored underline accent bar
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.05,
      w: 1.2,
      h: 0.05,
      fill: { color: COLOR_PRIMARY },
      line: { color: COLOR_PRIMARY },
    });

    // Optional topic badge pill positioned safely next to the underline bar
    if (subtitle) {
      slide.addText(subtitle.toUpperCase(), {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 2.2,
        y: 0.92,
        w: 3.4,
        h: 0.32,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1 },
        fontFace: FONT,
        fontSize: 10.5,
        bold: true,
        color: COLOR_PRIMARY,
        align: "center",
        valign: "middle",
      });
    }
  };

  // =========================================================================
  // 1. TITLE SLIDE
  // =========================================================================
  if (data.type === "title") {
    const className = data.className || chapterInfo?.className || "";
    const subjectName = data.subject || chapterInfo?.subject || "";
    const chapterNumber = data.chapterNumber ?? chapterInfo?.chapterNumber ?? null;

    const classSubjectText = [className, subjectName].filter(Boolean).join(" - ");

    // Outer frame
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 0.5,
      w: 11.73,
      h: 6.4,
      fill: { color: "FFFFFF" },
      line: { color: TITLE_BORDER, width: 1 },
    });

    // Short underline above the wider bottom accent bar
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 5.15,
      y: 6.42,
      w: 3.02,
      h: 0.065,
      fill: { color: TITLE_PURPLE },
      line: { color: TITLE_PURPLE },
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 3.65,
      y: 6.6,
      w: 6.02,
      h: 0.1,
      fill: { color: TITLE_PURPLE },
      line: { color: TITLE_PURPLE },
    });

    slide.addText("GYAN SETU", {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 4.0,
      y: 0.95,
      w: 5.35,
      h: 0.54,
      fill: { color: TITLE_LAVENDER },
      line: { color: TITLE_BORDER, width: 1 },
      fontFace: FONT,
      fontSize: 17,
      bold: true,
      color: TITLE_PURPLE,
      align: "center",
      valign: "middle",
    });

    if (classSubjectText) {
      slide.addText(classSubjectText, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 3.8,
        y: 3.05,
        w: 5.74,
        h: 0.54,
        fill: { color: TITLE_LAVENDER },
        line: { color: TITLE_BORDER, width: 1 },
        fontFace: FONT,
        fontSize: 13,
        bold: true,
        color: TITLE_PURPLE,
        align: "center",
        valign: "middle",
      });
    }

    if (chapterNumber) {
      slide.addText(`Chapter ${chapterNumber}`, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 4.6,
        y: 4.04,
        w: 4.1,
        h: 0.54,
        fill: { color: TITLE_LAVENDER },
        line: { color: TITLE_BORDER, width: 1 },
        fontFace: FONT,
        fontSize: 13,
        bold: true,
        color: TITLE_PURPLE,
        align: "center",
        valign: "middle",
      });
    }

    slide.addText(data.title, {
      x: 1,
      y: 5.3,
      w: 11.33,
      h: 0.72,
      fontFace: FONT,
      fontSize: 38,
      bold: true,
      color: "581C9E",
      align: "center",
      valign: "middle",
    });

    return slide;
  }

  // =========================================================================
  // 1b. STORY & POEM
  // =========================================================================
  if (data.type === "story" || data.type === "poem") {
    const subtitle = data.type === "poem" ? "Poem" : "Story";
    addHeader(data.title, subtitle);

    const points =
      data.points ||
      data.lines ||
      data.stanzas ||
      (Array.isArray(data.content) ? data.content : []);
    const leadText = typeof data.content === "string" ? data.content : "";

    let curY = 1.45;
    if (leadText) {
      slide.addText(leadText, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: curY,
        w: 11.73,
        h: points.length > 0 ? 0.85 : 2.5,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: points.length > 0 ? 16 : 18,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
        margin: [16, 16, 8, 8],
      });
      curY += (points.length > 0 ? 0.85 : 2.5) + 0.2;
    }

    const count = points.length;
    if (count <= 4) {
      const boxH = count <= 3 ? 1.05 : 0.9;
      const gap = 0.2;

      points.forEach((pt, idx) => {
        const isObj = typeof pt === "object" && pt !== null;
        const text = isObj ? pt.text || pt.line || pt.description || "" : String(pt);
        const title = isObj ? pt.title || pt.heading || null : null;

        const runs = [
          { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
        ];
        if (title) runs.push({ text: `${title}: `, options: { bold: true, color: COLOR_HEADING, fontSize: 16 } });
        runs.push({ text, options: { color: COLOR_BODY, fontSize: 15 } });

        slide.addText(runs, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: curY + idx * (boxH + gap),
          w: 11.73,
          h: boxH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [20, 20, 10, 10],
        });
      });
    } else {
      const numRows = Math.ceil(count / 2);
      const colW = 5.7;
      const boxH = numRows >= 4 ? 0.9 : 1.05;
      const gapY = 0.2;

      points.forEach((pt, idx) => {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        const boxX = col === 0 ? 0.8 : 6.83;
        const boxY = curY + row * (boxH + gapY);

        const isObj = typeof pt === "object" && pt !== null;
        const text = isObj ? pt.text || pt.line || pt.description || "" : String(pt);
        const title = isObj ? pt.title || pt.heading || null : null;

        const runs = [
          { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
        ];
        if (title) runs.push({ text: `${title}: `, options: { bold: true, color: COLOR_HEADING, fontSize: 15 } });
        runs.push({ text, options: { color: COLOR_BODY, fontSize: 14 } });

        slide.addText(runs, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: boxX,
          y: boxY,
          w: colW,
          h: boxH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [18, 16, 8, 8],
        });
      });
    }

    return slide;
  }

  // =========================================================================
  // 2. BEFORE YOU READ / READING FOR MEANING / DISCUSSION / THINK & SPEAK / TALE TALK / ORAL QUIZ / THINK & WRITE / CHAT TIME
  // =========================================================================
  if (
    data.type === "readingForMeaning" ||
    data.type === "beforeYouRead" ||
    data.type === "thinkAndAnswer" ||
    data.type === "speakAndShare" ||
    data.type === "discussion" ||
    data.type === "taleTalk" ||
    data.type === "oralQuiz" ||
    data.type === "thinkAndWrite" ||
    data.type === "chatTime"
  ) {
    const subtitle =
      data.type === "readingForMeaning"
        ? "Reading for Meaning"
        : data.type === "beforeYouRead"
        ? "Pre-Reading"
        : data.type === "speakAndShare"
        ? "Speaking"
        : data.type === "thinkAndWrite"
        ? "Writing"
        : data.type === "taleTalk"
        ? "Tale Talk"
        : data.type === "oralQuiz"
        ? "Oral Quiz"
        : null;
    addHeader(data.title, subtitle);

    const questions =
      data.questions ||
      data.discussion ||
      data.activities ||
      data.situations ||
      data.items ||
      (Array.isArray(data.content) ? data.content : []);
    const count = questions.length;

    let startY = 1.45;
    if (typeof data.content === "string" && data.content) {
      const leadH = count > 0 ? 0.85 : 2.5;
      slide.addText(data.content, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: startY,
        w: 11.73,
        h: leadH,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: count > 0 ? 16 : 19,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
        margin: [16, 16, 8, 8],
      });
      startY += leadH + 0.2;
    }

    if (count <= 3 && count > 0) {
      const boxH = 1.05;
      const gap = 0.25;
      let curY = startY;

      questions.forEach((q, idx) => {
        const textStr = typeof q === "string" ? q : q.text || "";
        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
            { text: textStr, options: { color: COLOR_BODY, fontSize: 17 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [22, 20, 10, 10],
          }
        );

        curY += boxH + gap;
      });

      if (data.activity && typeof data.activity === "string") {
        slide.addText(data.activity, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: Math.max(curY + 0.1, 5.2),
          w: 11.73,
          h: 0.85,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1.5 },
          fontFace: FONT,
          fontSize: 16,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
          margin: [20, 20, 10, 10],
        });
      }
    } else if (count > 3) {
      const numRows = Math.ceil(count / 2);
      const colW = 5.7;
      const gapY = 0.18;
      const hasBottomActivity = Boolean(data.activity && typeof data.activity === "string");
      const maxAvailableH = (7.1 - startY) - (hasBottomActivity ? 0.9 : 0);
      const boxH = Math.min(1.2, Math.max(0.65, (maxAvailableH - (numRows - 1) * gapY) / numRows));

      questions.forEach((q, idx) => {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        const boxX = col === 0 ? 0.8 : 6.83;
        const boxY = startY + row * (boxH + gapY);
        const textStr = typeof q === "string" ? q : q.text || "";

        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: boxH < 0.9 ? 13 : 15 } },
            { text: textStr, options: { color: COLOR_BODY, fontSize: boxH < 0.9 ? 13 : 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: boxX,
            y: boxY,
            w: colW,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [16, 16, 8, 8],
          }
        );
      });

      if (hasBottomActivity) {
        const activityY = startY + numRows * (boxH + gapY);
        slide.addText(data.activity, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: Math.min(activityY + 0.05, 6.25),
          w: 11.73,
          h: 0.75,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1.5 },
          fontFace: FONT,
          fontSize: 15,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
          margin: [16, 16, 8, 8],
        });
      }
    } else if (count === 0 && data.activity && typeof data.activity === "string") {
      slide.addText(data.activity, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: startY,
        w: 11.73,
        h: 1.5,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 18,
        bold: true,
        color: COLOR_PRIMARY,
        align: "center",
        valign: "middle",
        margin: [20, 20, 10, 10],
      });
    }

    return slide;
  }

  // =========================================================================
  // 3. TYPES OF PLANTS / CATEGORIES / GROUPS
  // =========================================================================
  if (
    data.type === "typesOfPlants" ||
    data.type === "categories" ||
    data.type === "groups" ||
    Boolean(data.categories)
  ) {
    addHeader(data.title || "Types & Categories");

    const categories = data.categories || data.groups || data.items || [];
    const count = categories.length;

    if (count === 2) {
      // 2 balanced, perfectly centered cards (e.g. Special Types of Plants, Climbers & Creepers)
      const colW = 5.6;
      const cardH = 3.9;
      const startY = 1.8;

      categories.forEach((cat, idx) => {
        const cardX = idx === 0 ? 0.8 : 6.93;

        // Outer Card container
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: cardX,
          y: startY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
        });

        // Category Name Pill (with safe 0.4" inset so it never pokes out of rounded corners)
        slide.addText(cat.name || cat.title || `Type ${idx + 1}`, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX + 0.4,
          y: startY + 0.35,
          w: colW - 0.8,
          h: 0.55,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1 },
          fontFace: FONT,
          fontSize: 18,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
        });

        // Description
        slide.addText(cat.description || cat.content || "", {
          x: cardX + 0.4,
          y: startY + 1.1,
          w: colW - 0.8,
          h: 1.5,
          fontFace: FONT,
          fontSize: 15,
          color: COLOR_BODY,
          align: "center",
          valign: "middle",
          lineSpacingMultiple: 1.3,
        });

        // Examples Pill Box (cleanly placed directly under description)
        if (cat.examples && cat.examples.length > 0) {
          slide.addText(
            [
              { text: "Examples:  ", options: { bold: true, color: COLOR_PRIMARY, fontSize: 14 } },
              { text: cat.examples.join(", "), options: { bold: true, color: COLOR_HEADING, fontSize: 14 } },
            ],
            {
              shape: pptx.shapes.ROUNDED_RECTANGLE,
              x: cardX + 0.4,
              y: startY + 2.8,
              w: colW - 0.8,
              h: 0.72,
              fill: { color: "FFFFFF" },
              line: { color: BORDER_ACCENT, width: 1 },
              fontFace: FONT,
              align: "center",
              valign: "middle",
            }
          );
        }
      });
    } else if (count === 3) {
      // 3 cards side by side (e.g. Trees, Shrubs, Herbs)
      const colW = 3.7;
      const cardH = 4.6;
      const startY = 1.55;

      categories.forEach((cat, idx) => {
        const cardX = 0.8 + idx * (colW + 0.31);

        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: cardX,
          y: startY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
        });

        slide.addText(cat.name || cat.title || `Type ${idx + 1}`, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX + 0.25,
          y: startY + 0.25,
          w: colW - 0.5,
          h: 0.52,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1 },
          fontFace: FONT,
          fontSize: 16,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
        });

        slide.addText(cat.description || cat.content || "", {
          x: cardX + 0.25,
          y: startY + 0.95,
          w: colW - 0.5,
          h: 2.2,
          fontFace: FONT,
          fontSize: 14,
          color: COLOR_BODY,
          align: "left",
          valign: "top",
          lineSpacingMultiple: 1.25,
        });

        if (cat.examples && cat.examples.length > 0) {
          slide.addText(
            [
              { text: "Examples:\n", options: { bold: true, color: COLOR_PRIMARY, fontSize: 12 } },
              { text: cat.examples.join(", "), options: { bold: true, color: COLOR_HEADING, fontSize: 13 } },
            ],
            {
              shape: pptx.shapes.ROUNDED_RECTANGLE,
              x: cardX + 0.25,
              y: startY + 3.45,
              w: colW - 0.5,
              h: 0.85,
              fill: { color: "FFFFFF" },
              line: { color: BORDER_ACCENT, width: 1 },
              fontFace: FONT,
              align: "center",
              valign: "middle",
            }
          );
        }
      });
    } else {
      // 4+ categories in 2-column grid
      const colW = 5.7;
      const cardH = 2.4;
      const startY = 1.45;
      const gapY = 0.3;

      categories.forEach((cat, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cardX = col === 0 ? 0.8 : 6.83;
        const cardY = startY + row * (cardH + gapY);

        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
        });

        slide.addText(
          [
            { text: `${cat.name || cat.title}\n`, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
            { text: `${cat.description || ""}\n\n`, options: { color: COLOR_BODY, fontSize: 13 } },
            {
              text: cat.examples ? `Examples: ${cat.examples.join(", ")}` : "",
              options: { bold: true, color: COLOR_MUTED, fontSize: 12 },
            },
          ],
          {
            x: cardX + 0.3,
            y: cardY + 0.2,
            w: colW - 0.6,
            h: cardH - 0.4,
            fontFace: FONT,
            valign: "top",
          }
        );
      });
    }

    return slide;
  }

  // =========================================================================
  // 3b. ANIMAL HOMES
  // =========================================================================
  if (data.type === "animalHomes" && data.homes) {
    addHeader(data.title || "Homes of Animals");
    const homes = data.homes || [];
    const count = homes.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = 0.85;
    const gapY = 0.2;
    const startY = 1.5;

    homes.forEach((item, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: cardY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      slide.addText(
        [
          { text: `${idx + 1}.  ${item.animal} `, options: { bold: true, color: COLOR_HEADING, fontSize: 16 } },
          { text: "  ➔  ", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
          { text: item.home, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
        ],
        {
          x: cardX + 0.3,
          y: cardY,
          w: colW - 0.6,
          h: cardH,
          fontFace: FONT,
          valign: "middle",
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 4. PLANT PARTS / BODY PARTS / BODY FUNCTIONS / SENSE ORGANS
  // =========================================================================
  if (
    data.type === "plantParts" ||
    data.type === "parts" ||
    data.type === "bodyParts" ||
    data.type === "bodyFunctions" ||
    data.type === "senseOrgans" ||
    Boolean(data.parts) ||
    Boolean(data.functions) ||
    Boolean(data.organs)
  ) {
    addHeader(data.title || "Parts & Functions");

    let startY = 1.45;
    if (data.introduction) {
      slide.addText(data.introduction, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: startY,
        w: 11.73,
        h: 0.85,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 16,
        color: COLOR_BODY,
        align: "left",
        valign: "middle",
        margin: [20, 20, 10, 10],
      });
      startY += 1.05;
    }

    const parts = data.parts || data.functions || data.organs || data.components || [];
    const count = parts.length;

    // Case 1: Simple list of strings (e.g. 16 body parts)
    if (count > 0 && typeof parts[0] === "string") {
      const numCols = 4;
      const colW = 2.72;
      const cardH = 0.68;
      const gapX = 0.28;
      const gapY = 0.22;

      parts.forEach((str, idx) => {
        const col = idx % numCols;
        const row = Math.floor(idx / numCols);
        const cardX = 0.8 + col * (colW + gapX);
        const cardY = startY + row * (cardH + gapY);

        slide.addText(
          [
            { text: `${idx + 1}. `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 14 } },
            { text: str, options: { bold: true, color: COLOR_HEADING, fontSize: 14 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: cardX,
            y: cardY,
            w: colW,
            h: cardH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "center",
            valign: "middle",
          }
        );
      });

      return slide;
    }

    // Case 2: Array of objects (name + description, part + description, organ + function)
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = numRows >= 4 ? 0.85 : 1.05;
    const gapY = 0.2;

    parts.forEach((part, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      const isObj = typeof part === "object" && part !== null;
      const name = isObj ? part.name || part.part || part.organ || part.title : `Item ${idx + 1}`;
      const desc = isObj ? part.description || part.function || part.text || "" : "";

      slide.addText(
        [
          { text: `${idx + 1}.  ${name} :  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
          { text: desc, options: { color: COLOR_BODY, fontSize: 14 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [18, 16, 8, 8],
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 5. PLANT CYCLE / PROCESS / LIFECYCLE
  // =========================================================================
  if (
    data.type === "plantCycle" ||
    data.type === "cycle" ||
    data.type === "process" ||
    data.type === "lifecycle"
  ) {
    addHeader(data.title || "Cycle & Process");

    const steps = data.steps || data.stages || [];
    const stepCount = steps.length;
    const startY = 1.6;

    if (stepCount > 0) {
      const bubbleW = (11.73 - (stepCount - 1) * 0.4) / stepCount;
      const bubbleH = 1.1;

      steps.forEach((step, idx) => {
        const bX = 0.8 + idx * (bubbleW + 0.4);

        slide.addText(
          [
            { text: `Step ${idx + 1}\n`, options: { bold: true, color: COLOR_PRIMARY, fontSize: 12 } },
            { text: step, options: { bold: true, color: COLOR_HEADING, fontSize: 14 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: bX,
            y: startY,
            w: bubbleW,
            h: bubbleH,
            fill: { color: BG_CARD },
            line: { color: COLOR_PRIMARY, width: 1.5 },
            fontFace: FONT,
            align: "center",
            valign: "middle",
          }
        );

        if (idx < stepCount - 1) {
          slide.addText("→", {
            x: bX + bubbleW,
            y: startY,
            w: 0.4,
            h: bubbleH,
            fontFace: FONT,
            fontSize: 22,
            bold: true,
            color: COLOR_PRIMARY,
            align: "center",
            valign: "middle",
          });
        }
      });
    }

    if (data.content) {
      slide.addText(data.content, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 1.2,
        y: 3.3,
        w: 10.93,
        h: 2.8,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 18,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
        margin: [28, 28, 16, 16],
        lineSpacingMultiple: 1.35,
      });
    }

    return slide;
  }

  // =========================================================================
  // 6. MIND MAP / CONCEPT MAP
  // =========================================================================
  if (data.type === "mindMap" || data.type === "conceptMap") {
    addHeader(data.title || "Mind Map");

    let startY = 1.45;
    if (data.centralTopic) {
      slide.addText(`Central Topic: ${data.centralTopic}`, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 3.66,
        y: startY,
        w: 6.0,
        h: 0.6,
        fill: { color: BG_ACCENT },
        line: { color: COLOR_PRIMARY, width: 1.5 },
        fontFace: FONT,
        fontSize: 16,
        bold: true,
        color: COLOR_PRIMARY,
        align: "center",
        valign: "middle",
      });
      startY += 0.85;
    }

    const points = data.points || data.items || [];
    const count = points.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = 0.95;
    const gapY = 0.22;

    points.forEach((point, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      slide.addText(
        [
          { text: `•  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 18 } },
          { text: point, options: { color: COLOR_BODY, fontSize: 15 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [20, 16, 8, 8],
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 7. PRACTICE (SECTIONS / FILL IN THE BLANKS / CLASSIFICATION)
  // =========================================================================
  if (data.type === "practice" || data.type === "exercises" || Boolean(data.sections)) {
    addHeader(data.title || "Let's Practise");

    const sections = data.sections || [];
    let curY = 1.45;

    sections.forEach((sec) => {
      if (sec.type === "fillInTheBlanks") {
        if (sec.wordBox) {
          slide.addText(`Word Box:  ${sec.wordBox.join("   •   ")}`, {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: 0.58,
            fill: { color: BG_ACCENT },
            line: { color: BORDER_ACCENT, width: 1.5 },
            fontFace: FONT,
            fontSize: 15,
            bold: true,
            color: COLOR_PRIMARY,
            align: "center",
            valign: "middle",
          });
          curY += 0.72;
        }

        (sec.questions || []).forEach((q, qIdx) => {
          slide.addText(
            [
              { text: `${qIdx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
              { text: q, options: { color: COLOR_BODY, fontSize: 15 } },
            ],
            {
              shape: pptx.shapes.ROUNDED_RECTANGLE,
              x: 0.8,
              y: curY,
              w: 11.73,
              h: 0.58,
              fill: { color: BG_CARD },
              line: { color: BORDER_CARD, width: 1 },
              fontFace: FONT,
              align: "left",
              valign: "middle",
              margin: [18, 16, 6, 6],
            }
          );
          curY += 0.7;
        });
      }

      if (sec.type === "classification") {
        curY += 0.15;
        if (sec.instruction) {
          slide.addText(sec.instruction, {
            x: 0.8,
            y: curY,
            w: 11.73,
            h: 0.45,
            fontFace: FONT,
            fontSize: 15,
            bold: true,
            color: COLOR_HEADING,
          });
          curY += 0.5;
        }

        const items = sec.items || [];
        const itemW = (11.73 - (items.length - 1) * 0.3) / items.length;

        items.forEach((it, itIdx) => {
          const itX = 0.8 + itIdx * (itemW + 0.3);
          slide.addText(`${it}\n[     ]`, {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: itX,
            y: curY,
            w: itemW,
            h: 0.85,
            fill: { color: BG_CARD },
            line: { color: COLOR_PRIMARY, width: 1.5 },
            fontFace: FONT,
            fontSize: 15,
            bold: true,
            color: COLOR_BODY,
            align: "center",
            valign: "middle",
          });
        });
        curY += 1.05;
      }
    });

    return slide;
  }

  // =========================================================================
  // 8. WORD SEARCH
  // =========================================================================
  if (data.type === "wordSearch") {
    addHeader(data.title || "Word Search");

    let curY = 1.5;
    if (data.instruction) {
      slide.addText(data.instruction, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: curY,
        w: 11.73,
        h: 0.8,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 18,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
      });
      curY += 1.1;
    }

    const answers = data.answers || data.words || [];
    if (answers.length > 0) {
      slide.addText("Hidden Words to Find:", {
        x: 0.8,
        y: curY,
        w: 11.73,
        h: 0.4,
        fontFace: FONT,
        fontSize: 16,
        bold: true,
        color: COLOR_PRIMARY,
      });
      curY += 0.5;

      const colW = (11.73 - (answers.length - 1) * 0.3) / answers.length;
      answers.forEach((ans, idx) => {
        const cardX = 0.8 + idx * (colW + 0.3);
        slide.addText(ans, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: curY,
          w: colW,
          h: 0.85,
          fill: { color: BG_CARD },
          line: { color: COLOR_PRIMARY, width: 1.5 },
          fontFace: FONT,
          fontSize: 17,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
        });
      });
    }

    return slide;
  }

  // =========================================================================
  // 9. HOTS (HIGHER ORDER THINKING SKILLS)
  // =========================================================================
  if (data.type === "hots") {
    addHeader(data.title || "HOTS - Higher Order Thinking");

    const questions = data.questions || [];
    let curY = 1.6;

    questions.forEach((q, idx) => {
      slide.addText(
        [
          { text: `Thinking Challenge ${idx + 1}\n\n`, options: { bold: true, color: COLOR_PRIMARY, fontSize: 18 } },
          { text: q, options: { bold: true, color: COLOR_HEADING, fontSize: 22 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 1.2,
          y: curY,
          w: 10.93,
          h: 2.5,
          fill: { color: BG_ACCENT },
          line: { color: COLOR_PRIMARY, width: 2 },
          fontFace: FONT,
          align: "center",
          valign: "middle",
          margin: [24, 24, 16, 16],
          lineSpacingMultiple: 1.3,
        }
      );
      curY += 2.8;
    });

    return slide;
  }

  // =========================================================================
  // 10. LIFE SKILLS
  // =========================================================================
  if (data.type === "lifeSkills" || data.type === "lifeSkill") {
    addHeader(data.title || "Life Skill");

    let curY = 1.5;
    const leadText = data.activity || (typeof data.content === "string" ? data.content : "");
    if (leadText) {
      slide.addText(leadText, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: curY,
        w: 11.73,
        h: 0.85,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 18,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
      });
      curY += 1.15;
    }

    const questions = data.questions || [];
    if (questions.length > 0) {
      const boxH = 0.85;
      const gap = 0.2;
      questions.forEach((q, idx) => {
        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
            { text: q, options: { color: COLOR_BODY, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [20, 18, 8, 8],
          }
        );
        curY += boxH + gap;
      });
      return slide;
    }

    const parts = data.parts || data.skills || [];
    if (parts.length > 0) {
      const pW = (11.73 - (parts.length - 1) * 0.3) / parts.length;

      parts.forEach((p, idx) => {
        const pX = 0.8 + idx * (pW + 0.3);
        slide.addText(p, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: pX,
          y: curY,
          w: pW,
          h: 0.85,
          fill: { color: BG_CARD },
          line: { color: COLOR_PRIMARY, width: 1.5 },
          fontFace: FONT,
          fontSize: 16,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
        });
      });
    }

    return slide;
  }

  // =========================================================================
  // 11. EXPLORE MORE
  // =========================================================================
  if (data.type === "exploreMore") {
    addHeader(data.title || "Explore More");

    const acts = data.activities || data.items || [];
    let curY = 1.5;

    acts.forEach((act, idx) => {
      slide.addText(
        [
          { text: `Project ${idx + 1}:  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
          { text: act, options: { color: COLOR_BODY, fontSize: 16 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: curY,
          w: 11.73,
          h: 1.25,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [22, 20, 10, 10],
        }
      );
      curY += 1.55;
    });

    return slide;
  }

  // =========================================================================
  // 12. TEACHER'S NOTE
  // =========================================================================
  if (data.type === "teacherNote") {
    addHeader(data.title || "Teacher's Note");

    slide.addText(data.content, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 1.2,
      y: 1.6,
      w: 10.93,
      h: 4.8,
      fill: { color: BG_ACCENT },
      line: { color: COLOR_PRIMARY, width: 2 },
      fontFace: FONT,
      fontSize: 20,
      color: COLOR_BODY,
      align: "center",
      valign: "middle",
      margin: [32, 32, 20, 20],
      lineSpacingMultiple: 1.4,
    });

    return slide;
  }

  // =========================================================================
  // 13. COMPARISON / DIFFERENCES
  // =========================================================================
  if (data.type === "comparison" || data.type === "differences") {
    addHeader(data.title || "Key Differences");

    const col1 = data.column1 || data.left || { title: "Category 1", items: [] };
    const col2 = data.column2 || data.right || { title: "Category 2", items: [] };

    const colW = 5.7;
    const colH = 4.9;
    const startY = 1.45;

    // Left Column Header
    slide.addText(col1.title, {
      shape: pptx.shapes.RECTANGLE,
      x: 0.8,
      y: startY,
      w: colW,
      h: 0.55,
      fill: { color: COLOR_PRIMARY },
      line: { color: COLOR_PRIMARY },
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
    });

    // Left Column Body
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: startY + 0.55,
      w: colW,
      h: colH - 0.55,
      fill: { color: BG_CARD },
      line: { color: BORDER_CARD, width: 1.5 },
    });

    const col1Text = (col1.items || []).map((it, idx) => `${idx + 1}.  ${it}`).join("\n\n");
    slide.addText(col1Text, {
      x: 1.05,
      y: startY + 0.75,
      w: colW - 0.5,
      h: colH - 0.95,
      fontFace: FONT,
      fontSize: 15,
      color: COLOR_BODY,
      valign: "top",
    });

    // Right Column Header
    slide.addText(col2.title, {
      shape: pptx.shapes.RECTANGLE,
      x: 6.83,
      y: startY,
      w: colW,
      h: 0.55,
      fill: { color: COLOR_PRIMARY },
      line: { color: COLOR_PRIMARY },
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
    });

    // Right Column Body
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 6.83,
      y: startY + 0.55,
      w: colW,
      h: colH - 0.55,
      fill: { color: BG_CARD },
      line: { color: BORDER_CARD, width: 1.5 },
    });

    const col2Text = (col2.items || []).map((it, idx) => `${idx + 1}.  ${it}`).join("\n\n");
    slide.addText(col2Text, {
      x: 7.08,
      y: startY + 0.75,
      w: colW - 0.5,
      h: colH - 0.95,
      fontFace: FONT,
      fontSize: 15,
      color: COLOR_BODY,
      valign: "top",
    });

    return slide;
  }

  // =========================================================================
  // 14. VOCABULARY / KEY TERMS / DEFINITIONS / MAGIC WORDS
  // =========================================================================
  if (
    data.type === "vocabulary" ||
    data.type === "keyTerms" ||
    data.type === "definitions" ||
    data.type === "magicWords"
  ) {
    addHeader(data.title || (data.type === "magicWords" ? "Magic Words" : "New Words"));

    let startY = 1.45;

    if (data.activities && data.activities.length > 0) {
      data.activities.forEach((act) => {
        slide.addText(act, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: startY,
          w: 11.73,
          h: 0.65,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1.5 },
          fontFace: FONT,
          fontSize: 16,
          bold: true,
          color: COLOR_PRIMARY,
          align: "left",
          valign: "middle",
          margin: [18, 18, 10, 10],
        });
        startY += 0.8;
      });
      startY += 0.2;
    }

    const rawWords =
      data.words ||
      data.terms ||
      data.definitions ||
      data.items ||
      (data.matching
        ? data.matching.map((m) =>
            Array.isArray(m)
              ? { word: m[0], meaning: m[1] }
              : { word: m.word || m.term, meaning: m.meaning || m.definition }
          )
        : []);
    const words = Array.isArray(rawWords) ? rawWords : [];
    const isObjects =
      words.length > 0 && typeof words[0] === "object" && words[0] !== null;

    if (isObjects) {
      const colW = 5.7;
      const cardH = 0.95;
      const gapY = 0.25;

      words.forEach((item, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const cardX = col === 0 ? 0.8 : 6.83;
        const cardY = startY + row * (cardH + gapY);

        const word = item.word || item.term || item.title || "";
        const meaning = item.use || item.meaning || item.definition || item.description || "";

        slide.addText(
          [
            {
              text: `${word} :  `,
              options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 },
            },
            {
              text: meaning,
              options: { color: COLOR_BODY, fontSize: 15 },
            },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: cardX,
            y: cardY,
            w: colW,
            h: cardH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [22, 20, 10, 10],
          }
        );
      });
    } else {
      const colW = 2.7;
      const cardH = 0.85;
      const gapX = 0.3;
      const gapY = 0.3;

      words.forEach((word, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const cardX = 0.8 + col * (colW + gapX);
        const cardY = startY + row * (cardH + gapY);
        const wordText = typeof word === "string" ? word : word.word || word.term || "";

        slide.addText(wordText, {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_ACCENT },
          line: { color: BORDER_ACCENT, width: 1.5 },
          fontFace: FONT,
          fontSize: 18,
          bold: true,
          color: COLOR_PRIMARY,
          align: "center",
          valign: "middle",
          margin: [12, 12, 8, 8],
        });
      });
    }

    return slide;
  }

  // =========================================================================
  // 15. READING COMPREHENSION / QUIZ / QUESTIONS
  // =========================================================================
  if (
    data.type === "readingComprehension" ||
    data.type === "quiz" ||
    data.type === "questions" ||
    (data.type === "activity" && Array.isArray(data.questions))
  ) {
    addHeader(data.title || "Check Your Understanding");

    const questions =
      data.questions || data.quiz || data.exercises || data.items || [];
    const cardW = 5.7;
    const cardH = 2.65;
    const startY = 1.45;
    const gapX = 0.33;
    const gapY = 0.30;

    questions.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const cardX = col === 0 ? 0.8 : 0.8 + cardW + gapX;
      const cardY = startY + row * (cardH + gapY);

      const isObj = typeof item === "object" && item !== null;
      const questionText = isObj ? item.question || item.q : item;
      const options = isObj ? item.options || item.choices || [] : [];

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        fill: { color: "FFFFFF" },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      slide.addText(
        [
          { text: `Q${index + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 14 } },
          { text: questionText, options: { bold: true, color: COLOR_HEADING, fontSize: 14 } },
        ],
        {
          x: cardX + 0.25,
          y: cardY + 0.18,
          w: cardW - 0.5,
          h: 0.65,
          fontFace: FONT,
          align: "left",
          valign: "top",
          margin: [6, 6, 4, 4],
        }
      );

      const optW = (cardW - 0.6) / 2;
      const optH = 0.68;
      const optStartY = cardY + 0.95;
      const optGapY = 0.18;
      const optGapX = 0.2;

      options.forEach((opt, optIdx) => {
        const oCol = optIdx % 2;
        const oRow = Math.floor(optIdx / 2);
        const optX = cardX + 0.2 + oCol * (optW + optGapX);
        const optY = optStartY + oRow * (optH + optGapY);
        const letter = String.fromCharCode(65 + optIdx);

        slide.addText(
          [
            { text: `${letter}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 13 } },
            { text: opt, options: { color: COLOR_BODY, fontSize: 13 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: optX,
            y: optY,
            w: optW,
            h: optH,
            fill: { color: BG_ACCENT },
            line: { color: BORDER_ACCENT, width: 1 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [14, 10, 6, 6],
          }
        );
      });
    });

    return slide;
  }

  // =========================================================================
  // 16. GRAMMAR / FORMULA / RULE
  // =========================================================================
  if (data.type === "grammar" || data.type === "formula" || data.type === "rule") {
    addHeader(data.title, data.topic);

    const ruleText =
      data.definition ||
      data.formula ||
      data.rule ||
      (typeof data.content === "string" ? data.content : "");
    const examples = data.examples || [];
    const practice = data.practice || data.exercises || [];

    if (ruleText) {
      slide.addText(ruleText, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: 1.45,
        w: 11.73,
        h: 0.95,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 16,
        color: COLOR_BODY,
        align: "left",
        valign: "middle",
        margin: [22, 20, 10, 10],
      });
    }

    const colW = 5.7;
    const colH = 4.1;
    const colY = ruleText ? 2.65 : 1.45;

    if (examples.length > 0) {
      slide.addText("EXAMPLES", {
        shape: pptx.shapes.RECTANGLE,
        x: 0.8,
        y: colY,
        w: colW,
        h: 0.48,
        fill: { color: COLOR_PRIMARY },
        line: { color: COLOR_PRIMARY },
        fontFace: FONT,
        fontSize: 15,
        bold: true,
        color: "FFFFFF",
        align: "center",
        valign: "middle",
      });

      slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.8,
        y: colY + 0.48,
        w: colW,
        h: colH - 0.48,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      const examplesText = examples
        .map((ex, idx) => `${idx + 1}.  ${ex}`)
        .join("\n\n");

      slide.addText(examplesText, {
        x: 1.0,
        y: colY + 0.65,
        w: colW - 0.4,
        h: colH - 0.8,
        fontFace: FONT,
        fontSize: 15,
        color: COLOR_BODY,
        valign: "top",
        margin: [6, 6, 6, 6],
      });
    }

    if (practice.length > 0) {
      const pX = examples.length > 0 ? 6.83 : 0.8;
      const pW = examples.length > 0 ? colW : 11.73;

      slide.addText("PRACTICE", {
        shape: pptx.shapes.RECTANGLE,
        x: pX,
        y: colY,
        w: pW,
        h: 0.48,
        fill: { color: COLOR_PRIMARY },
        line: { color: COLOR_PRIMARY },
        fontFace: FONT,
        fontSize: 15,
        bold: true,
        color: "FFFFFF",
        align: "center",
        valign: "middle",
      });

      slide.addShape(pptx.shapes.RECTANGLE, {
        x: pX,
        y: colY + 0.48,
        w: pW,
        h: colH - 0.48,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      const practiceText = practice
        .map((pr, idx) => `${idx + 1}.  ${pr}`)
        .join("\n\n");

      slide.addText(practiceText, {
        x: pX + 0.2,
        y: colY + 0.65,
        w: pW - 0.4,
        h: colH - 0.8,
        fontFace: FONT,
        fontSize: 15,
        color: COLOR_BODY,
        valign: "top",
        margin: [6, 6, 6, 6],
      });
    }

    return slide;
  }

  // =========================================================================
  // 17. ACTIVITY / EXPERIMENT / PROJECT / FUN ZONE
  // =========================================================================
  if (
    data.type === "activity" ||
    data.type === "experiment" ||
    data.type === "project" ||
    data.type === "funZone"
  ) {
    addHeader(data.title, data.activity || data.topic || data.instruction);

    let curY = 1.45;

    if (data.content) {
      slide.addText(data.content, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: curY,
        w: 11.73,
        h: 0.8,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1.5 },
        fontFace: FONT,
        fontSize: 17,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
        margin: [16, 16, 10, 10],
      });
      curY += 0.95;
    }

    if (data.materials) {
      const matText = `Things You Need:  ${
        Array.isArray(data.materials) ? data.materials.join(", ") : data.materials
      }`;
      slide.addText(matText, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: 0.8,
        y: curY,
        w: 11.73,
        h: 0.65,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
        fontFace: FONT,
        fontSize: 15,
        bold: true,
        color: COLOR_PRIMARY,
        align: "left",
        valign: "middle",
        margin: [20, 16, 8, 8],
      });
      curY += 0.8;
    }

    const steps =
      data.instructions ||
      data.steps ||
      data.activities ||
      data.statements ||
      [];
    const count = steps.length;

    if (count <= 4) {
      const boxH = 0.85;
      const gap = 0.2;

      steps.forEach((act, idx) => {
        const ansText = data.answers && data.answers[idx] ? `  (Answer: ${data.answers[idx]})` : "";

        slide.addText(
          [
            { text: `Task ${idx + 1}:  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
            { text: act, options: { color: COLOR_BODY, fontSize: 16 } },
            { text: ansText, options: { bold: true, color: COLOR_MUTED, fontSize: 14 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [22, 20, 10, 10],
          }
        );

        curY += boxH + gap;
      });
    } else {
      const colW = 5.7;
      const boxH = 1.0;
      const gapY = 0.2;
      const startY = curY;

      steps.forEach((act, idx) => {
        const col = Math.floor(idx / 3);
        const row = idx % 3;
        const boxX = col === 0 ? 0.8 : 6.83;
        const boxY = startY + row * (boxH + gapY);

        slide.addText(
          [
            { text: `Task ${idx + 1}:  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
            { text: act, options: { color: COLOR_BODY, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: boxX,
            y: boxY,
            w: colW,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [20, 16, 8, 8],
          }
        );
      });
    }

    return slide;
  }

  // =========================================================================
  // 18. DID YOU KNOW / FUN FACTS
  // =========================================================================
  if (data.type === "didYouKnow" || data.type === "funFacts") {
    addHeader(data.title || "Fascinating Facts");

    const facts =
      data.facts || data.points || (data.content ? [data.content] : []);
    const count = facts.length;
    const boxH = count <= 3 ? 1.2 : 0.95;
    const gap = 0.25;
    let curY = 1.45;

    facts.forEach((fact, idx) => {
      slide.addText(
        [
          { text: `Fact ${idx + 1}:  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
          { text: fact, options: { color: COLOR_BODY, fontSize: 16 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: curY,
          w: 11.73,
          h: boxH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [24, 20, 12, 12],
        }
      );

      curY += boxH + gap;
    });

    return slide;
  }

  // =========================================================================
  // 19. SUMMARY / KEY TAKEAWAYS
  // =========================================================================
  if (data.type === "summary" || data.type === "keyTakeaways") {
    addHeader(data.title || "Chapter Summary");

    const points =
      data.points || data.items || (data.content ? [data.content] : []);
    const count = points.length;

    if (count <= 4) {
      const boxH = 0.95;
      const gap = 0.22;
      let curY = 1.45;

      points.forEach((point, idx) => {
        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
            { text: point, options: { color: COLOR_BODY, fontSize: 16 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [22, 20, 10, 10],
          }
        );

        curY += boxH + gap;
      });
    } else {
      const numRows = Math.ceil(count / 2);
      const colW = 5.7;
      const cardH = 1.05;
      const gapY = 0.2;
      const startY = 1.45;

      points.forEach((point, idx) => {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        const cardX = col === 0 ? 0.8 : 6.83;
        const cardY = startY + row * (cardH + gapY);

        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
            { text: point, options: { color: COLOR_BODY, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: cardX,
            y: cardY,
            w: colW,
            h: cardH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [20, 16, 8, 8],
          }
        );
      });
    }

    return slide;
  }

  // =========================================================================
  // 20. INTRODUCTION
  // =========================================================================
  if (data.type === "introduction") {
    const points = data.points || (Array.isArray(data.content) ? data.content : []);
    if (points.length > 0) {
      addHeader(data.title || "Introduction");

      const count = points.length;
      const numRows = Math.ceil(count / 2);
      const colW = count > 3 ? 5.7 : 11.73;
      const cardH = count > 3 ? 0.95 : 1.1;
      const gapY = 0.2;
      const startY = 1.5;

      points.forEach((pt, idx) => {
        const textStr = typeof pt === "string" ? pt : pt.text || pt.description || "";
        let cardX = 0.8;
        let cardY = startY;
        if (count > 3) {
          const col = Math.floor(idx / numRows);
          const row = idx % numRows;
          cardX = col === 0 ? 0.8 : 6.83;
          cardY = startY + row * (cardH + gapY);
        } else {
          cardY = startY + idx * (cardH + gapY);
        }

        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
            { text: textStr, options: { color: COLOR_BODY, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: cardX,
            y: cardY,
            w: colW,
            h: cardH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [20, 18, 8, 8],
          }
        );
      });

      return slide;
    }

    slide.addText(data.title, {
      x: 1.0,
      y: 1.5,
      w: 11.33,
      h: 0.8,
      fontFace: FONT,
      fontSize: 34,
      bold: true,
      color: COLOR_PRIMARY,
      align: "center",
      valign: "middle",
    });

    slide.addText(data.content || "", {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 1.8,
      y: 2.6,
      w: 9.73,
      h: 2.8,
      fill: { color: BG_ACCENT },
      line: { color: COLOR_PRIMARY, width: 2 },
      fontFace: FONT,
      fontSize: 22,
      color: COLOR_BODY,
      align: "center",
      valign: "middle",
      margin: [28, 28, 20, 20],
      lineSpacingMultiple: 1.35,
    });

    return slide;
  }

  // =========================================================================
  // 21. LESSON FOR LIFE / REMEMBER
  // =========================================================================
  if (data.type === "lessonForLife") {
    const rawList =
      data.points ||
      data.items ||
      data.lines ||
      (Array.isArray(data.content)
        ? data.content
        : typeof data.content === "string" && data.content.trim()
        ? [data.content]
        : typeof data.text === "string" && data.text.trim()
        ? [data.text]
        : typeof data.quote === "string" && data.quote.trim()
        ? [data.quote]
        : []);

    const points = (Array.isArray(rawList) ? rawList : [rawList])
      .map((item) => {
        if (!item) return "";
        if (typeof item === "object") {
          const text = item.text || item.description || item.line || item.content || "";
          const heading = item.title || item.heading || null;
          return heading ? `${heading}: ${text}` : text;
        }
        return String(item).trim();
      })
      .filter(Boolean);

    if (points.length === 0 && data.content) {
      points.push(String(data.content).trim());
    }
    if (points.length === 0) {
      points.push("Every experience teaches us a valuable life lesson.");
    }

    const isSingle = points.length === 1;
    const displayText = isSingle
      ? points[0]
      : points
          .map((pt, idx) => {
            const hasNumber = /^\d+[.)]\s*/.test(pt);
            return hasNumber ? pt : `${idx + 1}.  ${pt}`;
          })
          .join("\n\n");

    let boxY = 2.6;
    let boxH = 2.8;
    let fontSize = 23;
    let align = "center";

    if (!isSingle) {
      align = "left";
      if (points.length === 2) {
        boxY = 2.45;
        boxH = 3.1;
        fontSize = 22;
      } else if (points.length === 3) {
        boxY = 2.3;
        boxH = 3.5;
        fontSize = 21;
      } else {
        boxY = 2.2;
        boxH = 3.8;
        fontSize = 19;
      }
    }

    slide.addText(data.title || "Remember", {
      x: 1.0,
      y: points.length >= 4 ? 1.2 : 1.4,
      w: 11.33,
      h: 0.8,
      fontFace: FONT,
      fontSize: 34,
      bold: true,
      color: COLOR_PRIMARY,
      align: "center",
      valign: "middle",
    });

    slide.addText(displayText, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 1.8,
      y: boxY,
      w: 9.73,
      h: boxH,
      fill: { color: BG_ACCENT },
      line: { color: COLOR_PRIMARY, width: 2 },
      fontFace: FONT,
      fontSize: fontSize,
      bold: true,
      color: COLOR_BODY,
      align: align,
      valign: "middle",
      margin: isSingle ? [28, 28, 20, 20] : [24, 44, 24, 44],
      lineSpacingMultiple: 1.25,
    });

    return slide;
  }

  // =========================================================================
  // 22. MOTIVATION
  // =========================================================================
  if (data.type === "motivation") {
    slide.addText(data.title, {
      x: 1.0,
      y: 1.5,
      w: 11.33,
      h: 0.8,
      fontFace: FONT,
      fontSize: 34,
      bold: true,
      color: COLOR_HEADING,
      align: "center",
      valign: "middle",
    });

    slide.addText(data.content, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 1.8,
      y: 2.6,
      w: 9.73,
      h: 2.8,
      fill: { color: BG_ACCENT },
      line: { color: COLOR_PRIMARY, width: 2.5 },
      fontFace: FONT,
      fontSize: 26,
      bold: true,
      color: COLOR_PRIMARY,
      align: "center",
      valign: "middle",
      margin: [28, 28, 20, 20],
      lineSpacingMultiple: 1.35,
    });

    return slide;
  }

  // =========================================================================
  // 23. THANK YOU
  // =========================================================================
  if (data.type === "thankYou") {
    slide.addText(data.title || "Thank You!", {
      x: 1.0,
      y: 1.8,
      w: 11.33,
      h: 1.0,
      fontFace: FONT,
      fontSize: 42,
      bold: true,
      color: COLOR_PRIMARY,
      align: "center",
      valign: "middle",
    });

    slide.addText(data.content, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 2.2,
      y: 3.1,
      w: 8.93,
      h: 1.8,
      fill: { color: BG_CARD },
      line: { color: COLOR_PRIMARY, width: 2 },
      fontFace: FONT,
      fontSize: 22,
      color: COLOR_MUTED,
      align: "center",
      valign: "middle",
      margin: [24, 24, 16, 16],
    });

    return slide;
  }

  // =========================================================================
  // 24. HOUSES AND ROOMS
  // =========================================================================
  if (
    data.type === "typesOfHouses" ||
    Boolean(data.houses) ||
    data.type === "houseRooms" ||
    Boolean(data.rooms)
  ) {
    addHeader(data.title || "Houses & Rooms");
    const items = data.houses || data.rooms || [];
    const count = items.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = 1.05;
    const gapY = 0.25;
    const startY = 1.5;

    items.forEach((item, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      const title = item.name || item.room || `Item ${idx + 1}`;
      const desc = item.description || item.activity || "";

      slide.addText(
        [
          { text: `${idx + 1}.  ${title} :  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
          { text: desc, options: { color: COLOR_BODY, fontSize: 14 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [18, 16, 8, 8],
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 25. CLOTHING MATERIALS & AIR PROPERTIES
  // =========================================================================
  if (data.type === "clothingMaterials" || (data.materials && typeof data.materials[0] === "object")) {
    addHeader(data.title || "Materials for Clothes");
    const materials = data.materials || [];
    const colW = 3.7;
    const cardH = 4.6;
    const startY = 1.55;

    materials.forEach((mat, idx) => {
      const cardX = 0.8 + idx * (colW + 0.31);

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: startY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      slide.addText(mat.name || `Material ${idx + 1}`, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: cardX + 0.25,
        y: startY + 0.25,
        w: colW - 0.5,
        h: 0.52,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1 },
        fontFace: FONT,
        fontSize: 18,
        bold: true,
        color: COLOR_PRIMARY,
        align: "center",
        valign: "middle",
      });

      if (mat.source) {
        slide.addText(`Source: ${mat.source}`, {
          x: cardX + 0.25,
          y: startY + 0.95,
          w: colW - 0.5,
          h: 0.5,
          fontFace: FONT,
          fontSize: 14,
          bold: true,
          color: COLOR_HEADING,
          align: "center",
          valign: "middle",
        });
      }

      if (mat.uses && mat.uses.length > 0) {
        slide.addText(
          [
            { text: "Used For:\n", options: { bold: true, color: COLOR_PRIMARY, fontSize: 13 } },
            { text: mat.uses.join(", "), options: { color: COLOR_BODY, fontSize: 13 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: cardX + 0.25,
            y: startY + 1.6,
            w: colW - 0.5,
            h: 2.4,
            fill: { color: "FFFFFF" },
            line: { color: BORDER_ACCENT, width: 1 },
            fontFace: FONT,
            align: "center",
            valign: "middle",
          }
        );
      }
    });

    return slide;
  }

  if (data.type === "airProperties" || Boolean(data.properties)) {
    addHeader(data.title || "Properties of Air");
    const properties = data.properties || [];
    const colW = 5.6;
    const cardH = 3.8;
    const startY = 1.8;

    properties.forEach((prop, idx) => {
      const cardX = idx === 0 ? 0.8 : 6.93;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: startY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      slide.addText(prop.name || `Property ${idx + 1}`, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: cardX + 0.4,
        y: startY + 0.35,
        w: colW - 0.8,
        h: 0.6,
        fill: { color: BG_ACCENT },
        line: { color: BORDER_ACCENT, width: 1 },
        fontFace: FONT,
        fontSize: 18,
        bold: true,
        color: COLOR_PRIMARY,
        align: "center",
        valign: "middle",
      });

      slide.addText(prop.description || "", {
        x: cardX + 0.4,
        y: startY + 1.2,
        w: colW - 0.8,
        h: 2.1,
        fontFace: FONT,
        fontSize: 16,
        color: COLOR_BODY,
        align: "center",
        valign: "middle",
        lineSpacingMultiple: 1.35,
      });
    });

    return slide;
  }

  // =========================================================================
  // 26. SAFETY RULES
  // =========================================================================
  if (
    data.type === "roadSafety" ||
    data.type === "travelSafety" ||
    data.type === "playgroundSafety" ||
    data.type === "swimmingSafety" ||
    data.type === "homeSafety" ||
    data.type === "schoolSafety" ||
    Boolean(data.rules)
  ) {
    addHeader(data.title || "Safety Rules");
    const rules = data.rules || [];
    const count = rules.length;

    if (count <= 3) {
      let curY = 1.55;
      const boxH = 1.1;
      const gap = 0.3;

      rules.forEach((rule, idx) => {
        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
            { text: rule, options: { color: COLOR_BODY, fontSize: 16 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 11.73,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [22, 20, 10, 10],
          }
        );
        curY += boxH + gap;
      });
    } else {
      const colW = 5.7;
      const numRows = Math.ceil(count / 2);
      const boxH = numRows >= 4 ? 0.95 : 1.15;
      const gapY = 0.2;
      const startY = 1.45;

      rules.forEach((rule, idx) => {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        const boxX = col === 0 ? 0.8 : 6.83;
        const boxY = startY + row * (boxH + gapY);

        slide.addText(
          [
            { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
            { text: rule, options: { color: COLOR_BODY, fontSize: 14 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: boxX,
            y: boxY,
            w: colW,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [18, 16, 8, 8],
          }
        );
      });
    }

    return slide;
  }

  // =========================================================================
  // 27. USES, SOURCES, SEASONS
  // =========================================================================
  if (
    data.type === "waterUses" ||
    data.type === "waterSources" ||
    data.type === "airUses" ||
    data.type === "saveWater" ||
    data.type === "seasons" ||
    Boolean(data.uses) ||
    Boolean(data.sources) ||
    Boolean(data.seasons)
  ) {
    addHeader(data.title || "Information");
    const items = data.uses || data.sources || data.seasons || data.points || [];
    const count = items.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const boxH = numRows >= 4 ? 0.9 : 1.1;
    const gapY = 0.2;
    const startY = 1.45;

    items.forEach((item, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const boxX = col === 0 ? 0.8 : 6.83;
      const boxY = startY + row * (boxH + gapY);

      slide.addText(
        [
          { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
          { text: item, options: { color: COLOR_BODY, fontSize: 14 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: boxX,
          y: boxY,
          w: colW,
          h: boxH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [18, 16, 8, 8],
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 28. WEATHER TYPES
  // =========================================================================
  if (data.type === "weatherTypes" || (data.types && typeof data.types[0] === "object")) {
    addHeader(data.title || "Types of Weather");
    const types = data.types || [];
    const colW = 5.7;
    const cardH = 2.3;
    const startY = 1.45;
    const gapY = 0.3;

    types.slice(0, 4).forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: cardY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
      });

      const runs = [
        { text: `${item.name}\n`, options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
        { text: `${item.description || ""}\n`, options: { color: COLOR_BODY, fontSize: 13 } },
      ];
      if (item.clothes) runs.push({ text: `Clothes: ${item.clothes}  |  `, options: { bold: true, color: COLOR_MUTED, fontSize: 12 } });
      if (item.food) runs.push({ text: `Food: ${item.food}  `, options: { bold: true, color: COLOR_MUTED, fontSize: 12 } });
      if (item.thingsUsed) runs.push({ text: `Things: ${item.thingsUsed.join(", ")}`, options: { bold: true, color: COLOR_MUTED, fontSize: 12 } });

      slide.addText(runs, {
        x: cardX + 0.3,
        y: cardY + 0.2,
        w: colW - 0.6,
        h: cardH - 0.4,
        fontFace: FONT,
        valign: "top",
      });
    });

    return slide;
  }

  // =========================================================================
  // 29. ASTRONAUTS & KEYWORDS
  // =========================================================================
  if (data.type === "astronauts" || Boolean(data.people)) {
    addHeader(data.title || "Famous People");
    const people = data.people || [];
    const count = people.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = 1.05;
    const gapY = 0.2;
    const startY = 1.45;

    people.forEach((p, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      slide.addText(
        [
          { text: `${idx + 1}.  ${p.name}\n`, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
          { text: p.achievement || "", options: { color: COLOR_BODY, fontSize: 13 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [16, 16, 8, 8],
        }
      );
    });

    return slide;
  }

  if (data.type === "keywords" || Boolean(data.words)) {
    addHeader(data.title || "Keywords");
    const words = data.words || [];
    const count = words.length;
    const numRows = Math.ceil(count / 2);
    const colW = 5.7;
    const cardH = 1.25;
    const gapY = 0.3;
    const startY = 1.55;

    words.forEach((w, idx) => {
      const col = Math.floor(idx / numRows);
      const row = idx % numRows;
      const cardX = col === 0 ? 0.8 : 6.83;
      const cardY = startY + row * (cardH + gapY);

      slide.addText(
        [
          { text: `${w.word} :  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 17 } },
          { text: w.meaning || "", options: { color: COLOR_BODY, fontSize: 15 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: cardX,
          y: cardY,
          w: colW,
          h: cardH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [20, 16, 10, 10],
        }
      );
    });

    return slide;
  }

  // =========================================================================
  // 30. TRUE OR FALSE & MATCH THE FOLLOWING
  // =========================================================================
  if (data.type === "trueFalse" || Boolean(data.statements)) {
    addHeader(data.title || "True or False");
    const statements = data.statements || [];
    let curY = 1.45;
    const boxH = 1.0;
    const gap = 0.25;

    statements.forEach((st, idx) => {
      slide.addText(
        [
          { text: `${idx + 1}.  ${st.statement}   `, options: { color: COLOR_BODY, fontSize: 16 } },
          { text: `[ ${st.answer} ]`, options: { bold: true, color: st.answer === "True" ? "15803D" : "B91C1C", fontSize: 16 } },
        ],
        {
          shape: pptx.shapes.ROUNDED_RECTANGLE,
          x: 0.8,
          y: curY,
          w: 11.73,
          h: boxH,
          fill: { color: BG_CARD },
          line: { color: BORDER_CARD, width: 1.5 },
          fontFace: FONT,
          align: "left",
          valign: "middle",
          margin: [20, 20, 10, 10],
        }
      );
      curY += boxH + gap;
    });

    return slide;
  }

  if (data.type === "matchTheFollowing" || (data.left && data.right)) {
    addHeader(data.title || "Match the Following");
    const left = data.left || [];
    const right = data.right || [];
    const maxCount = Math.max(left.length, right.length);
    const boxH = 0.8;
    const gap = 0.2;
    const startY = 1.45;

    for (let i = 0; i < maxCount; i++) {
      const curY = startY + i * (boxH + gap);

      if (left[i]) {
        slide.addText(
          [
            { text: `${i + 1}. `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
            { text: left[i], options: { bold: true, color: COLOR_HEADING, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 0.8,
            y: curY,
            w: 5.7,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [16, 16, 8, 8],
          }
        );
      }

      if (right[i]) {
        slide.addText(
          [
            { text: `${String.fromCharCode(65 + i)}. `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
            { text: right[i], options: { color: COLOR_BODY, fontSize: 15 } },
          ],
          {
            shape: pptx.shapes.ROUNDED_RECTANGLE,
            x: 6.83,
            y: curY,
            w: 5.7,
            h: boxH,
            fill: { color: BG_CARD },
            line: { color: BORDER_CARD, width: 1.5 },
            fontFace: FONT,
            align: "left",
            valign: "middle",
            margin: [16, 16, 8, 8],
          }
        );
      }
    }

    return slide;
  }

  // =========================================================================
  // 31. UNIVERSAL SMART FALLBACK (NEVER BLANK)
  // =========================================================================
  addHeader(data.title || "Key Information");

  const fallbackPoints =
    data.points ||
    data.questions ||
    data.situations ||
    data.items ||
    data.facts ||
    data.activities ||
    data.steps ||
    data.examples ||
    data.rules ||
    data.uses ||
    data.sources ||
    data.seasons ||
    data.goodHabits ||
    data.methods ||
    data.phases ||
    data.meals ||
    data.materials ||
    data.categories ||
    data.homes ||
    data.parts ||
    data.functions ||
    data.organs ||
    data.houses ||
    data.rooms ||
    data.properties ||
    data.terms ||
    data.people ||
    data.words ||
    data.statements ||
    (Array.isArray(data.content) ? data.content : []);

  const contentStr =
    (typeof data.content === "string" && data.content) ||
    (typeof data.activity === "string" && data.activity) ||
    (typeof data.instruction === "string" && data.instruction) ||
    "";
  const hasContent = Boolean(contentStr);
  const hasPoints = fallbackPoints.length > 0;

  if (hasContent && hasPoints) {
    // Both lead text on top and cards below
    slide.addText(contentStr, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 0.8,
      y: 1.35,
      w: 11.73,
      h: 0.95,
      fill: { color: BG_ACCENT },
      line: { color: BORDER_ACCENT, width: 1.5 },
      fontFace: FONT,
      fontSize: 16,
      color: COLOR_BODY,
      align: "center",
      valign: "middle",
      margin: [16, 16, 8, 8],
    });

    let curY = 2.45;
    const count = fallbackPoints.length;
    const numRows = Math.ceil(count / 2);
    const colW = count > 3 ? 5.7 : 11.73;
    const cardH = count > 3 ? 0.85 : 0.95;
    const gapY = 0.18;

    fallbackPoints.slice(0, 8).forEach((pt, idx) => {
      const isObj = typeof pt === "object" && pt !== null;
      const title = isObj
        ? pt.name || pt.title || pt.part || pt.organ || pt.animal || pt.room || pt.word || pt.heading || pt.question
        : null;
      const text = isObj
        ? pt.use || pt.description || pt.function || pt.home || pt.activity || pt.meaning || pt.achievement || pt.statement || pt.text || pt.content || pt.answer
        : pt;

      let cardX = 0.8;
      let cardY = curY;
      if (count > 3) {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        cardX = col === 0 ? 0.8 : 6.83;
        cardY = curY + row * (cardH + gapY);
      } else {
        cardY = curY + idx * (cardH + gapY);
      }

      const runs = [
        { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
      ];
      if (title) runs.push({ text: `${title}: `, options: { bold: true, color: COLOR_HEADING, fontSize: 15 } });
      runs.push({ text: String(text || ""), options: { color: COLOR_BODY, fontSize: 14 } });

      slide.addText(runs, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: cardX,
        y: cardY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
        fontFace: FONT,
        align: "left",
        valign: "middle",
        margin: [16, 16, 8, 8],
      });
    });
  } else if (hasContent && !hasPoints) {
    slide.addText(contentStr, {
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      x: 1.8,
      y: 2.3,
      w: 9.73,
      h: 2.8,
      fill: { color: BG_ACCENT },
      line: { color: BORDER_ACCENT, width: 1.5 },
      fontFace: FONT,
      fontSize: 20,
      color: COLOR_BODY,
      align: "center",
      valign: "middle",
      margin: [24, 24, 16, 16],
    });
  } else if (hasPoints) {
    const count = fallbackPoints.length;
    const numRows = Math.ceil(count / 2);
    const colW = count > 3 ? 5.7 : 11.73;
    const cardH = count > 3 ? 0.95 : 1.1;
    const gapY = 0.2;
    const startY = 1.45;

    fallbackPoints.slice(0, 8).forEach((pt, idx) => {
      const isObj = typeof pt === "object" && pt !== null;
      const title = isObj
        ? pt.name || pt.title || pt.part || pt.organ || pt.animal || pt.room || pt.word || pt.heading || pt.question
        : null;
      const text = isObj
        ? pt.use || pt.description || pt.function || pt.home || pt.activity || pt.meaning || pt.achievement || pt.statement || pt.text || pt.content || pt.answer
        : pt;

      let cardX = 0.8;
      let cardY = startY;
      if (count > 3) {
        const col = Math.floor(idx / numRows);
        const row = idx % numRows;
        cardX = col === 0 ? 0.8 : 6.83;
        cardY = startY + row * (cardH + gapY);
      } else {
        cardY = startY + idx * (cardH + gapY);
      }

      const runs = [
        { text: `${idx + 1}.  `, options: { bold: true, color: COLOR_PRIMARY, fontSize: 15 } },
      ];
      if (title) runs.push({ text: `${title}: `, options: { bold: true, color: COLOR_HEADING, fontSize: 15 } });
      runs.push({ text: String(text || ""), options: { color: COLOR_BODY, fontSize: 14 } });

      slide.addText(runs, {
        shape: pptx.shapes.ROUNDED_RECTANGLE,
        x: cardX,
        y: cardY,
        w: colW,
        h: cardH,
        fill: { color: BG_CARD },
        line: { color: BORDER_CARD, width: 1.5 },
        fontFace: FONT,
        align: "left",
        valign: "middle",
        margin: [18, 16, 8, 8],
      });
    });
  }

  return slide;
}

export default createPPTSlide;