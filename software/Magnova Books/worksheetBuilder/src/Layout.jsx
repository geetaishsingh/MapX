

import { useState } from "react";

import WorksheetPreview from "./worksheetPreview.jsx";
import WorksheetEditor from "./WorksheetEditor.jsx";

import "./Layout.scss";


const initialWorksheet = [
  // =========================================================
  // CHAPTER 1: EVOLUTION OF COMPUTERS
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 1,
    title: "Evolution of Computers",

    fillInTheBlanks: [
      "Early humans used stones, sticks, and ________ for counting.",
      "The Abacus was invented in ancient ________.",
      "Blaise Pascal invented the Pascaline in ________.",
      "Charles Babbage is known as the father of ________.",
      "Lady Ada Lovelace is known as the first computer ________."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which device was used for early calculations?",
        options: ["Abacus", "Monitor", "Printer", "Keyboard"],
        answer: "Abacus"
      },
      {
        question: "Who invented the Pascaline?",
        options: ["Charles Babbage", "Blaise Pascal", "Herman Hollerith", "Ada Lovelace"],
        answer: "Blaise Pascal"
      },
      {
        question: "Who is known as the father of computers?",
        options: ["Blaise Pascal", "Charles Babbage", "Bill Gates", "Herman Hollerith"],
        answer: "Charles Babbage"
      },
      {
        question: "Who wrote programs for the Analytical Engine?",
        options: ["Ada Lovelace", "Blaise Pascal", "Howard Aiken", "Herman Hollerith"],
        answer: "Ada Lovelace"
      },
      {
        question: "Which machine used punched cards to read and store data?",
        options: ["Abacus", "Pascaline", "Hollerith's Tabulating Machine", "Step Reckoner"],
        answer: "Hollerith's Tabulating Machine"
      }
    ],

    trueOrFalse: [
      "Early humans used fingers and pebbles for counting.",
      "The Pascaline could perform addition and subtraction.",
      "Charles Babbage designed the Analytical Engine.",
      "Ada Lovelace is known as the first computer programmer.",
      "Computers were invented by only one person."
    ],

    answerInShort: [
      "Name two early counting tools.",
      "What is an Abacus?",
      "What was the Pascaline?",
      "Who was Charles Babbage?",
      "Who was Lady Ada Lovelace?"
    ],

    thinkAndAnswer: [
      "How did people calculate before computers existed?",
      "Why have computers changed over time?",
      "How do modern computers help students?",
      "Why should we learn about computer history?"
    ]
  },

  // =========================================================
  // CHAPTER 2: STORAGE AND MEMORY DEVICES
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 2,
    title: "Storage and Memory Devices",

    fillInTheBlanks: [
      "A combination of eight bits makes one ________.",
      "A computer stores information using 0 and ________.",
      "RAM stands for Random Access ________.",
      "ROM stands for Read Only ________.",
      "A pen drive is a type of ________ memory device."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "How many bits make one byte?",
        options: ["Two", "Four", "Eight", "Sixteen"],
        answer: "Eight"
      },
      {
        question: "Which is a type of primary memory?",
        options: ["CD", "RAM", "Pen drive", "Hard disc"],
        answer: "RAM"
      },
      {
        question: "Which memory loses its data when the computer is switched off?",
        options: ["ROM", "RAM", "DVD", "Memory card"],
        answer: "RAM"
      },
      {
        question: "Which device is used for portable data storage?",
        options: ["Pen drive", "Monitor", "Mouse", "Speaker"],
        answer: "Pen drive"
      },
      {
        question: "Which is a secondary storage device?",
        options: ["RAM", "ROM", "Hard disc", "Processor"],
        answer: "Hard disc"
      }
    ],

    trueOrFalse: [
      "Computer memory stores information.",
      "Eight bits make one byte.",
      "RAM is temporary memory.",
      "ROM stands for Random Access Memory.",
      "A memory card can store digital information."
    ],

    answerInShort: [
      "What is computer memory?",
      "What is primary memory?",
      "What is secondary memory?",
      "Write the full form of RAM.",
      "Name four storage devices."
    ],

    thinkAndAnswer: [
      "Why do computers need storage devices?",
      "Why should you save your schoolwork?",
      "Which storage device would you carry to school?",
      "Why should important files have backup copies?"
    ]
  },

  // =========================================================
  // CHAPTER 3: WINDOWS 10 GUI SETTINGS
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 3,
    title: "Windows 10 GUI Settings",

    fillInTheBlanks: [
      "GUI stands for Graphical User ________.",
      "Windows 10 is an operating ________.",
      "The main workspace of a computer is called the ________.",
      "The desktop background is also called ________.",
      "A collection of visual settings is called a ________."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does GUI stand for?",
        options: [
          "General User Internet",
          "Graphical User Interface",
          "Graphic Universal Input",
          "General Utility Interface"
        ],
        answer: "Graphical User Interface"
      },
      {
        question: "Which software is an operating system?",
        options: ["Windows 10", "MS Word", "Paint", "PowerPoint"],
        answer: "Windows 10"
      },
      {
        question: "Where can you access files and applications?",
        options: ["Desktop", "Printer", "Speaker", "Keyboard"],
        answer: "Desktop"
      },
      {
        question: "What is another name for desktop background?",
        options: ["Taskbar", "Wallpaper", "Icon", "Menu"],
        answer: "Wallpaper"
      },
      {
        question: "Which setting changes the appearance of the desktop?",
        options: ["Personalization", "Calculator", "Recycle Bin", "File deletion"],
        answer: "Personalization"
      }
    ],

    trueOrFalse: [
      "Windows 10 uses a graphical user interface.",
      "An operating system manages computer activities.",
      "The desktop is the primary workspace.",
      "A theme can change the appearance of the desktop.",
      "Personalization cannot change the desktop background."
    ],

    answerInShort: [
      "What is a GUI?",
      "What is an operating system?",
      "What is desktop personalization?",
      "What is a desktop theme?",
      "How can you change wallpaper?"
    ],

    thinkAndAnswer: [
      "Why is a graphical interface easy to use?",
      "How would you personalize your computer?",
      "Why should you choose a comfortable screen appearance?",
      "How do desktop icons help users?"
    ]
  },

  // =========================================================
  // CHAPTER 4: EXPLORE OBJECTS IN MS WORD 2016
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 4,
    title: "Explore Objects in MS Word 2016",

    fillInTheBlanks: [
      "The ________ tab contains tools for inserting objects.",
      "Pictures make documents more attractive and ________.",
      "The ________ option lets us create decorative text.",
      "The Shapes tool allows us to insert different ________.",
      "Symbols and characters can be inserted into a Word ________."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which tab is used to insert pictures in Word?",
        options: ["Home", "Insert", "Review", "View"],
        answer: "Insert"
      },
      {
        question: "Which feature creates decorative text?",
        options: ["WordArt", "Recycle Bin", "Taskbar", "Slide Show"],
        answer: "WordArt"
      },
      {
        question: "What can you use to draw a rectangle in Word?",
        options: ["Shapes", "Font Size", "Zoom", "Save"],
        answer: "Shapes"
      },
      {
        question: "Which option allows you to add pictures from the web?",
        options: ["Online Pictures", "Page Number", "Font Colour", "Print"],
        answer: "Online Pictures"
      },
      {
        question: "What appears around a selected picture when resizing it?",
        options: ["Sizing handles", "Slide numbers", "Sound controls", "Taskbar icons"],
        answer: "Sizing handles"
      }
    ],

    trueOrFalse: [
      "Pictures can make a document more attractive.",
      "WordArt is used to create decorative text.",
      "The Insert tab contains tools for adding objects.",
      "Shapes cannot be inserted into a Word document.",
      "Sizing handles can help resize a picture."
    ],

    answerInShort: [
      "What are objects in MS Word?",
      "How do pictures improve documents?",
      "What is WordArt?",
      "How can you insert a picture?",
      "What are sizing handles?"
    ],

    thinkAndAnswer: [
      "How would you design an attractive school notice?",
      "Why are pictures useful in a document?",
      "How can shapes improve a presentation or document?",
      "When would you use WordArt in schoolwork?"
    ]
  },

  // =========================================================
  // CHAPTER 5: MORE FEATURES OF MS WORD 2016
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 5,
    title: "More Features of MS Word 2016",

    fillInTheBlanks: [
      "Changing the appearance of text is called ________.",
      "The ________ effect makes text darker.",
      "The Italic effect slants text towards the ________.",
      "The ________ effect places a line below text.",
      "The ________ tab contains font formatting options."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is formatting?",
        options: [
          "Changing the appearance of a document",
          "Deleting the operating system",
          "Turning off a computer",
          "Printing without a document"
        ],
        answer: "Changing the appearance of a document"
      },
      {
        question: "Which effect makes text darker?",
        options: ["Italic", "Bold", "Underline", "Superscript"],
        answer: "Bold"
      },
      {
        question: "Which effect places a line below text?",
        options: ["Bold", "Italic", "Underline", "Shading"],
        answer: "Underline"
      },
      {
        question: "Which tab contains font formatting tools?",
        options: ["Home", "Insert", "View", "File"],
        answer: "Home"
      },
      {
        question: "Which alignment places text in the middle?",
        options: ["Left", "Right", "Centre", "Justify"],
        answer: "Centre"
      }
    ],

    trueOrFalse: [
      "Formatting makes documents clearer and more attractive.",
      "Bold text appears darker than normal text.",
      "Italic text slants towards the right.",
      "Underline places a line below selected text.",
      "Formatting cannot change font size."
    ],

    answerInShort: [
      "What is formatting?",
      "What is the Bold effect?",
      "What is the Italic effect?",
      "Name four text alignments.",
      "What is a bulleted list?"
    ],

    thinkAndAnswer: [
      "Why is formatting important in a school project?",
      "Which font style would you use for a heading?",
      "How can alignment make a document easier to read?",
      "Why should you use lists for important points?"
    ]
  },

  // =========================================================
  // CHAPTER 6: MS POWERPOINT 2016
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 6,
    title: "MS PowerPoint 2016",

    fillInTheBlanks: [
      "MS PowerPoint is used to create ________.",
      "Each page in a presentation is called a ________.",
      "The ________ Bar displays the presentation name.",
      "The Ribbon contains tabs and ________.",
      "The ________ pane provides space for speaker's notes."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is MS PowerPoint used for?",
        options: [
          "Creating presentations",
          "Only calculating numbers",
          "Playing music only",
          "Managing computer hardware"
        ],
        answer: "Creating presentations"
      },
      {
        question: "What is each page of a presentation called?",
        options: ["Document", "Slide", "Folder", "Worksheet"],
        answer: "Slide"
      },
      {
        question: "Which shortcut creates a new blank presentation?",
        options: ["Ctrl + P", "Ctrl + N", "Ctrl + S", "Ctrl + C"],
        answer: "Ctrl + N"
      },
      {
        question: "Which pane displays slide thumbnails?",
        options: [
          "Slide Navigation Pane",
          "Notes Pane",
          "Zoom Slider",
          "Title Bar"
        ],
        answer: "Slide Navigation Pane"
      },
      {
        question: "Which pane is used to add speaker's notes?",
        options: ["Slide Pane", "Notes Pane", "Ribbon", "Title Bar"],
        answer: "Notes Pane"
      }
    ],

    trueOrFalse: [
      "PowerPoint is used to create presentations.",
      "A presentation can contain text and images.",
      "The Title Bar displays the presentation name.",
      "The Notes Pane is used for speaker's notes.",
      "The Slide Navigation Pane cannot rearrange slides."
    ],

    answerInShort: [
      "What is a presentation?",
      "What is a slide?",
      "Name four PowerPoint components.",
      "What is the Ribbon?",
      "What is the Zoom Slider?"
    ],

    thinkAndAnswer: [
      "How would you create a presentation about your school?",
      "Why are pictures useful in presentations?",
      "How can slides help explain a difficult topic?",
      "Why should you save your presentation regularly?"
    ]
  },

  // =========================================================
  // CHAPTER 7: INTRODUCTION TO SCRATCH
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 7,
    title: "Introduction to Scratch",

    fillInTheBlanks: [
      "Scratch helps create animations, games, and ________.",
      "The default sprite in Scratch is the ________.",
      "The ________ tab displays different costumes of a sprite.",
      "The ________ button starts a Scratch script.",
      "The ________ option lets you draw your own sprite."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is Scratch used for?",
        options: [
          "Creating games and animations",
          "Only typing letters",
          "Only storing files",
          "Printing documents"
        ],
        answer: "Creating games and animations"
      },
      {
        question: "Which sprite appears by default in Scratch?",
        options: ["Dragon", "Balloon", "Cat", "Butterfly"],
        answer: "Cat"
      },
      {
        question: "Which tab is used to edit sprite costumes?",
        options: ["Code", "Costumes", "File", "View"],
        answer: "Costumes"
      },
      {
        question: "Which button starts a Scratch project?",
        options: ["Red Stop button", "Green Flag button", "Delete button", "Save button"],
        answer: "Green Flag button"
      },
      {
        question: "Which option lets you create your own sprite by drawing?",
        options: ["Paint", "Surprise", "Upload Sprite", "Choose a Sprite"],
        answer: "Paint"
      }
    ],

    trueOrFalse: [
      "Scratch can be used to create animations.",
      "The Cat is the default sprite in Scratch.",
      "The Costumes tab helps change a sprite's appearance.",
      "The Paint option lets users draw their own sprites.",
      "Scratch projects cannot contain sounds."
    ],

    answerInShort: [
      "What is Scratch?",
      "What is a sprite?",
      "What is a backdrop?",
      "How can you add a new sprite?",
      "What does the Green Flag do?"
    ],

    thinkAndAnswer: [
      "What simple game would you create using Scratch?",
      "How can animation make a story interesting?",
      "Why should you test your Scratch project?",
      "How could you use Scratch for classroom learning?"
    ]
  },

  // =========================================================
  // CHAPTER 8: AI INTEGRATION AND ROBOTIC
  // =========================================================
  {
    className: "4",
    subject: "Computer",
    chapter: 8,
    title: "AI Integration and Robotic",

    fillInTheBlanks: [
      "IoT stands for Internet of ________.",
      "AI stands for Artificial ________.",
      "AI and IoT together are called ________.",
      "Smart cities use connected devices and ________.",
      "Robots can help farmers plant seeds and monitor crop ________."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does IoT stand for?",
        options: [
          "Internet of Things",
          "Information of Technology",
          "Input of Tools",
          "Internet of Text"
        ],
        answer: "Internet of Things"
      },
      {
        question: "What is AI?",
        options: [
          "Artificial Intelligence",
          "Automatic Internet",
          "Advanced Input",
          "Applied Information"
        ],
        answer: "Artificial Intelligence"
      },
      {
        question: "What is AIoT?",
        options: [
          "AI combined with IoT",
          "A type of keyboard",
          "A computer monitor",
          "A storage device"
        ],
        answer: "AI combined with IoT"
      },
      {
        question: "Where can robots assist doctors?",
        options: ["Healthcare", "Only farming", "Only entertainment", "Only transportation"],
        answer: "Healthcare"
      },
      {
        question: "How can robots help in agriculture?",
        options: [
          "Plant seeds and monitor crops",
          "Write school essays only",
          "Replace all roads",
          "Print books only"
        ],
        answer: "Plant seeds and monitor crops"
      }
    ],

    trueOrFalse: [
      "IoT connects physical objects to the internet.",
      "Artificial Intelligence can help machines perform tasks.",
      "AIoT combines AI and IoT technologies.",
      "Robots are used only in factories.",
      "Robots can help scientists explore space."
    ],

    answerInShort: [
      "What is IoT?",
      "What is Artificial Intelligence?",
      "What is AIoT?",
      "Name three applications of AIoT.",
      "How are robots useful in healthcare?"
    ],

    thinkAndAnswer: [
      "How could a smart device help you at home?",
      "What three tasks would you give a friendly robot?",
      "How can robots help farmers and doctors?",
      "Why should we use smart technology responsibly?"
    ]
  }
];











const worksheetChapters = initialWorksheet.map((chapter, chapterIndex) => {
  const fillInTheBlanks = Array.isArray(chapter.fillInTheBlanks)
    ? chapter.fillInTheBlanks
    : [];

  const chooseTheCorrectAnswer = Array.isArray(chapter.chooseTheCorrectAnswer)
    ? chapter.chooseTheCorrectAnswer
    : [];

  const trueOrFalse = Array.isArray(chapter.trueOrFalse)
    ? chapter.trueOrFalse
    : [];

  const answerInShort = Array.isArray(chapter.answerInShort)
    ? chapter.answerInShort
    : [];

  const thinkAndAnswer = Array.isArray(chapter.thinkAndAnswer)
    ? chapter.thinkAndAnswer
    : [];

  return {
    chapter: `CH ${chapter.chapter}`,
    title: chapter.title || `Chapter ${chapterIndex + 1}`,
    className: chapter.className || "6",
    subject: chapter.subject || "Computer",
    sections: [
      {
        id: 1,
        title: "Fill in the blanks",
        type: "fillblank",
        questions: fillInTheBlanks.map((question, questionIndex) => ({
          id: questionIndex + 1,
          question,
          answer: ""
        }))
      },
      {
        id: 2,
        title: "Choose the correct answer",
        type: "mcq",
        questions: chooseTheCorrectAnswer.map((item, questionIndex) => ({
          id: questionIndex + 1,
          question: item?.question || "",
          options: Array.isArray(item?.options) ? item.options : [],
          answer: ""
        }))
      },
      {
        id: 3,
        title: "True or False",
        type: "truefalse",
        questions: trueOrFalse.map((statement, questionIndex) => ({
          id: questionIndex + 1,
          question: statement || "",
          options: ["True", "False"],
          answer: ""
        }))
      },
      {
        id: 4,
        title: "Answer in short",
        type: "think",
        questions: answerInShort.map((question, questionIndex) => ({
          id: questionIndex + 1,
          question,
          answer: ""
        }))
      },
      {
        id: 5,
        title: "Think and answer",
        type: "think",
        questions: thinkAndAnswer.map((question, questionIndex) => ({
          id: questionIndex + 1,
          question,
          answer: ""
        }))
      }
    ]
  };
});

const createChapter = (chapterNumber) => ({
  ...structuredClone(worksheetChapters[0]),
  chapter: `CH ${chapterNumber}`,
  title: `Chapter ${chapterNumber}`
});


// =====================================================
// LAYOUT COMPONENT
// =====================================================

const Layout = () => {

    const [chapters, setChapters] =
      useState(worksheetChapters);

    const [currentChapterIndex, setCurrentChapterIndex] =
        useState(0);

    const worksheet =
        chapters[currentChapterIndex];


    const setWorksheet = (updateWorksheet) => {

        setChapters((previousChapters) =>
            previousChapters.map((chapter, index) =>
                index === currentChapterIndex
                    ? typeof updateWorksheet === "function"
                        ? updateWorksheet(chapter)
                        : updateWorksheet
                    : chapter
            )
        );
    };


    const goToPreviousChapter = () => {

        setCurrentChapterIndex((index) =>
            Math.max(0, index - 1)
        );
    };


    const goToNextChapter = () => {

        setCurrentChapterIndex((index) =>
            Math.min(chapters.length - 1, index + 1)
        );
    };


    const addChapter = () => {

        setChapters((previousChapters) => [
            ...previousChapters,
            createChapter(previousChapters.length + 1)
        ]);

        setCurrentChapterIndex(chapters.length);
    };


    return (

        <div className="flex">


            {/* =========================================
                LEFT SIDE
            ========================================= */}

            <div className="left">

                <WorksheetEditor
                    worksheet={worksheet}
                    setWorksheet={setWorksheet}
                    chapterIndex={currentChapterIndex}
                    chapterCount={chapters.length}
                    onPreviousChapter={goToPreviousChapter}
                    onNextChapter={goToNextChapter}
                    onAddChapter={addChapter}
                />

            </div>


            {/* =========================================
                RIGHT SIDE
            ========================================= */}

            <div className="right">

                <WorksheetPreview
                    worksheet={worksheet}
                    worksheets={chapters}
                />

            </div>


        </div>

    );

};


export default Layout;