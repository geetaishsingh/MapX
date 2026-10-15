const getDisplayText = (value, excludedKeys = []) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (Array.isArray(value)) {
    return value
      .map((entry) => getDisplayText(entry, excludedKeys))
      .filter(Boolean)
      .join(", ");
  }
  if (typeof value === "object") {
    const preferredKeys = [
      "text",
      "question",
      "prompt",
      "statement",
      "title",
      "name",
      "word",
      "term",
      "description",
      "content",
      "meaning",
      "answer",
      "instruction",
      "activity",
      "use",
      "function",
      "home",
    ];
    const preferredText = preferredKeys
      .filter((key) => !excludedKeys.includes(key))
      .map((key) => value[key])
      .map((entry) => getDisplayText(entry, excludedKeys))
      .filter(Boolean);

    if (preferredText.length > 0) {
      return preferredText.join(" — ");
    }

    return Object.entries(value)
      .filter(
        ([key]) =>
          !["id", "type", "slideNumber", ...excludedKeys].includes(key)
      )
      .map(([key, entry]) => {
        const text = getDisplayText(entry, excludedKeys);
        return text ? `${key}: ${text}` : "";
      })
      .filter(Boolean)
      .join(" — ");
  }
  return "";
};

function SlideRenderer({ slide, chapterInfo }) {
  if (!slide) {
    return <p>No slide found.</p>;
  }

  const className = slide.className || chapterInfo?.className || "Class 1";
  const subjectName = slide.subject || chapterInfo?.subject || "English Grammar";

  switch (slide.type) {
    // =========================================================================
    // 1. TITLE SLIDE
    // =========================================================================
    case "title": {
      const chapterNumber = chapterInfo?.chapterNumber ?? slide.chapterNumber;
      return (
        <div className="slide-content title-slide">
          <div className="title-brand-logo" aria-label="GYAN SETU logo">
            GYAN SETU
          </div>

          {(className || subjectName) && (
            <div className="title-subject-badge">
              <span className="subject-text">
                {className && subjectName ? `${className} - ${subjectName}` : className || subjectName}
              </span>
            </div>
          )}

          {chapterNumber && (
            <div className="title-chapter-badge">Chapter {chapterNumber}</div>
          )}

          <h1>{slide.title}</h1>
          <div className="title-accent-line" />
        </div>
      );
    }

    // =========================================================================
    // 2. CONCEPT / TOPIC / STORY / CONTENT / BIRDS / INSECTS / CLEANLINESS / ETC.
    // =========================================================================
    case "concept":
    case "content":
    case "topic":
    case "story":
    case "poem":
    case "moral":
    case "blessings":
    case "natureGifts":
    case "natureProducts":
    case "naturalBeauty":
    case "responsibility":
    case "hygiene":
    case "lesson":
    case "safety":
    case "situations":
    case "sorry":
    case "birds":
    case "insects":
    case "foodNeeds":
    case "clothes":
    case "house":
    case "cleanliness":
    case "exercise":
    case "restAndSleep":
    case "play":
    case "wind":
    case "cleanWater":
    case "sun":
    case "moon":
    case "stars":
    case "firstAid":
    case "valueTreasure": {
      const points =
        slide.points ||
        slide.situations ||
        slide.items ||
        slide.facts ||
        (!slide.categories && !slide.words ? slide.examples : null) ||
        slide.goodHabits ||
        slide.methods ||
        slide.phases ||
        slide.types ||
        slide.meals ||
        slide.materials ||
        (Array.isArray(slide.content) ? slide.content : []);
      const badgeLabel =
        slide.category ||
        (slide.type === "poem"
          ? "Poem"
          : slide.type === "story"
          ? "Story"
          : slide.type === "valueTreasure"
            ? "Value Treasure"
            : slide.type === "moral"
            ? "Moral"
            : slide.type === "blessings"
              ? "Blessings of Wisdom"
              : slide.type === "natureGifts"
                ? "Gifts of Nature"
                : slide.type === "natureProducts"
                  ? "Nature's Bounty"
                  : slide.type === "naturalBeauty"
                    ? "Beauty of Nature"
                    : slide.type === "responsibility"
                      ? "Responsibility"
                      : slide.type === "hygiene"
                        ? "Good Hygiene"
                        : slide.type === "lesson"
                          ? "Lesson"
                          : slide.type === "safety"
                            ? "Safety"
                            : slide.type === "sorry"
                              ? "Say 'Sorry'"
                              : slide.type === "situations"
                                ? "What Will You Say?"
                                : slide.type === "concept"
                                  ? "Core Concept"
                                  : slide.type === "birds"
                                    ? "Birds"
                                    : slide.type === "insects"
                                      ? "Insects"
                                      : slide.type === "cleanliness"
                                        ? "Good Habits"
                                        : slide.type === "cleanWater"
                                          ? "Safe Water"
                                          : slide.type === "firstAid"
                                            ? "First Aid"
                                            : "Topic");

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title || slide.heading}</h1>
          </div>

          {typeof slide.content === "string" && slide.content && (
            <div className="concept-lead-box">
              <p>{slide.content}</p>
            </div>
          )}

          {points && points.length > 0 && (
            <div className="story-grid">
              {points.map((point, index) => {
                const isObj = typeof point === "object" && point !== null;
                const pointText = isObj
                  ? getDisplayText(point, ["title", "heading"])
                  : getDisplayText(point);
                const pointTitle = isObj ? point.title || point.heading : null;

                return (
                  <div className="story-point-card" key={index}>
                    <span className="point-indicator">{index + 1}</span>
                    <div>
                      {pointTitle && <strong>{pointTitle}: </strong>}
                      <span>{pointText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {slide.categories && Array.isArray(slide.categories) && (
            <div className="categories-grid" style={{ marginTop: "16px" }}>
              {slide.categories.map((cat, idx) => {
                const isStr = typeof cat === "string";
                const hasHyphen = isStr && cat.includes("-");
                const name = isStr
                  ? (hasHyphen ? cat.split("-")[0].trim() : cat)
                  : (cat.name || cat.title || `Item ${idx + 1}`);
                const desc = isStr
                  ? (hasHyphen ? cat.split("-").slice(1).join("-").trim() : "")
                  : (cat.description || cat.content || "");

                return (
                  <div className="category-card" key={idx}>
                    <div className="category-card-header">
                      <span className="category-name-badge">{name}</span>
                    </div>
                    {desc && <p className="category-desc">{desc}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {slide.words && Array.isArray(slide.words) && (
            <div className="activity-wordbank" style={{ marginTop: "16px" }}>
              <div className="wordbank-header">Words to Learn</div>
              <div className="examples-pills">
                {slide.words.map((w, wIdx) => (
                  <span className="example-pill" key={wIdx}>{w}</span>
                ))}
              </div>
            </div>
          )}

          {slide.examples && Array.isArray(slide.examples) && slide.points && (
            <div className="category-examples" style={{ marginTop: "16px" }}>
              <span className="examples-label">Examples:</span>
              <div className="examples-pills">
                {slide.examples.map((ex, exIdx) => (
                  <span className="example-pill" key={exIdx}>{ex}</span>
                ))}
              </div>
            </div>
          )}

          {slide.activities && Array.isArray(slide.activities) && slide.points && (
            <div className="activity-card" style={{ marginTop: "16px" }}>
              <span className="activity-badge">Activity</span>
              <div className="activity-sublist" style={{ marginTop: "8px" }}>
                {slide.activities.map((act, actIdx) => (
                  <p key={actIdx}>{actIdx + 1}. {act}</p>
                ))}
              </div>
            </div>
          )}

          {slide.note && (
            <div className="concept-note-box">
              <span className="note-badge">Key Takeaway</span>
              <p>{slide.note}</p>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 3. TYPES OF PLANTS / CATEGORIES / GROUPS / ANIMAL FOOD / PLANT USES
    // =========================================================================
    case "typesOfPlants":
    case "categories":
    case "groups":
    case "plantUses":
    case "animalTypes":
    case "animalFood": {
      const categories = slide.categories || slide.groups || slide.items || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Classification</span>
            <h1>{slide.title || "Categories"}</h1>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => {
              const isStr = typeof cat === "string";
              const hasHyphen = isStr && cat.includes("-");
              const name = isStr
                ? (hasHyphen ? cat.split("-")[0].trim() : cat)
                : (cat.name || cat.title || `Type ${idx + 1}`);
              const desc = isStr
                ? (hasHyphen ? cat.split("-").slice(1).join("-").trim() : "")
                : (cat.description || cat.content || "");
              const catExamples = isStr ? [] : (cat.examples || []);

              return (
                <div className="category-card" key={idx}>
                  <div className="category-card-header">
                    <span className="category-name-badge">{name}</span>
                  </div>
                  {desc && <p className="category-desc">{desc}</p>}
                  {catExamples.length > 0 && (
                    <div className="category-examples">
                      <span className="examples-label">Examples:</span>
                      <div className="examples-pills">
                        {catExamples.map((ex, exIdx) => (
                          <span className="example-pill" key={exIdx}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 3b. ANIMAL HOMES
    // =========================================================================
    case "animalHomes": {
      if (slide.categories) {
        const categories = slide.categories;
        return (
          <div className="slide-content">
            <div className="slide-header-bar">
              <span className="slide-type-badge">Homes</span>
              <h1>{slide.title || "Where Do Animals Live?"}</h1>
            </div>
            <div className="categories-grid">
              {categories.map((cat, idx) => (
                <div className="category-card" key={idx}>
                  <div className="category-card-header">
                    <span className="category-name-badge">{cat.name || cat.title}</span>
                  </div>
                  <p className="category-desc">{cat.description || cat.content}</p>
                  {cat.examples && cat.examples.length > 0 && (
                    <div className="category-examples">
                      <span className="examples-label">Examples:</span>
                      <div className="examples-pills">
                        {cat.examples.map((ex, exIdx) => (
                          <span className="example-pill" key={exIdx}>
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      const homes = slide.homes || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Animal Homes</span>
            <h1>{slide.title || "Homes of Animals"}</h1>
          </div>
          <div className="animal-homes-grid">
            {homes.map((item, idx) => (
              <div className="animal-home-card" key={idx}>
                <span className="animal-name-badge">{item.animal}</span>
                <span className="arrow-sep">➔</span>
                <span className="home-badge">{item.home}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 4. PLANT PARTS / BODY PARTS / BODY FUNCTIONS / SENSE ORGANS
    // =========================================================================
    case "plantParts":
    case "parts":
    case "bodyParts":
    case "bodyFunctions":
    case "senseOrgans": {
      const parts = slide.parts || slide.functions || slide.organs || slide.components || slide.items || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Structure & Function</span>
            <h1>{slide.title || "Parts & Functions"}</h1>
          </div>

          {slide.introduction && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              <p>{slide.introduction}</p>
            </div>
          )}

          <div className="plant-parts-grid">
            {parts.map((part, idx) => {
              const isObj = typeof part === "object" && part !== null;
              const name = isObj ? part.name || part.part || part.organ || part.title : part;
              const desc = isObj ? part.description || part.function || part.text : null;

              return (
                <div className="plant-part-card" key={idx}>
                  <div className="part-header">
                    <span className="part-num-badge">{idx + 1}</span>
                    <span className="part-name-badge">{name}</span>
                  </div>
                  {desc && <p className="part-desc">{desc}</p>}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 5. PLANT CYCLE / PROCESS / LIFECYCLE
    // =========================================================================
    case "plantCycle":
    case "cycle":
    case "process":
    case "lifecycle": {
      const steps = slide.steps || slide.stages || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Process Flow</span>
            <h1>{slide.title || "Lifecycle"}</h1>
          </div>

          {steps.length > 0 && (
            <div className="cycle-flow-container">
              {steps.map((step, idx) => (
                <div className="cycle-step-item" key={idx}>
                  <div className="cycle-step-bubble">
                    <span className="step-bubble-num">{idx + 1}</span>
                    <span className="step-bubble-text">{step}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="cycle-arrow-connector">→</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {slide.content && (
            <div className="concept-lead-box" style={{ marginTop: "24px" }}>
              <span className="note-badge">Cycle Description</span>
              <p style={{ marginTop: "8px" }}>{slide.content}</p>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 6. MIND MAP / CONCEPT MAP
    // =========================================================================
    case "mindMap":
    case "conceptMap": {
      const points = slide.points || slide.items || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Mind Map</span>
            <h1>{slide.title || "Concept Map"}</h1>
          </div>

          {slide.centralTopic && (
            <div className="mindmap-central-bar">
              <span className="mindmap-central-tag">Central Topic</span>
              <span className="mindmap-central-title">{slide.centralTopic}</span>
            </div>
          )}

          <div className="mindmap-grid">
            {points.map((pt, idx) => (
              <div className="mindmap-card" key={idx}>
                <span className="mindmap-node-dot" />
                <p>{pt}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 7. PRACTICE (SECTIONS / FILL IN THE BLANKS / CLASSIFICATION)
    // =========================================================================
    case "practice":
    case "exercises": {
      const sections = slide.sections || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Practice Exercises</span>
            <h1>{slide.title || "Let's Practise"}</h1>
          </div>

          <div className="practice-sections-list">
            {sections.map((sec, secIdx) => {
              if (sec.type === "fillInTheBlanks") {
                return (
                  <div className="practice-section-card" key={secIdx}>
                    <div className="section-title-bar">
                      <span className="sec-type-badge">Fill in the Blanks</span>
                    </div>

                    {sec.wordBox && (
                      <div className="wordbox-wrapper">
                        <span className="wordbox-label">Word Box:</span>
                        <div className="wordbox-pills">
                          {sec.wordBox.map((w, wIdx) => (
                            <span className="wordbox-pill" key={wIdx}>
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="blanks-list">
                      {(sec.questions || []).map((q, qIdx) => (
                        <div className="blank-item" key={qIdx}>
                          <span className="blank-num">{qIdx + 1}.</span>
                          <span className="blank-text">{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (sec.type === "classification") {
                return (
                  <div className="practice-section-card" key={secIdx}>
                    <div className="section-title-bar">
                      <span className="sec-type-badge">Classification</span>
                    </div>
                    {sec.instruction && (
                      <p className="instruction-text">{sec.instruction}</p>
                    )}
                    <div className="classification-pills-row">
                      {(sec.items || []).map((it, itIdx) => (
                        <div className="classification-pill-card" key={itIdx}>
                          <span className="pill-item-name">{it}</span>
                          <span className="pill-item-blank">[ &nbsp; ]</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 8. WORD SEARCH
    // =========================================================================
    case "wordSearch": {
      const answers = slide.answers || slide.words || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Activity</span>
            <h1>{slide.title || "Word Search"}</h1>
          </div>

          {slide.instruction && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              <p>{slide.instruction}</p>
            </div>
          )}

          {answers.length > 0 && (
            <div className="wordsearch-container">
              <span className="wordsearch-badge">Hidden Words to Find:</span>
              <div className="wordsearch-tags">
                {answers.map((ans, idx) => (
                  <span className="wordsearch-tag" key={idx}>
                    {ans}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 9. HOTS (HIGHER ORDER THINKING SKILLS)
    // =========================================================================
    case "hots": {
      const questions = slide.questions || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Critical Thinking</span>
            <h1>{slide.title || "Higher Order Thinking Skills"}</h1>
          </div>

          <div className="hots-container">
            {questions.map((q, idx) => (
              <div className="hots-card" key={idx}>
                <span className="hots-q-badge">Question {idx + 1}</span>
                <p className="hots-q-text">{q}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 10. LIFE SKILLS
    // =========================================================================
    case "lifeSkill":
    case "lifeSkills": {
      const parts = slide.parts || slide.skills || slide.items || [];
      const questions = slide.questions || [];
      const hasContent = typeof slide.content === "string" && slide.content;

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Life Skill</span>
            <h1>{slide.title || "Life Skill"}</h1>
          </div>

          {(slide.activity || hasContent) && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              <span className="note-badge">
                {slide.activity ? "Task" : "Key Insight"}
              </span>
              <p style={{ marginTop: "8px" }}>{slide.activity || slide.content}</p>
            </div>
          )}

          {questions.length > 0 && (
            <div className="question-list">
              {questions.map((question, index) => (
                <div className="question-item-card" key={index}>
                  <span className="number-badge">{index + 1}</span>
                  <span className="question-text">{question}</span>
                </div>
              ))}
            </div>
          )}

          {parts.length > 0 && (
            <div className="lifeskills-grid">
              {parts.map((p, idx) => (
                <div className="lifeskill-pill-card" key={idx}>
                  <span className="lifeskill-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 11. EXPLORE MORE
    // =========================================================================
    case "exploreMore": {
      const acts = slide.activities || slide.items || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Hands-On Extension</span>
            <h1>{slide.title || "Explore More"}</h1>
          </div>

          <div className="story-grid">
            {acts.map((act, idx) => (
              <div className="story-point-card" key={idx}>
                <span className="point-indicator">{idx + 1}</span>
                <p>{act}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 12. TEACHER'S NOTE
    // =========================================================================
    case "teacherNote":
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Pedagogical Guidance</span>
            <h1>{slide.title || "Teacher's Note"}</h1>
          </div>

          <div className="teacher-note-card">
            <span className="teacher-note-tag">Teaching Advice</span>
            <p>{slide.content}</p>
          </div>
        </div>
      );

    // =========================================================================
    // 13. COMPARISON / DIFFERENCES
    // =========================================================================
    case "comparison":
    case "differences": {
      const col1 = slide.column1 || slide.left || {
        title: "Category 1",
        items: [],
      };
      const col2 = slide.column2 || slide.right || {
        title: "Category 2",
        items: [],
      };
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Comparison</span>
            <h1>{slide.title || "Key Differences"}</h1>
          </div>

          <div className="comparison-columns">
            <div className="comparison-box col-left">
              <div className="comp-box-header">{col1.title}</div>
              <div className="comp-box-body">
                {(col1.items || []).map((item, idx) => (
                  <div className="comp-item" key={idx}>
                    <span className="comp-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="comparison-box col-right">
              <div className="comp-box-header">{col2.title}</div>
              <div className="comp-box-body">
                {(col2.items || []).map((item, idx) => (
                  <div className="comp-item" key={idx}>
                    <span className="comp-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 14. VOCABULARY / KEY TERMS / DEFINITIONS / MAGIC WORDS
    // =========================================================================
    case "vocabulary":
    case "keyTerms":
    case "definitions":
    case "magicWords": {
      const items =
        slide.words ||
        slide.terms ||
        slide.definitions ||
        slide.items ||
        (slide.matching
          ? slide.matching.map((m) =>
              Array.isArray(m)
                ? { word: m[0], meaning: m[1] }
                : { word: m.word || m.term, meaning: m.meaning || m.definition }
            )
          : []);
      const badgeLabel =
        slide.type === "keyTerms"
          ? "Key Terms"
          : slide.type === "definitions"
            ? "Definitions"
            : slide.type === "magicWords"
              ? "Magic Words"
              : "Vocabulary";
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title || "Key Words"}</h1>
          </div>

          {slide.activities && (
            <div className="activity-card" style={{ marginBottom: "20px" }}>
              <span className="activity-badge">Instruction</span>
              <div className="activity-sublist">
                {slide.activities.map((act, index) => (
                  <p key={index}>
                    {index + 1}. {act}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="vocabulary-grid">
            {items.map((item, index) => {
              const isStr = typeof item === "string";
              const word = isStr ? item : item.word || item.term || item.title;
              const meaning = isStr
                ? ""
                : item.meaning || item.definition || item.description || item.use;

              return (
                <div className="vocabulary-card" key={index}>
                  <div className="vocab-header">
                    <span className="vocab-word-badge">{word}</span>
                  </div>
                  {meaning && <p className="vocab-meaning-text">{meaning}</p>}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 15. QUESTIONS / BEFORE YOU READ / THINK & SPEAK / TALE TALK / ORAL QUIZ / THINK & WRITE / CHAT TIME
    // =========================================================================
    case "readingForMeaning":
    case "beforeYouRead":
    case "discussion":
    case "thinkAndAnswer":
    case "speakAndShare":
    case "taleTalk":
    case "oralQuiz":
    case "thinkAndWrite":
    case "chatTime": {
      const qList =
        slide.questions ||
        slide.points ||
        slide.discussion ||
        slide.activities ||
        slide.situations ||
        slide.items ||
        (Array.isArray(slide.content) ? slide.content : []);
      const badgeLabel =
        slide.type === "readingForMeaning"
          ? "Reading for Meaning"
          : slide.type === "beforeYouRead"
          ? "Pre-Reading"
          : slide.type === "thinkAndAnswer"
            ? "Discussion"
            : slide.type === "speakAndShare"
              ? "Speaking"
              : slide.type === "taleTalk"
                ? "Tale Talk"
                : slide.type === "oralQuiz"
                  ? "Oral Quiz"
                  : slide.type === "thinkAndWrite"
                    ? "Think & Write"
                    : slide.type === "chatTime"
                      ? "Chat Time"
                      : "Discussion";

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title}</h1>
          </div>

          {typeof slide.content === "string" && slide.content && (
            <div className="concept-lead-box" style={{ marginBottom: qList.length > 0 ? "20px" : "0" }}>
              <p>{slide.content}</p>
            </div>
          )}

          {qList.length > 0 && (
            <div className="question-list">
              {qList.map((question, index) => {
                const text =
                  typeof question === "string"
                    ? question
                    : getDisplayText(question);

                return (
                  <div className="question-item-card" key={index}>
                    <span className="number-badge">{index + 1}</span>
                    <span className="question-text">{text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {slide.activity && typeof slide.activity === "string" && (
            <div className="activity-card">
              <span className="activity-badge">Class Activity</span>
              <p className="activity-text">{slide.activity}</p>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 16. READING COMPREHENSION / QUIZ
    // =========================================================================
    case "readingComprehension":
    case "quiz":
    case "questions": {
      const qList =
        slide.questions || slide.quiz || slide.exercises || slide.items || [];
      const badgeLabel =
        slide.type === "quiz"
          ? "Quiz"
          : slide.type === "questions"
            ? "Practice Questions"
            : "Comprehension";
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title || "Check Your Understanding"}</h1>
          </div>

          <div className="comprehension-grid">
            {qList.map((item, index) => {
              const isObj = typeof item === "object" && item !== null;
              const questionText = isObj ? item.question || item.q : item;
              const options = isObj ? item.options || item.choices || [] : [];

              return (
                <div className="comprehension-card" key={index}>
                  <div className="comp-question-header">
                    <span className="comp-q-badge">Q{index + 1}</span>
                    <span className="comp-q-text">{questionText}</span>
                  </div>

                  {options.length > 0 && (
                    <div className="comp-options-grid">
                      {options.map((option, optionIndex) => (
                        <div className="comp-option-pill" key={optionIndex}>
                          <span className="comp-opt-letter">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="comp-opt-text">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 17. GRAMMAR / FORMULA / RULE
    // =========================================================================
    case "grammar":
    case "formula":
    case "rule": {
      const badgeLabel =
        slide.type === "formula"
          ? "Formula"
          : slide.type === "rule"
            ? "Rule"
            : "Grammar";
      const ruleText =
        slide.definition ||
        slide.formula ||
        slide.rule ||
        (typeof slide.content === "string" ? slide.content : "") ||
        (slide.topic && slide.topic.length > 35 ? slide.topic : "");
      const examples = slide.examples || slide.words || [];
      const practice = slide.practice || slide.exercises || slide.activities || [];

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title}</h1>
          </div>

          {slide.topic && (
            <div className="grammar-topic-bar">
              <span className="topic-pill">{slide.topic}</span>
            </div>
          )}

          {ruleText && (
            <div className="grammar-definition-card">
              <span className="def-badge">
                {slide.type === "formula"
                  ? "Formula / Principle"
                  : "Rule / Definition"}
              </span>
              <p>{ruleText}</p>
            </div>
          )}

          {(examples.length > 0 || practice.length > 0) && (
            <div className="grammar-columns">
              {examples.length > 0 && (
                <div className="grammar-box examples-box">
                  <div className="box-header">Examples</div>
                  <div className="box-body">
                    {examples.map((example, index) => (
                      <div className="grammar-item" key={index}>
                        <span className="grammar-dot" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {practice.length > 0 && (
                <div className="grammar-box practice-box">
                  <div className="box-header">Practice</div>
                  <div className="box-body">
                    {practice.map((item, index) => (
                      <div className="grammar-item" key={index}>
                        <span className="grammar-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 18. ACTIVITY / EXPERIMENT / PROJECT / FUN ZONE
    // =========================================================================
    case "activity":
    case "experiment":
    case "project":
    case "funZone": {
      const badgeLabel =
        slide.type === "experiment"
          ? "Experiment"
          : slide.type === "project"
            ? "Project"
            : slide.type === "funZone"
              ? "Fun Zone"
              : "Activity";
      const topicText =
        (typeof slide.activity === "string" && slide.activity.length <= 40 ? slide.activity : "") ||
        (typeof slide.objective === "string" && slide.objective.length <= 40 ? slide.objective : "") ||
        (typeof slide.topic === "string" && slide.topic.length <= 40 ? slide.topic : "");

      const leadContent =
        slide.content ||
        (typeof slide.instruction === "string" && slide.instruction) ||
        (typeof slide.activity === "string" && slide.activity.length > 40 ? slide.activity : "") ||
        (typeof slide.objective === "string" && slide.objective.length > 40 ? slide.objective : "") ||
        "";

      const steps =
        slide.instructions ||
        slide.steps ||
        slide.activities ||
        slide.statements ||
        slide.options ||
        slide.examples ||
        [];

      // If activity has multiple-choice questions
      if (slide.questions && Array.isArray(slide.questions)) {
        return (
          <div className="slide-content">
            <div className="slide-header-bar">
              <span className="slide-type-badge">{badgeLabel}</span>
              <h1>{slide.title}</h1>
            </div>

            {leadContent && (
              <div className="feature-intro-card" style={{ marginBottom: "16px" }}>
                <p className="large-text">{leadContent}</p>
              </div>
            )}

            <div className="comprehension-grid">
              {slide.questions.map((item, index) => {
                const isObj = typeof item === "object" && item !== null;
                const questionText = isObj ? item.question || item.q : item;
                const options = isObj ? item.options || item.choices || [] : [];

                return (
                  <div className="comprehension-card" key={index}>
                    <div className="comp-question-header">
                      <span className="comp-q-badge">{index + 1}</span>
                      <span className="comp-q-text">{questionText}</span>
                    </div>

                    {options.length > 0 && (
                      <div className="comp-options-grid">
                        {options.map((option, optionIndex) => (
                          <div className="comp-option-pill" key={optionIndex}>
                            <span className="comp-opt-letter">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="comp-opt-text">{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badgeLabel}</span>
            <h1>{slide.title}</h1>
          </div>

          {topicText && (
            <div className="fun-topic-bar">
              <span className="topic-pill">{topicText}</span>
            </div>
          )}

          {leadContent && (
            <div className="feature-intro-card">
              <p className="large-text">{leadContent}</p>
            </div>
          )}

          {slide.words && Array.isArray(slide.words) && (
            <div className="activity-wordbank" style={{ marginBottom: "16px" }}>
              <div className="wordbank-header">Word Bank</div>
              <div className="examples-pills">
                {slide.words.map((w, wIdx) => (
                  <span className="example-pill" key={wIdx}>{w}</span>
                ))}
              </div>
            </div>
          )}

          {slide.topics && Array.isArray(slide.topics) && (
            <div className="activity-wordbank" style={{ marginBottom: "16px" }}>
              <div className="wordbank-header">Topics</div>
              <div className="examples-pills">
                {slide.topics.map((t, tIdx) => (
                  <span className="example-pill topic-pill" key={tIdx}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {slide.situations && Array.isArray(slide.situations) && (
            <div className="step-cards-list">
              {slide.situations.map((sit, index) => {
                const expected = slide.expectedWords && slide.expectedWords[index];
                return (
                  <div className="step-card" key={index}>
                    <span className="step-badge">Situation {index + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p className="step-text">{sit}</p>
                      {expected && (
                        <span className="task-answer-pill">
                          Say: {expected}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {slide.materials && (
            <div className="activity-card" style={{ marginBottom: "16px" }}>
              <span className="activity-badge">Things You Need</span>
              <p className="activity-text">
                {Array.isArray(slide.materials)
                  ? slide.materials.join(", ")
                  : slide.materials}
              </p>
            </div>
          )}

          {steps.length > 0 && (
            <div className="step-cards-list">
              {steps.map((instruction, index) => {
                const answer =
                  slide.answers && slide.answers[index]
                    ? slide.answers[index]
                    : null;

                return (
                  <div className="step-card" key={index}>
                    <span className="step-badge">Task {index + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p className="step-text">{instruction}</p>
                      {answer && (
                        <span className="task-answer-pill">
                          Answer: {answer}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 18b. DESCRIBE PICTURE / PICTURE ACTIVITY
    // =========================================================================
    case "describePicture": {
      const instruction =
        slide.activity ||
        slide.instruction ||
        (typeof slide.content === "string" ? slide.content : null);
      const items = slide.items || slide.points || [];

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Picture Activity</span>
            <h1>{slide.title || "Describe the Picture"}</h1>
          </div>

          {instruction && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              <span className="note-badge">Task</span>
              <p style={{ marginTop: "8px", fontSize: "16px" }}>{instruction}</p>
            </div>
          )}

          {items.length > 0 && (
            <div className="story-grid">
              {items.map((item, idx) => {
                const text = getDisplayText(item);
                return (
                  <div className="story-point-card" key={idx}>
                    <span className="point-indicator">{idx + 1}</span>
                    <div>
                      <span>{text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 19. DID YOU KNOW / FUN FACTS
    // =========================================================================
    case "didYouKnow":
    case "funFacts": {
      const facts =
        slide.facts ||
        slide.points ||
        (slide.content ? [slide.content] : []);
      return (
        <div className="slide-content centered">
          <div className="fact-hero-card">
            <span className="fact-badge">Did You Know?</span>
            <h1>{slide.title || "Fascinating Facts"}</h1>
            <div className="fact-list">
              {facts.map((fact, idx) => (
                <div className="fact-card-item" key={idx}>
                  <span className="fact-dot" />
                  <p>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 20. SUMMARY
    // =========================================================================
    case "recap":
    case "summary":
    case "keyTakeaways": {
      const points =
        slide.points ||
        slide.items ||
        (slide.content ? [slide.content] : []);
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Summary</span>
            <h1>{slide.title || "Chapter Summary"}</h1>
          </div>

          <div className="summary-grid">
            {points.map((pt, idx) => (
              <div className="summary-point-card" key={idx}>
                <span className="summary-point-num">{idx + 1}</span>
                <p>{pt}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 21. INTRODUCTION / SHOWCASE
    // =========================================================================
    case "introduction": {
      const points = slide.points || (Array.isArray(slide.content) ? slide.content : []);
      if (points.length > 0) {
        return (
          <div className="slide-content">
            <div className="slide-header-bar">
              <span className="slide-type-badge">Introduction</span>
              <h1>{slide.title}</h1>
            </div>

            {typeof slide.content === "string" && slide.content && (
              <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
                <p>{slide.content}</p>
              </div>
            )}

            <div className="story-grid">
              {points.map((point, index) => {
                const isObj = typeof point === "object" && point !== null;
                const pointText = isObj ? point.text || point.description : point;
                const pointTitle = isObj ? point.title || point.heading : null;

                return (
                  <div className="story-point-card" key={index}>
                    <span className="point-indicator">{index + 1}</span>
                    <div>
                      {pointTitle && <strong>{pointTitle}: </strong>}
                      <span>{pointText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      return (
        <div className="slide-content centered">
          <div className="showcase-card">
            <span className="showcase-badge">Introduction</span>
            <h1>{slide.title}</h1>
            <p className="large-text">{slide.content}</p>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 22. LESSON FOR LIFE
    // =========================================================================
    case "lessonForLife": {
      const rawList =
        slide.points ||
        slide.items ||
        slide.lines ||
        (Array.isArray(slide.content)
          ? slide.content
          : typeof slide.content === "string" && slide.content.trim()
          ? [slide.content]
          : typeof slide.text === "string" && slide.text.trim()
          ? [slide.text]
          : typeof slide.quote === "string" && slide.quote.trim()
          ? [slide.quote]
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

      return (
        <div className="slide-content centered">
          <div className="life-lesson-card">
            <span className="life-badge">{slide.badge || "Lesson For Life"}</span>
            <h1>{slide.title || "Remember"}</h1>
            {points.length > 0 ? (
              points.map((pt, idx) => {
                const hasNumber = /^\d+[.)]\s*/.test(pt);
                const text = hasNumber || points.length === 1 ? pt : `${idx + 1}.  ${pt}`;
                return (
                  <p className="life-quote" key={idx} style={{ margin: "10px 0" }}>
                    {text}
                  </p>
                );
              })
            ) : (
              <p className="life-quote">
                {typeof slide.content === "string" && slide.content.trim()
                  ? slide.content
                  : "Every experience teaches us a valuable life lesson."}
              </p>
            )}
          </div>
        </div>
      );
    }

    // =========================================================================
    // EXAMPLES (Grammar Pairs, Lists, Word Sets)
    // =========================================================================
    case "example":
    case "examples": {
      const pairs = slide.pairs || [];
      const examples = slide.examples || [];
      const points = slide.points || [];
      const activities = slide.activities || [];

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Examples</span>
            <h1>{slide.title || "Examples"}</h1>
          </div>

          {points.length > 0 && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              {points.map((pt, idx) => (
                <p key={idx}>{pt}</p>
              ))}
            </div>
          )}

          {pairs.length > 0 && (
            <div className="pairs-grid">
              {pairs.map((pair, idx) => {
                const parts = pair.split("-").map((s) => s.trim());
                return (
                  <div className="pair-card" key={idx}>
                    <span className="pair-left">{parts[0] || pair}</span>
                    <span className="pair-arrow">➔</span>
                    <span className="pair-right">{parts[1] || ""}</span>
                  </div>
                );
              })}
            </div>
          )}

          {examples.length > 0 && (
            <div className="pairs-grid">
              {examples.map((ex, idx) => {
                const exampleText = getDisplayText(ex);
                const hasHyphen = exampleText.includes("-");
                if (hasHyphen) {
                  const parts = exampleText.split("-").map((s) => s.trim());
                  return (
                    <div className="pair-card" key={idx}>
                      <span className="pair-left">{parts[0]}</span>
                      <span className="pair-arrow">➔</span>
                      <span className="pair-right">{parts[1]}</span>
                    </div>
                  );
                }
                return (
                  <div className="example-item-card" key={idx}>
                    <span className="example-num">{idx + 1}</span>
                    <span className="example-text">{exampleText}</span>
                  </div>
                );
              })}
            </div>
          )}

          {activities.length > 0 && (
            <div className="activity-card" style={{ marginTop: "20px" }}>
              <span className="activity-badge">Activity</span>
              <div className="activity-sublist" style={{ marginTop: "8px" }}>
                {activities.map((act, idx) => (
                  <p key={idx}>{idx + 1}. {act}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // READING PASSAGE / STORY COMPREHENSION
    // =========================================================================
    case "reading": {
      const points = slide.points || [];
      const questions = slide.questions || [];
      const activities = slide.activities || [];

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Reading</span>
            <h1>{slide.title || "Reading"}</h1>
          </div>

          <div className="story-grid">
            {points.map((pt, idx) => (
              <div className="story-point-card" key={idx}>
                <span className="point-indicator">{idx + 1}</span>
                <p>{pt}</p>
              </div>
            ))}
          </div>

          {questions.length > 0 && (
            <div className="question-list" style={{ marginTop: "20px" }}>
              <span className="note-badge" style={{ display: "inline-block", marginBottom: "10px" }}>
                Comprehension Questions
              </span>
              {questions.map((q, idx) => (
                <div className="question-item-card" key={idx}>
                  <span className="number-badge">{idx + 1}</span>
                  <span className="question-text">{q}</span>
                </div>
              ))}
            </div>
          )}

          {activities.length > 0 && (
            <div className="activity-card" style={{ marginTop: "20px" }}>
              <span className="activity-badge">Activities</span>
              <div className="activity-sublist" style={{ marginTop: "8px" }}>
                {activities.map((act, idx) => (
                  <p key={idx}>{idx + 1}. {act}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // =========================================================================
    // 23. MOTIVATION
    // =========================================================================
    case "motivation":
      return (
        <div className="slide-content centered">
          <div className="motivation-hero-card">
            <span className="motivation-badge">Inspiration</span>
            <h1>{slide.title}</h1>
            <p className="motivation-quote">{slide.content}</p>
          </div>
        </div>
      );

    // =========================================================================
    // 24. THANK YOU
    // =========================================================================
    case "thankYou":
      return (
        <div className="slide-content centered">
          <div className="thankyou-hero-card">
            <span className="thankyou-badge">Well Done</span>
            <h1>{slide.title}</h1>
            <p className="thankyou-quote">{slide.content}</p>
          </div>
        </div>
      );

    // =========================================================================
    // 25. HOUSES / ROOMS / MATERIALS / PROPERTIES / SPACE / ASTRONAUTS / KEYWORDS
    // =========================================================================
    case "typesOfHouses":
    case "houseRooms":
    case "clothingMaterials":
    case "airProperties":
    case "spaceBasics":
    case "astronauts":
    case "keywords": {
      const items =
        slide.houses ||
        slide.rooms ||
        slide.materials ||
        slide.properties ||
        slide.terms ||
        slide.people ||
        slide.words ||
        [];

      const badge =
        slide.type === "typesOfHouses"
          ? "Houses"
          : slide.type === "houseRooms"
          ? "Rooms"
          : slide.type === "clothingMaterials"
          ? "Clothing Materials"
          : slide.type === "airProperties"
          ? "Air Properties"
          : slide.type === "spaceBasics"
          ? "Space Facts"
          : slide.type === "astronauts"
          ? "Astronauts"
          : "Keywords";

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">{badge}</span>
            <h1>{slide.title}</h1>
          </div>

          {typeof slide.content === "string" && slide.content && (
            <div className="concept-lead-box" style={{ marginBottom: "20px" }}>
              <p>{slide.content}</p>
            </div>
          )}

          <div className="story-grid">
            {items.map((item, idx) => {
              const isObj = typeof item === "object" && item !== null;
              const title = isObj
                ? item.name || item.room || item.word || item.title
                : null;
              const text = isObj
                ? item.description ||
                  item.activity ||
                  item.meaning ||
                  item.achievement ||
                  item.function ||
                  (item.source ? `Source: ${item.source}` : "")
                : item;
              const uses = isObj && item.uses ? item.uses : null;

              return (
                <div className="story-point-card" key={idx}>
                  <span className="point-indicator">{idx + 1}</span>
                  <div>
                    {title && <strong>{title}: </strong>}
                    <span>{text}</span>
                    {uses && Array.isArray(uses) && (
                      <div style={{ marginTop: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "bold" }}>
                          Used for:{" "}
                        </span>
                        <span style={{ fontSize: "13px", color: "var(--primary)" }}>
                          {uses.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 26. SAFETY RULES
    // =========================================================================
    case "roadSafety":
    case "travelSafety":
    case "playgroundSafety":
    case "swimmingSafety":
    case "homeSafety":
    case "schoolSafety": {
      const rules = slide.rules || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Safety Rules</span>
            <h1>{slide.title}</h1>
          </div>
          <div className="story-grid">
            {rules.map((rule, idx) => (
              <div className="story-point-card" key={idx}>
                <span className="point-indicator">{idx + 1}</span>
                <div>
                  <span>{rule}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 27. WATER USES / SOURCES / AIR USES / SEASONS
    // =========================================================================
    case "waterUses":
    case "waterSources":
    case "airUses":
    case "saveWater":
    case "seasons": {
      const items =
        slide.uses ||
        slide.sources ||
        slide.seasons ||
        slide.points ||
        [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">
              {slide.type === "seasons" ? "Seasons" : "Uses & Sources"}
            </span>
            <h1>{slide.title}</h1>
          </div>
          <div className="story-grid">
            {items.map((item, idx) => (
              <div className="story-point-card" key={idx}>
                <span className="point-indicator">{idx + 1}</span>
                <div>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 28. WEATHER TYPES
    // =========================================================================
    case "weatherTypes": {
      const types = slide.types || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Weather</span>
            <h1>{slide.title}</h1>
          </div>
          <div className="categories-grid">
            {types.map((item, idx) => (
              <div className="category-card" key={idx}>
                <div className="category-card-header">
                  <span className="category-name-badge">{item.name}</span>
                </div>
                <p className="category-desc">{item.description}</p>
                {item.clothes && (
                  <p style={{ fontSize: "13px", color: "#4b5563", margin: "2px 0" }}>
                    <strong>Clothes: </strong>{item.clothes}
                  </p>
                )}
                {item.food && (
                  <p style={{ fontSize: "13px", color: "#4b5563", margin: "2px 0" }}>
                    <strong>Food: </strong>{item.food}
                  </p>
                )}
                {item.thingsUsed && Array.isArray(item.thingsUsed) && (
                  <p style={{ fontSize: "13px", color: "#4b5563", margin: "2px 0" }}>
                    <strong>Things used: </strong>{item.thingsUsed.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 29. TRUE OR FALSE
    // =========================================================================
    case "trueFalse": {
      const statements = slide.statements || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Quiz</span>
            <h1>{slide.title || "True or False"}</h1>
          </div>
          <div className="story-grid">
            {statements.map((st, idx) => (
              <div
                className="story-point-card"
                key={idx}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="point-indicator">{idx + 1}</span>
                  <span>{st.statement}</span>
                </div>
                <span
                  style={{
                    fontWeight: "bold",
                    padding: "4px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    background: st.answer === "True" ? "#dcfce7" : "#fee2e2",
                    color: st.answer === "True" ? "#15803d" : "#b91c1c",
                  }}
                >
                  {st.answer}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 30. MATCH THE FOLLOWING
    // =========================================================================
    case "matchTheFollowing": {
      const left = slide.left || [];
      const right = slide.right || [];
      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">Match Exercise</span>
            <h1>{slide.title || "Match the Following"}</h1>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h3 style={{ fontSize: "16px", color: "var(--primary)", fontWeight: 700 }}>Column A</h3>
              {left.map((item, idx) => (
                <div className="story-point-card" key={idx}>
                  <span className="point-indicator">{idx + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h3 style={{ fontSize: "16px", color: "var(--primary)", fontWeight: 700 }}>Column B</h3>
              {right.map((item, idx) => (
                <div className="story-point-card" key={idx}>
                  <span className="point-indicator">{String.fromCharCode(65 + idx)}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // =========================================================================
    // 31. UNIVERSAL SMART FALLBACK (NEVER SHOWS UNKNOWN SLIDE TYPE)
    // =========================================================================
    default: {
      // Dynamic inspection of whatever object keys were saved in pptData.js!
      const leadText =
        (typeof slide.content === "string" && slide.content) ||
        (typeof slide.activity === "string" && slide.activity) ||
        (typeof slide.instruction === "string" && slide.instruction) ||
        (typeof slide.note === "string" && slide.note) ||
        null;

      const points =
        slide.points ||
        slide.questions ||
        slide.situations ||
        slide.items ||
        slide.facts ||
        slide.activities ||
        slide.steps ||
        slide.pairs ||
        slide.examples ||
        slide.topics ||
        slide.rules ||
        slide.uses ||
        slide.sources ||
        slide.seasons ||
        slide.goodHabits ||
        slide.methods ||
        slide.phases ||
        slide.meals ||
        slide.materials ||
        slide.categories ||
        slide.homes ||
        slide.parts ||
        slide.functions ||
        slide.organs ||
        slide.houses ||
        slide.rooms ||
        slide.properties ||
        slide.terms ||
        slide.people ||
        slide.words ||
        slide.statements ||
        (Array.isArray(slide.content) ? slide.content : []);

      return (
        <div className="slide-content">
          <div className="slide-header-bar">
            <span className="slide-type-badge">
              {slide.type ? slide.type.replace(/([A-Z])/g, " $1") : "Information"}
            </span>
            <h1>{slide.title || slide.heading || "Key Concept"}</h1>
          </div>

          {leadText && (
            <div className="concept-lead-box" style={{ marginBottom: points.length > 0 ? "20px" : "0" }}>
              <p>{leadText}</p>
            </div>
          )}

          {points.length > 0 && (
            <div className="story-grid">
              {points.map((pt, idx) => {
                const isObj = typeof pt === "object" && pt !== null;
                const title = isObj
                  ? pt.title ||
                    pt.name ||
                    pt.part ||
                    pt.organ ||
                    pt.animal ||
                    pt.room ||
                    pt.word ||
                    pt.heading ||
                    pt.question
                  : null;
                const text = getDisplayText(pt);

                return (
                  <div className="story-point-card" key={idx}>
                    <span className="point-indicator">{idx + 1}</span>
                    <div>
                      {title && <strong>{title}: </strong>}
                      <span>{text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
  }
}

export default SlideRenderer;