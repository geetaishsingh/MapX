import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { useRef } from "react";
import { lessonPlans as importedLessonPlans } from "./lessonPlans";


const lessonPlans = importedLessonPlans;

const toArray = (value) => (Array.isArray(value) ? value : []);

const normalizeContentCovered = (items) =>
  toArray(items).map((item) => ({
    topic: item?.topic || "",
    points: item?.keyPoints || item?.points || "",
  }));

const getLessonDataFromPlan = (plan = {}) => {
  const sections = toArray(plan.sections);
  const classValue = plan.className || plan.class || "";
  const normalizedClassName = String(classValue).trim();
  const sectionTitles = sections
    .map((section) => section.title)
    .filter(Boolean);
  const writeQuestions = sections
    .filter((section) => section.type === "write")
    .flatMap((section) => toArray(section.questions))
    .map((question) => question.question)
    .filter(Boolean);

  return {
    bookName: "MAGNOVA BOOKS",
    planTitle: "LESSON PLAN",
    className: normalizedClassName
      ? /^class\b/i.test(normalizedClassName)
        ? normalizedClassName
        : `Class ${normalizedClassName}`
      : "Class",
    subject: plan.subject || "English",
    chapterNumber:
      plan.chapterNumber || (plan.chapter ? `Chapter ${plan.chapter}` : ""),
    chapterName: plan.chapterName || plan.title || "",
    format: plan.format || "Chapter-wise lesson plan",
    learningObjectives: toArray(plan.learningObjectives || plan.learningFocus),
    contentCovered: normalizeContentCovered(
      plan.contentToBeCovered ||
        sections.map((section) => ({
          topic: section.title,
          points: toArray(section.questions)
            .map((question) => question.question)
            .join(" "),
        })),
    ),
    teachingMethod: toArray(plan.teachingMethodActivities || sectionTitles),
    teachingResources: toArray(
      plan.teachingResources || ["Textbook", "Worksheet"],
    ),
    assessment: toArray(plan.assessment || sectionTitles),
    learningOutcome: toArray(
      plan.expectedLearningOutcome || plan.learningFocus,
    ),
    homework: toArray(plan.homeworkExtension || writeQuestions),
  };
};

const SectionTitle = ({ fill, title, color, children }) => {
  return (
    <section className="preview-section">
      <div className="preview-section-header">
        <div className="preview-icon" style={{ backgroundColor: color }}>
          {fill}
        </div>

        <h3 style={{ color }}>{title}</h3>

        <div className="preview-line" style={{ borderColor: color }} />

        <span className="preview-dot" style={{ backgroundColor: color }} />
      </div>

      <div className="preview-section-body">{children}</div>
    </section>
  );
};

export default function LessonPlanGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lessonData, setLessonData] = useState(() =>
    getLessonDataFromPlan(lessonPlans[0]),
  );

  const goToLesson = (index) => {
    const safeIndex = Math.min(Math.max(index, 0), lessonPlans.length - 1);
    setCurrentIndex(safeIndex);
    setLessonData(getLessonDataFromPlan(lessonPlans[safeIndex]));
  };

  const goToPrevious = () => goToLesson(currentIndex - 1);
  const goToNext = () => goToLesson(currentIndex + 1);

  /* =========================
     BASIC INPUT CHANGE
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLessonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addListItem = (field) => {
    setLessonData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateListItem = (field, index, value) => {
    setLessonData((prev) => {
      const updatedList = [...prev[field]];

      updatedList[index] = value;

      return {
        ...prev,
        [field]: updatedList,
      };
    });
  };

  const removeListItem = (field, index) => {
    setLessonData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  /* =========================
     LEARNING OBJECTIVES
  ========================== */

  const addObjective = () => {
    setLessonData((prev) => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, ""],
    }));
  };

  const updateObjective = (index, value) => {
    setLessonData((prev) => {
      const updatedObjectives = [...prev.learningObjectives];

      updatedObjectives[index] = value;

      return {
        ...prev,
        learningObjectives: updatedObjectives,
      };
    });
  };

  const removeObjective = (index) => {
    setLessonData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  /* =========================
     CONTENT COVERED
  ========================== */

  const addContentRow = () => {
    setLessonData((prev) => ({
      ...prev,
      contentCovered: [
        ...prev.contentCovered,
        {
          topic: "",
          points: "",
        },
      ],
    }));
  };

  const updateContentRow = (index, field, value) => {
    setLessonData((prev) => {
      const updatedContent = [...prev.contentCovered];

      updatedContent[index] = {
        ...updatedContent[index],
        [field]: value,
      };

      return {
        ...prev,
        contentCovered: updatedContent,
      };
    });
  };

  const removeContentRow = (index) => {
    setLessonData((prev) => ({
      ...prev,
      contentCovered: prev.contentCovered.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setLessonData(getLessonDataFromPlan(lessonPlans[currentIndex]));
    }
  };

  const previewRef = useRef(null);

  const createPlanPageElements = (sourceElement) => {
    const sections = [...sourceElement.querySelectorAll(".preview-section")];
    const splitIndex = Math.max(1, Math.ceil(sections.length / 2));
    const pageRanges = [
      [0, splitIndex],
      [splitIndex, sections.length],
    ];

    return pageRanges.map(([start, end], pageIndex) => {
      const page = sourceElement.cloneNode(true);
      const pageSections = [...page.querySelectorAll(".preview-section")];

      pageSections.forEach((section, index) => {
        if (index < start || index >= end) section.remove();
      });

      if (pageIndex > 0) {
        page.querySelector(".lesson-header")?.remove();
        page.querySelector(".lesson-info-table")?.remove();
      }

      page.style.height = "auto";
      page.style.minHeight = "0";
      page.style.padding =
        pageIndex === 0 ? "25px 35px 18px" : "30px 35px 18px";
      return page;
    });
  };

  const createPdfFromCanvases = (canvases) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 6;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;
    const commonScale = Math.min(
      contentWidth / Math.max(...canvases.map((canvas) => canvas.width)),
      contentHeight / Math.max(...canvases.map((canvas) => canvas.height)),
    );
    canvases.forEach((canvas, pageIndex) => {
      const imageWidth = canvas.width * commonScale;
      const imageHeight = canvas.height * commonScale;
      const x = margin + (contentWidth - imageWidth) / 2;
      const y = margin;

      if (pageIndex > 0) pdf.addPage();

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        x,
        y,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );
    });

    return pdf;
  };

  const downloadPDF = async () => {
    const element = previewRef.current;

    if (!element) return;

    const renderContainer = document.createElement("div");
    renderContainer.style.position = "fixed";
    renderContainer.style.left = "0";
    renderContainer.style.top = "0";
    renderContainer.style.width = `${element.scrollWidth}px`;
    renderContainer.style.opacity = "0";
    renderContainer.style.pointerEvents = "none";
    renderContainer.style.zIndex = "-1";
    document.body.appendChild(renderContainer);

    const pageElements = createPlanPageElements(element);
    const canvases = [];
    for (const pageElement of pageElements) {
      renderContainer.appendChild(pageElement);
      canvases.push(
        await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        }),
      );
    }
    renderContainer.remove();

    const pdf = createPdfFromCanvases(canvases);

    pdf.save(`${lessonData.chapterName || "Lesson-Plan"}.pdf`);
  };

  const downloadAllLessonPlansAsZip = async () => {
    try {
      const zip = new JSZip();

      for (let index = 0; index < lessonPlans.length; index++) {
        const plan = lessonPlans[index];
        const planData = getLessonDataFromPlan(plan);

        const tempContainer = document.createElement("div");
        tempContainer.style.position = "fixed";
        tempContainer.style.left = "0";
        tempContainer.style.top = "0";
        tempContainer.style.width = "1100px";
        tempContainer.style.opacity = "0";
        tempContainer.style.pointerEvents = "none";
        tempContainer.style.zIndex = "-1";
        tempContainer.style.background = "#fff";
        document.body.appendChild(tempContainer);

        const tempPreview = document.createElement("main");
        tempPreview.className = "lesson-preview";
        tempPreview.innerHTML =
          document.querySelector(".lesson-preview")?.innerHTML || "";
        tempContainer.appendChild(tempPreview);

        const renderPlan = (source) => {
          const example = {
            ...source,
            bookName: "MAGNOVA BOOKS",
            planTitle: "LESSON PLAN",
            className: source.className,
            subject: source.subject,
            chapterNumber: source.chapterNumber,
            chapterName: source.chapterName,
            learningObjectives: toArray(source.learningObjectives),
            contentCovered: normalizeContentCovered(source.contentCovered),
            teachingMethod: toArray(source.teachingMethod),
            teachingResources: toArray(source.teachingResources),
            assessment: toArray(source.assessment),
            learningOutcome: toArray(source.learningOutcome),
            homework: toArray(source.homework),
          };

          const structure = document.createElement("div");
          structure.innerHTML = `
          <header class="lesson-header">
            <h1>${example.bookName}</h1>
            <h2>${example.planTitle}</h2>
            <p>${example.className} <span>•</span> ${example.subject} <span>•</span> ${example.chapterNumber} — ${example.chapterName}</p>
          </header>
          <div class="lesson-info-table">
            <div class="info-label">Subject</div>
            <div class="info-value">${example.subject}</div>
            <div class="info-label">Class</div>
            <div class="info-value">${example.className}</div>
            <div class="info-label">Chapter</div>
            <div class="info-value">${example.chapterName}</div>
            <div class="info-label">Format</div>
            <div class="info-value">${example.format}</div>
          </div>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#6b3d8f">A</div>
              <h3 style="color:#6b3d8f">Learning Objectives</h3>
              <div class="preview-line" style="border-color:#6b3d8f"></div>
              <span class="preview-dot" style="background-color:#6b3d8f"></span>
            </div>
            <div class="preview-section-body"><ul>${example.learningObjectives.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#21508e">B</div>
              <h3 style="color:#21508e">Content to be Covered</h3>
              <div class="preview-line" style="border-color:#21508e"></div>
              <span class="preview-dot" style="background-color:#21508e"></span>
            </div>
            <div class="preview-section-body">
              <div class="content-preview-table">
                <div class="content-preview-header"><div>Topic</div><div>Key Points</div></div>
                ${example.contentCovered.map((item) => `<div class="content-preview-row"><div class="topic-cell">${item.topic}</div><div>${item.points}</div></div>`).join("")}
              </div>
            </div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#27763b">C</div>
              <h3 style="color:#27763b">Teaching Method & Activities</h3>
              <div class="preview-line" style="border-color:#27763b"></div>
              <span class="preview-dot" style="background-color:#27763b"></span>
            </div>
            <div class="preview-section-body"><ul>${example.teachingMethod.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#d46a0c">D</div>
              <h3 style="color:#d46a0c">Teaching Resources</h3>
              <div class="preview-line" style="border-color:#d46a0c"></div>
              <span class="preview-dot" style="background-color:#d46a0c"></span>
            </div>
            <div class="preview-section-body"><ul>${example.teachingResources.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#258a90">E</div>
              <h3 style="color:#258a90">Assessment</h3>
              <div class="preview-line" style="border-color:#258a90"></div>
              <span class="preview-dot" style="background-color:#258a90"></span>
            </div>
            <div class="preview-section-body"><ul>${example.assessment.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#d12e69">F</div>
              <h3 style="color:#d12e69">Expected Learning Outcome</h3>
              <div class="preview-line" style="border-color:#d12e69"></div>
              <span class="preview-dot" style="background-color:#d12e69"></span>
            </div>
            <div class="preview-section-body"><ul>${example.learningOutcome.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
          <section class="preview-section">
            <div class="preview-section-header">
              <div class="preview-icon" style="background-color:#6b478b">G</div>
              <h3 style="color:#6b478b">Homework / Extension</h3>
              <div class="preview-line" style="border-color:#6b478b"></div>
              <span class="preview-dot" style="background-color:#6b478b"></span>
            </div>
            <div class="preview-section-body"><ul>${example.homework.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          </section>
        `;

          tempPreview.innerHTML = structure.innerHTML;
          return tempPreview;
        };

        const renderedPlan = renderPlan(planData);
        const pageElements = createPlanPageElements(renderedPlan);
        const canvases = [];
        for (const pageElement of pageElements) {
          tempContainer.appendChild(pageElement);
          canvases.push(
            await html2canvas(pageElement, {
              scale: 2,
              backgroundColor: "#ffffff",
              useCORS: true,
            }),
          );
        }

        const pdf = createPdfFromCanvases(canvases);

        const pdfBlob = pdf.output("blob");
        const fileName = [
          planData.className,
          planData.subject,
          planData.chapterNumber || `Chapter ${index + 1}`,
        ]
          .join(" - ")
          .split("")
          .map((character) =>
            /[<>:"/\\|?*]/.test(character) || character.charCodeAt(0) < 32
              ? "-"
              : character,
          )
          .join("")
          .trim();
        zip.file(`${fileName}.pdf`, pdfBlob);

        document.body.removeChild(tempContainer);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lesson-plans.zip";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Unable to create lesson plan ZIP", error);
      window.alert("ZIP download failed. Please try again.");
    }
  };

  return (
    <div className="generator">
      <aside className="form-panel">
        <div className="form-header">
          <div>
            <h1>Lesson Plan</h1>
            <p>Fill all information below</p>
          </div>

          <button className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>

        <div className="form-card">
          <h2>
            <span>01</span>
            Basic Information
          </h2>

          <label>
            Book Name
            <input
              type="text"
              name="bookName"
              value={lessonData.bookName}
              onChange={handleChange}
              placeholder="Enter book name"
            />
          </label>

          <label>
            Plan Title
            <input
              type="text"
              name="planTitle"
              value={lessonData.planTitle}
              onChange={handleChange}
              placeholder="Enter plan title"
            />
          </label>

          <div className="form-grid">
            <label>
              Class
              <input
                type="text"
                name="className"
                value={lessonData.className}
                onChange={handleChange}
                placeholder="Class 1"
              />
            </label>

            <label>
              Subject
              <input
                type="text"
                name="subject"
                value={lessonData.subject}
                onChange={handleChange}
                placeholder="Science"
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Chapter Number
              <input
                type="text"
                name="chapterNumber"
                value={lessonData.chapterNumber}
                onChange={handleChange}
                placeholder="Chapter 1"
              />
            </label>

            <label>
              Chapter Name
              <input
                type="text"
                name="chapterName"
                value={lessonData.chapterName}
                onChange={handleChange}
                placeholder="Chapter name"
              />
            </label>
          </div>

          <label>
            Format
            <input
              type="text"
              name="format"
              value={lessonData.format}
              onChange={handleChange}
              placeholder="Enter format"
            />
          </label>
        </div>

        <div className="form-card">
          <h2>
            <span>02</span>
            Learning Objectives
          </h2>

          {lessonData.learningObjectives.map((objective, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                placeholder={`Enter objective ${index + 1}`}
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeObjective(index)}
                disabled={lessonData.learningObjectives.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button type="button" className="add-button" onClick={addObjective}>
            + Add Objective
          </button>
        </div>

        <div className="form-card">
          <h2>
            <span>03</span>
            Content to be Covered
          </h2>

          {lessonData.contentCovered.map((item, index) => (
            <div className="content-form-row" key={index}>
              <div className="content-row-top">
                <strong>Content {index + 1}</strong>

                <button
                  type="button"
                  className="delete-button small"
                  onClick={() => removeContentRow(index)}
                  disabled={lessonData.contentCovered.length === 1}
                >
                  ×
                </button>
              </div>

              <label>
                Topic
                <input
                  type="text"
                  value={item.topic}
                  onChange={(e) =>
                    updateContentRow(index, "topic", e.target.value)
                  }
                  placeholder="Enter topic"
                />
              </label>

              <label>
                Key Points
                <textarea
                  value={item.points}
                  onChange={(e) =>
                    updateContentRow(index, "points", e.target.value)
                  }
                  placeholder="Enter key points"
                />
              </label>
            </div>
          ))}

          <button type="button" className="add-button" onClick={addContentRow}>
            + Add Content Row
          </button>
        </div>

        {/* ================= TEACHING METHOD ================= */}

        <div className="form-card">
          <h2>
            <span>04</span>
            Teaching Method & Activities
          </h2>

          {lessonData.teachingMethod.map((item, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("teachingMethod", index, e.target.value)
                }
                placeholder="Enter teaching method and activities"
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeListItem("teachingMethod", index)}
                disabled={lessonData.teachingMethod.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addListItem("teachingMethod")}
          >
            + Add Teaching Method
          </button>
        </div>

        {/* ================= RESOURCES ================= */}

        <div className="form-card">
          <h2>
            <span>05</span>
            Teaching Resources
          </h2>

          {lessonData.teachingResources.map((item, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("teachingResources", index, e.target.value)
                }
                placeholder="Enter teaching resources"
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeListItem("teachingResources", index)}
                disabled={lessonData.teachingResources.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addListItem("teachingResources")}
          >
            + Add Resource
          </button>
        </div>

        {/* ================= ASSESSMENT ================= */}

        <div className="form-card">
          <h2>
            <span>06</span>
            Assessment
          </h2>

          {lessonData.assessment.map((item, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("assessment", index, e.target.value)
                }
                placeholder="Enter assessment details"
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeListItem("assessment", index)}
                disabled={lessonData.assessment.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addListItem("assessment")}
          >
            + Add Assessment
          </button>
        </div>

        {/* ================= OUTCOME ================= */}

        <div className="form-card">
          <h2>
            <span>07</span>
            Expected Learning Outcome
          </h2>

          {lessonData.learningOutcome.map((item, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("learningOutcome", index, e.target.value)
                }
                placeholder="Enter learning outcome"
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeListItem("learningOutcome", index)}
                disabled={lessonData.learningOutcome.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addListItem("learningOutcome")}
          >
            + Add Outcome
          </button>
        </div>

        {/* ================= HOMEWORK ================= */}

        <div className="form-card">
          <h2>
            <span>08</span>
            Homework / Extension
          </h2>

          {lessonData.homework.map((item, index) => (
            <div className="objective-input" key={index}>
              <div className="input-number">{index + 1}</div>

              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("homework", index, e.target.value)
                }
                placeholder="Enter homework"
              />

              <button
                type="button"
                className="delete-button"
                onClick={() => removeListItem("homework", index)}
                disabled={lessonData.homework.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addListItem("homework")}
          >
            + Add Homework
          </button>
        </div>
      </aside>

      {/* =====================================
          RIGHT SIDE - LIVE PREVIEW
      ====================================== */}

      <section className="preview-wrapper">
        <div className="preview-toolbar">
          <div>
            <h2>Live Preview</h2>
            <p>Updates automatically</p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              type="button"
              className="download-button"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              style={{
                opacity: currentIndex === 0 ? 0.5 : 1,
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Prev
            </button>

            <span
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "#142b5c",
                minWidth: "110px",
                textAlign: "center",
              }}
            >
              Chapter {currentIndex + 1}/{lessonPlans.length}
            </span>

            <button
              type="button"
              className="download-button"
              onClick={goToNext}
              disabled={currentIndex === lessonPlans.length - 1}
              style={{
                opacity: currentIndex === lessonPlans.length - 1 ? 0.5 : 1,
                cursor:
                  currentIndex === lessonPlans.length - 1
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next →
            </button>

            <button
              type="button"
              className="download-button"
              onClick={downloadAllLessonPlansAsZip}
            >
              ↓ Download All ZIP
            </button>

            <button className="download-button" onClick={downloadPDF}>
              ↓ Download PDF
            </button>
          </div>

          <span className="live-status">● Live</span>
        </div>

        <main className="lesson-preview" ref={previewRef}>
          {/* HEADER */}

          <header className="lesson-header">
            <h1>{lessonData.bookName || "BOOK NAME"}</h1>

            <h2>{lessonData.planTitle || "LESSON PLAN"}</h2>

            <p>
              {lessonData.className || "Class"}

              <span>•</span>

              {lessonData.subject || "Subject"}

              <span>•</span>

              {lessonData.chapterNumber || "Chapter"}

              {lessonData.chapterName && ` — ${lessonData.chapterName}`}
            </p>
          </header>

          {/* INFO TABLE */}

          <div className="lesson-info-table">
            <div className="info-label">Subject</div>

            <div className="info-value">{lessonData.subject}</div>

            <div className="info-label">Class</div>

            <div className="info-value">{lessonData.className}</div>

            <div className="info-label">Chapter</div>

            <div className="info-value">{lessonData.chapterName}</div>

            <div className="info-label">Format</div>

            <div className="info-value">{lessonData.format}</div>
          </div>

          {/* LEARNING OBJECTIVES */}

          <SectionTitle fill="A" title="Learning Objectives" color="#6b3d8f">
            <ul>
              {lessonData.learningObjectives
                .filter((objective) => objective.trim() !== "")
                .map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
            </ul>
          </SectionTitle>

          {/* CONTENT COVERED */}

          <SectionTitle fill="B" title="Content to be Covered" color="#21508e">
            <div className="content-preview-table">
              <div className="content-preview-header">
                <div>Topic</div>

                <div>Key Points</div>
              </div>

              {lessonData.contentCovered
                .filter(
                  (item) =>
                    item.topic.trim() !== "" || item.points.trim() !== "",
                )
                .map((item, index) => (
                  <div
                    className={`content-preview-row row-${index % 3}`}
                    key={index}
                  >
                    <div className="topic-cell">{item.topic}</div>

                    <div className="points-cell">{item.points}</div>
                  </div>
                ))}
            </div>
          </SectionTitle>

          {/* TEACHING METHOD */}

          <SectionTitle
            fill="C"
            title="Teaching Method & Activities"
            color="#27763b"
          >
            <ul>
              {lessonData.teachingMethod
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </SectionTitle>

          {/* RESOURCES */}

          <SectionTitle fill="D" title="Teaching Resources" color="#d46a0c">
            <ul>
              {lessonData.teachingResources
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </SectionTitle>

          {/* ASSESSMENT */}

          <SectionTitle fill="E" title="Assessment" color="#258a90">
            <ul>
              {lessonData.assessment
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </SectionTitle>

          {/* LEARNING OUTCOME */}

          <SectionTitle
            fill="F"
            title="Expected Learning Outcome"
            color="#d12e69"
          >
            <ul>
              {lessonData.learningOutcome
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </SectionTitle>

          {/* HOMEWORK */}

          <SectionTitle fill="G" title="Homework / Extension" color="#6b478b">
            <ul>
              {lessonData.homework
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </SectionTitle>
        </main>
      </section>
    </div>
  );
}


