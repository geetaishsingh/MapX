import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";

import "./worksheetPreview.scss";


// =====================================================
// DEFAULT WORKSHEET DATA
// =====================================================

const defaultWorksheet = {

    chapter: "CH 1",

    title: "I Am Rohan",

    name: "",
 
    className: "1",

    date: "",

    learningFocus: [
        "Self",
        "Family",
        "School",
        "Friends"
    ],

    sections: [

        // =================================================
        // SECTION A
        // =================================================

        {
            id: 1,

            title: "Fill in the blanks.",

            type: "fillblank",

            questions: [

                {
                    id: 1,
                    question: "Rohan is ______ years old.",
                    answer: ""
                },

                {
                    id: 2,
                    question: "Rohan's favourite subject is ______.",
                    answer: ""
                },

                {
                    id: 3,
                    question: "Rohan plays in the ______ in the evening.",
                    answer: ""
                },

                {
                    id: 4,
                    question: "Rohan's best friend is ______.",
                    answer: ""
                },

                {
                    id: 5,
                    question: "Rohan's mother helps him pack his ______ bag.",
                    answer: ""
                }

            ]
        },


        // =================================================
        // SECTION B
        // =================================================

        {
            id: 2,

            title: "Choose the correct answer.",

            type: "mcq",

            questions: [

                {
                    id: 1,
                    question: "Rohan wakes up ______ in the morning.",
                    options: [
                        "late",
                        "early",
                        "after noon"
                    ],
                    answer: ""
                },

                {
                    id: 2,
                    question: "His father drops him at school on a ______.",
                    options: [
                        "bicycle",
                        "scooter",
                        "bus"
                    ],
                    answer: ""
                },

                {
                    id: 3,
                    question: "Who helps Rohan pack his school bag?",
                    options: [
                        "Sister",
                        "Mother",
                        "Friend"
                    ],
                    answer: ""
                },

                {
                    id: 4,
                    question: "Rohan's favourite subject is ______.",
                    options: [
                        "Maths",
                        "Art",
                        "Music"
                    ],
                    answer: ""
                },

                {
                    id: 5,
                    question: "Who tells Rohan stories before bedtime?",
                    options: [
                        "Mother",
                        "Grandmother",
                        "Father"
                    ],
                    answer: ""
                },

                {
                    id: 6,
                    question: "Rohan has many friends in his ______.",
                    options: [
                        "school",
                        "park",
                        "home"
                    ],
                    answer: ""
                }

            ]
        },


        // =================================================
        // SECTION C
        // =================================================

        {
            id: 3,

            title: "Think and answer.",

            type: "think",

            questions: [

                {
                    id: 1,
                    question: "Who lives with Rohan?",
                    answer: ""
                },

                {
                    id: 2,
                    question: "Why does Rohan like school?",
                    answer: ""
                },

                {
                    id: 3,
                    question: "Why is Rohan happy?",
                    answer: ""
                }

            ]
        },


        // =================================================
        // SECTION D
        // =================================================

        {
            id: 4,

            title: "Write about yourself.",

            type: "write",

            questions: [

                {
                    id: 1,
                    question: "What is your name?",
                    answer: ""
                },

                {
                    id: 2,
                    question: "How old are you?",
                    answer: ""
                },

                {
                    id: 3,
                    question: "What is your favourite game?",
                    answer: ""
                }

            ]
        },


        // =================================================
        // SECTION E
        // =================================================

        {
            id: 5,

            title: "True or False.",

            type: "truefalse",

            questions: [

                {
                    id: 1,
                    question: "Rohan is seven years old.",
                    options: [
                        "True",
                        "False"
                    ],
                    answer: ""
                },

                {
                    id: 2,
                    question: "Rohan likes drawing pictures.",
                    options: [
                        "True",
                        "False"
                    ],
                    answer: ""
                },

                {
                    id: 3,
                    question: "Rohan plays in the park in the evening.",
                    options: [
                        "True",
                        "False"
                    ],
                    answer: ""
                },

                {
                    id: 4,
                    question: "Rohan's best friend is Mohan.",
                    options: [
                        "True",
                        "False"
                    ],
                    answer: ""
                }

            ]
        }

    ]

};


// =====================================================
// COMPONENT
// =====================================================

const WorksheetPreview = ({
    worksheet,
    worksheets = [],
    showToolbar = true
}) => {

    const worksheetRef = useRef(null);
    const [downloadProgress, setDownloadProgress] = useState(null);


    // =====================================================
    // SAFE DATA
    // =====================================================

    const data = {
        ...defaultWorksheet,
        ...(worksheet || {})
    };


    const sections =
        Array.isArray(data.sections)
            ? data.sections
            : defaultWorksheet.sections;

    const chapterNumber =
        String(data.chapter || "1").replace(/^CH\s*/i, "").trim() || "1";


    // =====================================================
    // DOWNLOAD PDF
    // =====================================================

    const downloadPDF = async () => {

        const element = worksheetRef.current;

        if (!element) {
            return;
        }


        try {

            // =============================================
            // GET SECTIONS
            // =============================================

            const sectionElements = Array.from(
                element.querySelectorAll(
                    ".preview-section"
                )
            );


            // =============================================
            // CREATE CANVAS
            // =============================================

            const canvas = await html2canvas(
                element,
                {
                    scale: 2,

                    useCORS: true,

                    backgroundColor: "#ffffff",

                    scrollX: 0,

                    scrollY: 0,

                    width: element.scrollWidth,

                    height: element.scrollHeight,

                    windowWidth: element.scrollWidth,

                    windowHeight: element.scrollHeight,

                    onclone: (clonedDocument) => {
                        clonedDocument
                            .querySelector(".worksheet-paper")
                            ?.style.setProperty("border-color", "transparent");
                    }
                }
            );


            const canvasWidth =
                canvas.width;

            const canvasHeight =
                canvas.height;

            const renderScale =
                canvas.width /
                element.getBoundingClientRect().width;


            // =============================================
            // A4
            // =============================================

            const pdfWidth = 210;

            const pdfHeight = 297;


            const pageCanvasHeight =
                Math.floor(
                    (canvasWidth * pdfHeight) /
                    pdfWidth
                );


            // =============================================
            // ELEMENT POSITION
            // =============================================

            const elementRect =
                element.getBoundingClientRect();


            // =============================================
            // SECTION POSITIONS
            // =============================================

            const sectionsData =
                sectionElements.map(
                    (section) => {

                        const rect =
                            section.getBoundingClientRect();


                        return {

                            top:
                                Math.round(
                                    (
                                        rect.top -
                                        elementRect.top
                                    ) * renderScale
                                ),

                            bottom:
                                Math.round(
                                    (
                                        rect.bottom -
                                        elementRect.top
                                    ) * renderScale
                                )

                        };

                    }
                );


            // =============================================
            // CREATE PAGE CANVAS
            // =============================================

            const createPageCanvas = (
                startY,
                endY
            ) => {

                const height =
                    Math.max(
                        1,
                        Math.round(
                            endY - startY
                        )
                    );


                const pageCanvas =
                    document.createElement(
                        "canvas"
                    );


                pageCanvas.width =
                    canvasWidth;


                pageCanvas.height =
                    height;


                const context =
                    pageCanvas.getContext(
                        "2d"
                    );


                context.fillStyle =
                    "#ffffff";


                context.fillRect(
                    0,
                    0,
                    pageCanvas.width,
                    pageCanvas.height
                );


                context.drawImage(

                    canvas,

                    0,
                    startY,

                    canvasWidth,
                    height,

                    0,
                    0,

                    canvasWidth,
                    height

                );


                return pageCanvas;

            };


            // =============================================
            // ADD PAGE
            // =============================================

            const addPageToPDF = (
                pdf,
                pageCanvas,
                firstPage
            ) => {

                const pageTopMargin = firstPage ? 0 : 8;

                if (!firstPage) {

                    pdf.addPage();

                }


                const pageImage =
                    pageCanvas.toDataURL(
                        "image/jpeg",
                        0.95
                    );


                const imageWidth =
                    pdfWidth - 16;

                const imageHeight = Math.min(
                    (
                        pageCanvas.height *
                        imageWidth
                    ) /
                    pageCanvas.width,
                    pdfHeight -
                    pageTopMargin -
                    8
                );

                const imageX =
                    6;


                pdf.addImage(

                    pageImage,

                    "JPEG",

                    imageX,

                    pageTopMargin,

                    imageWidth,

                    imageHeight

                );

                pdf.setDrawColor(18, 59, 93);
                pdf.setLineWidth(2);
                pdf.rect(
                    4,
                    4,
                    pdfWidth - 8,
                    pdfHeight - 12
                );

            };


            // =============================================
            // CREATE PDF
            // =============================================

            const pdf =
                new jsPDF({

                    orientation: "portrait",

                    unit: "mm",

                    format: "a4"

                });


            let currentPageStart = 0;

            let currentPageEnd =
                pageCanvasHeight;

            let firstPage = true;


            // =============================================
            // PROCESS SECTIONS
            // =============================================

            for (
                let i = 0;
                i < sectionsData.length;
                i++
            ) {

                const section =
                    sectionsData[i];


                // =========================================
                // SECTION FITS
                // =========================================

                if (
                    section.bottom <=
                    currentPageEnd
                ) {

                    continue;

                }


                // =========================================
                // SECTION DOES NOT FIT
                // =========================================

                /*
                    Finish the current page BEFORE
                    the section begins.
                */

                if (
                    section.top >
                    currentPageStart
                ) {

                    const pageCanvas =
                        createPageCanvas(
                            currentPageStart,
                            section.top
                        );


                    addPageToPDF(
                        pdf,
                        pageCanvas,
                        firstPage
                    );


                    firstPage = false;

                }


                // =========================================
                // START NEW PAGE
                // =========================================

                currentPageStart =
                    section.top;


                currentPageEnd =
                    currentPageStart +
                    pageCanvasHeight;


                // =========================================
                // VERY LARGE SECTION
                // =========================================

                while (
                    section.bottom >
                    currentPageEnd
                ) {

                    const pageCanvas =
                        createPageCanvas(
                            currentPageStart,
                            currentPageEnd
                        );


                    addPageToPDF(
                        pdf,
                        pageCanvas,
                        firstPage
                    );


                    firstPage = false;


                    currentPageStart =
                        currentPageEnd;


                    currentPageEnd =
                        currentPageStart +
                        pageCanvasHeight;

                }

            }


            // =============================================
            // REMAINING CONTENT
            // =============================================

            if (
                currentPageStart <
                canvasHeight
            ) {

                const pageCanvas =
                    createPageCanvas(
                        currentPageStart,
                        canvasHeight
                    );


                addPageToPDF(
                    pdf,
                    pageCanvas,
                    firstPage
                );

            }


            // =============================================
            // FILE NAME
            // =============================================

            const fileName =
                data.title
                    ? data.title.replace(
                        /[^a-z0-9]/gi,
                        "_"
                    )
                    : "worksheet";


            // =============================================
            // SAVE
            // =============================================

            pdf.save(
                `${fileName}.pdf`
            );

        }

        catch (error) {

            console.error(
                "PDF download failed:",
                error
            );

        }

    };


    const downloadAllPDF = async () => {

        const paperElements = Array.from(
            document.querySelectorAll(
                ".all-chapter-papers .worksheet-paper"
            )
        );

        if (paperElements.length === 0) {
            return;
        }

        setDownloadProgress(0);

        try {

            const zip = new JSZip();

            for (const [chapterIndex, paper] of paperElements.entries()) {
                await new Promise((resolve) => setTimeout(resolve, 0));

                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });

                const pdfWidth = 210;
                const pdfHeight = 297;

                let firstPage = true;

                const sectionElements = Array.from(
                    paper.querySelectorAll(".preview-section")
                );

                const canvas = await html2canvas(paper, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    scrollX: 0,
                    scrollY: 0,
                    width: paper.scrollWidth,
                    height: paper.scrollHeight,
                    windowWidth: paper.scrollWidth,
                    windowHeight: paper.scrollHeight,
                    onclone: (clonedDocument) => {
                        clonedDocument
                            .querySelectorAll(".worksheet-paper")
                            .forEach((clonedPaper) => {
                                clonedPaper.style.setProperty(
                                    "border-color",
                                    "transparent"
                                );
                            });
                    }
                });

                const renderScale = canvas.width /
                    paper.getBoundingClientRect().width;
                const pageCanvasHeight = Math.floor(
                    canvas.width * pdfHeight / pdfWidth
                );
                const paperRect = paper.getBoundingClientRect();
                const sectionsData = sectionElements.map((section) => {
                    const rect = section.getBoundingClientRect();

                    return {
                        top: Math.round(
                            (rect.top - paperRect.top) * renderScale
                        ),
                        bottom: Math.round(
                            (rect.bottom - paperRect.top) * renderScale
                        )
                    };
                });

                const addPage = (startY, endY) => {
                    const pageCanvas = document.createElement("canvas");
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = Math.max(1, Math.round(endY - startY));

                    const context = pageCanvas.getContext("2d");
                    context.fillStyle = "#ffffff";
                    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
                    context.drawImage(
                        canvas,
                        0,
                        startY,
                        canvas.width,
                        pageCanvas.height,
                        0,
                        0,
                        canvas.width,
                        pageCanvas.height
                    );

                    if (!firstPage) {
                        pdf.addPage();
                    }

                    const pageTopMargin = firstPage ? 0 : 8;
                    const imageWidth = pdfWidth - 16;
                    const imageHeight = Math.min(
                        pageCanvas.height * imageWidth / pageCanvas.width,
                        pdfHeight - pageTopMargin - 8
                    );
                    const imageX = 6;

                    pdf.addImage(
                        pageCanvas.toDataURL("image/jpeg", 0.95),
                        "JPEG",
                        imageX,
                        pageTopMargin,
                        imageWidth,
                        imageHeight
                    );
                    pdf.setDrawColor(18, 59, 93);
                    pdf.setLineWidth(2);
                    pdf.rect(4, 4, pdfWidth - 8, pdfHeight - 12);
                    firstPage = false;
                };

                let currentPageStart = 0;
                let currentPageEnd = pageCanvasHeight;

                sectionsData.forEach((section) => {
                    if (section.bottom <= currentPageEnd) {
                        return;
                    }

                    if (section.top > currentPageStart) {
                        addPage(currentPageStart, section.top);
                    }

                    currentPageStart = section.top;
                    currentPageEnd = currentPageStart + pageCanvasHeight;

                    while (section.bottom > currentPageEnd) {
                        addPage(currentPageStart, currentPageEnd);
                        currentPageStart = currentPageEnd;
                        currentPageEnd = currentPageStart + pageCanvasHeight;
                    }
                });

                if (currentPageStart < canvas.height) {
                    addPage(currentPageStart, canvas.height);
                }

                const chapter = worksheets[chapterIndex] || {};
                const chapterName = (chapter.title || chapter.chapter || `chapter_${chapterIndex + 1}`)
                    .replace(/[^a-z0-9]+/gi, "_")
                    .replace(/^_|_$/g, "") || `chapter_${chapterIndex + 1}`;

                zip.file(
                    `${String(chapterIndex + 1).padStart(2, "0")}_${chapterName}.pdf`,
                    pdf.output("blob")
                );

                setDownloadProgress(
                    Math.round(((chapterIndex + 1) / paperElements.length) * 90)
                );
            }

            const zipBlob = await zip.generateAsync(
                { type: "blob" },
                ({ percent }) => {
                    setDownloadProgress(
                        Math.min(99, Math.round(90 + percent * 0.09))
                    );
                }
            );
            const downloadUrl = URL.createObjectURL(zipBlob);
            const downloadLink = document.createElement("a");

            downloadLink.href = downloadUrl;
            downloadLink.download = "all_chapters.zip";
            downloadLink.click();
            URL.revokeObjectURL(downloadUrl);
            setDownloadProgress(100);

        } catch (error) {

            console.error("All chapters PDF download failed:", error);

        } finally {
            setDownloadProgress(null);
        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="worksheet-preview">


            {/* =========================================
                TOOLBAR
            ========================================= */}

            {showToolbar && (

            <div className="preview-toolbar">

                <button
                    className="download-button"
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>

                {worksheets.length > 1 && (

                    <button
                        className="download-button"
                        onClick={downloadAllPDF}
                        disabled={downloadProgress !== null}
                    >
                        {downloadProgress === null
                            ? "Download All Chapters"
                            : `Downloading All Chapters... ${downloadProgress}%`}
                    </button>

                )}

            </div>

            )}


            {/* =========================================
                WORKSHEET PAPER
            ========================================= */}

            <div
                className="worksheet-paper"
                ref={worksheetRef}
            >


                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="worksheet-top">

                    <div className="worksheet-title">

                        <h1>

                            MAGNOVA BOOKS

                        </h1>

                        <h2 className="lesson-plan-heading">

                            Worksheet

                        </h2>

                    </div>

                </div>


                {/* =========================================
                    WORKSHEET INFORMATION
                ========================================= */}

                <div className="worksheet-information">
                    <span>Class: {data.className || "—"}</span>
                    <span>Subject: {data.subject || "—"}</span>
                    <span>
                        Chapter: {chapterNumber}- {data.title || "Worksheet Title"}
                    </span>
                </div>


                {/* =========================================
                    SECTIONS
                ========================================= */}

                {sections.map(
                    (
                        section,
                        sectionIndex
                    ) => {

                        const questions =
                            Array.isArray(
                                section.questions
                            )
                                ? section.questions
                                : [];


                        return (

                            <div
                                className={
                                    `preview-section section-${sectionIndex}`
                                }
                                key={
                                    section.id ||
                                    sectionIndex
                                }
                            >


                                {/* =================================
                                    SECTION HEADER
                                ================================= */}

                                <div className="section-title">

                                    <div className="section-number">

                                        {String.fromCharCode(
                                            65 +
                                            sectionIndex
                                        )}

                                    </div>


                                    <h2>

                                        {section.title ||
                                            `Section ${
                                                sectionIndex + 1
                                            }`}

                                    </h2>

                                </div>


                                {/* =================================
                                    QUESTIONS
                                ================================= */}

                                <div className="preview-questions">

                                    {questions.map(
                                        (
                                            question,
                                            questionIndex
                                        ) => {

                                            const options =
                                                Array.isArray(
                                                    question.options
                                                )
                                                    ? question.options
                                                    : [];


                                            return (

                                                <div
                                                    className="preview-question"
                                                    key={
                                                        question.id ||
                                                        questionIndex
                                                    }
                                                >


                                                    {/* NUMBER */}

                                                    <div className="question-number">

                                                        {questionIndex + 1}.

                                                    </div>


                                                    {/* CONTENT */}

                                                    <div className="question-content">

                                                        <p>

                                                            {
                                                                question.question ||
                                                                "Your question will appear here."
                                                            }

                                                        </p>


                                                        {/* =================================
                                                            OPTIONS
                                                        ================================= */}

                                                        {options.length >
                                                            0 && (

                                                            <div
                                                                className={
                                                                    `question-options ${
                                                                        section.type ===
                                                                        "truefalse"
                                                                            ? "truefalse-options"
                                                                            : ""
                                                                    }`
                                                                }
                                                            >

                                                                {options.map(
                                                                    (
                                                                        option,
                                                                        optionIndex
                                                                    ) => (

                                                                        <div
                                                                            className="option"
                                                                            key={
                                                                                optionIndex
                                                                            }
                                                                        >

                                                                            <span className="option-letter">

                                                                                {String.fromCharCode(
                                                                                    97 +
                                                                                    optionIndex
                                                                                )}.

                                                                            </span>

                                                                            <span>

                                                                                {
                                                                                    option
                                                                                }

                                                                            </span>

                                                                        </div>

                                                                    )
                                                                )}

                                                            </div>

                                                        )}


                                                        {/* =================================
                                                            ANSWER LINE
                                                        ================================= */}

                                                        {section.type !==
                                                            "mcq" &&
                                                            section.type !==
                                                                "truefalse" && (

                                                            <div className="answer-line">

                                                                <span>

                                                                    {
                                                                        question.answer
                                                                    }

                                                                </span>

                                                            </div>

                                                        )}

                                                    </div>

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            </div>

                        );

                    }
                )}


               


            </div>

            {showToolbar && worksheets.length > 1 && (

                <div className="all-chapter-papers">

                    {worksheets.map((chapter, index) => (

                        <WorksheetPreview
                            key={chapter.chapter || index}
                            worksheet={chapter}
                            showToolbar={false}
                        />

                    ))}

                </div>

            )}

        </div>

    );

};


export default WorksheetPreview;