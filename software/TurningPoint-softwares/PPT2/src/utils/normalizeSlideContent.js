const RENDERED_FIELDS_BY_TYPE = {
  title: ["title", "subtitle"],
  dialogue: ["dialogue", "points"],
  concept: [
    "points",
    "categories",
    "words",
    "content",
    "situations",
    "items",
    "facts",
    "examples",
    "goodHabits",
    "methods",
    "phases",
    "types",
    "meals",
    "materials",
  ],
  activity: [
    "questions",
    "question",
    "prompts",
    "activities",
    "points",
    "activity",
    "instruction",
    "instructions",
    "steps",
    "statements",
    "options",
    "content",
    "objective",
    "examples",
  ],
  practice: [
    "sections",
    "activities",
    "points",
    "questions",
    "wordBank",
    "wordBox",
  ],
  fact: ["points", "facts"],
  facts: ["points", "facts"],
  answers: ["points", "facts", "questions", "items"],
  thinking: ["points", "questions", "items", "facts", "content"],
  puzzle: ["points", "questions", "items", "facts"],
  example: ["points", "questions", "items", "facts"],
};

const METADATA_FIELDS = new Set([
  "slideNumber",
  "type",
  "title",
  "subtitle",
  "publication",
  "subject",
  "className",
]);

function formatValue(value) {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) {
    return value.map(formatValue).filter(Boolean).join(" | ");
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => {
        const label = key.replace(/([A-Z])/g, " $1");
        const formatted = formatValue(item);
        return formatted ? `${label}: ${formatted}` : "";
      })
      .filter(Boolean)
      .join(" — ");
  }
  return String(value);
}

function normalizeSlideContent(slide) {
  if (!slide || typeof slide !== "object") return slide;

  const renderedFields = RENDERED_FIELDS_BY_TYPE[slide.type] || [
    "points",
    "questions",
    "situations",
    "items",
    "facts",
    "activities",
    "steps",
    "examples",
    "pairs",
    "content",
    "activity",
    "instruction",
  ];
  const hasRenderedContent = renderedFields.some((field) => {
    const value = slide[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

  if (hasRenderedContent) return slide;

  const points = Object.entries(slide)
    .filter(([field]) => !METADATA_FIELDS.has(field))
    .map(([field, value]) => {
      const label = field.replace(/([A-Z])/g, " $1");
      const formatted = formatValue(value);
      return formatted ? `${label}: ${formatted}` : "";
    })
    .filter(Boolean);

  if (points.length === 0) return slide;

  if (slide.type === "practice") return { ...slide, questions: points };
  if (slide.type === "activity") return { ...slide, activities: points };
  return { ...slide, points };
}

export default normalizeSlideContent;
