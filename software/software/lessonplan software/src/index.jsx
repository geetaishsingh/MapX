

const SectionTitle = ({ icon, title, color, children }) => {
  return (
    <section className="section">
      <div className="section-heading">
        <div
          className="section-icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

        <div
          className="section-title"
          style={{ color: color }}
        >
          {title}
        </div>

        <div
          className="section-line"
          style={{ borderColor: color }}
        ></div>

        <div
          className="section-dot"
          style={{ backgroundColor: color }}
        ></div>
      </div>

      {children && <div className="section-content">{children}</div>}
    </section>
  );
};

export default function LessonPlan() {
  return (
    <div className="page-bg">
      <main className="lesson-page">

        {/* HEADER */}
        <header className="header">
          <h1>MAGNOVA BOOKS</h1>

          <h2>LESSON PLAN</h2>

          <p className="subtitle">
            Class 1 <span>•</span> Science <span>•</span> Chapter 1 — World of Plants
          </p>
        </header>

        {/* INFO TABLE */}
        <div className="info-table">
          <div className="info-row">
            <div className="label">Subject</div>
            <div className="value">Science</div>

            <div className="label">Class</div>
            <div className="value">1</div>
          </div>

          <div className="info-row">
            <div className="label">Chapter</div>
            <div className="value">World of Plants</div>

            <div className="label">Format</div>
            <div className="value">
              Concise chapter-wise plan
            </div>
          </div>
        </div>

        {/* LEARNING OBJECTIVES */}
        <SectionTitle
          icon="◎"
          title="Learning Objectives"
          color="#6b3d8f"
        >
          <ul>
            <li>
              Identify common types of plants such as trees,
              shrubs, herbs, climbers, creepers, thorny plants
              and aquatic plants.
            </li>

            <li>
              Identify the main parts of a plant—roots,
              stem/trunk, leaves, flowers and fruits—and
              describe their basic functions.
            </li>

            <li>
              Understand the simple plant cycle from seed to
              new seeds.
            </li>

            <li>
              Develop observation and classification skills
              through real plants and pictures.
            </li>
          </ul>
        </SectionTitle>

        {/* CONTENT TABLE */}
        <SectionTitle
          icon="▣"
          title="Content to be Covered"
          color="#21508e"
        >
          <div className="content-table">

            <div className="table-header">
              <div>Topic</div>
              <div>Key Points</div>
            </div>

            <div className="table-row row-blue">
              <div className="topic">Types of Plants</div>

              <div>
                Trees, shrubs, herbs, climbers, creepers,
                thorny plants and aquatic plants with examples.
              </div>
            </div>

            <div className="table-row row-green">
              <div className="topic">Parts of a Plant</div>

              <div>
                Roots, stem/trunk, leaves, flowers and fruits;
                basic functions of each.
              </div>
            </div>

            <div className="table-row row-yellow">
              <div className="topic">Plant Cycle</div>

              <div>
                Seed → seedling → adult plant → flower → fruit → seeds.
              </div>
            </div>

          </div>
        </SectionTitle>

        {/* TEACHING METHOD */}
        <SectionTitle
          icon="♟"
          title="Teaching Method & Activities"
          color="#27763b"
        >
          <p>
            Use real plants, leaves and pictures for observation
            and classification. Discuss plant types, label a plant
            diagram, arrange plant-cycle pictures in sequence and
            connect the topic with plants found around the school
            or home.
          </p>
        </SectionTitle>

        {/* RESOURCES */}
        <SectionTitle
          icon="▱"
          title="Teaching Resources"
          color="#d46a0c"
        >
          <p>
            Textbook, plant pictures/cards, a small plant or
            leaves, board, plant-part diagram and worksheet.
          </p>
        </SectionTitle>

        {/* ASSESSMENT */}
        <SectionTitle
          icon="▤"
          title="Assessment"
          color="#258a90"
        >
          <p>
            Oral questions, picture classification, plant-part
            labelling, fill in the blanks, short answers and
            plant-cycle sequencing.
          </p>
        </SectionTitle>

        {/* OUTCOME */}
        <SectionTitle
          icon="▥"
          title="Expected Learning Outcome"
          color="#d12e69"
        >
          <p>
            Students can recognize major plant types, identify
            plant parts and their basic functions, and explain
            the plant cycle in the correct order.
          </p>
        </SectionTitle>

        {/* HOMEWORK */}
        <SectionTitle
          icon="⌂"
          title="Homework / Extension"
          color="#6b478b"
        >
          <p>
            Draw any one plant and label its parts. Collect
            leaves of two different plants and paste them in
            your notebook.
          </p>
        </SectionTitle>

      </main>
    </div>
  );
}