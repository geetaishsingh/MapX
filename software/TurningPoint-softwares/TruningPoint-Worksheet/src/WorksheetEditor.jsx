import "./worksheetEditor.scss"

const WorksheetEditor = ({
    worksheet,
    setWorksheet,
    chapterIndex,
    chapterCount,
    onPreviousChapter,
    onNextChapter,
    onAddChapter
}) => {

    // -------------------------
    // Basic worksheet fields
    // -------------------------

    const handleBasicChange = (e) => {

        const { name, value } = e.target;

        setWorksheet((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // -------------------------
    // Section title
    // -------------------------

    const handleSectionChange = (sectionId, value) => {

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.map((section) =>

                section.id === sectionId
                    ? {
                        ...section,
                        title: value
                    }
                    : section

            )

        }));
    };


    // -------------------------
    // Question change
    // -------------------------

    const handleQuestionChange = (
        sectionId,
        questionId,
        field,
        value
    ) => {

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.map((section) => {

                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,

                    questions: section.questions.map(
                        (question) => {

                            if (
                                question.id !== questionId
                            ) {
                                return question;
                            }

                            return {
                                ...question,
                                [field]: value
                            };
                        }
                    )
                };

            })

        }));
    };


    // -------------------------
    // Option change
    // -------------------------

    const handleOptionChange = (
        sectionId,
        questionId,
        optionIndex,
        value
    ) => {

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.map((section) => {

                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,

                    questions: section.questions.map((question) => {

                        if (question.id !== questionId) {
                            return question;
                        }

                        return {
                            ...question,

                            options: (
                                Array.isArray(question.options)
                                    ? question.options
                                    : section.type === "truefalse"
                                        ? ["True", "False"]
                                        : ["", "", ""]
                            ).map(
                                (option, index) =>
                                    index === optionIndex
                                        ? value
                                        : option
                            )
                        };
                    })
                };
            })
        }));
    };


    // -------------------------
    // Add question
    // -------------------------

    const addQuestion = (sectionId) => {

        const section = worksheet.sections.find(
            (item) => item.id === sectionId
        );

        const newQuestion = {
            id: Date.now(),
            question: "",
            answer: "",
            ...(section?.type === "mcq" && {
                options: ["", "", ""]
            }),
            ...(section?.type === "truefalse" && {
                options: ["True", "False"]
            })
        };

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.map((section) => {

                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,

                    questions: [
                        ...section.questions,
                        newQuestion
                    ]
                };

            })

        }));
    };


    // -------------------------
    // Delete question
    // -------------------------

    const deleteQuestion = (
        sectionId,
        questionId
    ) => {

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.map((section) => {

                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,

                    questions:
                        section.questions.filter(
                            (question) =>
                                question.id !== questionId
                        )
                };

            })

        }));
    };


    // -------------------------
    // Add section
    // -------------------------

    const addSection = () => {

        const newSection = {

            id: Date.now(),

            title: "",

            questions: [
                {
                    id: Date.now() + 1,
                    question: "",
                    answer: ""
                }
            ]
        };

        setWorksheet((prev) => ({

            ...prev,

            sections: [
                ...prev.sections,
                newSection
            ]

        }));
    };


    // -------------------------
    // Delete section
    // -------------------------

    const deleteSection = (sectionId) => {

        setWorksheet((prev) => ({

            ...prev,

            sections: prev.sections.filter(
                (section) =>
                    section.id !== sectionId
            )

        }));
    };


    return (

        <div className="worksheet-editor">

            <div className="editor-header">

                <div className="editor-heading-row">

                    <div>

                        <h1>Worksheet Editor</h1>

                        <p>
                            Chapter {chapterIndex + 1} of {chapterCount}
                        </p>

                    </div>

                    <button
                        className="add-chapter"
                        type="button"
                        onClick={onAddChapter}
                    >
                        + Add Chapter
                    </button>

                </div>

                <div className="chapter-navigation">

                    <button
                        type="button"
                        onClick={onPreviousChapter}
                        disabled={chapterIndex === 0}
                    >
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={onNextChapter}
                        disabled={chapterIndex === chapterCount - 1}
                    >
                        Next
                    </button>

                </div>

            </div>


            {/* BASIC INFORMATION */}

            <div className="editor-card">

                <h2>Worksheet Information</h2>


                <div className="form-group">

                    <label>
                        Chapter
                    </label>

                    <input
                        type="text"
                        name="chapter"
                        placeholder="CH 1"
                        value={worksheet.chapter}
                        onChange={handleBasicChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="I Am Rohan"
                        value={worksheet.title}
                        onChange={handleBasicChange}
                    />

                </div>


            </div>


            {/* SECTIONS */}

            {worksheet.sections.map(
                (section, sectionIndex) => (

                    <div
                        className="editor-card"
                        key={section.id}
                    >

                        <div className="section-header">

                            <h2>
                                Section {sectionIndex + 1}
                            </h2>

                            {worksheet.sections.length > 1 && (

                                <button
                                    className="delete-section"
                                    onClick={() =>
                                        deleteSection(section.id)
                                    }
                                >
                                    Delete Section
                                </button>

                            )}

                        </div>


                        {/* SECTION TITLE */}

                        <div className="form-group">

                            <label>
                                Section Title
                            </label>

                            <input
                                type="text"
                                placeholder="Fill in the blanks"
                                value={section.title}
                                onChange={(e) =>
                                    handleSectionChange(
                                        section.id,
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* QUESTIONS */}

                        <div className="questions">

                            {section.questions.map(
                                (question, questionIndex) => (

                                    <div
                                        className="question-box"
                                        key={question.id}
                                    >

                                        <div className="question-header">

                                            <h3>
                                                Question{" "}
                                                {questionIndex + 1}
                                            </h3>

                                            {section.questions.length > 1 && (

                                                <button
                                                    className="delete-question"
                                                    onClick={() =>
                                                        deleteQuestion(
                                                            section.id,
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            )}

                                        </div>


                                        <div className="form-group">

                                            <label>
                                                Question
                                            </label>

                                            <textarea
                                                rows="3"
                                                placeholder="Rohan is ____ years old."
                                                value={
                                                    question.question
                                                }
                                                onChange={(e) =>
                                                    handleQuestionChange(
                                                        section.id,
                                                        question.id,
                                                        "question",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>


                                        {section.type !== "mcq" &&
                                            section.type !== "truefalse" && (

                                            <div className="form-group">

                                                <label>
                                                    Answer
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="six"
                                                    value={
                                                        question.answer
                                                    }
                                                    onChange={(e) =>
                                                        handleQuestionChange(
                                                            section.id,
                                                            question.id,
                                                            "answer",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        )}


                                        {(section.type === "mcq" ||
                                            section.type === "truefalse") && (

                                            <div className="form-group question-options-editor">

                                                <label>
                                                    Options
                                                </label>

                                                {(Array.isArray(question.options)
                                                    ? question.options
                                                    : section.type === "truefalse"
                                                        ? ["True", "False"]
                                                        : ["", "", ""]
                                                ).map((option, optionIndex) => (

                                                    <input
                                                        key={optionIndex}
                                                        type="text"
                                                        placeholder={`Option ${optionIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                section.id,
                                                                question.id,
                                                                optionIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                ))}

                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>


                        {/* ADD QUESTION */}

                        <button
                            className="add-question"
                            onClick={() =>
                                addQuestion(section.id)
                            }
                        >
                            + Add Question
                        </button>

                    </div>

                )
            )}


            {/* ADD SECTION */}

            <button
                className="add-section"
                onClick={addSection}
            >
                + Add Section
            </button>

        </div>
    );
};

export default WorksheetEditor;