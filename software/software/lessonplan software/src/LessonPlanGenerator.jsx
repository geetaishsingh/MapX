import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { useRef } from "react";
import { lessonPlans as importedLessonPlans } from "./lessonPlans";

/* const lessonPlans = [
  {
    chapter: 1,
    chapterName: "I Am Rohan",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Introduce personal details",
      "Identify family members",
      "Describe daily routines",
      "Share personal interests",
    ],

    contentToBeCovered: [
      {
        topic: "Personal Details",
        keyPoints: "Name, age, family",
      },
      {
        topic: "Daily Routine",
        keyPoints: "Morning, school, evening",
      },
      {
        topic: "Family Life",
        keyPoints: "Family love, care",
      },
      {
        topic: "Friends And School",
        keyPoints: "Learning, sharing, playing",
      },
    ],

    teachingMethodActivities: [
      "Introduce personal details",
      "Discuss family members",
      "Share daily routines",
      "Practise oral introductions",
    ],

    teachingResources: [
      "Textbook",
      "Picture cards",
      "Family pictures",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask personal questions",
      "Identify family members",
      "Describe daily routines",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Share personal information",
      "Identify family members",
      "Describe daily activities",
      "Recognise caring relationships",
    ],

    homeworkExtension: ["Draw your family", "Write personal details"],
  },
  {
    chapter: 2,
    chapterName: "My Family Tree",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Identify family members",
      "Understand family connections",
      "Recognise family roles",
      "Create family trees",
    ],

    contentToBeCovered: [
      {
        topic: "Family Members",
        keyPoints: "Parents, grandparents, cousins",
      },
      {
        topic: "Family Connections",
        keyPoints: "Connected through love",
      },
      {
        topic: "Family Roles",
        keyPoints: "Care, help, support",
      },
      {
        topic: "Family Tree",
        keyPoints: "Branches show relationships",
      },
    ],

    teachingMethodActivities: [
      "Discuss family members",
      "Show family pictures",
      "Draw family trees",
      "Share family experiences",
    ],

    teachingResources: [
      "Textbook",
      "Family pictures",
      "Chart paper",
      "Crayons",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify family members",
      "Answer oral questions",
      "Complete family tree",
      "Answer short questions",
    ],

    expectedLearningOutcome: [
      "Identify family relationships",
      "Understand family connections",
      "Recognise family importance",
      "Create simple family trees",
    ],

    homeworkExtension: [
      "Draw family tree",
      "Add family names",
      "Decorate with leaves",
    ],
  },
  {
    chapter: 3,
    chapterName: "My Happy Home",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Describe a happy home",
      "Identify family relationships",
      "Appreciate family love",
      "Recognise caring behaviours",
    ],

    contentToBeCovered: [
      {
        topic: "Happy Home",
        keyPoints: "Safe, loving, happy",
      },
      {
        topic: "Family Members",
        keyPoints: "Parents, grandparents, siblings",
      },
      {
        topic: "Family Activities",
        keyPoints: "Stories, games, laughter",
      },
      {
        topic: "Family Values",
        keyPoints: "Love, kindness, care",
      },
    ],

    teachingMethodActivities: [
      "Read poem aloud",
      "Discuss family activities",
      "Share home experiences",
      "Identify describing words",
    ],

    teachingResources: [
      "Textbook",
      "Family pictures",
      "Word cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask poem questions",
      "Identify family members",
      "Find describing words",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Describe family relationships",
      "Appreciate family love",
      "Identify caring behaviours",
      "Use describing words",
    ],

    homeworkExtension: ["Draw happy home", "Write family activities"],
  },
  {
    chapter: 4,
    chapterName: "A New Friend",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Welcome new classmates",
      "Develop friendly behaviour",
      "Practise helping others",
      "Build classroom friendships",
    ],

    contentToBeCovered: [
      {
        topic: "New Student",
        keyPoints: "Ajay joins school",
      },
      {
        topic: "Friendly Behaviour",
        keyPoints: "Greeting, smiling, helping",
      },
      {
        topic: "Making Friends",
        keyPoints: "Sharing, playing, talking",
      },
      {
        topic: "Classroom Kindness",
        keyPoints: "Welcome and support",
      },
    ],

    teachingMethodActivities: [
      "Discuss friendship experiences",
      "Practise friendly greetings",
      "Conduct pair activities",
      "Roleplay helping classmates",
    ],

    teachingResources: [
      "Textbook",
      "Picture cards",
      "Situation cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask friendship questions",
      "Practise greetings",
      "Identify kind actions",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Welcome new classmates",
      "Show friendly behaviour",
      "Help others kindly",
      "Build positive friendships",
    ],

    homeworkExtension: ["Draw two friends", "Write friendship qualities"],
  },
  {
    chapter: 5,
    chapterName: "The Sharing Picnic",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand sharing values",
      "Identify picnic foods",
      "Practise sharing politely",
      "Strengthen friendship bonds",
    ],

    contentToBeCovered: [
      {
        topic: "Picnic Setting",
        keyPoints: "Park, mat, friends",
      },
      {
        topic: "Picnic Foods",
        keyPoints: "Sandwiches, fruits, rolls",
      },
      {
        topic: "Sharing Food",
        keyPoints: "Everyone shares happily",
      },
      {
        topic: "Cleanliness",
        keyPoints: "Dispose wrappers properly",
      },
    ],

    teachingMethodActivities: [
      "Discuss picnic experiences",
      "Identify picnic foods",
      "Roleplay sharing situations",
      "Discuss cleanliness habits",
    ],

    teachingResources: [
      "Textbook",
      "Food picture cards",
      "Situation cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask picnic questions",
      "Identify food items",
      "Discuss sharing benefits",
      "Answer short questions",
    ],

    expectedLearningOutcome: [
      "Understand importance sharing",
      "Practise sharing politely",
      "Value friendship bonds",
      "Keep places clean",
    ],

    homeworkExtension: ["Draw picnic scene", "Write sharing benefits"],
  },
  {
    chapter: 6,
    chapterName: "Let’s Play Together",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Enjoy group activities",
      "Practise sharing toys",
      "Encourage teamwork skills",
      "Develop helping habits",
    ],

    contentToBeCovered: [
      {
        topic: "Group Games",
        keyPoints: "Ball, running, hopping",
      },
      {
        topic: "Sharing Toys",
        keyPoints: "Share with friends",
      },
      {
        topic: "Helping Friends",
        keyPoints: "Lend a hand",
      },
      {
        topic: "Teamwork",
        keyPoints: "Work and play",
      },
    ],

    teachingMethodActivities: [
      "Recite poem rhythmically",
      "Discuss favourite games",
      "Conduct group games",
      "Practise sharing toys",
    ],

    teachingResources: [
      "Textbook",
      "Balls",
      "Toy cards",
      "Picture cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask game questions",
      "Identify sharing actions",
      "Observe group participation",
      "Answer poem questions",
    ],

    expectedLearningOutcome: [
      "Enjoy playing together",
      "Share toys willingly",
      "Help friends during games",
      "Understand teamwork importance",
    ],

    homeworkExtension: ["Draw favourite game", "Write sharing benefits"],
  },
  {
    chapter: 7,
    chapterName: "Moti the Puppy",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand animal care",
      "Identify puppy needs",
      "Develop kindness towards animals",
      "Practise responsible pet care",
    ],

    contentToBeCovered: [
      {
        topic: "Moti The Puppy",
        keyPoints: "Hungry, tired, playful",
      },
      {
        topic: "Animal Needs",
        keyPoints: "Food, water, shelter",
      },
      {
        topic: "Animal Care",
        keyPoints: "Love, kindness, gentleness",
      },
      {
        topic: "Pet Friendship",
        keyPoints: "Care creates friendship",
      },
    ],

    teachingMethodActivities: [
      "Discuss pet experiences",
      "Observe puppy pictures",
      "Roleplay animal care",
      "Discuss caring habits",
    ],

    teachingResources: [
      "Textbook",
      "Animal pictures",
      "Pet care cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify puppy needs",
      "Ask animal questions",
      "Discuss caring actions",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Identify animal needs",
      "Show kindness towards animals",
      "Practise responsible pet care",
      "Understand animal friendship",
    ],

    homeworkExtension: ["Draw favourite animal", "Write animal needs"],
  },
  {
    chapter: 8,
    chapterName: "The Little Chick",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Identify farm animals",
      "Understand animal families",
      "Develop caring behaviour",
      "Encourage helping animals",
    ],

    contentToBeCovered: [
      {
        topic: "Lost Chick",
        keyPoints: "Chick needs help",
      },
      {
        topic: "Farm Animals",
        keyPoints: "Cows, ducks, hens",
      },
      {
        topic: "Finding Family",
        keyPoints: "Follow mother hen",
      },
      {
        topic: "Kindness",
        keyPoints: "Help lost animals",
      },
    ],

    teachingMethodActivities: [
      "Discuss farm animals",
      "Identify animal sounds",
      "Follow story sequence",
      "Roleplay helping animals",
    ],

    teachingResources: [
      "Textbook",
      "Farm animal pictures",
      "Sound cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify farm animals",
      "Identify animal sounds",
      "Sequence story events",
      "Answer comprehension questions",
    ],

    expectedLearningOutcome: [
      "Identify common farm animals",
      "Recognise animal sounds",
      "Understand animal families",
      "Show kindness towards animals",
    ],

    homeworkExtension: ["Draw farm animals", "Match animal sounds"],
  },
  {
    chapter: 9,
    chapterName: "Animal Parade",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Identify different animals",
      "Recognise animal movements",
      "Identify animal sounds",
      "Appreciate animal diversity",
    ],

    contentToBeCovered: [
      {
        topic: "Animal Types",
        keyPoints: "Elephant, horse, rabbit",
      },
      {
        topic: "Animal Movements",
        keyPoints: "Walk, trot, hop",
      },
      {
        topic: "Animal Sounds",
        keyPoints: "Quack, chirp, woof",
      },
      {
        topic: "Animal Diversity",
        keyPoints: "Different shapes, sizes",
      },
    ],

    teachingMethodActivities: [
      "Recite animal poem",
      "Identify animal pictures",
      "Imitate animal movements",
      "Practise animal sounds",
    ],

    teachingResources: [
      "Textbook",
      "Animal picture cards",
      "Sound cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify animal movements",
      "Match animal sounds",
      "Identify animal pictures",
      "Answer poem questions",
    ],

    expectedLearningOutcome: [
      "Identify common animals",
      "Recognise animal movements",
      "Identify animal sounds",
      "Appreciate animal diversity",
    ],

    homeworkExtension: ["Draw favourite animal", "Write animal movement"],
  },
  {
    chapter: 10,
    chapterName: "The Rainbow Garden",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Identify flower colours",
      "Observe garden beauty",
      "Appreciate nature's diversity",
      "Develop observation skills",
    ],

    contentToBeCovered: [
      {
        topic: "Garden Colours",
        keyPoints: "Roses, lilies, daisies",
      },
      {
        topic: "Garden Life",
        keyPoints: "Flowers, birds, butterflies",
      },
      {
        topic: "Plant Care",
        keyPoints: "Watering, cleaning, caring",
      },
      {
        topic: "Protecting Nature",
        keyPoints: "Keep gardens clean",
      },
    ],

    teachingMethodActivities: [
      "Observe flower pictures",
      "Identify different colours",
      "Discuss plant care",
      "Practise garden cleanliness",
    ],

    teachingResources: [
      "Textbook",
      "Flower pictures",
      "Colour cards",
      "Real leaves",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify flower colours",
      "Name garden plants",
      "Discuss plant care",
      "Answer comprehension questions",
    ],

    expectedLearningOutcome: [
      "Identify common flowers",
      "Recognise flower colours",
      "Understand plant care",
      "Protect surrounding nature",
    ],

    homeworkExtension: ["Draw colourful garden", "Label flower colours"],
  },
  {
    chapter: 11,
    chapterName: "Raindrops",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand rainfall importance",
      "Identify rain sounds",
      "Recognise water benefits",
      "Appreciate nature's beauty",
    ],

    contentToBeCovered: [
      {
        topic: "Rainfall",
        keyPoints: "Raindrops fall from clouds",
      },
      {
        topic: "Rain Sounds",
        keyPoints: "Pitter-patter, splash, tap",
      },
      {
        topic: "Water Benefits",
        keyPoints: "Plants, ponds, streams",
      },
      {
        topic: "Nature After Rain",
        keyPoints: "Freshness, growth, sunshine",
      },
    ],

    teachingMethodActivities: [
      "Recite poem rhythmically",
      "Listen to rain sounds",
      "Discuss rainfall benefits",
      "Observe rain pictures",
    ],

    teachingResources: [
      "Textbook",
      "Rain pictures",
      "Sound cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify rain sounds",
      "Discuss rainfall benefits",
      "Answer poem questions",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Understand rainfall importance",
      "Identify common rain sounds",
      "Recognise water benefits",
      "Appreciate nature's beauty",
    ],

    homeworkExtension: ["Draw rainy scene", "Write rainfall benefits"],
  },
  {
    chapter: 12,
    chapterName: "The Busy Honeybee",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand bee activities",
      "Recognise teamwork importance",
      "Value hard work",
      "Encourage helping others",
    ],

    contentToBeCovered: [
      {
        topic: "Honeybee Life",
        keyPoints: "Garden, flowers, hive",
      },
      {
        topic: "Collecting Nectar",
        keyPoints: "Flowers provide nectar",
      },
      {
        topic: "Hard Work",
        keyPoints: "Work carefully daily",
      },
      {
        topic: "Teamwork",
        keyPoints: "Bees work together",
      },
    ],

    teachingMethodActivities: [
      "Discuss honeybee activities",
      "Observe bee pictures",
      "Sequence bee activities",
      "Discuss teamwork values",
    ],

    teachingResources: [
      "Textbook",
      "Bee pictures",
      "Flower pictures",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Identify bee activities",
      "Ask vocabulary questions",
      "Discuss teamwork examples",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Understand honeybee activities",
      "Recognise teamwork importance",
      "Value careful work",
      "Help others willingly",
    ],

    homeworkExtension: ["Draw honeybee", "Label hive parts"],
  },
  {
    chapter: 13,
    chapterName: "Clean Hands",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand hand hygiene",
      "Identify harmful germs",
      "Practise proper handwashing",
      "Develop healthy habits",
    ],

    contentToBeCovered: [
      {
        topic: "Dirty Hands",
        keyPoints: "Dust and germs",
      },
      {
        topic: "Handwashing",
        keyPoints: "Soap and water",
      },
      {
        topic: "Healthy Habits",
        keyPoints: "Wash before eating",
      },
      {
        topic: "Germ Prevention",
        keyPoints: "Clean hands prevent sickness",
      },
    ],

    teachingMethodActivities: [
      "Discuss handwashing habits",
      "Demonstrate handwashing steps",
      "Identify healthy habits",
      "Complete hygiene maze",
    ],

    teachingResources: [
      "Textbook",
      "Soap",
      "Water",
      "Handwashing chart",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Ask hygiene questions",
      "Demonstrate handwashing",
      "Identify healthy habits",
      "Complete short answers",
    ],

    expectedLearningOutcome: [
      "Understand hand hygiene",
      "Recognise harmful germs",
      "Practise proper handwashing",
      "Develop healthy habits",
    ],

    homeworkExtension: ["Draw washing steps", "List healthy habits"],
  },
  {
    chapter: 14,
    chapterName: "Thank You, Everyone!",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Understand grateful behaviour",
      "Practise saying thank-you",
      "Appreciate others' help",
      "Develop good manners",
    ],

    contentToBeCovered: [
      {
        topic: "Thank You",
        keyPoints: "Show gratitude respectfully",
      },
      {
        topic: "People Who Help",
        keyPoints: "Family, friends, teachers",
      },
      {
        topic: "Polite Words",
        keyPoints: "Thank You, Please, Sorry",
      },
      {
        topic: "Good Manners",
        keyPoints: "Kindness and respect",
      },
    ],

    teachingMethodActivities: [
      "Discuss helpful people",
      "Practise thank-you phrases",
      "Roleplay polite situations",
      "Conduct thank-you activity",
    ],

    teachingResources: [
      "Textbook",
      "Situation cards",
      "Word cards",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Match polite words",
      "Roleplay polite situations",
      "Ask gratitude questions",
      "Complete sentences",
    ],

    expectedLearningOutcome: [
      "Express gratitude politely",
      "Appreciate others' help",
      "Use polite words",
      "Show respectful behaviour",
    ],

    homeworkExtension: ["Draw helpful person", "Write thank-you message"],
  },
  {
    chapter: 15,
    chapterName: "Magic Words",
    class: "Class 1",
    subject: "English",
    format: "Concise chapter-wise plan",

    learningObjectives: [
      "Identify polite expressions",
      "Practise polite language",
      "Understand respectful communication",
      "Develop good manners",
    ],

    contentToBeCovered: [
      {
        topic: "Please",
        keyPoints: "Ask things politely",
      },
      {
        topic: "Thank You",
        keyPoints: "Show gratitude",
      },
      {
        topic: "Sorry",
        keyPoints: "Apologise for mistakes",
      },
      {
        topic: "Excuse Me",
        keyPoints: "Interrupt politely",
      },
    ],

    teachingMethodActivities: [
      "Read poem rhythmically",
      "Use situation cards",
      "Choose magic words",
      "Conduct pair roleplays",
      "Create magic flower",
    ],

    teachingResources: [
      "Textbook",
      "Magic-word cards",
      "Situation cards",
      "Chart paper",
      "Crayons",
      "Board",
      "Worksheet",
    ],

    assessment: [
      "Poem recitation",
      "Oral situations",
      "Choose correct words",
      "Fill in blanks",
      "Roleplay activity",
    ],

    expectedLearningOutcome: [
      "Identify magic words",
      "Use polite language",
      "Show kindness respectfully",
      "Practise good manners",
    ],

    homeworkExtension: [
      "Draw four-petal flower",
      "Write magic words",
      "Use two sentences",
    ],
  },
]; */

const lessonPlans = importedLessonPlans;

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim() !== "") return [value];
  return [];
};

const normalizeContentCovered = (items) =>
  toArray(items).map((item) => ({
    topic: item?.topic || "",
    points: item?.keyPoints || item?.points || "",
  }));

const getLessonDataFromPlan = (plan = {}) => {
  const sections = toArray(plan.sections);
  const sectionTitles = sections
    .map((section) => section.title)
    .filter(Boolean);
  const writeQuestions = sections
    .filter((section) => section.type === "write")
    .flatMap((section) => toArray(section.questions))
    .map((question) => question.question)
    .filter(Boolean);

  return {
    bookName: "GYAN SETU",
    planTitle: "LESSON PLAN",
    className: plan.className || plan.class || "",
    subject: plan.subject || "English",
    chapterNumber: plan.chapter
      ? `Chapter ${String(plan.chapter).replace(/^CH\s*/i, "")}`
      : "",
    chapterName: plan.chapterName || plan.title || "",
    format: plan.format || "Concise chapter-wise plan",
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
      plan.teachingResources || ["पाठ्यपुस्तक", "कार्यपत्रक"],
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
    if (window.confirm("क्या आप फॉर्म को रीसेट करना चाहते हैं?")) {
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
    const pageWidth = 210;
    const maxPageHeight = 297;
    const margin = 6;
    const contentWidth = pageWidth - margin * 2;
    let pdf;

    canvases.forEach((canvas, pageIndex) => {
      const widthScale = contentWidth / canvas.width;
      const heightScale = (maxPageHeight - margin * 2) / canvas.height;
      const pageScale = Math.min(widthScale, heightScale);
      const imageWidth = canvas.width * pageScale;
      const imageHeight = canvas.height * pageScale;
      const pageHeight = Math.min(maxPageHeight, imageHeight + margin * 2);
      const x = margin + (contentWidth - imageWidth) / 2;
      const y = margin;
      const orientation = pageHeight >= pageWidth ? "p" : "l";
      const format =
        orientation === "p" ? [pageWidth, pageHeight] : [pageHeight, pageWidth];

      if (pageIndex === 0) {
        pdf = new jsPDF(orientation, "mm", format);
      } else {
        pdf.addPage(format, orientation);
      }

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
        const fileName = (planData.chapterName || `Lesson-Plan-${index + 1}`)
          .replace(/[<>:"/\\|?*]/g, "-")
          .trim();
        zip.file(`${fileName || `Lesson-Plan-${index + 1}`}.pdf`, pdfBlob);

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
            <h1>LESSON PLAN</h1>
            <p>नीचे सभी जानकारी भरें</p>
          </div>

          <button className="reset-button" onClick={resetForm}>
            रीसेट
          </button>
        </div>

        <div className="form-card">
          <h2>
            <span>01</span>
            मूल जानकारी
          </h2>

          <label>
            पुस्तक का नाम
            <input
              type="text"
              name="bookName"
              value={lessonData.bookName}
              onChange={handleChange}
              placeholder="Enter book name"
            />
          </label>

          <label>
            योजना का शीर्षक
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
                placeholder="विज्ञान"
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
                placeholder="Enter chapter name"
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
                <strong>सामग्री {index + 1}</strong>

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
                मुख्य बिंदु
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
            + Add Content
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
                placeholder="Enter teaching resource"
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

          <div className="download-actions">
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
              ← Previous
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
              className="download-button zip-button"
              onClick={downloadAllLessonPlansAsZip}
            >
              ↓ Download All ZIP
            </button>

            <button
              className="download-button pdf-button"
              onClick={downloadPDF}
            >
              ↓ Download PDF
            </button>
          </div>

          <span className="live-status">● Live</span>
        </div>

        <main className="lesson-preview" ref={previewRef}>
          {/* HEADER */}

          <header className="lesson-header">
            <h1>{lessonData.bookName || "पुस्तक का नाम"}</h1>

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
