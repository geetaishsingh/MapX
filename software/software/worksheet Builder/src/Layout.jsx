

import { useState } from "react";

import WorksheetPreview from "./worksheetPreview.jsx";
import WorksheetEditor from "./WorksheetEditor.jsx";

import "./Layout.scss";


// =====================================================
// INITIAL WORKSHEET DATA
// =====================================================
const initialWorksheet = [
  {
    chapter: 1,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Sentence",
    fillInTheBlanks: [
      "A sentence is a group of words which makes complete ______.",
      "A sentence which expresses acceptance or denial of a fact is called an ______ Sentence.",
      "A sentence which asks a question is called an ______ Sentence.",
      "A sentence which expresses an order, advice or suggestion is called an ______ Sentence.",
      "A sentence which expresses a wish, prayer, blessing or curse is called an ______ Sentence."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What is a sentence?",
        options: [
          "A group of words making complete sense",
          "A single word",
          "A group of letters",
          "A group of sounds"
        ],
        answer: "A group of words making complete sense"
      },
      {
        question: "Which type of sentence asks a question?",
        options: [
          "Assertive Sentence",
          "Interrogative Sentence",
          "Imperative Sentence",
          "Optative Sentence"
        ],
        answer: "Interrogative Sentence"
      },
      {
        question: "Which type of sentence expresses an order or advice?",
        options: [
          "Imperative Sentence",
          "Interrogative Sentence",
          "Exclamatory Sentence",
          "Optative Sentence"
        ],
        answer: "Imperative Sentence"
      },
      {
        question: "Which type of sentence expresses sudden feelings?",
        options: [
          "Assertive Sentence",
          "Imperative Sentence",
          "Exclamatory Sentence",
          "Interrogative Sentence"
        ],
        answer: "Exclamatory Sentence"
      },
      {
        question: "Which sentence expresses a wish or prayer?",
        options: [
          "Optative Sentence",
          "Assertive Sentence",
          "Negative Sentence",
          "Interrogative Sentence"
        ],
        answer: "Optative Sentence"
      }
    ],
    trueOrFalse: [
      "A sentence is a group of words which makes complete sense.",
      "An Interrogative Sentence asks a question.",
      "An Imperative Sentence may express an order or advice.",
      "An Exclamatory Sentence expresses sudden feelings.",
      "An Optative Sentence expresses a wish or prayer."
    ],
    answerInShort: [
      "What is a sentence?",
      "What is an Assertive Sentence?",
      "What is an Interrogative Sentence?",
      "What is an Imperative Sentence?",
      "What is an Optative Sentence?"
    ],
    thinkAndAnswer: [
      "Why should a group of words make complete sense to be called a sentence?",
      "How can you identify an Interrogative Sentence?",
      "How is an Imperative Sentence different from an Assertive Sentence?",
      "Why is an Exclamatory Sentence generally followed by an exclamation mark?",
      "Write one example of each kind of sentence given in the chapter."
    ]
  },

  {
    chapter: 2,
    classNumber: 7,
    subject: "English Grammer",
    title: "Subject and Predicate",
    fillInTheBlanks: [
      "The two main parts of a sentence are the ______ and the Predicate.",
      "The Subject tells us who or ______ the sentence is about.",
      "The Predicate tells us something about the ______.",
      "In 'The boys are playing football', 'The boys' is the ______.",
      "In 'The boys are playing football', 'are playing football' is the ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What are the two main parts of a sentence?",
        options: [
          "Noun and Verb",
          "Subject and Predicate",
          "Adjective and Adverb",
          "Question and Answer"
        ],
        answer: "Subject and Predicate"
      },
      {
        question: "What does the Subject tell us?",
        options: [
          "What punctuation is used",
          "Who or what the sentence is about",
          "Only the tense",
          "Only the verb"
        ],
        answer: "Who or what the sentence is about"
      },
      {
        question: "What does the Predicate tell us?",
        options: [
          "Something about the Subject",
          "Only the Subject's name",
          "Only the punctuation",
          "Nothing about the Subject"
        ],
        answer: "Something about the Subject"
      },
      {
        question: "Find the Subject: 'Ravi plays cricket.'",
        options: ["Ravi", "plays", "cricket", "plays cricket"],
        answer: "Ravi"
      },
      {
        question: "Find the Predicate: 'The girl is singing.'",
        options: ["The girl", "girl", "is singing", "singing"],
        answer: "is singing"
      }
    ],
    trueOrFalse: [
      "A sentence has two main parts called Subject and Predicate.",
      "The Subject tells us who or what the sentence is about.",
      "The Predicate tells us something about the Subject.",
      "In 'Mohan runs fast', Mohan is the Predicate.",
      "In 'The birds are flying', 'are flying' is part of the Predicate."
    ],
    answerInShort: [
      "Name the two main parts of a sentence.",
      "What is the Subject?",
      "What is the Predicate?",
      "Find the Subject in 'Sita reads a book.'",
      "Find the Predicate in 'The children are playing.'"
    ],
    thinkAndAnswer: [
      "Why are Subject and Predicate important in a sentence?",
      "How can you identify the Subject of a sentence?",
      "How can you identify the Predicate of a sentence?",
      "Find the Subject and Predicate in 'My brother goes to school.'",
      "Write a sentence and identify its Subject and Predicate."
    ]
  },

  {
    chapter: 3,
    classNumber: 7,
    subject: "English Grammer",
    title: "Parts of Speech",
    fillInTheBlanks: [
      "Words divided into different kinds according to their use are called Parts of ______.",
      "A word which is the name of a person, place, animal or thing is called a ______.",
      "A word used in place of a Noun is called a ______.",
      "A word which tells us something about a Noun or Pronoun is called an ______.",
      "A word which expresses an action or state of being is called a ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is a Noun in 'Ganga is a holy river'?",
        options: ["holy", "is", "Ganga", "a"],
        answer: "Ganga"
      },
      {
        question: "Which word is a Pronoun in 'Rahul is here. He is singing.'?",
        options: ["Rahul", "here", "He", "singing"],
        answer: "He"
      },
      {
        question: "Which word is an Adjective in 'Rani is an intelligent girl'?",
        options: ["Rani", "is", "intelligent", "girl"],
        answer: "intelligent"
      },
      {
        question: "Which word is an Adverb in 'The boy ran fast'?",
        options: ["The", "boy", "ran", "fast"],
        answer: "fast"
      },
      {
        question: "Which word is an Interjection?",
        options: ["Bravo!", "and", "slowly", "teacher"],
        answer: "Bravo!"
      }
    ],
    trueOrFalse: [
      "A Noun is the name of a person, place, animal or thing.",
      "A Pronoun is used in place of a Noun.",
      "An Adjective describes a Noun or Pronoun.",
      "A Verb expresses an action or state of being.",
      "An Interjection expresses sudden feelings."
    ],
    answerInShort: [
      "What are Parts of Speech?",
      "What is a Noun?",
      "What is a Pronoun?",
      "What is an Adjective?",
      "What is an Adverb?"
    ],
    thinkAndAnswer: [
      "Why are Parts of Speech important in grammar?",
      "How can you identify a Noun in a sentence?",
      "How is a Pronoun different from a Noun?",
      "How does an Adverb add information to a sentence?",
      "Identify the Parts of Speech in 'The boy ran fast.'"
    ]
  },

  {
    chapter: 4,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Noun",
    fillInTheBlanks: [
      "A Noun is the name of a person, place or ______.",
      "A Noun which names a particular person or place is called a ______ Noun.",
      "A Noun which names a group of persons or things is called a ______ Noun.",
      "A Noun which denotes a material such as silver, copper or milk is called a ______ Noun.",
      "Nouns are divided according to number into Singular and ______ Nouns."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which is a Proper Noun?",
        options: ["city", "river", "Delhi", "boy"],
        answer: "Delhi"
      },
      {
        question: "Which is a Collective Noun?",
        options: ["team", "boy", "silver", "honesty"],
        answer: "team"
      },
      {
        question: "Which is an Abstract Noun?",
        options: ["wood", "honesty", "chair", "Delhi"],
        answer: "honesty"
      },
      {
        question: "Which is a Material Noun?",
        options: ["gold", "crowd", "beauty", "Rahul"],
        answer: "gold"
      },
      {
        question: "Which is the plural of 'child'?",
        options: ["childs", "children", "childes", "childrens"],
        answer: "children"
      }
    ],
    trueOrFalse: [
      "Ram is a Proper Noun.",
      "Crowd is a Collective Noun.",
      "Honesty is an Abstract Noun.",
      "Gold is a Material Noun.",
      "Children is the plural form of child."
    ],
    answerInShort: [
      "What is a Noun?",
      "What is a Proper Noun?",
      "What is a Common Noun?",
      "What is a Collective Noun?",
      "What is a Material Noun?"
    ],
    thinkAndAnswer: [
      "How is a Proper Noun different from a Common Noun?",
      "Why is 'crowd' called a Collective Noun?",
      "How can you identify an Abstract Noun?",
      "Explain two rules for changing Singular Nouns into Plural Nouns.",
      "Give two examples each of Masculine, Feminine, Common and Neuter Gender."
    ]
  },

  {
    chapter: 5,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Pronoun",
    fillInTheBlanks: [
      "The word used in place of a Noun is called a ______.",
      "I, You, He, She and It are examples of ______ Pronouns.",
      "Myself, yourself and herself are ______ Pronouns.",
      "This, That, These and Those are ______ Pronouns.",
      "Who, What, Whose and Whom are ______ Pronouns."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which is a Personal Pronoun?",
        options: ["myself", "he", "which", "those"],
        answer: "he"
      },
      {
        question: "Which is a Reflexive Pronoun?",
        options: ["himself", "he", "his", "him"],
        answer: "himself"
      },
      {
        question: "Which is a Demonstrative Pronoun?",
        options: ["these", "who", "myself", "someone"],
        answer: "these"
      },
      {
        question: "Which is an Interrogative Pronoun?",
        options: ["who", "himself", "those", "each"],
        answer: "who"
      },
      {
        question: "Which is a Relative Pronoun?",
        options: ["which", "myself", "these", "everyone"],
        answer: "which"
      }
    ],
    trueOrFalse: [
      "A Pronoun is used in place of a Noun.",
      "Himself is a Reflexive Pronoun.",
      "These is a Demonstrative Pronoun.",
      "Who can be an Interrogative Pronoun.",
      "Which can be a Relative Pronoun."
    ],
    answerInShort: [
      "What is a Pronoun?",
      "What is a Personal Pronoun?",
      "What is a Reflexive Pronoun?",
      "What is a Demonstrative Pronoun?",
      "What is a Relative Pronoun?"
    ],
    thinkAndAnswer: [
      "Why do we use Pronouns in sentences?",
      "How are First Person and Third Person Pronouns different?",
      "How are Reflexive Pronouns formed?",
      "How do Demonstrative Pronouns point to persons or things?",
      "Identify the kinds of Pronouns in 'This is the boy who met me.'"
    ]
  },

  {
    chapter: 6,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Verb",
    fillInTheBlanks: [
      "A word that denotes an action or state of being is called a ______.",
      "A Verb which requires an Object is called a ______ Verb.",
      "A Verb which does not require an Object is called an ______ Verb.",
      "A Verb which requires a complement to complete the meaning is called a ______ Verb.",
      "Do, Be and Have are called ______ Auxiliary Verbs."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which is a Transitive Verb in 'He plays cricket'?",
        options: ["He", "plays", "cricket", "the"],
        answer: "plays"
      },
      {
        question: "Which sentence contains an Intransitive Verb?",
        options: [
          "The child cries.",
          "He writes a letter.",
          "She reads a poem.",
          "They wrote a story."
        ],
        answer: "The child cries."
      },
      {
        question: "Which is a Linking Verb?",
        options: ["are", "eat", "write", "run"],
        answer: "are"
      },
      {
        question: "Which is a Modal Auxiliary?",
        options: ["can", "has", "is", "did"],
        answer: "can"
      },
      {
        question: "What is the third form of 'write'?",
        options: ["wrote", "written", "writing", "writes"],
        answer: "written"
      }
    ],
    trueOrFalse: [
      "A Verb denotes an action or state of being.",
      "A Transitive Verb requires an Object.",
      "An Intransitive Verb does not require an Object.",
      "Can is a Modal Auxiliary.",
      "Written is the third form of write."
    ],
    answerInShort: [
      "What is a Verb?",
      "What is a Transitive Verb?",
      "What is an Intransitive Verb?",
      "What is a Linking Verb?",
      "What are Auxiliary Verbs?"
    ],
    thinkAndAnswer: [
      "How can you identify a Transitive Verb?",
      "How can you identify an Intransitive Verb?",
      "What is the difference between Primary and Modal Auxiliaries?",
      "Write the three main forms of five verbs from the chapter.",
      "Identify the Transitive and Intransitive Verbs in 'The cow eats grass. The dog barks.'"
    ]
  },

  {
    chapter: 7,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Adjective",
    fillInTheBlanks: [
      "An Adjective tells us something about a ______ or Pronoun.",
      "The three degrees of comparison are Positive, Comparative and ______.",
      "The Comparative Degree is generally used to compare ______ persons or things.",
      "The Superlative Degree is used to compare more than ______ persons or things.",
      "The positive form of 'deeper' is ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is an Adjective?",
        options: ["beautiful", "run", "slowly", "teacher"],
        answer: "beautiful"
      },
      {
        question: "What is the Comparative form of 'dark'?",
        options: ["darker", "darkest", "darkly", "dark"],
        answer: "darker"
      },
      {
        question: "What is the Superlative form of 'deep'?",
        options: ["deepest", "deeper", "deeply", "deep"],
        answer: "deepest"
      },
      {
        question: "Which Degree is used for comparing two things?",
        options: ["Comparative", "Positive", "Superlative", "None"],
        answer: "Comparative"
      },
      {
        question: "Which Degree is used for comparing more than two things?",
        options: ["Superlative", "Positive", "Comparative", "None"],
        answer: "Superlative"
      }
    ],
    trueOrFalse: [
      "An Adjective describes a Noun or Pronoun.",
      "There are three degrees of comparison.",
      "Comparative Degree compares two things.",
      "Superlative Degree compares more than two things.",
      "Darker is the Superlative form of dark."
    ],
    answerInShort: [
      "What is an Adjective?",
      "Name the three degrees of comparison.",
      "What is Positive Degree?",
      "What is Comparative Degree?",
      "What is Superlative Degree?"
    ],
    thinkAndAnswer: [
      "Why do we use Adjectives?",
      "Why do Adjectives have degrees of comparison?",
      "How is Comparative different from Superlative?",
      "Write the three forms of 'wise'.",
      "Write three Adjectives and their degrees of comparison."
    ]
  },

  {
    chapter: 8,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Adverb",
    fillInTheBlanks: [
      "An Adverb is a word which modifies a Verb, Adjective or another ______.",
      "An Adverb of ______ tells us when an action takes place.",
      "An Adverb of ______ tells us where an action takes place.",
      "An Adverb of ______ tells us how an action is performed.",
      "An Adverb of ______ tells us how many times an action takes place."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is an Adverb?",
        options: ["quickly", "beautiful", "teacher", "run"],
        answer: "quickly"
      },
      {
        question: "Which is an Adverb of Time?",
        options: ["today", "here", "carefully", "twice"],
        answer: "today"
      },
      {
        question: "Which is an Adverb of Place?",
        options: ["there", "today", "slowly", "twice"],
        answer: "there"
      },
      {
        question: "Which is an Adverb of Manner?",
        options: ["carefully", "yesterday", "outside", "twice"],
        answer: "carefully"
      },
      {
        question: "Which is an Adverb of Number?",
        options: ["twice", "here", "loudly", "today"],
        answer: "twice"
      }
    ],
    trueOrFalse: [
      "An Adverb can modify a Verb.",
      "Today is an Adverb of Time.",
      "Here is an Adverb of Place.",
      "Quickly is an Adverb of Manner.",
      "Twice is an Adverb of Number."
    ],
    answerInShort: [
      "What is an Adverb?",
      "What is an Adverb of Time?",
      "What is an Adverb of Place?",
      "What is an Adverb of Manner?",
      "What is an Adverb of Number?"
    ],
    thinkAndAnswer: [
      "Why do we use Adverbs?",
      "How do Adverbs make sentences clearer?",
      "What is the difference between Time and Place Adverbs?",
      "What does an Adverb of Manner tell us?",
      "Write three examples of different kinds of Adverbs."
    ]
  },

  {
    chapter: 9,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Interjection",
    fillInTheBlanks: [
      "An Interjection expresses sudden feelings or ______.",
      "Fie! expresses ______.",
      "Hurrah! expresses ______.",
      "Alas! expresses ______.",
      "An Interjection is generally followed by an ______ mark."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What does an Interjection express?",
        options: [
          "Sudden feelings or emotions",
          "An action",
          "A place",
          "A number"
        ],
        answer: "Sudden feelings or emotions"
      },
      {
        question: "Which Interjection expresses joy?",
        options: ["Hurrah!", "Alas!", "Fie!", "Oh!"],
        answer: "Hurrah!"
      },
      {
        question: "Which Interjection expresses grief?",
        options: ["Alas!", "Hurrah!", "Hello!", "Ha!"],
        answer: "Alas!"
      },
      {
        question: "Which Interjection expresses hate?",
        options: ["Fie!", "Hurrah!", "Hello!", "Aha!"],
        answer: "Fie!"
      },
      {
        question: "Which Interjection expresses surprise?",
        options: ["What!", "Alas!", "Hurrah!", "Fie!"],
        answer: "What!"
      }
    ],
    trueOrFalse: [
      "An Interjection expresses sudden feelings or emotions.",
      "Hurrah! expresses joy.",
      "Alas! expresses grief.",
      "Fie! expresses hate.",
      "An Interjection is generally followed by an exclamation mark."
    ],
    answerInShort: [
      "What is an Interjection?",
      "Give two examples of Interjections.",
      "Which Interjection expresses joy?",
      "Which Interjection expresses grief?",
      "Which Interjection expresses surprise?"
    ],
    thinkAndAnswer: [
      "Why are Interjections used in sentences?",
      "How does Hurrah! express a feeling?",
      "When would you use Alas!?",
      "When would you use Fie!?",
      "Write five Interjections and state the feelings they express."
    ]
  },

  {
    chapter: 10,
    classNumber: 7,
    subject: "English Grammer",
    title: "Preposition and Conjunction",
    fillInTheBlanks: [
      "A Preposition shows the relation of a Noun or Pronoun with another ______.",
      "A Preposition is generally placed before a Noun or ______.",
      "A Conjunction joins words or ______.",
      "Words such as and, but, or and ______ are used as Conjunctions.",
      "In 'The girls are in the room', the word 'in' is a ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is a Preposition?",
        options: ["between", "beautiful", "quickly", "sing"],
        answer: "between"
      },
      {
        question: "Which word is a Conjunction?",
        options: ["and", "under", "slowly", "happy"],
        answer: "and"
      },
      {
        question: "What does a Preposition show?",
        options: [
          "Relation between words",
          "Sudden feeling",
          "Action only",
          "Number"
        ],
        answer: "Relation between words"
      },
      {
        question: "Which sentence contains a Preposition?",
        options: [
          "The book is on the table.",
          "He runs fast.",
          "Hurrah! We won.",
          "She sings."
        ],
        answer: "The book is on the table."
      },
      {
        question: "Which word joins two words or ideas?",
        options: ["Conjunction", "Preposition", "Adverb", "Adjective"],
        answer: "Conjunction"
      }
    ],
    trueOrFalse: [
      "A Preposition shows a relation between words.",
      "On is a Preposition.",
      "A Conjunction joins words or sentences.",
      "And is a Conjunction.",
      "Beautiful is a Preposition."
    ],
    answerInShort: [
      "What is a Preposition?",
      "What does a Preposition show?",
      "What is a Conjunction?",
      "Give two examples of Prepositions.",
      "Give two examples of Conjunctions."
    ],
    thinkAndAnswer: [
      "Why are Prepositions important in sentences?",
      "How do Prepositions show position or relation?",
      "How do Conjunctions connect words or ideas?",
      "Make a sentence using between.",
      "Make two sentences using different Conjunctions."
    ]
  },

  {
    chapter: 11,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Question Forms",
    fillInTheBlanks: [
      "A sentence which asks a question is called an ______ sentence.",
      "Questions beginning with Is, Am, Are, Was or Were use the Verb '______' first.",
      "Questions using Has, Have or Had place the helping verb before the ______.",
      "Words such as Where, What, When and Who are ______ words.",
      "The Question form generally ends with a question ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word can begin a question asking about a place?",
        options: ["Where", "When", "Who", "Why"],
        answer: "Where"
      },
      {
        question: "Which word is used to ask about time?",
        options: ["When", "Where", "Who", "What"],
        answer: "When"
      },
      {
        question: "Which word is used to ask about a person?",
        options: ["Who", "Where", "When", "How"],
        answer: "Who"
      },
      {
        question: "Choose the correct question.",
        options: [
          "Do you read books?",
          "You do read books?",
          "Read you books?",
          "Do read you books?"
        ],
        answer: "Do you read books?"
      },
      {
        question: "Choose the correct question.",
        options: [
          "Why are they weeping?",
          "Why they are weeping?",
          "Why are weeping they?",
          "Why they weeping are?"
        ],
        answer: "Why are they weeping?"
      }
    ],
    trueOrFalse: [
      "Questions are Interrogative Sentences.",
      "Where is used to ask about a place.",
      "When is used to ask about time.",
      "Who is used to ask about a person.",
      "Questions normally end with a question mark."
    ],
    answerInShort: [
      "What is an Interrogative Sentence?",
      "What is Where used for?",
      "What is When used for?",
      "What is Who used for?",
      "What is the formula for a basic Question and Answer form?"
    ],
    thinkAndAnswer: [
      "Why are auxiliary verbs important in forming questions?",
      "How do questions beginning with Where differ from questions beginning with When?",
      "How would you change 'She is a doctor.' into a question?",
      "How would you change 'They had a good dinner.' into a question?",
      "Write five questions using different Question Words."
    ]
  },

  {
    chapter: 12,
    classNumber: 7,
    subject: "English Grammer",
    title: "The Punctuation",
    fillInTheBlanks: [
      "Punctuation marks help make the meaning of a sentence more ______.",
      "A ______ is used at the end of a complete sentence.",
      "A comma is used to separate words or ______ in a sentence.",
      "A Question Mark is used after an ______ sentence.",
      "In direct speech, the speaker's exact words are placed inside ______ commas."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which mark is used at the end of a statement?",
        options: [".", "?", "!", ","],
        answer: "."
      },
      {
        question: "Which mark is used after a question?",
        options: ["?", ".", "!", ","],
        answer: "?"
      },
      {
        question: "Which mark expresses strong feeling?",
        options: ["!", ".", "?", ","],
        answer: "!"
      },
      {
        question: "Which mark is used to show possession in 'Mohan's bag'?",
        options: ["Apostrophe", "Comma", "Question Mark", "Full Stop"],
        answer: "Apostrophe"
      },
      {
        question: "Which punctuation mark is used for direct speech?",
        options: ["Inverted Commas", "Full Stop", "Comma only", "Question Mark only"],
        answer: "Inverted Commas"
      }
    ],
    trueOrFalse: [
      "Punctuation marks make the meaning of sentences clear.",
      "A Full Stop is used at the end of a complete sentence.",
      "A Question Mark is used after an interrogative sentence.",
      "An Apostrophe can show possession.",
      "Inverted Commas can be used for direct speech."
    ],
    answerInShort: [
      "What are Punctuation marks?",
      "When is a Full Stop used?",
      "When is a Comma used?",
      "When is a Question Mark used?",
      "What is an Apostrophe used for?"
    ],
    thinkAndAnswer: [
      "Why are Punctuation marks important?",
      "How can a comma change the meaning of a sentence?",
      "Why is a Question Mark used after a question?",
      "How does an Apostrophe show possession?",
      "Write one example using Full Stop, Comma, Question Mark, Exclamation Mark and Apostrophe."
    ]
  },

  {
    chapter: 13,
    classNumber: 7,
    subject: "English Grammer",
    title: "Imperative Sentences",
    fillInTheBlanks: [
      "Imperative sentences may express an order, prayer, advice or ______.",
      "The Subject '______' is usually not written in an Imperative Sentence.",
      "Imperative sentences generally begin with the ______ form of the verb.",
      "Negative Imperative sentences can begin with Do not or ______.",
      "The words Please and Always can be used before the ______ form of the verb."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which sentence is Imperative?",
        options: [
          "Always speak the truth.",
          "He is a player.",
          "What are you doing?",
          "She is singing."
        ],
        answer: "Always speak the truth."
      },
      {
        question: "Which word can begin a polite request?",
        options: ["Please", "Why", "When", "Who"],
        answer: "Please"
      },
      {
        question: "Which sentence is negative Imperative?",
        options: [
          "Do not make a noise.",
          "You make a noise.",
          "Are you making a noise?",
          "He made a noise."
        ],
        answer: "Do not make a noise."
      },
      {
        question: "Which word can express a warning in an Imperative Sentence?",
        options: ["Never", "When", "Where", "Who"],
        answer: "Never"
      },
      {
        question: "Choose the correct Imperative sentence.",
        options: [
          "Please sit here.",
          "You are sitting here.",
          "Are you sitting here?",
          "You sat here."
        ],
        answer: "Please sit here."
      }
    ],
    trueOrFalse: [
      "The Subject You is usually not written in an Imperative Sentence.",
      "Imperative Sentences can express advice.",
      "Imperative Sentences begin with the first form of the verb.",
      "Do not can be used to make a negative Imperative.",
      "Please can make a request polite."
    ],
    answerInShort: [
      "What is an Imperative Sentence?",
      "What Subject is usually hidden in an Imperative Sentence?",
      "Which form of the verb is used in an Imperative Sentence?",
      "How are negative Imperative Sentences formed?",
      "Give two examples of Imperative Sentences."
    ],
    thinkAndAnswer: [
      "Why is the Subject You usually not written in Imperative Sentences?",
      "How does Please make an Imperative Sentence polite?",
      "How is an order different from a request?",
      "Change 'Speak the truth.' into a negative Imperative Sentence.",
      "Write one sentence each expressing advice, request, order, warning and prohibition."
    ]
  },

  {
    chapter: 14,
    classNumber: 7,
    subject: "English Grammer",
    title: "Active & Passive Voice",
    fillInTheBlanks: [
      "A verb is in Active Voice when the Subject ______ the action.",
      "A verb is in Passive Voice when something is done to the ______.",
      "The Object of the Active Voice sentence becomes the ______ of the Passive Voice sentence.",
      "In Passive Voice, the main verb is changed into its ______ form.",
      "The word ______ is used before the agent when the agent is mentioned."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "When is a verb in Active Voice?",
        options: [
          "When the Subject does the action",
          "When the Subject receives the action",
          "When there is no verb",
          "When there is no Object"
        ],
        answer: "When the Subject does the action"
      },
      {
        question: "When is a verb in Passive Voice?",
        options: [
          "When the Subject does the action",
          "When something is done to the Subject",
          "When there is no Subject",
          "When the verb is first form"
        ],
        answer: "When something is done to the Subject"
      },
      {
        question: "What becomes the Subject in Passive Voice?",
        options: ["Object", "Verb", "Adverb", "Preposition"],
        answer: "Object"
      },
      {
        question: "Which form of the verb is used in Passive Voice?",
        options: [
          "First form",
          "Second form",
          "Third form",
          "Ing form"
        ],
        answer: "Third form"
      },
      {
        question: "What is the Passive Voice of 'Monika plays football'?",
        options: [
          "Football is played by Monika.",
          "Football was played by Monika.",
          "Monika is played by football.",
          "Football plays Monika."
        ],
        answer: "Football is played by Monika."
      }
    ],
    trueOrFalse: [
      "In Active Voice, the Subject does the action.",
      "In Passive Voice, the action is done to the Subject.",
      "The Object becomes the Subject while changing Active into Passive Voice.",
      "The third form of the verb is used in Passive Voice.",
      "The agent is always necessary in Passive Voice."
    ],
    answerInShort: [
      "What is Active Voice?",
      "What is Passive Voice?",
      "What happens to the Object in Passive Voice?",
      "Which form of the verb is used in Passive Voice?",
      "When is 'by + agent' used?"
    ],
    thinkAndAnswer: [
      "Explain the difference between Active and Passive Voice.",
      "Why does the Object become the Subject in Passive Voice?",
      "Change 'The policeman arrests a thief.' into Passive Voice.",
      "Change 'A cup of coffee is made by Anuj.' into Active Voice.",
      "Why can the agent sometimes be omitted in Passive Voice?"
    ]
  },

  {
    chapter: 15,
    classNumber: 7,
    subject: "English Grammer",
    title: "Present Indefinite Tense",
    fillInTheBlanks: [
      "Present Indefinite Tense is used for actions which happen in the ______.",
      "With singular subjects except I and You, the first form of the verb takes ______ or es.",
      "With I, You and plural subjects, the verb is used in its ______ form.",
      "With singular subjects, ______ is used to form negative sentences.",
      "With I, You and plural subjects, ______ is used to form negative sentences."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which form of the verb is used with He in an affirmative sentence?",
        options: [
          "First form with s/es",
          "Second form",
          "Third form",
          "Ing form"
        ],
        answer: "First form with s/es"
      },
      {
        question: "Which helping verb is used with He in a negative sentence?",
        options: ["Do", "Does", "Did", "Will"],
        answer: "Does"
      },
      {
        question: "Which helping verb is used with They in a negative sentence?",
        options: ["Do", "Does", "Did", "Has"],
        answer: "Do"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "He eats food.",
          "He eat food.",
          "He eating food.",
          "He ate food."
        ],
        answer: "He eats food."
      },
      {
        question: "Choose the correct question.",
        options: [
          "Do you read books?",
          "Does you read books?",
          "Did you reads books?",
          "Do you reading books?"
        ],
        answer: "Do you read books?"
      }
    ],
    trueOrFalse: [
      "Present Indefinite Tense describes regular or habitual actions.",
      "A singular subject generally takes s or es with the verb.",
      "Does is used with plural subjects.",
      "Do is used with I, You and plural subjects.",
      "The first form of the verb is used after does."
    ],
    answerInShort: [
      "What does Present Indefinite Tense express?",
      "When is s or es added to a verb?",
      "When is Does used?",
      "When is Do used?",
      "How are Present Indefinite questions formed?"
    ],
    thinkAndAnswer: [
      "Why does a singular subject take s or es?",
      "Change 'She works hard.' into a negative sentence.",
      "Change 'You read books.' into an interrogative sentence.",
      "Why is the first form of the verb used after Does?",
      "Write one affirmative, one negative and one interrogative sentence in Present Indefinite Tense."
    ]
  },

  {
    chapter: 16,
    classNumber: 7,
    subject: "English Grammer",
    title: "Past Indefinite Tense",
    fillInTheBlanks: [
      "Past Indefinite Tense shows an action completed in the ______.",
      "In affirmative sentences, the ______ form of the verb is used.",
      "In negative sentences, ______ not is used with the first form of the verb.",
      "In interrogative sentences, ______ is used before the Subject.",
      "After Did, the main verb remains in the ______ form."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which form of the verb is used in affirmative Past Indefinite sentences?",
        options: ["First", "Second", "Third", "Ing"],
        answer: "Second"
      },
      {
        question: "Which helping verb is used in negative Past Indefinite sentences?",
        options: ["Do", "Does", "Did", "Will"],
        answer: "Did"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "They saw the Red-Fort.",
          "They see the Red-Fort.",
          "They seeing the Red-Fort.",
          "They did saw the Red-Fort."
        ],
        answer: "They saw the Red-Fort."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "He did not eat the food.",
          "He did not ate the food.",
          "He does not ate the food.",
          "He did not eating the food."
        ],
        answer: "He did not eat the food."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Did he dance on the roof?",
          "Did he danced on the roof?",
          "Does he danced on the roof?",
          "Did he dancing on the roof?"
        ],
        answer: "Did he dance on the roof?"
      }
    ],
    trueOrFalse: [
      "Past Indefinite Tense expresses an action completed in the past.",
      "The second form of the verb is used in affirmative sentences.",
      "Did is used in negative sentences.",
      "The second form is used after Did.",
      "Did can begin an interrogative sentence."
    ],
    answerInShort: [
      "What does Past Indefinite Tense express?",
      "Which form of the verb is used in affirmative sentences?",
      "Which helping verb is used in negative sentences?",
      "How are interrogative sentences formed?",
      "Why is the first form of the verb used after Did?"
    ],
    thinkAndAnswer: [
      "Why is the second form used in affirmative Past Indefinite sentences?",
      "Change 'He ate the food.' into a negative sentence.",
      "Change 'Sonia ate the food.' into an interrogative sentence.",
      "Why does the main verb return to its first form after Did?",
      "Write one affirmative, one negative and one interrogative Past Indefinite sentence."
    ]
  },

  {
    chapter: 17,
    classNumber: 7,
    subject: "English Grammer",
    title: "Future Indefinite Tense",
    fillInTheBlanks: [
      "Future Indefinite Tense shows an action that will happen in the ______.",
      "With I and We, ______ is used before the first form of the verb.",
      "With subjects other than I and We, ______ is used before the first form of the verb.",
      "Negative sentences use shall not or ______ not.",
      "Questions can begin with Shall or ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What does Future Indefinite Tense express?",
        options: [
          "A past action",
          "A present action",
          "A future action",
          "A completed action"
        ],
        answer: "A future action"
      },
      {
        question: "Which helping verb is used with I and We?",
        options: ["Shall", "Will", "Did", "Does"],
        answer: "Shall"
      },
      {
        question: "Which helping verb is used with subjects other than I and We?",
        options: ["Shall", "Will", "Did", "Has"],
        answer: "Will"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "I shall do homework tomorrow.",
          "I shall did homework tomorrow.",
          "I shall doing homework tomorrow.",
          "I had do homework tomorrow."
        ],
        answer: "I shall do homework tomorrow."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "When will you sleep?",
          "When will you slept?",
          "When did you sleep tomorrow?",
          "When will you sleeping?"
        ],
        answer: "When will you sleep?"
      }
    ],
    trueOrFalse: [
      "Future Indefinite Tense expresses an action in the future.",
      "Shall is used with I and We in the given rules.",
      "Will is used with subjects other than I and We.",
      "The first form of the verb follows Shall and Will.",
      "The sentence 'They will climb upon the tree.' is in Future Indefinite Tense."
    ],
    answerInShort: [
      "What does Future Indefinite Tense express?",
      "When is Shall used?",
      "When is Will used?",
      "How are negative Future Indefinite sentences formed?",
      "How are interrogative Future Indefinite sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is the first form of the verb used after Shall and Will?",
      "Change 'I shall write a letter today.' into a negative sentence.",
      "Change 'They will obey me.' into an interrogative sentence.",
      "How do words such as tomorrow help identify future actions?",
      "Write one affirmative, one negative and one interrogative Future Indefinite sentence."
    ]
  },

  {
    chapter: 18,
    classNumber: 7,
    subject: "English Grammer",
    title: "Present Continuous Tense",
    fillInTheBlanks: [
      "Present Continuous Tense shows an action going on in the ______.",
      "With singular subjects except I, ______ is used before the verb with ing.",
      "With I, ______ is used before the verb with ing.",
      "With You and plural subjects, ______ is used before the verb with ing.",
      "The main verb is used with ______ in Present Continuous Tense."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with I?",
        options: ["Is", "Am", "Are", "Was"],
        answer: "Am"
      },
      {
        question: "Which helping verb is used with He?",
        options: ["Is", "Am", "Are", "Were"],
        answer: "Is"
      },
      {
        question: "Which helping verb is used with They?",
        options: ["Is", "Am", "Are", "Was"],
        answer: "Are"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "I am going to Delhi.",
          "I is going to Delhi.",
          "I are going to Delhi.",
          "I am go to Delhi."
        ],
        answer: "I am going to Delhi."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "What are you eating?",
          "What is you eating?",
          "What are you eat?",
          "What you are eating?"
        ],
        answer: "What are you eating?"
      }
    ],
    trueOrFalse: [
      "Present Continuous Tense expresses an action going on in the present.",
      "Am is used with I.",
      "Is is used with singular subjects.",
      "Are is used with You and plural subjects.",
      "The main verb takes ing in Present Continuous Tense."
    ],
    answerInShort: [
      "What does Present Continuous Tense express?",
      "When is Is used?",
      "When is Am used?",
      "When is Are used?",
      "How are negative Present Continuous sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is Am used with I?",
      "Change 'He is coming from school.' into a negative sentence.",
      "Change 'They are making a noise.' into an interrogative sentence.",
      "Why is ing added to the main verb?",
      "Write one affirmative, one negative and one interrogative Present Continuous sentence."
    ]
  },

  {
    chapter: 19,
    classNumber: 7,
    subject: "English Grammer",
    title: "Past Continuous Tense",
    fillInTheBlanks: [
      "Past Continuous Tense shows an action continuously going on in the ______.",
      "With I and singular subjects, ______ is used before the verb with ing.",
      "With You and plural subjects, ______ is used before the verb with ing.",
      "In negative sentences, ______ is placed after Was or Were.",
      "Interrogative sentences can begin with Was or ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with I and singular subjects?",
        options: ["Was", "Were", "Is", "Are"],
        answer: "Was"
      },
      {
        question: "Which helping verb is used with You and plural subjects?",
        options: ["Was", "Were", "Is", "Am"],
        answer: "Were"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "The bird was flying.",
          "The bird were flying.",
          "The bird was fly.",
          "The bird is flying yesterday."
        ],
        answer: "The bird was flying."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "I was not reading the letter.",
          "I were not reading the letter.",
          "I was not read the letter.",
          "I did not reading the letter."
        ],
        answer: "I was not reading the letter."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Were the girls dancing?",
          "Was the girls dancing?",
          "Were the girls dance?",
          "Did the girls dancing?"
        ],
        answer: "Were the girls dancing?"
      }
    ],
    trueOrFalse: [
      "Past Continuous Tense shows an action continuously going on in the past.",
      "Was is used with I and singular subjects.",
      "Were is used with You and plural subjects.",
      "The main verb is used with ing.",
      "Not is placed after Was or Were in negative sentences."
    ],
    answerInShort: [
      "What does Past Continuous Tense express?",
      "When is Was used?",
      "When is Were used?",
      "How are negative Past Continuous sentences formed?",
      "How are interrogative Past Continuous sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is Was used with singular subjects?",
      "Change 'I was reading a book.' into a negative sentence.",
      "Change 'The girls were dancing.' into an interrogative sentence.",
      "Why is ing added to the main verb?",
      "Write one affirmative, one negative and one interrogative Past Continuous sentence."
    ]
  },

  {
    chapter: 20,
    classNumber: 7,
    subject: "English Grammer",
    title: "Future Continuous Tense",
    fillInTheBlanks: [
      "Future Continuous Tense shows an action that will continue in the ______.",
      "With I and We, ______ be is used before the verb with ing.",
      "With subjects other than I and We, ______ be is used before the verb with ing.",
      "Negative sentences use shall not be or ______ not be.",
      "Interrogative sentences begin with Shall or ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What does Future Continuous Tense express?",
        options: [
          "An action completed in the past",
          "An action continuing in the future",
          "An action completed in the present",
          "An action that happened yesterday"
        ],
        answer: "An action continuing in the future"
      },
      {
        question: "Which helping verb is used with I and We?",
        options: ["Shall be", "Will be", "Was", "Were"],
        answer: "Shall be"
      },
      {
        question: "Which helping verb is used with subjects other than I and We?",
        options: ["Shall be", "Will be", "Was", "Am"],
        answer: "Will be"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "I shall be eating food.",
          "I shall eating food.",
          "I will be eat food.",
          "I was eating food tomorrow."
        ],
        answer: "I shall be eating food."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Will he be going to home?",
          "Will he going to home?",
          "Will he be go to home?",
          "He will be going to home?"
        ],
        answer: "Will he be going to home?"
      }
    ],
    trueOrFalse: [
      "Future Continuous Tense shows an action that will continue in the future.",
      "Shall be is used with I and We.",
      "Will be is used with subjects other than I and We.",
      "The main verb is used with ing.",
      "Negative sentences use not after Shall or Will."
    ],
    answerInShort: [
      "What does Future Continuous Tense express?",
      "When is Shall be used?",
      "When is Will be used?",
      "How are negative Future Continuous sentences formed?",
      "How are interrogative Future Continuous sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is Shall be used with I and We?",
      "Change 'I shall be eating food.' into a negative sentence.",
      "Change 'The child will be playing.' into an interrogative sentence.",
      "Why is ing added to the main verb in Future Continuous Tense?",
      "Write one affirmative, one negative and one interrogative Future Continuous sentence."
    ]
  },
  {
    chapter: 21,
    classNumber: 7,
    subject: "English Grammer",
    title: "Present Perfect Tense",
    fillInTheBlanks: [
      "Present Perfect Tense is used when an action has been completely finished in the ______.",
      "With I, You and plural subjects, ______ is used.",
      "With singular subjects except I and You, ______ is used.",
      "The main verb is used in its ______ form in Present Perfect Tense.",
      "For 'कभी नहीं', the word ______ is used instead of not."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with I, You and plural subjects?",
        options: ["has", "have", "had", "having"],
        answer: "have"
      },
      {
        question: "Which helping verb is used with a singular subject?",
        options: ["have", "has", "had", "having"],
        answer: "has"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "I have lost the bag.",
          "I has lost the bag.",
          "I have lose the bag.",
          "I had lost the bag."
        ],
        answer: "I have lost the bag."
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "She has never told a lie.",
          "She have never told a lie.",
          "She has never tell a lie.",
          "She had never tell a lie."
        ],
        answer: "She has never told a lie."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Have you seen the lion?",
          "Has you seen the lion?",
          "Have you saw the lion?",
          "Did you seen the lion?"
        ],
        answer: "Have you seen the lion?"
      }
    ],
    trueOrFalse: [
      "Present Perfect Tense shows an action that has been completed.",
      "Have is used with I, You and plural subjects.",
      "Has is used with singular subjects except I and You.",
      "The third form of the verb is used in Present Perfect Tense.",
      "Has/Have come before the Subject in questions beginning with a question word."
    ],
    answerInShort: [
      "What does Present Perfect Tense express?",
      "When is has used?",
      "When is have used?",
      "Which form of the verb is used in Present Perfect Tense?",
      "How are interrogative sentences formed in Present Perfect Tense?"
    ],
    thinkAndAnswer: [
      "Why is the third form of the verb used in Present Perfect Tense?",
      "Change 'I have drunk the water.' into a negative sentence.",
      "Change 'Rani has won the prize.' into a negative sentence.",
      "Change 'You have read the magazine.' into an interrogative sentence.",
      "Write one affirmative, one negative and one interrogative Present Perfect sentence."
    ]
  },

  {
    chapter: 22,
    classNumber: 7,
    subject: "English Grammer",
    title: "Past Perfect Tense",
    fillInTheBlanks: [
      "Past Perfect Tense shows an action that was completed in the ______.",
      "Past Perfect Tense uses ______ with all subjects.",
      "The main verb is used in its ______ form.",
      "In negative sentences, ______ is placed after had.",
      "In interrogative sentences, ______ comes before the Subject."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with all subjects in Past Perfect Tense?",
        options: ["has", "have", "had", "will"],
        answer: "had"
      },
      {
        question: "Which form of the verb is used after had?",
        options: ["First form", "Second form", "Third form", "Ing form"],
        answer: "Third form"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "The teacher had come.",
          "The teacher has come.",
          "The teacher had came.",
          "The teacher have come."
        ],
        answer: "The teacher had come."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "We had not broken the pots.",
          "We had not break the pots.",
          "We have not broken the pots.",
          "We did not broken the pots."
        ],
        answer: "We had not broken the pots."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Had you taken milk?",
          "Have you taken milk?",
          "Had you took milk?",
          "Did you taken milk?"
        ],
        answer: "Had you taken milk?"
      }
    ],
    trueOrFalse: [
      "Past Perfect Tense expresses an action completed in the past.",
      "Had is used with all subjects.",
      "The third form of the verb is used after had.",
      "Not is used after had in negative sentences.",
      "Had comes before the Subject in a basic interrogative sentence."
    ],
    answerInShort: [
      "What does Past Perfect Tense express?",
      "Which helping verb is used with all subjects?",
      "Which form of the verb is used after had?",
      "How are negative sentences formed?",
      "How are interrogative sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is had used with all subjects in Past Perfect Tense?",
      "Change 'I had done my work.' into a negative sentence.",
      "Change 'He had solved the problem.' into an interrogative sentence.",
      "Why is the third form of the verb used after had?",
      "Write one affirmative, one negative and one interrogative Past Perfect sentence."
    ]
  },

  {
    chapter: 23,
    classNumber: 7,
    subject: "English Grammer",
    title: "Future Perfect Tense",
    fillInTheBlanks: [
      "Future Perfect Tense shows an action that will be completed in the ______.",
      "With I and We, ______ have is used.",
      "With subjects other than I and We, ______ have is used.",
      "The main verb is used in its ______ form.",
      "In negative sentences, shall not have or ______ not have is used."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with I and We?",
        options: ["shall have", "will have", "had", "has"],
        answer: "shall have"
      },
      {
        question: "Which helping verb is used with subjects other than I and We?",
        options: ["shall have", "will have", "has", "had"],
        answer: "will have"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "They will have slept.",
          "They will have sleep.",
          "They shall have slept.",
          "They had slept."
        ],
        answer: "They will have slept."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "He will not have told a lie.",
          "He will not have tell a lie.",
          "He will not had told a lie.",
          "He does not have told a lie."
        ],
        answer: "He will not have told a lie."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Will you have taken tea?",
          "Will you have take tea?",
          "Have you will taken tea?",
          "Did you have taken tea?"
        ],
        answer: "Will you have taken tea?"
      }
    ],
    trueOrFalse: [
      "Future Perfect Tense expresses an action that will be completed in the future.",
      "Shall have is used with I and We.",
      "Will have is used with subjects other than I and We.",
      "The third form of the verb is used in Future Perfect Tense.",
      "Will can be used before the Subject in an interrogative sentence."
    ],
    answerInShort: [
      "What does Future Perfect Tense express?",
      "When is shall have used?",
      "When is will have used?",
      "Which form of the verb is used?",
      "How are negative sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is the third form of the verb used in Future Perfect Tense?",
      "Change 'I shall have written an article.' into a negative sentence.",
      "Change 'They will have gone.' into an interrogative sentence.",
      "How do question words work in Future Perfect Tense?",
      "Write one affirmative, one negative and one interrogative Future Perfect sentence."
    ]
  },

  {
    chapter: 24,
    classNumber: 7,
    subject: "English Grammer",
    title: "Present Perfect Continuous Tense",
    fillInTheBlanks: [
      "Present Perfect Continuous Tense shows an action that has been continuing from the ______.",
      "With singular subjects except I and You, ______ been is used.",
      "With I, You and plural subjects, ______ been is used.",
      "The main verb is used in its first form with ______.",
      "The word ______ is used for a definite point of time."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with He in Present Perfect Continuous Tense?",
        options: ["has been", "have been", "had been", "will have been"],
        answer: "has been"
      },
      {
        question: "Which helping verb is used with They?",
        options: ["has been", "have been", "had been", "will be"],
        answer: "have been"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "He has been sleeping since yesterday.",
          "He have been sleeping since yesterday.",
          "He has been slept since yesterday.",
          "He had been sleeping since yesterday."
        ],
        answer: "He has been sleeping since yesterday."
      },
      {
        question: "Which word is used for a definite time?",
        options: ["since", "for", "never", "not"],
        answer: "since"
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Have you been working hard for two months?",
          "Has you been working hard for two months?",
          "Have you working hard for two months?",
          "Did you been working hard for two months?"
        ],
        answer: "Have you been working hard for two months?"
      }
    ],
    trueOrFalse: [
      "Present Perfect Continuous Tense shows a continuing action.",
      "Has been is used with singular subjects except I and You.",
      "Have been is used with I, You and plural subjects.",
      "The main verb is used with ing.",
      "Since is used for an indefinite period of time."
    ],
    answerInShort: [
      "What does Present Perfect Continuous Tense express?",
      "When is has been used?",
      "When is have been used?",
      "What is the use of since?",
      "What is the use of for?"
    ],
    thinkAndAnswer: [
      "Why is ing added to the main verb?",
      "Change 'They have been bathing for one hour.' into a negative sentence.",
      "Change 'She has been singing in the studio.' into an interrogative sentence.",
      "Why is since different from for?",
      "Write one affirmative, one negative and one interrogative Present Perfect Continuous sentence."
    ]
  },

  {
    chapter: 25,
    classNumber: 7,
    subject: "English Grammer",
    title: "Past Perfect Continuous Tense",
    fillInTheBlanks: [
      "Past Perfect Continuous Tense shows an action that continued in the ______.",
      "Past Perfect Continuous Tense uses ______ been with all subjects.",
      "The main verb is used in its first form with ______.",
      "The word ______ is used for a definite time.",
      "The word ______ is used for an indefinite period of time."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with all subjects?",
        options: ["has been", "have been", "had been", "will have been"],
        answer: "had been"
      },
      {
        question: "Which form is used with the main verb?",
        options: ["First form + ing", "Second form", "Third form", "First form only"],
        answer: "First form + ing"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "The labourers had been working for two hours.",
          "The labourers have been working for two hours.",
          "The labourers had been worked for two hours.",
          "The labourers had work for two hours."
        ],
        answer: "The labourers had been working for two hours."
      },
      {
        question: "Which word is used with a definite point of time?",
        options: ["since", "for", "never", "not"],
        answer: "since"
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Had you been playing since 3 o'clock?",
          "Have you been playing since 3 o'clock?",
          "Had you playing since 3 o'clock?",
          "Did you been playing since 3 o'clock?"
        ],
        answer: "Had you been playing since 3 o'clock?"
      }
    ],
    trueOrFalse: [
      "Past Perfect Continuous Tense shows a continuing action in the past.",
      "Had been is used with all subjects.",
      "The main verb is used with ing.",
      "Since is used for a definite time.",
      "For is used for an indefinite period of time."
    ],
    answerInShort: [
      "What does Past Perfect Continuous Tense express?",
      "Which helping verbs are used?",
      "Which form is used with the main verb?",
      "When is since used?",
      "When is for used?"
    ],
    thinkAndAnswer: [
      "Why is had been used with all subjects?",
      "Change 'The child had been bathing for half an hour.' into a negative sentence.",
      "Change 'Had the children been sleeping for one hour?' into an affirmative sentence.",
      "Explain the difference between since and for.",
      "Write one affirmative, one negative and one interrogative Past Perfect Continuous sentence."
    ]
  },

  {
    chapter: 26,
    classNumber: 7,
    subject: "English Grammer",
    title: "Future Perfect Continuous Tense",
    fillInTheBlanks: [
      "Future Perfect Continuous Tense shows an action that will continue in the ______.",
      "With I and We, ______ have been is used.",
      "With subjects other than I and We, ______ have been is used.",
      "The main verb is used with ______.",
      "The words ______ and for are used to show the period of time."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which helping verb is used with I and We?",
        options: ["shall have been", "will have been", "had been", "has been"],
        answer: "shall have been"
      },
      {
        question: "Which helping verb is used with subjects other than I and We?",
        options: ["shall have been", "will have been", "had been", "has been"],
        answer: "will have been"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "He will have been studying since morning.",
          "He will have studying since morning.",
          "He will has been studying since morning.",
          "He had been studying since morning."
        ],
        answer: "He will have been studying since morning."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "They will not have been going to office for two days.",
          "They will not have been go to office for two days.",
          "They will not been going to office for two days.",
          "They had not have been going to office for two days."
        ],
        answer: "They will not have been going to office for two days."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Will you have been living in this city for many days?",
          "Will you have living in this city for many days?",
          "Have you will been living in this city?",
          "Will you been living in this city?"
        ],
        answer: "Will you have been living in this city for many days?"
      }
    ],
    trueOrFalse: [
      "Future Perfect Continuous Tense shows a continuing action in the future.",
      "Shall have been is used with I and We.",
      "Will have been is used with subjects other than I and We.",
      "The main verb is used with ing.",
      "Since is used for a definite time."
    ],
    answerInShort: [
      "What does Future Perfect Continuous Tense express?",
      "When is shall have been used?",
      "When is will have been used?",
      "Which form is used with the main verb?",
      "How are negative sentences formed?"
    ],
    thinkAndAnswer: [
      "Why is have been used after shall or will?",
      "Change 'I shall have been watching the movie since 2 o'clock.' into a negative sentence.",
      "Change 'They will have been living in this city since June.' into an interrogative sentence.",
      "How are since and for used in Future Perfect Continuous Tense?",
      "Write one affirmative, one negative and one interrogative Future Perfect Continuous sentence."
    ]
  },

  {
    chapter: 27,
    classNumber: 7,
    subject: "English Grammer",
    title: "Use of Linking Verb (Is, Are, Am)",
    fillInTheBlanks: [
      "Is, Are and Am are used as ______ verbs.",
      "Is is generally used with a ______ subject.",
      "Are is used with plural subjects and with ______.",
      "Am is used with the subject ______.",
      "In negative sentences, ______ is placed after Is, Are or Am."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which linking verb is used with I?",
        options: ["is", "are", "am", "were"],
        answer: "am"
      },
      {
        question: "Which linking verb is used with He?",
        options: ["is", "are", "am", "were"],
        answer: "is"
      },
      {
        question: "Which linking verb is used with You?",
        options: ["is", "are", "am", "was"],
        answer: "are"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "He is a shopper.",
          "He are a shopper.",
          "He am a shopper.",
          "He be a shopper."
        ],
        answer: "He is a shopper."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Are you sad?",
          "Is you sad?",
          "Am you sad?",
          "You are sad?"
        ],
        answer: "Are you sad?"
      }
    ],
    trueOrFalse: [
      "Is, Are and Am can be used as linking verbs.",
      "Is is used with singular subjects.",
      "Are is used with You.",
      "Am is used with I.",
      "Not is used after the linking verb in negative sentences."
    ],
    answerInShort: [
      "What are linking verbs?",
      "When is Is used?",
      "When is Are used?",
      "When is Am used?",
      "How are negative sentences formed with Is, Are and Am?"
    ],
    thinkAndAnswer: [
      "Why is Am used only with I?",
      "Change 'He is a doctor.' into a negative sentence.",
      "Change 'They are very sad.' into an interrogative sentence.",
      "How can you identify a linking verb in a sentence?",
      "Write three sentences using Is, Are and Am."
    ]
  },  {
    chapter: 28,
    classNumber: 7,
    subject: "English Grammer",
    title: "Use of Linking Verb (Was, Were)",
    fillInTheBlanks: [
      "A sentence in which the verb is used as was or were generally expresses the ______ tense.",
      "Was is generally used with a ______ person subject.",
      "Were is used with ______ person subjects.",
      "Was is used with the subject ______.",
      "Were is used with the subject ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which linking verb is used with a singular subject?",
        options: ["Was", "Were", "Are", "Am"],
        answer: "Was"
      },
      {
        question: "Which linking verb is generally used with a plural subject?",
        options: ["Was", "Were", "Is", "Am"],
        answer: "Were"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "My pen was red.",
          "My pen were red.",
          "My pen are red.",
          "My pen am red."
        ],
        answer: "My pen was red."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "Ankit was not honest.",
          "Ankit were not honest.",
          "Ankit was no honest.",
          "Ankit were no honest."
        ],
        answer: "Ankit was not honest."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Were you a teacher?",
          "Was you a teacher?",
          "Are you a teacher?",
          "Were you teacher?"
        ],
        answer: "Were you a teacher?"
      }
    ],
    trueOrFalse: [
      "Was and Were are used as linking verbs in Past Tense.",
      "Was is used with a singular subject.",
      "Were is used with a plural subject.",
      "Was is used with I.",
      "Not is used after Was or Were in negative sentences."
    ],
    answerInShort: [
      "What kind of tense is generally shown by Was and Were?",
      "When is Was used?",
      "When is Were used?",
      "How are negative sentences made with Was and Were?",
      "How are interrogative sentences made with Was and Were?"
    ],
    thinkAndAnswer: [
      "Why is Was used with a singular subject?",
      "Change 'I was happy.' into a negative sentence.",
      "Change 'They were in the class.' into an interrogative sentence.",
      "Change 'Mohini was beautiful.' into a negative sentence.",
      "Write one affirmative, one negative and one interrogative sentence using Was or Were."
    ]
  },

  {
    chapter: 29,
    classNumber: 7,
    subject: "English Grammer",
    title: "Use of Has, Have & Had",
    fillInTheBlanks: [
      "Has, Have and Had are used to show that a person or thing has something in his or its ______.",
      "Have is used with I, You and ______ subjects.",
      "Has is used with a ______ subject in the present tense.",
      "Had is used for the ______ tense.",
      "In negative sentences, ______ is used after Has, Have or Had."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is used with a singular subject in the present tense?",
        options: ["has", "have", "had", "having"],
        answer: "has"
      },
      {
        question: "Which word is used with I and You?",
        options: ["has", "have", "had", "having"],
        answer: "have"
      },
      {
        question: "Which word is used in the past tense?",
        options: ["has", "have", "had", "having"],
        answer: "had"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "She has a bicycle.",
          "She have a bicycle.",
          "She had a bicycle now.",
          "She having a bicycle."
        ],
        answer: "She has a bicycle."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Have you ticket?",
          "Has you ticket?",
          "Had you ticket?",
          "You have ticket?"
        ],
        answer: "Have you ticket?"
      }
    ],
    trueOrFalse: [
      "Has, Have and Had can show possession.",
      "Have is used with I and You.",
      "Has is used with singular subjects in the present tense.",
      "Had is used for the past tense.",
      "No can be used after Has, Have or Had in negative sentences."
    ],
    answerInShort: [
      "What is the use of Has, Have and Had?",
      "When is Have used?",
      "When is Has used?",
      "When is Had used?",
      "How are negative sentences formed with Has, Have and Had?"
    ],
    thinkAndAnswer: [
      "Why is Has used with a singular subject?",
      "Change 'She has a bicycle.' into a negative sentence.",
      "Change 'We had a dog.' into an interrogative sentence.",
      "How do Has, Have and Had differ in tense and subject?",
      "Write three sentences using Has, Have and Had."
    ]
  },
    {
    chapter: 30,
    classNumber: 7,
    subject: "English Grammer",
    title: "Use of Introductory Subject (It, Here, There)",
    fillInTheBlanks: [
      "It, Here and There are used as ______ Subjects when the actual Subject is not present.",
      "For time, day, weather, season and similar expressions, ______ is used.",
      "For a person or thing whose exact place is mentioned, ______ and There can be used.",
      "In negative sentences, ______ or no is used after Is, Are, Am, Was or Were.",
      "In interrogative sentences, Is, Are, Am, Was or Were are placed before the ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which word is used in 'It is cold today'?",
        options: ["It", "Here", "There", "They"],
        answer: "It"
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "There is a thief in the house.",
          "There are a thief in the house.",
          "Here is a thief in the house.",
          "It are a thief in the house."
        ],
        answer: "There is a thief in the house."
      },
      {
        question: "Choose the correct sentence for a plural noun.",
        options: [
          "There were five books on the table.",
          "There was five books on the table.",
          "There is five books on the table.",
          "It were five books on the table."
        ],
        answer: "There were five books on the table."
      },
      {
        question: "Choose the correct negative sentence.",
        options: [
          "There is no milk in the cup.",
          "There are no milk in the cup.",
          "It is no milk in the cup.",
          "Here is not milk in the cup."
        ],
        answer: "There is no milk in the cup."
      },
      {
        question: "Choose the correct interrogative sentence.",
        options: [
          "Are there many animals in the forest?",
          "Is there many animals in the forest?",
          "There are many animals in the forest?",
          "Are it many animals in the forest?"
        ],
        answer: "Are there many animals in the forest?"
      }
    ],
    trueOrFalse: [
      "It can be used for time, day and weather.",
      "There can be used to introduce a person or thing.",
      "There were five books on the table is grammatically correct.",
      "Not or no can be used in negative sentences.",
      "In interrogative sentences, the helping verb comes before the Subject."
    ],
    answerInShort: [
      "What is an Introductory Subject?",
      "When is It used as an Introductory Subject?",
      "When are Here and There used?",
      "How are negative sentences formed with It, Here and There?",
      "How are interrogative sentences formed with an Introductory Subject?"
    ],
    thinkAndAnswer: [
      "Why is It used in 'It is cold today'?",
      "Translate into English: 'क्या जंगल में बहुत से जानवर हैं?'",
      "Translate into English: 'आज मेरा जन्मदिन है।'",
      "Translate into English: 'पहाड़ी पर एक मंदिर था।'",
      "Write three sentences using It, Here or There as Introductory Subjects."
    ]
  },

  {
    chapter: 31,
    classNumber: 7,
    subject: "English Grammer",
    title: "Passages for Translation",
    fillInTheBlanks: [
      "The farmer had ______ sons.",
      "Aakshay was a ______ person working in a government office.",
      "Ayush studied in Class ______.",
      "Air is necessary for us to ______.",
      "Pt. Jawahar Lal Nehru was the first Prime Minister of ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What did the farmer have?",
        options: [
          "Four sons",
          "Two sons",
          "Three sons",
          "Five sons"
        ],
        answer: "Four sons"
      },
      {
        question: "Where did Aakshay work?",
        options: [
          "In a government office",
          "In a school",
          "On a farm",
          "In a shop"
        ],
        answer: "In a government office"
      },
      {
        question: "What did Ayush do from 7 to 9?",
        options: [
          "His studies",
          "Played games",
          "Slept",
          "Went to the market"
        ],
        answer: "His studies"
      },
      {
        question: "Why is air necessary?",
        options: [
          "For breathing",
          "For writing",
          "For farming only",
          "For cooking only"
        ],
        answer: "For breathing"
      },
      {
        question: "What did children call Jawahar Lal Nehru?",
        options: [
          "Chacha Nehru",
          "Bapu",
          "Guruji",
          "Netaji"
        ],
        answer: "Chacha Nehru"
      }
    ],
    trueOrFalse: [
      "The farmer was very lazy.",
      "Aakshay was an active person.",
      "Ayush was a good student.",
      "Air is not necessary for human beings.",
      "Jawahar Lal Nehru loved children very much."
    ],
    answerInShort: [
      "Why did the farmer call his sons?",
      "What kind of person was Aakshay?",
      "Why was Ayush's teacher pleased with him?",
      "Why is air necessary for us?",
      "When did Jawahar Lal Nehru die?"
    ],
    thinkAndAnswer: [
      "What lesson can be learned from the farmer's story?",
      "Why should people respect an educated person?",
      "What qualities of Ayush made him a good student?",
      "Why do animals and plants also need air?",
      "Why was Jawahar Lal Nehru loved by children?"
    ]
  },

  {
    chapter: 32,
    classNumber: 7,
    subject: "English Grammer",
    title: "Essay-Writing",
    fillInTheBlanks: [
      "Republic Day is our national ______.",
      "India adopted its Constitution on January 26, ______.",
      "The main occupation of people in villages is ______.",
      "Yash's birthday was his ______ birthday.",
      "The writer went to the railway station to see off his ______."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "When is Republic Day celebrated?",
        options: [
          "26 January",
          "15 August",
          "14 November",
          "2 October"
        ],
        answer: "26 January"
      },
      {
        question: "What does an Indian farmer generally wear?",
        options: [
          "Dhoti and kurta",
          "Suit and tie",
          "Shirt and trousers",
          "Coat and trousers"
        ],
        answer: "Dhoti and kurta"
      },
      {
        question: "Whose birthday party is described?",
        options: [
          "Yash's",
          "Rohan's",
          "Jatin's",
          "Ayush's"
        ],
        answer: "Yash's"
      },
      {
        question: "What started the birthday function?",
        options: [
          "Havan",
          "A game",
          "A speech",
          "A dance"
        ],
        answer: "Havan"
      },
      {
        question: "Where were people buying tickets at the railway station?",
        options: [
          "Booking office",
          "Platform",
          "Waiting room",
          "Entrance"
        ],
        answer: "Booking office"
      }
    ],
    trueOrFalse: [
      "Republic Day is celebrated throughout the country.",
      "The Indian farmer is described as hard-working yet poor.",
      "Yash's birthday party started at 9 AM.",
      "The guests left before lunch was served.",
      "The writer returned home after his friend left by train."
    ],
    answerInShort: [
      "Why is Republic Day important?",
      "What is the main occupation of people in villages?",
      "What happened at Yash's birthday party?",
      "What did the writer see at the railway station?",
      "How did the writer's friend leave the station?"
    ],
    thinkAndAnswer: [
      "Why is Republic Day called a symbol of freedom, unity and progress?",
      "Why is the farmer called the backbone of society?",
      "Why did Yash feel proud at his birthday party?",
      "Describe the railway station scene in your own words.",
      "Why should the condition of farmers be improved?"
    ]
  },

  {
    chapter: 33,
    classNumber: 7,
    subject: "English Grammer",
    title: "Story Writing",
    fillInTheBlanks: [
      "Once a lion was sleeping in his ______.",
      "The lion caught the ______ in his paw.",
      "The lion was caught in a hunter's ______.",
      "The mouse cut the net with his sharp ______.",
      "The fox picked up the piece of ______ from the crow."
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who disturbed the sleeping lion?",
        options: ["A mouse", "A fox", "A hunter", "A crow"],
        answer: "A mouse"
      },
      {
        question: "What did the lion get caught in?",
        options: [
          "A hunter's net",
          "A cage",
          "A wooden box",
          "A rope"
        ],
        answer: "A hunter's net"
      },
      {
        question: "What did the woodcutter lose?",
        options: ["His axe", "His money", "His bag", "His clothes"],
        answer: "His axe"
      },
      {
        question: "What did the goddess bring first?",
        options: [
          "A golden axe",
          "An iron axe",
          "A wooden axe",
          "A stone axe"
        ],
        answer: "A golden axe"
      },
      {
        question: "What did the fox want the crow to do?",
        options: ["Sing", "Sleep", "Fly", "Run"],
        answer: "Sing"
      }
    ],
    trueOrFalse: [
      "The lion was sleeping when the mouse came.",
      "The mouse promised to help the lion.",
      "The mouse freed the lion from the hunter's net.",
      "The woodcutter accepted the golden axe as his own.",
      "The fox praised the crow to get the piece of cheese."
    ],
    answerInShort: [
      "How did the mouse help the lion?",
      "What happened to the lion one day?",
      "Why was the woodcutter sad?",
      "Why did the goddess reward the woodcutter?",
      "How did the fox get the piece of cheese?"
    ],
    thinkAndAnswer: [
      "What is the moral of 'The Lion and the Mouse'?",
      "Why is honesty important in 'Honesty is the Best Policy'?",
      "Why did the goddess give the woodcutter the other two axes?",
      "How did the fox trick the crow?",
      "What lesson can be learned from 'A Clever Fox'?"
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
    classNumber: chapter.classNumber || 2,
    subject: chapter.subject,
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