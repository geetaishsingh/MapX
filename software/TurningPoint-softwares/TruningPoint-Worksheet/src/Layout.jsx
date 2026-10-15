

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
    classNumber: 5,
    subject: "General Knowledge",
    title: "Discovering My Values",

    fillInTheBlanks: [
      "Values are the things that are important to us and help guide how we ______.",
      "Kindness means caring about and helping ______.",
      "Honesty means telling the ______.",
      "Teamwork means working together with ______.",
      "Gratitude means being thankful for the things we ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which of the following is a value?",
        options: ["Kindness", "Anger", "Laziness", "Carelessness"],
        answer: "Kindness"
      },
      {
        question: "Which value means telling the truth?",
        options: ["Honesty", "Courage", "Creativity", "Friendship"],
        answer: "Honesty"
      },
      {
        question: "Which value means working together?",
        options: ["Teamwork", "Patience", "Respect", "Gratitude"],
        answer: "Teamwork"
      },
      {
        question: "Which value means being thankful?",
        options: ["Gratitude", "Fairness", "Responsibility", "Courage"],
        answer: "Gratitude"
      },
      {
        question: "Which value means treating others well?",
        options: ["Respect", "Creativity", "Patience", "Helping"],
        answer: "Respect"
      }
    ],

    trueOrFalse: [
      "Values are important things that help guide how we behave.",
      "Kindness is one of the values listed in the worksheet.",
      "Honesty means hiding the truth.",
      "Teamwork means working together.",
      "Gratitude means being thankful."
    ],

    answerInShort: [
      "What are values?",
      "Name any three values given in the worksheet.",
      "What does honesty mean?",
      "What does teamwork mean?",
      "What is gratitude?"
    ],

    thinkAndAnswer: [
      "Which three values are most important to you and why?",
      "Describe a recent event where you showed kindness.",
      "How does showing good values make you feel?",
      "Why is it important to respect and take care of others?",
      "How can you use your values in your daily life?"
    ]
  },
  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 2,
    title: "Buddy or Bully?",

    fillInTheBlanks: [
      "A person who listens to your ideas and respects them is being a ______.",
      "Making fun of someone in front of others is a form of ______ behaviour.",
      "A person who supports you when someone is unkind is being a good ______.",
      "Spreading rumours about someone can harm their ______.",
      "Sharing toys and including others is an example of being a ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Ananya listens to your ideas and respects them. Is she a Buddy or a Bully?",
        options: ["Buddy", "Bully", "Neither", "Both"],
        answer: "Buddy"
      },
      {
        question: "Who is behaving like a bully?",
        options: [
          "Priya invites you to join her",
          "Sneha supports you",
          "Rohan makes fun of you in front of others",
          "Kabir shares his toys"
        ],
        answer: "Rohan makes fun of you in front of others"
      },
      {
        question: "What should you do when someone is unkind to you?",
        options: [
          "Support the person",
          "Spread rumours",
          "Make fun of them",
          "Ignore everyone"
        ],
        answer: "Support the person"
      },
      {
        question: "Which behaviour shows friendship?",
        options: [
          "Excluding someone",
          "Sharing toys",
          "Calling hurtful names",
          "Pushing someone"
        ],
        answer: "Sharing toys"
      },
      {
        question: "Which action can make someone feel excluded?",
        options: [
          "Inviting them to play",
          "Helping them",
          "Leaving them out of social events",
          "Sharing with them"
        ],
        answer: "Leaving them out of social events"
      }
    ],

    trueOrFalse: [
      "A Buddy respects your ideas even when they do not agree with you.",
      "Making fun of others is friendly behaviour.",
      "Helping someone with difficult schoolwork is a kind action.",
      "Spreading rumours can harm someone's reputation.",
      "Sharing toys with others is a positive behaviour."
    ],

    answerInShort: [
      "What is a Buddy?",
      "What is a Bully?",
      "Why is spreading rumours harmful?",
      "How can you help someone who is being treated unkindly?",
      "Write one quality of a good friend."
    ],

    thinkAndAnswer: [
      "How would you feel if someone excluded you from a group?",
      "What would you do if you saw someone being bullied?",
      "Why should we respect other people's ideas?",
      "How can you make a new student feel welcome?",
      "What makes someone a good friend?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 3,
    title: "Using Empathy",

    fillInTheBlanks: [
      "Empathy means putting yourself in someone else's ______.",
      "Empathy helps us understand how someone might be ______.",
      "If someone called Naina a bad name, she might feel ______.",
      "If Ravi's dog ran away, he might feel ______.",
      "We can help others feel better by saying kind words and offering our ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does empathy mean?",
        options: [
          "Ignoring others",
          "Putting yourself in someone else's shoes",
          "Making fun of others",
          "Avoiding people"
        ],
        answer: "Putting yourself in someone else's shoes"
      },
      {
        question: "How might Naina feel if someone called her a bad name?",
        options: ["Happy", "Sad", "Excited", "Proud"],
        answer: "Sad"
      },
      {
        question: "How might Rahul feel after forgetting to study for a big test?",
        options: ["Worried", "Proud", "Excited", "Relaxed"],
        answer: "Worried"
      },
      {
        question: "How might Arjun feel before giving a speech in front of the whole school?",
        options: ["Nervous", "Hungry", "Sleepy", "Angry"],
        answer: "Nervous"
      },
      {
        question: "What can you do when someone is feeling sad?",
        options: [
          "Make fun of them",
          "Ignore them",
          "Say or do something kind",
          "Leave them alone without caring"
        ],
        answer: "Say or do something kind"
      }
    ],

    trueOrFalse: [
      "Empathy helps us understand how another person might be feeling.",
      "Empathy means ignoring other people's feelings.",
      "A person may feel nervous before speaking in front of a large group.",
      "Kind words can help someone feel better.",
      "We should laugh when someone feels embarrassed."
    ],

    answerInShort: [
      "What is empathy?",
      "Why is empathy important?",
      "How might someone feel after losing a pet?",
      "How can you help a nervous person?",
      "How can kind words help someone?"
    ],

    thinkAndAnswer: [
      "How would you feel if you lost something very important to you?",
      "What would you say to a friend who failed a test?",
      "How would you help a classmate who is nervous about speaking?",
      "Why should we think about other people's feelings?",
      "Describe one situation where you can show empathy."
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 4,
    title: "Being Responsible",

    fillInTheBlanks: [
      "Good citizenship means properly fulfilling your role as a ______.",
      "A good citizen should be responsible at home, in school and in the ______.",
      "We should conserve supplies such as water and ______.",
      "We should get a good ______.",
      "We should obey people who have been given ______ over us."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is good citizenship?",
        options: [
          "Avoiding responsibility",
          "Properly fulfilling your role as a citizen",
          "Breaking laws",
          "Ignoring others"
        ],
        answer: "Properly fulfilling your role as a citizen"
      },
      {
        question: "Which is responsible behaviour?",
        options: [
          "Wasting water",
          "Being kind and loving",
          "Damaging property",
          "Ignoring laws"
        ],
        answer: "Being kind and loving"
      },
      {
        question: "Which resource should we conserve?",
        options: ["Water", "Energy", "Both water and energy", "None"],
        answer: "Both water and energy"
      },
      {
        question: "What should a good citizen do?",
        options: [
          "Respect public property",
          "Damage public property",
          "Ignore the community",
          "Break laws"
        ],
        answer: "Respect public property"
      },
      {
        question: "Which rule is part of the three R's?",
        options: ["Reduce", "Reject", "Remove", "Return"],
        answer: "Reduce"
      }
    ],

    trueOrFalse: [
      "A good citizen should be responsible at home, in school and in society.",
      "We should waste water and energy.",
      "We should respect public and private property.",
      "Getting a good education is important for a good citizen.",
      "We should avoid recycling our trash."
    ],

    answerInShort: [
      "What is good citizenship?",
      "Why should we conserve water and energy?",
      "What are the three R's mentioned in the chapter?",
      "Why should we respect public property?",
      "What are some qualities of a good citizen?"
    ],

    thinkAndAnswer: [
      "How can you be a responsible student at school?",
      "How can you help your community?",
      "Why is it important to obey laws?",
      "How can you follow the three R's at home?",
      "What responsibilities do you have as a citizen?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 5,
    title: "Showing Sensitivity",

    fillInTheBlanks: [
      "A sensitive person understands and cares about the ______ of others.",
      "Being sensitive is a good ______.",
      "We should include people who want to ______ with us.",
      "We should not make fun of people in our ______.",
      "Helping an old woman reach a hospital is an example of showing ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does a sensitive person understand?",
        options: [
          "Only their own feelings",
          "The feelings of others",
          "Only schoolwork",
          "Only games"
        ],
        answer: "The feelings of others"
      },
      {
        question: "What should you do if a differently-abled boy wants to join your game?",
        options: [
          "Ask him to go away",
          "Invite him to play",
          "Make fun of him",
          "Ignore him"
        ],
        answer: "Invite him to play"
      },
      {
        question: "What should you do if students are making fun of a girl?",
        options: [
          "Join them",
          "Laugh at her",
          "Tell the students to stop",
          "Leave the girl alone"
        ],
        answer: "Tell the students to stop"
      },
      {
        question: "What could you do for a poor hungry child?",
        options: [
          "Ignore him",
          "Ask your parents to buy him some food",
          "Make fun of him",
          "Refuse to help"
        ],
        answer: "Ask your parents to buy him some food"
      },
      {
        question: "What should you do when someone needs medical help?",
        options: [
          "Ignore them",
          "Leave immediately",
          "Work with others to help them",
          "Make fun of them"
        ],
        answer: "Work with others to help them"
      }
    ],

    trueOrFalse: [
      "A sensitive person cares about the feelings of others.",
      "We should make fun of people who are different from us.",
      "We should help people who need assistance.",
      "Being sensitive is a good quality.",
      "We should exclude people from games because of their differences."
    ],

    answerInShort: [
      "What is sensitivity?",
      "Why should we be sensitive towards others?",
      "How can you help a differently-abled classmate?",
      "What should you do when someone is being teased?",
      "How can you help someone who needs food?"
    ],

    thinkAndAnswer: [
      "How would you feel if people laughed at you because you were different?",
      "How can you make your classroom more inclusive?",
      "Why should we help people who are in trouble?",
      "What would you do if you saw an injured person?",
      "Describe one way you can show sensitivity every day."
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 6,
    title: "Keep Aware",

    fillInTheBlanks: [
      "No one is allowed to touch you against your ______.",
      "A good touch makes you feel warm, comfortable and ______.",
      "A bad touch can make you feel uneasy and ______.",
      "Good touches can give you a good ______.",
      "You should know the difference between good touch and ______ touch."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who is the boss of your body?",
        options: ["Your friend", "You", "Your teacher", "A stranger"],
        answer: "You"
      },
      {
        question: "How does a good touch make you feel?",
        options: ["Unsafe", "Comfortable", "Afraid", "Painful"],
        answer: "Comfortable"
      },
      {
        question: "Which can be a bad touch?",
        options: [
          "A caring pat",
          "A hug from your grandparents",
          "A forceful touch on private parts",
          "A greeting"
        ],
        answer: "A forceful touch on private parts"
      },
      {
        question: "What should you do if a touch makes you feel unsafe?",
        options: [
          "Stay silent",
          "Tell a trusted adult",
          "Ignore it",
          "Hide it"
        ],
        answer: "Tell a trusted adult"
      },
      {
        question: "Which feeling can be caused by a bad touch?",
        options: ["Joyful", "Cheerful", "Unsafe", "Happy"],
        answer: "Unsafe"
      }
    ],

    trueOrFalse: [
      "No one is allowed to touch you against your will.",
      "A good touch can make you feel comfortable and safe.",
      "A bad touch can make you feel unsafe.",
      "You should be able to differentiate between good and bad touch.",
      "You should never tell a trusted adult about an unsafe situation."
    ],

    answerInShort: [
      "What is a good touch?",
      "What is a bad touch?",
      "How can a good touch make you feel?",
      "How can a bad touch make you feel?",
      "What should you do if someone touches you in a way you do not like?"
    ],

    thinkAndAnswer: [
      "Why is it important to know about good and bad touch?",
      "Why should children speak to a trusted adult about unsafe touches?",
      "How can you help a friend who tells you about an unsafe touch?",
      "Why should nobody touch another person against their will?",
      "What does being aware of your body mean?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 7,
    title: "Online Safety",

    fillInTheBlanks: [
      "Online safety protects people from digital harms, risks and ______ crimes.",
      "Stay safe online by not sharing ______ information.",
      "Do not ______ anyone whom you have only made friends with online.",
      "Do not accept messages or friend requests from ______.",
      "Tell an adult you trust if anything happens online that you do not ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What should you avoid sharing online?",
        options: [
          "Personal information",
          "Favourite colour",
          "A game score",
          "A drawing"
        ],
        answer: "Personal information"
      },
      {
        question: "Who should you avoid meeting?",
        options: [
          "A family member",
          "A trusted teacher",
          "Someone you only know online",
          "Your friend from school"
        ],
        answer: "Someone you only know online"
      },
      {
        question: "Should you accept friend requests from strangers?",
        options: ["Yes", "No", "Always", "Sometimes without thinking"],
        answer: "No"
      },
      {
        question: "Is everything online reliable?",
        options: ["Yes", "No", "Always", "Only at school"],
        answer: "No"
      },
      {
        question: "Who should you tell if something online makes you uncomfortable?",
        options: [
          "A trusted adult",
          "A stranger",
          "Nobody",
          "Only an online friend"
        ],
        answer: "A trusted adult"
      }
    ],

    trueOrFalse: [
      "We should avoid sharing personal information online.",
      "It is safe to meet anyone we know only through the internet.",
      "We should not accept messages from strangers.",
      "Not everything online is reliable.",
      "We should tell a trusted adult if something online makes us uncomfortable."
    ],

    answerInShort: [
      "What is online safety?",
      "Why should we protect personal information?",
      "Why should we avoid meeting online-only friends?",
      "Why is not everything online reliable?",
      "Who should you tell about an unsafe online experience?"
    ],

    thinkAndAnswer: [
      "Why should children follow online safety rules?",
      "What personal information should you keep private?",
      "What would you do if a stranger sent you a friend request?",
      "Why should you think carefully before trusting online information?",
      "How can the SMART rules help you stay safe online?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 8,
    title: "Know Your Aadhaar Card",

    fillInTheBlanks: [
      "An Aadhaar Number is a unique ______-digit number.",
      "The Aadhaar card contains the cardholder's full ______.",
      "The Date of Birth/Age shows your date of ______.",
      "The ______ shows where you live.",
      "The Aadhaar card is issued by ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "How many digits does an Aadhaar Number have?",
        options: ["10", "11", "12", "14"],
        answer: "12"
      },
      {
        question: "Which part shows your identity through your full name?",
        options: ["Name", "QR Code", "Address", "Photograph"],
        answer: "Name"
      },
      {
        question: "Which part shows where you live?",
        options: ["Gender", "Address", "Signature", "Date of Birth"],
        answer: "Address"
      },
      {
        question: "What is used for verification of identity?",
        options: [
          "Signature/Thumbprint",
          "Address",
          "Age",
          "Photograph only"
        ],
        answer: "Signature/Thumbprint"
      },
      {
        question: "Who issues the Aadhaar card?",
        options: ["UIDAI", "WHO", "UNICEF", "RBI"],
        answer: "UIDAI"
      }
    ],

    trueOrFalse: [
      "An Aadhaar Number is a unique 12-digit number.",
      "Everyone has the same Aadhaar Number.",
      "The Aadhaar card contains the cardholder's name.",
      "The address shows where the cardholder lives.",
      "UIDAI issues Aadhaar cards."
    ],

    answerInShort: [
      "What is an Aadhaar Card?",
      "What is an Aadhaar Number?",
      "What information does the address show?",
      "What is a QR Code used for?",
      "What does UIDAI stand for?"
    ],

    thinkAndAnswer: [
      "Why is an identity card important?",
      "Why should identity information be kept safe?",
      "What information can be found on an Aadhaar card?",
      "Why is a photograph included on an identity card?",
      "How can an identity card help prove who you are?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 9,
    title: "Strange Plants",

    fillInTheBlanks: [
      "Some plants have strange and ______ features.",
      "The ______ tree is the national tree of Canada.",
      "The scientific name of Bear's Head Tooth Mushroom is ______.",
      "The giant fan palm grows only in the ______.",
      "The ______ plant is a carnivorous plant that eats insects."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which tree is the national tree of Canada?",
        options: ["Maple tree", "Palm tree", "Baobab tree", "Coconut tree"],
        answer: "Maple tree"
      },
      {
        question: "Which mushroom is mentioned as fighting cancer?",
        options: [
          "Bear's Head Tooth Mushroom",
          "Sundew plant",
          "Pitcher plant",
          "Baobab tree"
        ],
        answer: "Bear's Head Tooth Mushroom"
      },
      {
        question: "Which plant produces the largest seed?",
        options: [
          "Coco-de-mer",
          "Maple tree",
          "Sundew plant",
          "Baobab tree"
        ],
        answer: "Coco-de-mer"
      },
      {
        question: "Which plant has leaves with tiny hairs and shiny drops of glue?",
        options: [
          "Sundew plant",
          "Pitcher plant",
          "Palm tree",
          "Maple tree"
        ],
        answer: "Sundew plant"
      },
      {
        question: "Which plant has pitcher-like structures with a movable lid?",
        options: [
          "Pitcher plant",
          "Sundew plant",
          "Coco-de-mer",
          "Baobab tree"
        ],
        answer: "Pitcher plant"
      }
    ],

    trueOrFalse: [
      "Some plants have strange and unusual features.",
      "The Maple tree is the national tree of Canada.",
      "The Coco-de-mer produces the largest seed.",
      "The Sundew plant is a carnivorous plant.",
      "The Pitcher plant does not eat insects."
    ],

    answerInShort: [
      "What makes some plants strange?",
      "What is the national tree of Canada?",
      "What is the Coco-de-mer known for?",
      "How does the Sundew plant catch insects?",
      "What is special about the Pitcher plant?"
    ],

    thinkAndAnswer: [
      "Why do some plants develop unusual features?",
      "How do carnivorous plants get food?",
      "Why are plants important to the environment?",
      "Which strange plant would you like to learn more about and why?",
      "What can we learn from the unusual adaptations of plants?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 10,
    title: "Amazing Plant Facts",

    fillInTheBlanks: [
      "Rafflesia arnoldii is the world's largest ______.",
      "Wolffia is known as the smallest ______ in the world.",
      "Living Stones use ______ mimicry as a form of defence.",
      "Bleeding Tooth Fungus is completely ______.",
      "Coast Redwood is the tallest living tree ______ on Earth."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is Rafflesia arnoldii known for?",
        options: [
          "Being the largest flower",
          "Being the smallest flower",
          "Being the tallest tree",
          "Being a rootless duckweed"
        ],
        answer: "Being the largest flower"
      },
      {
        question: "What is Wolffia?",
        options: [
          "The smallest flower in the world",
          "The tallest tree",
          "A mushroom",
          "A cactus"
        ],
        answer: "The smallest flower in the world"
      },
      {
        question: "What do Living Stones use as a form of defence?",
        options: [
          "Rock mimicry",
          "Thorns",
          "Poison",
          "Strong smell"
        ],
        answer: "Rock mimicry"
      },
      {
        question: "What is Bleeding Tooth Fungus called besides its main name?",
        options: [
          "Devil's tooth",
          "Living stone",
          "Rootless duckweed",
          "Coast redwood"
        ],
        answer: "Devil's tooth"
      },
      {
        question: "What is Coast Redwood known for?",
        options: [
          "Being the tallest living tree species",
          "Being the smallest flower",
          "Having rock mimicry",
          "Being a mushroom"
        ],
        answer: "Being the tallest living tree species"
      }
    ],

    trueOrFalse: [
      "Rafflesia arnoldii is the largest flower in the world.",
      "Wolffia is the smallest flower in the world.",
      "Living Stones use rock mimicry for defence.",
      "Bleeding Tooth Fungus is completely edible.",
      "Coast Redwood is a very tall living tree species."
    ],

    answerInShort: [
      "What is special about Rafflesia arnoldii?",
      "What is Wolffia?",
      "How do Living Stones protect themselves?",
      "Why is Bleeding Tooth Fungus called unusual?",
      "What is special about Coast Redwood?"
    ],

    thinkAndAnswer: [
      "Why do plants and fungi have unusual adaptations?",
      "How can mimicry help a living thing survive?",
      "Why are plants important living things?",
      "Which fact in this chapter surprised you most?",
      "Why should we learn about unusual plants?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 11,
    title: "Dry Fruits",

    fillInTheBlanks: [
      "Dry fruits are tasty and healthy ______.",
      "Almonds are also called ______.",
      "Kaju is the Hindi name for ______.",
      "Pista is the Hindi name for ______.",
      "Khajur is the Hindi name for ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which dry fruit is shown as Badam?",
        options: ["Almond", "Cashew", "Pistachio", "Walnut"],
        answer: "Almond"
      },
      {
        question: "Which dry fruit is shown as Kaju?",
        options: ["Cashew", "Almond", "Date", "Raisin"],
        answer: "Cashew"
      },
      {
        question: "Which dry fruit is shown as Pista?",
        options: ["Pistachio", "Walnut", "Almond", "Cashew"],
        answer: "Pistachio"
      },
      {
        question: "Which dry fruit is shown as Akhrot?",
        options: ["Walnut", "Raisin", "Date", "Almond"],
        answer: "Walnut"
      },
      {
        question: "Which dry fruit is shown as Khajur?",
        options: ["Date", "Cashew", "Pistachio", "Walnut"],
        answer: "Date"
      }
    ],

    trueOrFalse: [
      "Dry fruits can be healthy snacks.",
      "Badam means almond.",
      "Kaju means cashew.",
      "Akhrot means walnut.",
      "Khajur means raisin."
    ],

    answerInShort: [
      "Why are dry fruits considered healthy snacks?",
      "What is Badam?",
      "What is Kaju?",
      "What is Akhrot?",
      "What is Khajur?"
    ],

    thinkAndAnswer: [
      "Why should we include healthy snacks in our diet?",
      "Which dry fruit do you like most and why?",
      "Make a list of six dry fruits mentioned in the chapter.",
      "Why is it useful to know the names of different foods?",
      "What nutrients would you like to find in different dry fruits?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 12,
    title: "Habitats",

    fillInTheBlanks: [
      "Habitats are natural homes where plants and animals ______.",
      "Deserts, mountains, oceans and tropical forests are types of ______.",
      "Plants and animals change or adapt to live in their ______.",
      "Camels store ______ in their humps.",
      "Polar bears have thick ______ under their skin."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is a habitat?",
        options: [
          "A natural home of plants and animals",
          "A type of food",
          "A weather condition",
          "A machine"
        ],
        answer: "A natural home of plants and animals"
      },
      {
        question: "Where does a camel live?",
        options: ["Desert", "Ocean", "Arctic", "Tropical forest"],
        answer: "Desert"
      },
      {
        question: "Where does a polar bear live?",
        options: ["Arctic", "Desert", "Tropical forest", "Ocean"],
        answer: "Arctic"
      },
      {
        question: "Which animal is associated with the ocean habitat?",
        options: ["Tuna", "Camel", "Tiger", "Gorilla"],
        answer: "Tuna"
      },
      {
        question: "What helps polar bears stay warm?",
        options: [
          "Thick fat under their skin",
          "Thin fur",
          "Long wings",
          "A hump"
        ],
        answer: "Thick fat under their skin"
      }
    ],

    trueOrFalse: [
      "Habitats are natural homes where plants and animals live.",
      "Camels store fat in their humps.",
      "Polar bears have thick fat under their skin.",
      "Plants and animals adapt to their habitats.",
      "A desert is an ocean habitat."
    ],

    answerInShort: [
      "What is a habitat?",
      "Name four types of habitats mentioned in the chapter.",
      "Why do animals adapt to their habitats?",
      "What do camels store in their humps?",
      "How do polar bears stay warm?"
    ],

    thinkAndAnswer: [
      "Why is adaptation important for animals?",
      "What would happen if an animal could not adapt to its habitat?",
      "How is a desert habitat different from an ocean habitat?",
      "Choose an animal and describe how it is adapted to its habitat.",
      "Why should we protect natural habitats?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 13,
    title: "Largest Fish",

    fillInTheBlanks: [
      "Large fish are the biggest creatures living in oceans and ______.",
      "The ______ shark is the largest fish in the world.",
      "The whale shark can grow up to ______ metres long.",
      "Whale sharks eat tiny plankton and small ______.",
      "The chapter shows ______ different large fish species."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is the largest fish in the world?",
        options: ["Whale Shark", "Great White Shark", "Tiger Shark", "Sturgeon"],
        answer: "Whale Shark"
      },
      {
        question: "How long can a whale shark grow according to the chapter?",
        options: ["5–8 metres", "12–18 metres", "20–25 metres", "30–35 metres"],
        answer: "12–18 metres"
      },
      {
        question: "What does the whale shark eat?",
        options: [
          "Tiny plankton and small fish",
          "Large mammals",
          "Birds",
          "Plants only"
        ],
        answer: "Tiny plankton and small fish"
      },
      {
        question: "Which fish is included in the hints?",
        options: [
          "Beluga Sturgeon",
          "Goldfish",
          "Clownfish",
          "Catfish"
        ],
        answer: "Beluga Sturgeon"
      },
      {
        question: "Which is another large fish mentioned in the chapter?",
        options: ["Ocean Sunfish", "Goldfish", "Guppy", "Betta"],
        answer: "Ocean Sunfish"
      }
    ],

    trueOrFalse: [
      "Large fish can grow very long and heavy.",
      "The whale shark is the largest fish in the world.",
      "The whale shark eats only large fish.",
      "A whale shark can grow up to 12–18 metres long.",
      "Whale sharks eat tiny plankton and small fish."
    ],

    answerInShort: [
      "What is the largest fish in the world?",
      "How long can a whale shark grow?",
      "What does a whale shark eat?",
      "Name three large fish from the chapter.",
      "Why are large fish called large species?"
    ],

    thinkAndAnswer: [
      "Why do you think whale sharks can grow so large?",
      "Why is it important to protect large fish?",
      "Which large fish from the chapter would you like to see?",
      "What can we learn by studying different fish species?",
      "Why are oceans important for marine life?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 14,
    title: "Strange Birds",

    fillInTheBlanks: [
      "The Hoatzin is known as the ______ bird.",
      "Kakapo is the world's heaviest and only ______ nocturnal parrot.",
      "The Kakapo is from ______ Zealand.",
      "The Himalayan Hornbill is a resident of the Himalayan ______.",
      "The Tawny Frogmouth is from ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which bird is known as the stinkbird?",
        options: ["Hoatzin", "Kakapo", "Himalayan Hornbill", "Tawny Frogmouth"],
        answer: "Hoatzin"
      },
      {
        question: "Which bird is the world's heaviest and only flightless nocturnal parrot?",
        options: ["Kakapo", "Hoatzin", "Hornbill", "Frogmouth"],
        answer: "Kakapo"
      },
      {
        question: "Where is the Kakapo from?",
        options: ["New Zealand", "India", "Australia", "Canada"],
        answer: "New Zealand"
      },
      {
        question: "Where is the Himalayan Hornbill found?",
        options: ["Himalayas, India", "Australia", "South America", "New Zealand"],
        answer: "Himalayas, India"
      },
      {
        question: "Which bird is known for a mouth resembling a frog's?",
        options: ["Tawny Frogmouth", "Hoatzin", "Kakapo", "Hornbill"],
        answer: "Tawny Frogmouth"
      }
    ],

    trueOrFalse: [
      "The Hoatzin is known as the stinkbird.",
      "The Kakapo is a flightless nocturnal parrot.",
      "The Kakapo is from Australia.",
      "The Himalayan Hornbill is found in the Himalayas, India.",
      "The Tawny Frogmouth is from Australia."
    ],

    answerInShort: [
      "Why is the Hoatzin called the stinkbird?",
      "What is special about the Kakapo?",
      "Where is the Himalayan Hornbill found?",
      "What is special about the Tawny Frogmouth?",
      "Name the five strange birds mentioned in the chapter."
    ],

    thinkAndAnswer: [
      "Why are some birds described as strange?",
      "Which bird from the chapter is most interesting to you and why?",
      "Why is it important to protect unusual bird species?",
      "How do special features help birds survive?",
      "What can we learn from the different habitats of these birds?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 15,
    title: "Food and Nutrients",

    fillInTheBlanks: [
      "The substances essential for the growth and nourishment of the body are called ______.",
      "Proteins are also called ______-building food.",
      "Carbohydrates and fats are ______-giving food.",
      "Vitamins and minerals are called ______ food.",
      "Proteins help in the growth and repair of worn-out ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which food is a source of carbohydrates?",
        options: ["Fish", "Peas", "Rice", "Cheese"],
        answer: "Rice"
      },
      {
        question: "Which nutrient is essential for providing energy quickly?",
        options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
        answer: "Carbohydrates"
      },
      {
        question: "Which nutrient helps to keep us warm by providing energy?",
        options: ["Vitamins", "Carbohydrates", "Fats", "Proteins"],
        answer: "Fats"
      },
      {
        question: "Which is a key source of proteins?",
        options: ["Rice", "Butter", "Egg", "Fruits"],
        answer: "Egg"
      },
      {
        question: "Which nutrient helps fight diseases and is found in fruits and vegetables?",
        options: [
          "Carbohydrates",
          "Proteins",
          "Vitamins and minerals",
          "Fats"
        ],
        answer: "Vitamins and minerals"
      }
    ],

    trueOrFalse: [
      "Nutrients are essential for the growth and nourishment of the body.",
      "Proteins are body-building food.",
      "Carbohydrates are energy-giving food.",
      "Vitamins and minerals are protective food.",
      "Proteins do not help in the growth and repair of cells."
    ],

    answerInShort: [
      "What are nutrients?",
      "What are proteins called?",
      "What do carbohydrates provide?",
      "Why are vitamins and minerals important?",
      "What nutrient helps in the growth and repair of worn-out cells?"
    ],

    thinkAndAnswer: [
      "Why do we need different nutrients?",
      "Why should we eat a variety of foods?",
      "What might happen if our diet lacks important nutrients?",
      "How can healthy food help our body?",
      "Why are fruits and vegetables important in our diet?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 16,
    title: "Doctor! Doctor!",

    fillInTheBlanks: [
      "Doctors specialise in different ______ to care for specific health problems.",
      "Cardiologists treat the heart and blood ______.",
      "Dermatologists treat skin, hair and ______ problems.",
      "Neurologists care for the brain, spine and ______.",
      "Dentists look after teeth and ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which doctor treats the heart and blood vessels?",
        options: ["Cardiologist", "Dermatologist", "Dentist", "Neurologist"],
        answer: "Cardiologist"
      },
      {
        question: "Which doctor treats skin, hair and nail problems?",
        options: ["Dermatologist", "Dentist", "Pulmonologist", "Cardiologist"],
        answer: "Dermatologist"
      },
      {
        question: "Which doctor cares for the brain, spine and nerves?",
        options: ["Neurologist", "Dentist", "Dermatologist", "Endocrinologist"],
        answer: "Neurologist"
      },
      {
        question: "Which specialist treats teeth and gums?",
        options: ["Dentist", "Cardiologist", "Neurologist", "Pulmonologist"],
        answer: "Dentist"
      },
      {
        question: "Which specialist treats the lungs and breathing problems?",
        options: ["Pulmonologist", "Dermatologist", "Dentist", "Cardiologist"],
        answer: "Pulmonologist"
      }
    ],

    trueOrFalse: [
      "Different doctors specialise in different fields.",
      "Cardiologists treat the heart and blood vessels.",
      "Dermatologists treat teeth and gums.",
      "Neurologists care for the brain, spine and nerves.",
      "Pulmonologists treat the lungs and breathing problems."
    ],

    answerInShort: [
      "Why do doctors specialise in different fields?",
      "What does a cardiologist treat?",
      "What does a dermatologist treat?",
      "What does a neurologist treat?",
      "What does a dentist treat?"
    ],

    thinkAndAnswer: [
      "Why is it useful to have specialist doctors?",
      "Which doctor would you visit for a tooth problem?",
      "Which specialist would treat a breathing problem?",
      "Why is specialised medical care important?",
      "How do different doctors help people stay healthy?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 17,
    title: "Branches of Science",

    fillInTheBlanks: [
      "The study of life is called ______.",
      "The study of the universe is called ______.",
      "The study of the heart is called ______.",
      "The study of plants is called ______.",
      "The study of sound is called ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is the study of life called?",
        options: ["Biology", "Chemistry", "Physics", "Geology"],
        answer: "Biology"
      },
      {
        question: "What is the study of the universe called?",
        options: ["Cosmology", "Botany", "Geology", "Biology"],
        answer: "Cosmology"
      },
      {
        question: "What is the study of the heart called?",
        options: ["Cardiology", "Zoology", "Biology", "Anatomy"],
        answer: "Cardiology"
      },
      {
        question: "What is the study of plants called?",
        options: ["Botany", "Urology", "Virology", "Astronomy"],
        answer: "Botany"
      },
      {
        question: "What is the study of sound called?",
        options: ["Acoustics", "Avionics", "Physics", "Optics"],
        answer: "Acoustics"
      }
    ],

    trueOrFalse: [
      "Biology is the study of life.",
      "Cosmology is the study of the universe.",
      "Cardiology is the study of plants.",
      "Botany is the study of plants.",
      "Acoustics is the study of sound."
    ],

    answerInShort: [
      "What is Biology?",
      "What is Cosmology?",
      "What is Cardiology?",
      "What is Botany?",
      "What is Acoustics?"
    ],

    thinkAndAnswer: [
      "Why is science divided into different branches?",
      "Which branch of science would you like to study and why?",
      "How do different branches of science help us understand the world?",
      "Why is specialised study useful in science?",
      "Choose three branches of science and explain what they study."
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 18,
    title: "Scientific Instruments",

    fillInTheBlanks: [
      "A barometer is used for measuring the pressure of the ______.",
      "An altimeter is used in aircraft for showing height above ______ level.",
      "A thermometer is used for measuring ______.",
      "A stethoscope is used for listening to the sound of the heart, lungs and ______.",
      "A refrigerator is used for keeping food in good ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which instrument measures atmospheric pressure?",
        options: ["Barometer", "Altimeter", "Thermometer", "Hygrometer"],
        answer: "Barometer"
      },
      {
        question: "Which instrument shows height above sea level?",
        options: ["Altimeter", "Barometer", "Lactometer", "Galvanometer"],
        answer: "Altimeter"
      },
      {
        question: "Which instrument measures body temperature?",
        options: ["Thermometer", "Barometer", "Hydrometer", "Stethoscope"],
        answer: "Thermometer"
      },
      {
        question: "Which instrument is used for listening to the heart and lungs?",
        options: ["Stethoscope", "Periscope", "Binoculars", "Seismograph"],
        answer: "Stethoscope"
      },
      {
        question: "Which instrument records the strength and distance of earthquakes?",
        options: ["Seismograph", "Hygrometer", "Galvanometer", "Lactometer"],
        answer: "Seismograph"
      }
    ],

    trueOrFalse: [
      "A barometer measures atmospheric pressure.",
      "An altimeter shows height above sea level.",
      "A thermometer measures temperature.",
      "A stethoscope is used to listen to sounds of the heart and lungs.",
      "A refrigerator is used for measuring earthquakes."
    ],

    answerInShort: [
      "What does a barometer measure?",
      "What is an altimeter used for?",
      "What does a thermometer measure?",
      "What is a stethoscope used for?",
      "What does a seismograph record?"
    ],

    thinkAndAnswer: [
      "Why are scientific instruments useful?",
      "Which instrument would you use to measure temperature?",
      "Which instrument would help study an earthquake?",
      "Why do different instruments have different uses?",
      "Choose three instruments and explain their uses."
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 19,
    title: "Simple Machines",

    fillInTheBlanks: [
      "Simple machines are basic tools that make our work ______.",
      "A door knob or car steering wheel is an example of a ______.",
      "A knife is an example of a ______.",
      "A ramp for a wheelchair is an example of an inclined ______.",
      "Archimedes first studied and quantified simple machines in the ______ century."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What do simple machines help us do?",
        options: [
          "Make work easier",
          "Make work impossible",
          "Stop movement",
          "Create food"
        ],
        answer: "Make work easier"
      },
      {
        question: "What is a door knob an example of?",
        options: ["Wheel and axle", "Wedge", "Lever", "Inclined plane"],
        answer: "Wheel and axle"
      },
      {
        question: "What does the lid of a pickle jar use to stay on tight?",
        options: ["Screw", "Wedge", "Pulley", "Wheel"],
        answer: "Screw"
      },
      {
        question: "What is a ramp an example of?",
        options: ["Inclined plane", "Wheel", "Pulley", "Screw"],
        answer: "Inclined plane"
      },
      {
        question: "What simple machine is a knife?",
        options: ["Wedge", "Wheel", "Pulley", "Screw"],
        answer: "Wedge"
      }
    ],

    trueOrFalse: [
      "Simple machines make our work easier.",
      "A ramp is an inclined plane.",
      "A knife is a wedge.",
      "A door knob can work as a wheel and axle.",
      "Simple machines make work harder."
    ],

    answerInShort: [
      "What are simple machines?",
      "How do simple machines help us?",
      "What is a wheel and axle?",
      "What is an inclined plane?",
      "What is a wedge?"
    ],

    thinkAndAnswer: [
      "Why are simple machines useful in everyday life?",
      "Find three simple machines around your home.",
      "How does a ramp make work easier?",
      "How does a knife act as a simple machine?",
      "Why do people use simple machines?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 20,
    title: "Energy",

    fillInTheBlanks: [
      "Energy is the ability to do ______.",
      "Solar energy can make electricity using ______ cells.",
      "Wind energy is generated from wind or atmospheric ______.",
      "Hydro-electric power uses energy from falling ______.",
      "Energy trapped from inside the earth is called ______ energy."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is energy?",
        options: [
          "The ability to do work",
          "A type of plant",
          "A type of food",
          "A machine"
        ],
        answer: "The ability to do work"
      },
      {
        question: "Which energy can make electricity using photovoltaic cells?",
        options: ["Solar energy", "Wind energy", "Bio-gas", "Coal"],
        answer: "Solar energy"
      },
      {
        question: "What is wind energy generated from?",
        options: [
          "Wind or atmospheric air",
          "Falling water",
          "Coal",
          "Human sewage"
        ],
        answer: "Wind or atmospheric air"
      },
      {
        question: "Which energy uses falling water to make electricity?",
        options: [
          "Hydro-electric power",
          "Solar energy",
          "Bio-gas",
          "Geothermal energy"
        ],
        answer: "Hydro-electric power"
      },
      {
        question: "Which energy is trapped from inside the earth?",
        options: [
          "Geothermal energy",
          "Wind energy",
          "Solar energy",
          "Bio-gas"
        ],
        answer: "Geothermal energy"
      }
    ],

    trueOrFalse: [
      "Energy is the ability to do work.",
      "Solar energy can be used to make electricity.",
      "Wind energy is generated from wind or atmospheric air.",
      "Hydro-electric power uses falling water.",
      "Geothermal energy comes from inside the earth."
    ],

    answerInShort: [
      "What is energy?",
      "What is solar energy?",
      "What is wind energy?",
      "What is hydro-electric power?",
      "What is geothermal energy?"
    ],

    thinkAndAnswer: [
      "Why is energy important in our daily lives?",
      "Why should we use renewable sources of energy?",
      "How can solar energy help us?",
      "How does falling water produce hydro-electric power?",
      "Why should we reduce our dependence on highly combustible resources?"
    ]
  },
  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 21,
    title: "Natural Disasters",

    fillInTheBlanks: [
      "An opening of the earth's surface which allows extremely hot mixture to escape is called a ______.",
      "Submerging of surrounding areas due to overflow of rivers is called a ______.",
      "Trembling or shaking of the earth's surface is called an ______.",
      "A violent storm as a rotating funnel-shaped cloud is called a ______.",
      "The land dries up due to prolonged dry weather during a ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which natural disaster involves the opening of the earth's surface and escape of extremely hot material?",
        options: ["Volcano", "Flood", "Drought", "Tornado"],
        answer: "Volcano"
      },
      {
        question: "What is the trembling or shaking of the earth's surface called?",
        options: ["Earthquake", "Tsunami", "Flood", "Drought"],
        answer: "Earthquake"
      },
      {
        question: "Which disaster consists of a series of very huge waves moving speedily towards the shore?",
        options: ["Tsunami", "Tornado", "Drought", "Earthquake"],
        answer: "Tsunami"
      },
      {
        question: "What is the prolonged dry weather that causes land to dry up called?",
        options: ["Drought", "Flood", "Volcano", "Tsunami"],
        answer: "Drought"
      },
      {
        question: "A heavy mass of snow breaking loose and sliding down a mountain is called an ______.",
        options: ["Avalanche", "Earthquake", "Flood", "Tornado"],
        answer: "Avalanche"
      }
    ],

    trueOrFalse: [
      "Natural disasters are sudden events caused by nature.",
      "A flood can occur due to the overflow of rivers.",
      "A tornado is a series of huge waves moving towards the shore.",
      "An earthquake involves trembling or shaking of the earth's surface.",
      "An avalanche is a heavy mass of snow sliding down a mountain."
    ],

    answerInShort: [
      "What is a natural disaster?",
      "What is a flood?",
      "What is an earthquake?",
      "What is a tsunami?",
      "What is an avalanche?"
    ],

    thinkAndAnswer: [
      "Why can natural disasters cause damage to land, homes and life?",
      "How can people prepare for natural disasters?",
      "What should you do during an earthquake?",
      "Why is it important to know about different natural disasters?",
      "How can communities help people affected by natural disasters?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 22,
    title: "Chandrayaan-3",

    fillInTheBlanks: [
      "Chandrayaan-3 means 'moon vehicle' in ______.",
      "Chandrayaan-3 consists of a Lander Module, Propulsion Module and a ______.",
      "The Vikram lander and Pragyan rover landed near the moon's ______ pole.",
      "Chandrayaan-3 landed on the moon on 23 August ______.",
      "The launch vehicle used was the ______ rocket."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does Chandrayaan mean?",
        options: ["Moon vehicle", "Moon star", "Space station", "Moon rover"],
        answer: "Moon vehicle"
      },
      {
        question: "Which rover was part of Chandrayaan-3?",
        options: ["Pragyan", "Vikram", "Aryabhata", "Aditya"],
        answer: "Pragyan"
      },
      {
        question: "Which lander successfully landed on the Moon?",
        options: ["Vikram", "Pragyan", "EOS-05", "LVM3"],
        answer: "Vikram"
      },
      {
        question: "Where did Chandrayaan-3 land?",
        options: [
          "South Polar Region",
          "North Polar Region",
          "Equatorial Region",
          "Far side only"
        ],
        answer: "South Polar Region"
      },
      {
        question: "What was the launch vehicle of Chandrayaan-3?",
        options: ["LVM3-M4 Rocket", "PSLV-C37", "GSLV", "SLV-3"],
        answer: "LVM3-M4 Rocket"
      }
    ],

    trueOrFalse: [
      "Chandrayaan-3 means 'moon vehicle' in Sanskrit.",
      "Chandrayaan-3 consisted of a Lander Module, Propulsion Module and Rover.",
      "Vikram was the rover of Chandrayaan-3.",
      "Chandrayaan-3 landed near the Moon's south pole.",
      "Chandrayaan-3 landed on 23 August 2023."
    ],

    answerInShort: [
      "What is Chandrayaan-3?",
      "Name the three main components of Chandrayaan-3.",
      "What are the names of the lander and rover?",
      "When did Chandrayaan-3 land on the Moon?",
      "What was the launch vehicle used for Chandrayaan-3?"
    ],

    thinkAndAnswer: [
      "Why is Chandrayaan-3 important for India?",
      "What can scientists learn from studying the Moon?",
      "Why is landing near the Moon's south pole significant?",
      "How do a lander and rover perform different functions?",
      "Why are space missions important for scientific research?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 23,
    title: "Artificial Intelligence",

    fillInTheBlanks: [
      "Artificial Intelligence is abbreviated as ______.",
      "AI helps computers perform ______ tasks.",
      "AI can help computers with seeing, understanding and translating ______.",
      "A driverless car is an example of an AI-powered ______ car.",
      "A device that can interact with an Android phone and set alarms is a ______ assistant."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What does AI stand for?",
        options: [
          "Artificial Intelligence",
          "Automatic Information",
          "Advanced Internet",
          "Artificial Internet"
        ],
        answer: "Artificial Intelligence"
      },
      {
        question: "Which device can drive without a human driver?",
        options: ["Smart car", "Chatbot", "Alexa", "Space robot"],
        answer: "Smart car"
      },
      {
        question: "Which AI device can interact with an Android phone and set alarms?",
        options: ["Google Assistant", "Military robot", "Smart car", "Space robot"],
        answer: "Google Assistant"
      },
      {
        question: "Which AI device is used in wars and is loaded with sensors and weapons?",
        options: ["Military robot", "Smart home device", "Chatbot", "Alexa"],
        answer: "Military robot"
      },
      {
        question: "Which AI technology interprets users' words or phrases and gives instant answers?",
        options: ["Chatbot", "Smart car", "Space robot", "Military robot"],
        answer: "Chatbot"
      }
    ],

    trueOrFalse: [
      "Artificial Intelligence helps computers perform smart tasks.",
      "AI can be used in healthcare and education.",
      "A smart car cannot drive itself.",
      "Chatbots can process users' words or phrases.",
      "AI is used only in entertainment and gaming."
    ],

    answerInShort: [
      "What is Artificial Intelligence?",
      "Name two areas where AI is used.",
      "What is a smart car?",
      "What is a chatbot?",
      "How can AI help in daily life?"
    ],

    thinkAndAnswer: [
      "How can AI make our daily tasks easier?",
      "What are some useful applications of AI?",
      "Why should AI be used responsibly?",
      "How might AI change education in the future?",
      "What AI device would you find most useful and why?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 24,
    title: "Indian Nobel Laureates",

    fillInTheBlanks: [
      "Rabindranath Tagore received the Nobel Prize for ______.",
      "C. V. Raman received the Nobel Prize for ______.",
      "Mother Teresa received the Nobel Peace ______.",
      "Amartya Sen received the Nobel Prize for ______.",
      "Kailash Satyarthi received the Nobel Peace Prize for his struggle against the suppression of ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Rabindranath Tagore received the Nobel Prize in which field?",
        options: ["Literature", "Physics", "Economics", "Peace"],
        answer: "Literature"
      },
      {
        question: "C. V. Raman received the Nobel Prize for the discovery of the Raman Effect in which field?",
        options: ["Physics", "Medicine", "Peace", "Economics"],
        answer: "Physics"
      },
      {
        question: "Mother Teresa received the Nobel Prize in which category?",
        options: ["Peace", "Literature", "Physics", "Economics"],
        answer: "Peace"
      },
      {
        question: "Amartya Sen received the Nobel Prize for contributions to:",
        options: ["Economics", "Physics", "Medicine", "Literature"],
        answer: "Economics"
      },
      {
        question: "Who received the Nobel Peace Prize for the struggle against suppression of children?",
        options: [
          "Kailash Satyarthi",
          "C. V. Raman",
          "Amartya Sen",
          "Har Gobind Khorana"
        ],
        answer: "Kailash Satyarthi"
      }
    ],

    trueOrFalse: [
      "Rabindranath Tagore received the Nobel Prize for Literature.",
      "C. V. Raman received the Nobel Prize for Physics.",
      "Mother Teresa received the Nobel Peace Prize.",
      "Amartya Sen received the Nobel Prize for Economics.",
      "Kailash Satyarthi received the Nobel Prize for Physics."
    ],

    answerInShort: [
      "Who was the first Indian Nobel laureate?",
      "For what did C. V. Raman receive the Nobel Prize?",
      "For what did Mother Teresa receive the Nobel Peace Prize?",
      "For what did Amartya Sen receive the Nobel Prize?",
      "Why did Kailash Satyarthi receive the Nobel Peace Prize?"
    ],

    thinkAndAnswer: [
      "Why are Nobel laureates an inspiration?",
      "What can students learn from Indian Nobel laureates?",
      "Which Indian Nobel laureate inspires you most and why?",
      "Why is recognition in literature, science and economics important?",
      "How can young people contribute to society in meaningful ways?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 25,
    title: "Inspiring Businesswomen",

    fillInTheBlanks: [
      "The founder and CEO of Nykaa is the businesswoman featured in the first clue.",
      "Biocon India was started in 1978 with a small capital of ₹______.",
      "ShopClues was established in ______.",
      "HCL Tech and the HCL Group are headed by a prominent Indian ______.",
      "The former CEO and MD of Britannia Industries was named among Asia's 50 Power ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who founded Nykaa?",
        options: ["Falguni Nayar", "Kiran Mazumdar-Shaw", "Roshni Nadar", "Naina Lal Kidwai"],
        answer: "Falguni Nayar"
      },
      {
        question: "Who started Biocon India?",
        options: [
          "Kiran Mazumdar-Shaw",
          "Falguni Nayar",
          "Roshni Nadar",
          "Priya Paul"
        ],
        answer: "Kiran Mazumdar-Shaw"
      },
      {
        question: "Who served as CBO and co-founded ShopClues?",
        options: [
          "Radhika Ghai",
          "Falguni Nayar",
          "Kiran Mazumdar-Shaw",
          "Naina Lal Kidwai"
        ],
        answer: "Radhika Ghai"
      },
      {
        question: "Who became the chairperson of HCL Tech and the HCL Group?",
        options: [
          "Roshni Nadar",
          "Falguni Nayar",
          "Kiran Mazumdar-Shaw",
          "Naina Lal Kidwai"
        ],
        answer: "Roshni Nadar"
      },
      {
        question: "Which quality is important for a successful entrepreneur?",
        options: ["Determination", "Carelessness", "Dishonesty", "Laziness"],
        answer: "Determination"
      }
    ],

    trueOrFalse: [
      "Falguni Nayar is the founder and CEO of Nykaa.",
      "Kiran Mazumdar-Shaw started Biocon India.",
      "ShopClues was established in 2011.",
      "Roshni Nadar became chairperson of HCL Tech and the HCL Group.",
      "Successful entrepreneurs do not need determination."
    ],

    answerInShort: [
      "Who founded Nykaa?",
      "Who started Biocon India?",
      "Who co-founded ShopClues?",
      "Who is the chairperson of HCL Tech and the HCL Group mentioned in the chapter?",
      "What qualities are important for a successful entrepreneur?"
    ],

    thinkAndAnswer: [
      "What qualities do you admire in successful businesswomen?",
      "Why is determination important in business?",
      "How can women help create change through entrepreneurship?",
      "Which businesswoman from the chapter inspires you and why?",
      "Would you like to become an entrepreneur? Give a reason."
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 26,
    title: "Indian Defence",

    fillInTheBlanks: [
      "The Indian Armed Forces consist of the Army, Navy and ______ Force.",
      "The head of the Indian Navy is the ______.",
      "The head of the Indian Air Force is the Air Chief ______.",
      "The commando unit of the Indian Air Force is called ______.",
      "India's first nuclear submarine is ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which three bodies make up the Indian Armed Forces?",
        options: [
          "Army, Navy and Air Force",
          "Army, Police and Navy",
          "Navy, Police and Air Force",
          "Army, Coast Guard and Police"
        ],
        answer: "Army, Navy and Air Force"
      },
      {
        question: "Which is the largest cantonment in Asia according to the chapter?",
        options: [
          "Bathinda Cantonment",
          "Farkhor Air Base",
          "INS Arihant",
          "INS Vikramaditya"
        ],
        answer: "Bathinda Cantonment"
      },
      {
        question: "Which aircraft is the air-to-air refueller of the Indian Air Force?",
        options: [
          "Ilyushin IL-78",
          "INS Arihant",
          "Garud",
          "INS Vikramaditya"
        ],
        answer: "Ilyushin IL-78"
      },
      {
        question: "What is India's first nuclear submarine?",
        options: ["INS Arihant", "INS Vikramaditya", "Garud", "IL-78"],
        answer: "INS Arihant"
      },
      {
        question: "What is India's first and only military base outside Indian territory?",
        options: [
          "Farkhor Air Base",
          "Bathinda Cantonment",
          "INS Arihant",
          "Ladakh"
        ],
        answer: "Farkhor Air Base"
      }
    ],

    trueOrFalse: [
      "The Indian Armed Forces consist of the Army, Navy and Air Force.",
      "The Indian Armed Forces protect the country.",
      "INS Arihant is India's first nuclear submarine.",
      "Farkhor Air Base is India's military base outside Indian territory.",
      "The Indian Navy is part of the Indian Armed Forces."
    ],

    answerInShort: [
      "Name the three bodies of the Indian Armed Forces.",
      "What is the largest cantonment in Asia according to the chapter?",
      "What is Ilyushin IL-78 used for?",
      "What is India's first nuclear submarine?",
      "What is India's first military base outside Indian territory?"
    ],

    thinkAndAnswer: [
      "Why should we respect Indian soldiers?",
      "Why are the Armed Forces important for a country?",
      "What responsibilities do soldiers have?",
      "Why is national defence important?",
      "How can citizens show respect for the Armed Forces?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 27,
    title: "Constitution of India",

    fillInTheBlanks: [
      "The Constitution of India was adopted by the Constituent Assembly on 26th November ______.",
      "The Constitution came into force on 26th January ______.",
      "The head of the central government is the ______ Minister.",
      "The minimum age to vote in India is ______ years.",
      "President's Rule in a state is promulgated under Article ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who administers the Oath of Office to the President?",
        options: [
          "Chief Justice of India",
          "Vice President",
          "Prime Minister",
          "Speaker of Lok Sabha"
        ],
        answer: "Chief Justice of India"
      },
      {
        question: "Who adopted the Constitution of India?",
        options: [
          "Constituent Assembly",
          "Lok Sabha",
          "Rajya Sabha",
          "Indian Parliament"
        ],
        answer: "Constituent Assembly"
      },
      {
        question: "What is the minimum age to vote in India?",
        options: ["18 years", "19 years", "21 years", "16 years"],
        answer: "18 years"
      },
      {
        question: "Which of the following is a Fundamental Right?",
        options: [
          "Freedom of religion",
          "Equal distribution of wealth",
          "Right to property",
          "None of these"
        ],
        answer: "Freedom of religion"
      },
      {
        question: "How many types of Emergency have been visualised in the Constitution of India?",
        options: ["Three", "Two", "Four", "One"],
        answer: "Three"
      }
    ],

    trueOrFalse: [
      "The Constitution of India was adopted on 26th November 1949.",
      "The Constitution came into force on 26th January 1950.",
      "The Prime Minister is the head of the central government.",
      "The minimum voting age in India is 18 years.",
      "The Constitution of India has no Fundamental Rights."
    ],

    answerInShort: [
      "When was the Constitution of India adopted?",
      "When did the Constitution come into force?",
      "Who is the head of the central government?",
      "What is the minimum age to vote in India?",
      "How many types of Emergency are visualised in the Constitution?"
    ],

    thinkAndAnswer: [
      "Why is the Constitution important for India?",
      "Why should citizens respect and follow the Constitution?",
      "How does the Constitution help people live together peacefully?",
      "Why are Fundamental Rights important?",
      "What would happen if there were no rules governing a country?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 28,
    title: "National Organizations",

    fillInTheBlanks: [
      "DRDO stands for Defence Research and ______ Organisation.",
      "NCERT stands for National Council of Educational Research and ______.",
      "TRAI stands for Telecom Regulatory Authority of ______.",
      "FSSAI stands for Food Safety and Standards Authority of ______.",
      "SEBI stands for Securities and Exchange ______ of India."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which organisation is related to defence research?",
        options: ["DRDO", "TRAI", "FSSAI", "SEBI"],
        answer: "DRDO"
      },
      {
        question: "Which organisation is related to educational research and training?",
        options: ["NCERT", "RBI", "TRAI", "IRDAI"],
        answer: "NCERT"
      },
      {
        question: "Which organisation regulates telecommunications?",
        options: ["TRAI", "SEBI", "FSSAI", "DRDO"],
        answer: "TRAI"
      },
      {
        question: "Which organisation deals with food safety and standards?",
        options: ["FSSAI", "RBI", "NCERT", "SEBI"],
        answer: "FSSAI"
      },
      {
        question: "Which organisation is related to the securities market?",
        options: ["SEBI", "TRAI", "FSSAI", "NCERT"],
        answer: "SEBI"
      }
    ],

    trueOrFalse: [
      "DRDO is related to defence research.",
      "NCERT works in educational research and training.",
      "TRAI regulates telecommunications.",
      "FSSAI deals with food safety and standards.",
      "SEBI is related to securities and exchange."
    ],

    answerInShort: [
      "What does DRDO stand for?",
      "What does NCERT stand for?",
      "What does TRAI regulate?",
      "What does FSSAI deal with?",
      "What does SEBI stand for?"
    ],

    thinkAndAnswer: [
      "Why are national organisations important?",
      "How do organisations such as NCERT help the country?",
      "Why is food safety regulation important?",
      "Why does the country need a telecom regulator?",
      "How do national organisations support development and welfare?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 29,
    title: "Indian Government Schemes",

    fillInTheBlanks: [
      "Government programmes are also known as schemes or ______.",
      "Skill India provides skill training opportunities to the ______ of India.",
      "Swachh Bharat aims to keep the country ______.",
      "Beti Bachao Beti Padhao supports the survival, safety and education of the ______ child.",
      "Digital India aims to make government services available to citizens ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which scheme promotes local skills and Indian products?",
        options: ["Vocal for Local", "Digital India", "Swachh Bharat", "Make in India"],
        answer: "Vocal for Local"
      },
      {
        question: "Which scheme provides skill training opportunities to Indian youth?",
        options: ["Skill India", "Beti Bachao Beti Padhao", "Digital India", "Mid Day Meal Scheme"],
        answer: "Skill India"
      },
      {
        question: "Which scheme aims to keep the country clean?",
        options: ["Swachh Bharat", "Make in India", "Skill India", "Digital India"],
        answer: "Swachh Bharat"
      },
      {
        question: "Which scheme supports the survival, safety and education of the girl child?",
        options: [
          "Beti Bachao Beti Padhao",
          "Skill India",
          "Digital India",
          "Make in India"
        ],
        answer: "Beti Bachao Beti Padhao"
      },
      {
        question: "Which scheme aims to make government services available online?",
        options: ["Digital India", "Swachh Bharat", "Make in India", "Skill India"],
        answer: "Digital India"
      }
    ],

    trueOrFalse: [
      "Government schemes are introduced from time to time.",
      "Skill India provides skill training opportunities.",
      "Swachh Bharat aims to keep the country clean.",
      "Beti Bachao Beti Padhao is related to the girl child.",
      "Digital India aims to make government services available online."
    ],

    answerInShort: [
      "What are government schemes?",
      "What is the objective of Skill India?",
      "What is the objective of Swachh Bharat?",
      "What is the objective of Beti Bachao Beti Padhao?",
      "What is the objective of Digital India?"
    ],

    thinkAndAnswer: [
      "Why are government schemes important?",
      "Which government scheme can help students and why?",
      "How can citizens benefit from Digital India?",
      "Why is keeping the country clean everyone's responsibility?",
      "How can government schemes improve people's lives?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 30,
    title: "Rivers of India",

    fillInTheBlanks: [
      "The Kaveri river is also spelled as ______.",
      "The river known as Lohit in Assam is the ______.",
      "The river that shares its name with the eighth incarnation of Vishnu is ______.",
      "Haridwar is located on the banks of the ______.",
      "The river known to ancient Indians in Sanskrit as 'Sindhu' is the ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which river is also spelled as Kaveri?",
        options: ["Cauvery", "Ganga", "Yamuna", "Narmada"],
        answer: "Cauvery"
      },
      {
        question: "Which river is known as Lohit in Assam?",
        options: ["Brahmaputra", "Ganga", "Godavari", "Narmada"],
        answer: "Brahmaputra"
      },
      {
        question: "Which river shares its name with the eighth incarnation of Vishnu?",
        options: ["Krishna", "Ganga", "Yamuna", "Kaveri"],
        answer: "Krishna"
      },
      {
        question: "Haridwar is located on the banks of which river?",
        options: ["Ganga", "Yamuna", "Godavari", "Narmada"],
        answer: "Ganga"
      },
      {
        question: "Which river was known to ancient Indians in Sanskrit as 'Sindhu'?",
        options: ["Indus", "Ganga", "Yamuna", "Krishna"],
        answer: "Indus"
      }
    ],

    trueOrFalse: [
      "Rivers are an important source of water for drinking and farming.",
      "Rivers also have cultural and religious significance.",
      "Haridwar is located on the banks of the Ganga.",
      "The Indus was known as 'Sindhu' in Sanskrit.",
      "Rivers do not support plant and animal life."
    ],

    answerInShort: [
      "Why are rivers important?",
      "Which river is known as Lohit in Assam?",
      "Which river flows through Haridwar?",
      "What was the Indus River called in Sanskrit?",
      "Why are rivers culturally important?"
    ],

    thinkAndAnswer: [
      "Why should we keep rivers clean?",
      "How do rivers help farmers?",
      "Why have many cities developed near rivers?",
      "What would happen if important rivers dried up?",
      "How can students help protect rivers?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 31,
    title: "National Emblems",

    fillInTheBlanks: [
      "National emblems are official symbols that represent the authority and ______ of a country.",
      "The emblem of Australia is represented by a kangaroo and an ______.",
      "The Ashoka Lion Capital is a national symbol of ______.",
      "The emblem with a crescent and star belongs to ______.",
      "The eagle emblem shown in the chapter belongs to the ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What do national emblems represent?",
        options: [
          "Authority and identity",
          "Weather and climate",
          "Sports and games",
          "Food and clothing"
        ],
        answer: "Authority and identity"
      },
      {
        question: "Which country has the Ashoka Lion Capital as its national emblem?",
        options: ["India", "China", "Japan", "France"],
        answer: "India"
      },
      {
        question: "Which country is represented by the eagle emblem shown in the chapter?",
        options: ["USA", "India", "Germany", "Japan"],
        answer: "USA"
      },
      {
        question: "Which country has the maple-leaf-inspired emblem shown in the chapter?",
        options: ["Canada", "Brazil", "Pakistan", "China"],
        answer: "Canada"
      },
      {
        question: "Which country is represented by the emblem with a crescent and star?",
        options: ["Pakistan", "France", "Germany", "Australia"],
        answer: "Pakistan"
      }
    ],

    trueOrFalse: [
      "National emblems are official symbols of countries.",
      "National emblems can reflect a nation's values and history.",
      "The Ashoka Lion Capital is a national symbol of India.",
      "National emblems have no connection with a country's identity.",
      "Countries can have different national emblems."
    ],

    answerInShort: [
      "What are national emblems?",
      "What do national emblems represent?",
      "Which is India's national emblem?",
      "Name one country whose emblem is shown in the chapter.",
      "Why are national emblems important?"
    ],

    thinkAndAnswer: [
      "Why do countries use national emblems?",
      "How can an emblem reflect a country's history?",
      "Which national emblem do you find most interesting and why?",
      "Why should we respect national symbols?",
      "How are national symbols connected with national identity?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 32,
    title: "Official Residences",

    fillInTheBlanks: [
      "Official residences are homes where national leaders live and ______.",
      "Rashtrapati Bhavan is the official residence of the President of ______.",
      "10 Downing Street is the official residence of the Prime Minister of the ______.",
      "The White House is the official residence of the President of the ______.",
      "Buckingham Palace is the official residence of the Royal Family of the ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which is the official residence of the President of India?",
        options: ["Rashtrapati Bhavan", "White House", "10 Downing Street", "Buckingham Palace"],
        answer: "Rashtrapati Bhavan"
      },
      {
        question: "Which is the official residence of the Prime Minister of the UK?",
        options: ["10 Downing Street", "White House", "Vatican", "Elysee Palace"],
        answer: "10 Downing Street"
      },
      {
        question: "Which is the official residence of the President of France?",
        options: ["Elysee Palace", "White House", "Buckingham Palace", "Vatican"],
        answer: "Elysee Palace"
      },
      {
        question: "Which is the official residence of the President of the USA?",
        options: ["White House", "Rashtrapati Bhavan", "Vatican", "Buckingham Palace"],
        answer: "White House"
      },
      {
        question: "Which is the official residence of the Pope?",
        options: ["Vatican", "Buckingham Palace", "Elysee Palace", "White House"],
        answer: "Vatican"
      }
    ],

    trueOrFalse: [
      "Official residences are important buildings connected with national leaders.",
      "Rashtrapati Bhavan is the official residence of the President of India.",
      "10 Downing Street is the official residence of the Prime Minister of the UK.",
      "The White House is the official residence of the President of the USA.",
      "Buckingham Palace is the official residence of the Pope."
    ],

    answerInShort: [
      "What are official residences?",
      "What is Rashtrapati Bhavan?",
      "What is 10 Downing Street?",
      "What is the White House?",
      "What is Buckingham Palace?"
    ],

    thinkAndAnswer: [
      "Why are official residences important?",
      "Why do national leaders need official residences?",
      "Which official residence would you like to visit and why?",
      "How can official buildings represent a country's history?",
      "Why should famous official buildings be preserved?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 33,
    title: "Famous Airports",

    fillInTheBlanks: [
      "Airports are places where aeroplanes take off and ______.",
      "Beijing Capital International Airport is located in ______.",
      "Changi International Airport is located in ______ City.",
      "Indira Gandhi International Airport is located in New ______.",
      "King Fahd International Airport is located in ______, Saudi Arabia."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Where is Beijing Capital International Airport located?",
        options: ["Beijing, China", "Seoul, South Korea", "Paris, France", "Cairo, Egypt"],
        answer: "Beijing, China"
      },
      {
        question: "Where is Incheon International Airport located?",
        options: ["Seoul, South Korea", "Madrid, Spain", "New Delhi, India", "Denver, USA"],
        answer: "Seoul, South Korea"
      },
      {
        question: "Where is Changi International Airport located?",
        options: ["Singapore City, Singapore", "Cairo, Egypt", "Paris, France", "Dammam, Saudi Arabia"],
        answer: "Singapore City, Singapore"
      },
      {
        question: "Where is Indira Gandhi International Airport located?",
        options: ["New Delhi, India", "Beijing, China", "Madrid, Spain", "New York City, USA"],
        answer: "New Delhi, India"
      },
      {
        question: "Where is King Fahd International Airport located?",
        options: ["Dammam, Saudi Arabia", "Denver, USA", "Paris, France", "Cairo, Egypt"],
        answer: "Dammam, Saudi Arabia"
      }
    ],

    trueOrFalse: [
      "Airports are places where aeroplanes take off and land.",
      "Changi International Airport is in Singapore.",
      "Indira Gandhi International Airport is in New Delhi.",
      "King Fahd International Airport is in Saudi Arabia.",
      "Beijing Capital International Airport is in France."
    ],

    answerInShort: [
      "What is an airport?",
      "Where is Changi International Airport located?",
      "Where is Indira Gandhi International Airport located?",
      "Where is King Fahd International Airport located?",
      "Why are airports important for travel?"
    ],

    thinkAndAnswer: [
      "Why are airports important for connecting countries?",
      "How do airports make international travel easier?",
      "Which airport from the chapter would you like to visit?",
      "Why do large cities need major airports?",
      "How can airports support trade and tourism?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 34,
    title: "Rivers of the World",

    fillInTheBlanks: [
      "Paris is located on the banks of the ______ River.",
      "Washington D.C. is located on the banks of the ______ River.",
      "London is located on the banks of the ______ River.",
      "New York is located on the banks of the ______ River.",
      "Cairo is located on the banks of the ______ River."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which river flows through Paris?",
        options: ["Seine", "Thames", "Hudson", "Nile"],
        answer: "Seine"
      },
      {
        question: "Which river flows through Washington D.C.?",
        options: ["Potomac", "Ottawa", "Hudson", "Thames"],
        answer: "Potomac"
      },
      {
        question: "Which river flows through London?",
        options: ["Thames", "Seine", "Nile", "Tiber"],
        answer: "Thames"
      },
      {
        question: "Which river flows through New York?",
        options: ["Hudson", "Vistula", "Tiber", "Nile"],
        answer: "Hudson"
      },
      {
        question: "Which river flows through Rome?",
        options: ["Tiber", "Nile", "Gomti", "Hudson"],
        answer: "Tiber"
      }
    ],

    trueOrFalse: [
      "Paris is situated on the Seine River.",
      "London is situated on the Thames River.",
      "New York is situated on the Hudson River.",
      "Cairo is situated on the Nile River.",
      "Rome is situated on the Tiber River."
    ],

    answerInShort: [
      "Which river flows through Paris?",
      "Which river flows through London?",
      "Which river flows through New York?",
      "Which river flows through Cairo?",
      "Which river flows through Rome?"
    ],

    thinkAndAnswer: [
      "Why are many cities located near rivers?",
      "How do rivers help cities?",
      "Why are rivers important for transport?",
      "How can rivers contribute to the beauty of cities?",
      "Why should cities protect their rivers?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 35,
    title: "World Superlatives",

    fillInTheBlanks: [
      "The biggest national park mentioned in the chapter is in ______.",
      "The biggest museum mentioned is the ______ Museum.",
      "The biggest hydroelectric project mentioned is the ______ Gorges Dam.",
      "The highest mountain peak mentioned is Mount ______.",
      "The tallest building mentioned is the Burj ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which is the biggest museum mentioned in the chapter?",
        options: ["Louvre Museum", "Vatican Museum", "British Museum", "National Museum"],
        answer: "Louvre Museum"
      },
      {
        question: "Which is the biggest hydroelectric project mentioned?",
        options: ["Three Gorges Dam", "Bhakra Dam", "Hoover Dam", "Sardar Sarovar Dam"],
        answer: "Three Gorges Dam"
      },
      {
        question: "Which is the highest mountain peak mentioned?",
        options: ["Mount Everest", "K2", "Mount Elbrus", "Kangchenjunga"],
        answer: "Mount Everest"
      },
      {
        question: "Which is the tallest building mentioned?",
        options: ["Burj Khalifa", "Eiffel Tower", "Empire State Building", "Shanghai Tower"],
        answer: "Burj Khalifa"
      },
      {
        question: "Which is the longest railway line mentioned?",
        options: [
          "Trans-Siberian Railway Line",
          "Orient Express",
          "Indian Pacific",
          "Blue Train"
        ],
        answer: "Trans-Siberian Railway Line"
      }
    ],

    trueOrFalse: [
      "World superlatives describe extreme features such as the highest, longest or largest.",
      "The Louvre Museum is mentioned as the biggest museum.",
      "Mount Everest is mentioned as the highest mountain peak.",
      "Burj Khalifa is mentioned as the tallest building.",
      "The Trans-Siberian Railway Line is mentioned among the longest railway lines."
    ],

    answerInShort: [
      "What are world superlatives?",
      "Which museum is mentioned as the biggest?",
      "Which hydroelectric project is mentioned as the biggest?",
      "Which mountain peak is mentioned as the highest?",
      "Which building is mentioned as the tallest?"
    ],

    thinkAndAnswer: [
      "Why are world superlatives interesting to learn?",
      "Which world superlative would you most like to see?",
      "Why do people compare the world's largest and highest features?",
      "How can learning about world wonders increase our knowledge?",
      "Which superlative from the chapter surprised you most?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 36,
    title: "Seven Natural Wonders",

    fillInTheBlanks: [
      "Mount Everest is the highest ______ in the world.",
      "Mount Everest is also called ______.",
      "The Grand Canyon is one of the biggest ______ in the world.",
      "Victoria Falls is locally known as Mosi-oa-Tunya, meaning The Smoke that ______.",
      "The Great Barrier Reef is located off the coast of ______, Australia."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is the highest mountain in the world?",
        options: ["Mount Everest", "The Grand Canyon", "Paricutin", "Victoria Falls"],
        answer: "Mount Everest"
      },
      {
        question: "What does Chomolungma mean?",
        options: [
          "Goddess Mother of the World",
          "Smoke that Thunders",
          "Northern Lights",
          "Great Mountain"
        ],
        answer: "Goddess Mother of the World"
      },
      {
        question: "Where is Paricutin located?",
        options: ["Mexico", "India", "Australia", "Zambia"],
        answer: "Mexico"
      },
      {
        question: "Victoria Falls is located on the border of which two countries?",
        options: [
          "Zambia and Zimbabwe",
          "India and Nepal",
          "USA and Canada",
          "Brazil and Argentina"
        ],
        answer: "Zambia and Zimbabwe"
      },
      {
        question: "What is the Great Barrier Reef?",
        options: [
          "The largest coral reef on Earth",
          "The highest mountain",
          "The largest canyon",
          "A volcano"
        ],
        answer: "The largest coral reef on Earth"
      }
    ],

    trueOrFalse: [
      "Mount Everest is the highest mountain in the world.",
      "The Grand Canyon is one of the biggest canyons in the world.",
      "Paricutin is a cinder cone volcano.",
      "Victoria Falls is located on the Zambezi River.",
      "The Northern Lights are also known as Aurora Borealis."
    ],

    answerInShort: [
      "What is Mount Everest also called?",
      "What is the Grand Canyon known for?",
      "Where is Paricutin located?",
      "What is Victoria Falls locally known as?",
      "What is the Great Barrier Reef?"
    ],

    thinkAndAnswer: [
      "Why are natural wonders important?",
      "Which natural wonder would you like to visit and why?",
      "How do natural wonders show the beauty and power of Earth?",
      "Why should natural wonders be protected?",
      "What can we learn by studying natural wonders?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 37,
    title: "Stadiums in India",

    fillInTheBlanks: [
      "Green Park is a stadium located in ______.",
      "VCA Stadium is located in ______.",
      "Lal Bahadur Shastri Stadium is located in ______.",
      "Eden Gardens Stadium is located in ______.",
      "Wankhede Stadium is located in ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Where is Green Park Stadium located?",
        options: ["Kanpur", "Mumbai", "Kolkata", "Delhi"],
        answer: "Kanpur"
      },
      {
        question: "Where is VCA Stadium located?",
        options: ["Nagpur", "Mumbai", "Hyderabad", "Kolkata"],
        answer: "Nagpur"
      },
      {
        question: "Where is Lal Bahadur Shastri Stadium located?",
        options: ["Hyderabad", "Kanpur", "Mumbai", "Bengaluru"],
        answer: "Hyderabad"
      },
      {
        question: "Where is Eden Gardens Stadium located?",
        options: ["Kolkata", "Delhi", "Nagpur", "Mumbai"],
        answer: "Kolkata"
      },
      {
        question: "Where is Wankhede Stadium located?",
        options: ["Mumbai", "Kolkata", "Bengaluru", "Kanpur"],
        answer: "Mumbai"
      }
    ],

    trueOrFalse: [
      "Green Park Stadium is in Kanpur.",
      "VCA Stadium is in Nagpur.",
      "Eden Gardens Stadium is in Kolkata.",
      "Wankhede Stadium is in Mumbai.",
      "Chinnaswamy Stadium is in Bengaluru."
    ],

    answerInShort: [
      "Where is Green Park Stadium located?",
      "Where is VCA Stadium located?",
      "Where is Eden Gardens Stadium located?",
      "Where is Wankhede Stadium located?",
      "Where is Chinnaswamy Stadium located?"
    ],

    thinkAndAnswer: [
      "Why are stadiums important for sports?",
      "Which Indian stadium would you like to visit?",
      "Why do large cities have major sports stadiums?",
      "How do stadiums promote sports?",
      "Why is it important to maintain sports stadiums?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 38,
    title: "Trophies and Cups",

    fillInTheBlanks: [
      "The Davis Cup is associated with ______ tennis.",
      "The Walker Cup is associated with ______.",
      "The ICC World Cup is associated with ______.",
      "The Sultan Azlan Shah Cup is associated with field ______.",
      "The FIFA World Cup is associated with ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "The Davis Cup is associated with which sport?",
        options: ["Lawn Tennis", "Table Tennis", "Golf", "Cricket"],
        answer: "Lawn Tennis"
      },
      {
        question: "The Walker Cup is associated with which sport?",
        options: ["Golf", "Polo", "Cricket", "Football"],
        answer: "Golf"
      },
      {
        question: "The ICC World Cup is associated with which sport?",
        options: ["Cricket", "Hockey", "Football", "Badminton"],
        answer: "Cricket"
      },
      {
        question: "The Sultan Azlan Shah Cup is associated with which sport?",
        options: ["Field Hockey", "Cricket", "Football", "Badminton"],
        answer: "Field Hockey"
      },
      {
        question: "The FIFA World Cup is associated with which sport?",
        options: ["Football", "Badminton", "Cricket", "Hockey"],
        answer: "Football"
      }
    ],

    trueOrFalse: [
      "The Davis Cup is associated with lawn tennis.",
      "The Walker Cup is associated with golf.",
      "The ICC World Cup is associated with cricket.",
      "The FIFA World Cup is associated with football.",
      "The Uber Cup is associated with women's badminton."
    ],

    answerInShort: [
      "Which sport is associated with the Davis Cup?",
      "Which sport is associated with the Walker Cup?",
      "Which sport is associated with the ICC World Cup?",
      "Which sport is associated with the Sultan Azlan Shah Cup?",
      "Which sport is associated with the Uber Cup?"
    ],

    thinkAndAnswer: [
      "Why are trophies important in sports?",
      "Which sports trophy would you most like to see?",
      "Why are international cups important for athletes?",
      "How do trophies motivate players?",
      "Why should sportspeople respect their trophies and championships?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 39,
    title: "Indian Sportswomen",

    fillInTheBlanks: [
      "P. V. Sindhu is a famous Indian ______ player.",
      "Mary Kom is a legendary Indian ______.",
      "Mithali Raj is a famous Indian women's ______ player.",
      "Hima Das is known as the ______ Express of India.",
      "Dipa Karmakar is a famous Indian ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who is the famous Indian badminton player mentioned in the chapter?",
        options: ["P. V. Sindhu", "Mary Kom", "Hima Das", "Mithali Raj"],
        answer: "P. V. Sindhu"
      },
      {
        question: "Who is the legendary Indian boxer and multiple-time world champion?",
        options: ["Mary Kom", "P. V. Sindhu", "Dipa Karmakar", "Rani Rampal"],
        answer: "Mary Kom"
      },
      {
        question: "Who is the former captain of the Indian women's cricket team?",
        options: ["Mithali Raj", "Hima Das", "Lovlina Borgohain", "Rani Rampal"],
        answer: "Mithali Raj"
      },
      {
        question: "Who is known as the 'Dhing Express' of India?",
        options: ["Hima Das", "Dipa Karmakar", "Mary Kom", "P. V. Sindhu"],
        answer: "Hima Das"
      },
      {
        question: "Who is famous for performing the Produnova vault?",
        options: ["Dipa Karmakar", "Mary Kom", "Hima Das", "Rani Rampal"],
        answer: "Dipa Karmakar"
      }
    ],

    trueOrFalse: [
      "P. V. Sindhu is a badminton player.",
      "Mary Kom is a boxer.",
      "Mithali Raj is associated with cricket.",
      "Hima Das is known as the Dhing Express of India.",
      "Dipa Karmakar is a gymnast."
    ],

    answerInShort: [
      "Who is P. V. Sindhu?",
      "Who is Mary Kom?",
      "Who is Mithali Raj?",
      "Why is Hima Das called the Dhing Express?",
      "What is Dipa Karmakar famous for?"
    ],

    thinkAndAnswer: [
      "Why are Indian sportswomen inspiring?",
      "Which sportswoman from the chapter inspires you most and why?",
      "What qualities help athletes achieve excellence?",
      "Why is perseverance important in sports?",
      "How can young girls be encouraged to participate in sports?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 40,
    title: "Adventure Sports",

    fillInTheBlanks: [
      "The water-based activity using a board-like structure powered by water is called ______.",
      "The water sport that involves breathing air from a tank underwater is ______.",
      "Jumping out of an aeroplane and falling freely before opening a parachute is called ______.",
      "Flying on a wire across landscapes is called ______.",
      "Rolling downhill inside a transparent ball is called ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which adventure sport uses a board-like structure powered by water?",
        options: ["Flyboarding", "Scuba diving", "Skydiving", "Zip-lining"],
        answer: "Flyboarding"
      },
      {
        question: "Which sport involves breathing air from a tank while underwater?",
        options: ["Scuba diving", "Flyboarding", "Skydiving", "Zorbing"],
        answer: "Scuba diving"
      },
      {
        question: "Which sport involves jumping from an aeroplane and opening a parachute?",
        options: ["Skydiving", "Zip-lining", "Zorbing", "Scuba diving"],
        answer: "Skydiving"
      },
      {
        question: "Which adventure activity involves travelling along a wire?",
        options: ["Zip-lining", "Skydiving", "Flyboarding", "Zorbing"],
        answer: "Zip-lining"
      },
      {
        question: "Which sport involves rolling downhill inside a transparent ball?",
        options: ["Zorbing", "Scuba diving", "Skydiving", "Flyboarding"],
        answer: "Zorbing"
      }
    ],

    trueOrFalse: [
      "Adventure sports can be fun and exciting.",
      "Scuba diving involves breathing air from a tank underwater.",
      "Skydiving involves jumping from an aeroplane.",
      "Zip-lining involves travelling along a wire.",
      "Zorbing involves rolling inside a transparent ball."
    ],

    answerInShort: [
      "What is flyboarding?",
      "What is scuba diving?",
      "What is skydiving?",
      "What is zip-lining?",
      "What is zorbing?"
    ],

    thinkAndAnswer: [
      "Which adventure sport would you like to try and why?",
      "Why is safety important in adventure sports?",
      "What equipment might be needed for adventure sports?",
      "Why should adventure sports be performed under proper guidance?",
      "How can adventure sports help develop courage and confidence?"
    ]
  },
  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 41,
    title: "Paintings",

    fillInTheBlanks: [
      "A painting is the process of putting colour or paint onto a ______ surface.",
      "A painting showing a person is called a ______.",
      "A painting showing natural scenery is called a ______.",
      "A painting showing traditional community life and culture is called ______ painting.",
      "A painting created using a computer or digital technology is called ______ painting."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which style of painting shows a person?",
        options: ["Portrait", "Landscape", "Folk", "Virtual"],
        answer: "Portrait"
      },
      {
        question: "Which style of painting shows natural scenery?",
        options: ["Landscape", "Portrait", "Cartoon", "Mural"],
        answer: "Landscape"
      },
      {
        question: "Which type of painting is associated with traditional community art?",
        options: ["Folk", "Virtual", "Portrait", "Cartoon"],
        answer: "Folk"
      },
      {
        question: "Which type of painting is created using digital technology?",
        options: ["Virtual", "Folk", "Landscape", "Mural"],
        answer: "Virtual"
      },
      {
        question: "Who invented spray paint according to the chapter?",
        options: [
          "Francis Davis Millet",
          "Leonardo da Vinci",
          "Pablo Picasso",
          "Vincent van Gogh"
        ],
        answer: "Francis Davis Millet"
      }
    ],

    trueOrFalse: [
      "A painting can be both the process of applying paint and the finished artwork.",
      "A portrait usually represents a person.",
      "A landscape painting can show mountains, rivers and forests.",
      "Folk paintings can represent traditional culture.",
      "Francis Davis Millet invented spray paint."
    ],

    answerInShort: [
      "What is a painting?",
      "What is a portrait?",
      "What is a landscape painting?",
      "What is folk painting?",
      "Who invented spray paint according to the chapter?"
    ],

    thinkAndAnswer: [
      "Why do people create paintings?",
      "Which type of painting do you like most and why?",
      "How can paintings show the culture of a place?",
      "How has technology changed the way people create paintings?",
      "Why is painting considered a form of art?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 42,
    title: "Famous Dancers",

    fillInTheBlanks: [
      "Dance is a unique form of expression that uses movement to convey emotions, stories and ______.",
      "Prabhu Deva is a famous Indian ______.",
      "Birju Maharaj was a famous Indian ______ dancer.",
      "Sudha Chandran became an established ______ dancer after losing a leg.",
      "Shakira is a famous ______ dancer and singer."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who is a famous Indian dancer known for Bharatanatyam?",
        options: ["Sudha Chandran", "Shakira", "Madonna", "Martha Graham"],
        answer: "Sudha Chandran"
      },
      {
        question: "Who is famous for Bharatanatyam and also acted in films?",
        options: ["Prabhu Deva", "Michael Jackson", "Birju Maharaj", "Shakira"],
        answer: "Prabhu Deva"
      },
      {
        question: "Who was a famous Kathak dancer?",
        options: ["Birju Maharaj", "Michael Jackson", "Madonna", "Shakira"],
        answer: "Birju Maharaj"
      },
      {
        question: "Who is a famous American dancer and choreographer?",
        options: ["Martha Graham", "Sudha Chandran", "Son al Mansingh", "Prabhu Deva"],
        answer: "Martha Graham"
      },
      {
        question: "Who is a famous pop singer and dancer?",
        options: ["Michael Jackson", "Birju Maharaj", "Prabhu Deva", "Martha Graham"],
        answer: "Michael Jackson"
      }
    ],

    trueOrFalse: [
      "Dance can be used to convey emotions, stories and ideas.",
      "Sudha Chandran became an established Bharatanatyam dancer after losing a leg.",
      "Birju Maharaj was a famous Kathak dancer.",
      "Michael Jackson was known only as a painter.",
      "Shakira is known for both singing and dancing."
    ],

    answerInShort: [
      "What does dance convey?",
      "Who was Birju Maharaj?",
      "Who is Prabhu Deva?",
      "Who is Sudha Chandran?",
      "Who is Martha Graham?"
    ],

    thinkAndAnswer: [
      "Why is dance called a form of expression?",
      "What qualities are needed to become a good dancer?",
      "Why is Sudha Chandran an inspiration?",
      "Which dancer from the chapter inspires you most and why?",
      "How can dance help preserve culture?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 43,
    title: "Robotics",

    fillInTheBlanks: [
      "WALL-E is a small robot that cleans up a polluted ______.",
      "Transformers are robots that can change into ______.",
      "Baymax is a caring robot in the movie ______.",
      "Real Steel features robots fighting in ______ matches.",
      "RoboCop is a police officer who turns into a powerful ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which movie features a small robot named WALL-E?",
        options: ["WALL-E", "Robots", "RoboCop", "Chappie"],
        answer: "WALL-E"
      },
      {
        question: "Which movie features robots that can change into vehicles?",
        options: ["Transformers", "Baymax", "Real Steel", "Astro Boy"],
        answer: "Transformers"
      },
      {
        question: "Which movie features the caring robot Baymax?",
        options: ["Big Hero 6", "WALL-E", "Chappie", "RoboCop"],
        answer: "Big Hero 6"
      },
      {
        question: "Which movie features robots fighting in boxing matches?",
        options: ["Real Steel", "Transformers", "Robots", "Astro Boy"],
        answer: "Real Steel"
      },
      {
        question: "Which movie is about a police officer who turns into a powerful robot?",
        options: ["RoboCop", "WALL-E", "Chappie", "M3GAN"],
        answer: "RoboCop"
      }
    ],

    trueOrFalse: [
      "WALL-E is a robot that cleans up a polluted Earth.",
      "Transformers can change into vehicles.",
      "Baymax is a character in Big Hero 6.",
      "Real Steel features robots fighting in boxing matches.",
      "RoboCop is a robot chef."
    ],

    answerInShort: [
      "Who is WALL-E?",
      "What can the robots in Transformers do?",
      "Who is Baymax?",
      "What happens in Real Steel?",
      "Who is RoboCop?"
    ],

    thinkAndAnswer: [
      "How can robots help humans?",
      "What are some useful things robots can do?",
      "Would you like to have a robot at home? Why?",
      "What problems could intelligent robots solve?",
      "Why should humans use robots responsibly?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 44,
    title: "Great Indian Musicians",

    fillInTheBlanks: [
      "Pandit Hari Prasad Chaurasia is famous for playing the ______.",
      "Pandit Shiv Kumar Sharma was famous for playing the ______.",
      "Dr L. Subramaniam is famous for playing the ______.",
      "Zakir Hussain is famous for playing the ______.",
      "Ustad Bismillah Khan was famous for playing the ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which instrument does Pandit Hari Prasad Chaurasia play?",
        options: ["Flute", "Tabla", "Sitar", "Shehnai"],
        answer: "Flute"
      },
      {
        question: "Which instrument did Pandit Shiv Kumar Sharma play?",
        options: ["Santoor", "Violin", "Sarod", "Mandolin"],
        answer: "Santoor"
      },
      {
        question: "Which instrument is Dr L. Subramaniam known for?",
        options: ["Violin", "Flute", "Tabla", "Sitar"],
        answer: "Violin"
      },
      {
        question: "Which instrument is Zakir Hussain famous for playing?",
        options: ["Tabla", "Santoor", "Sarod", "Shehnai"],
        answer: "Tabla"
      },
      {
        question: "Which instrument did Ustad Bismillah Khan play?",
        options: ["Shehnai", "Sitar", "Flute", "Mandolin"],
        answer: "Shehnai"
      }
    ],

    trueOrFalse: [
      "Pandit Hari Prasad Chaurasia plays the flute.",
      "Pandit Shiv Kumar Sharma played the santoor.",
      "Dr L. Subramaniam is associated with the violin.",
      "Zakir Hussain is a famous tabla player.",
      "Ustad Bismillah Khan played the shehnai."
    ],

    answerInShort: [
      "Which instrument does Hari Prasad Chaurasia play?",
      "Which instrument did Shiv Kumar Sharma play?",
      "Which instrument does L. Subramaniam play?",
      "Which instrument is Zakir Hussain famous for?",
      "Which instrument did Bismillah Khan play?"
    ],

    thinkAndAnswer: [
      "Why are musicians important for preserving culture?",
      "Which Indian musician from the chapter inspires you and why?",
      "Why should traditional Indian instruments be preserved?",
      "How does music enrich India's culture?",
      "Would you like to learn an Indian musical instrument? Why?"
    ]
  },

  {
    classNumber: 5,
    subject: "General Knowledge",
    chapter: 45,
    title: "Word Ladder",

    fillInTheBlanks: [
      "A drink full of calcium is ______.",
      "Workers work in a ______.",
      "A dying person writes a ______.",
      "In the morning, we ______ in the park.",
      "To send a letter is to ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which word means a drink full of calcium?",
        options: ["Milk", "Mail", "Walk", "Tall"],
        answer: "Milk"
      },
      {
        question: "Where do workers work?",
        options: ["Factory", "Park", "Boat", "Room"],
        answer: "Factory"
      },
      {
        question: "What does a dying person write?",
        options: ["Will", "Mail", "Tail", "Walk"],
        answer: "Will"
      },
      {
        question: "What do we do in the park in the morning?",
        options: ["Walk", "Sail", "Talk", "Mail"],
        answer: "Walk"
      },
      {
        question: "What does it mean to send a letter?",
        options: ["Mail", "Sail", "Tail", "Talk"],
        answer: "Mail"
      }
    ],

    trueOrFalse: [
      "Milk is a drink full of calcium.",
      "Workers work in a factory.",
      "A dying person writes a will.",
      "We can walk in a park in the morning.",
      "To send a letter is to mail it."
    ],

    answerInShort: [
      "What is a drink full of calcium?",
      "Where do workers work?",
      "What does a dying person write?",
      "What do we do in a park in the morning?",
      "What does it mean to mail a letter?"
    ],

    thinkAndAnswer: [
      "How does changing one letter create a new word?",
      "Why is a word ladder useful for learning vocabulary?",
      "Can you think of another group of words where changing one letter creates new words?",
      "How can word games improve spelling?",
      "Why is vocabulary important for communication?"
    ]
  },
  {
    chapter: 46,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Simile Puzzle",

    fillInTheBlanks: [
      "Explode like a ______.",
      "Waddle means to walk like a ______.",
      "As ______ as an ox.",
      "As ______ as an eel.",
      "Swim like a ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Which word is commonly used to form a simile?",
        options: ["Like", "Because", "And", "But"],
        answer: "Like"
      },
      {
        question: "What does 'waddle' mean?",
        options: [
          "To walk like a duck",
          "To fly like an eagle",
          "To swim like a fish",
          "To run like a horse"
        ],
        answer: "To walk like a duck"
      },
      {
        question: "Which animal is used in the simile 'as strong as an ____'?",
        options: ["Ox", "Eel", "Mouse", "Eagle"],
        answer: "Ox"
      },
      {
        question: "Which phrase completes 'swim like a ____'?",
        options: ["Fish", "Mouse", "Daisy", "Arrow"],
        answer: "Fish"
      },
      {
        question: "Which phrase means very fast?",
        options: [
          "As quick as lightning",
          "As fresh as a daisy",
          "As quiet as a mouse",
          "As cool as a cucumber"
        ],
        answer: "As quick as lightning"
      }
    ],

    trueOrFalse: [
      "A simile compares one thing with another.",
      "Similes can use the word 'like'.",
      "The phrase 'swim like a fish' is a simile.",
      "'As strong as an ox' is a simile.",
      "A simile never uses the word 'as'."
    ],

    answerInShort: [
      "What is a simile?",
      "Which animal is used in 'as strong as an ox'?",
      "Complete: swim like a ______.",
      "Complete: cry like a ______.",
      "What does 'as quiet as a mouse' suggest?"
    ],

    thinkAndAnswer: [
      "Why do writers use similes?",
      "Write a simile to describe something very fast.",
      "Write a simile to describe someone very quiet.",
      "Write a simile using the word 'like'.",
      "Create two similes of your own."
    ]
  },

  {
    chapter: 47,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Phobias",

    fillInTheBlanks: [
      "Aquaphobia is the fear of ______.",
      "Acrophobia is the fear of ______.",
      "Nyctophobia is the fear of ______.",
      "Arachnophobia is the fear of ______.",
      "Cynophobia is the fear of ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What is aquaphobia?",
        options: [
          "Fear of water",
          "Fear of spiders",
          "Fear of heights",
          "Fear of dogs"
        ],
        answer: "Fear of water"
      },
      {
        question: "What is acrophobia?",
        options: [
          "Fear of heights",
          "Fear of darkness",
          "Fear of water",
          "Fear of snakes"
        ],
        answer: "Fear of heights"
      },
      {
        question: "What is arachnophobia?",
        options: [
          "Fear of spiders",
          "Fear of dogs",
          "Fear of flying",
          "Fear of closed spaces"
        ],
        answer: "Fear of spiders"
      },
      {
        question: "What is cynophobia?",
        options: [
          "Fear of dogs",
          "Fear of snakes",
          "Fear of water",
          "Fear of darkness"
        ],
        answer: "Fear of dogs"
      },
      {
        question: "What is claustrophobia?",
        options: [
          "Fear of closed spaces",
          "Fear of heights",
          "Fear of spiders",
          "Fear of flying"
        ],
        answer: "Fear of closed spaces"
      }
    ],

    trueOrFalse: [
      "Aquaphobia means fear of water.",
      "Acrophobia means fear of heights.",
      "Arachnophobia means fear of spiders.",
      "Cynophobia means fear of dogs.",
      "Claustrophobia means fear of flying."
    ],

    answerInShort: [
      "What is a phobia?",
      "What is aquaphobia?",
      "What is acrophobia?",
      "What is arachnophobia?",
      "What is nyctophobia?"
    ],

    thinkAndAnswer: [
      "Why can phobias affect a person's daily life?",
      "Why is it important to understand different fears?",
      "How can support help a person with a phobia?",
      "Why should people not make fun of someone's fear?",
      "What can people do when a fear becomes difficult to manage?"
    ]
  },

  {
    chapter: 48,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Pen Names",

    fillInTheBlanks: [
      "Alice in Wonderland was written by Charles Lutwidge Dodgson, whose pen name was ______.",
      "A Christmas Carol was written by Charles Dickens.",
      "The pen name of William Sydney Porter was ______.",
      "The pen name of Hector Hugh Munro was ______.",
      "The pen name of Dhanpat Rai was ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What was the pen name of Charles Lutwidge Dodgson?",
        options: ["Lewis Carroll", "O. Henry", "Saki", "Premchand"],
        answer: "Lewis Carroll"
      },
      {
        question: "What was the pen name of William Sydney Porter?",
        options: ["O. Henry", "Boz", "Saki", "Premchand"],
        answer: "O. Henry"
      },
      {
        question: "What was the pen name of Hector Hugh Munro?",
        options: ["Saki", "Boz", "Lewis Carroll", "O. Henry"],
        answer: "Saki"
      },
      {
        question: "What was the pen name of Dhanpat Rai?",
        options: ["Premchand", "Boz", "Saki", "O. Henry"],
        answer: "Premchand"
      },
      {
        question: "Who wrote A Christmas Carol?",
        options: [
          "Charles Dickens",
          "Agatha Christie",
          "Dhanpat Rai",
          "William Sydney Porter"
        ],
        answer: "Charles Dickens"
      }
    ],

    trueOrFalse: [
      "Pen names are fake names used by writers.",
      "Charles Lutwidge Dodgson used the pen name Lewis Carroll.",
      "William Sydney Porter used the pen name O. Henry.",
      "Hector Hugh Munro used the pen name Saki.",
      "Dhanpat Rai used the pen name O. Henry."
    ],

    answerInShort: [
      "What is a pen name?",
      "What was Lewis Carroll's real name?",
      "What was O. Henry's real name?",
      "What was Saki's real name?",
      "What was Premchand's real name?"
    ],

    thinkAndAnswer: [
      "Why might a writer use a pen name?",
      "Why can a pen name help keep an author's identity private?",
      "Why do some writers choose special names?",
      "Would you like to have a pen name? Why?",
      "Create a pen name for yourself."
    ]
  },

  {
    chapter: 49,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Favourite Reads",

    fillInTheBlanks: [
      "Charlie and the Chocolate Factory was written by ______.",
      "The Wonderful Wizard of Oz was written by ______.",
      "Harry Potter was written by ______.",
      "The Chronicles of Narnia was written by ______.",
      "The Lord of the Rings was written by ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who wrote Charlie and the Chocolate Factory?",
        options: ["Roald Dahl", "J.K. Rowling", "L. Frank Baum", "JRR Tolkien"],
        answer: "Roald Dahl"
      },
      {
        question: "Who wrote The Wonderful Wizard of Oz?",
        options: ["L. Frank Baum", "Roald Dahl", "C.S. Lewis", "Jeff Kinney"],
        answer: "L. Frank Baum"
      },
      {
        question: "Who wrote the Harry Potter series?",
        options: ["J.K. Rowling", "Charles Dickens", "Roald Dahl", "JRR Tolkien"],
        answer: "J.K. Rowling"
      },
      {
        question: "Who wrote The Chronicles of Narnia?",
        options: ["C.S. Lewis", "JRR Tolkien", "L. Frank Baum", "Jeff Kinney"],
        answer: "C.S. Lewis"
      },
      {
        question: "Who wrote The Lord of the Rings?",
        options: ["JRR Tolkien", "C.S. Lewis", "Roald Dahl", "Charles Dickens"],
        answer: "JRR Tolkien"
      }
    ],

    trueOrFalse: [
      "Roald Dahl wrote Charlie and the Chocolate Factory.",
      "L. Frank Baum wrote The Wonderful Wizard of Oz.",
      "J.K. Rowling wrote the Harry Potter series.",
      "C.S. Lewis wrote The Chronicles of Narnia.",
      "JRR Tolkien wrote The Lord of the Rings."
    ],

    answerInShort: [
      "Who wrote Charlie and the Chocolate Factory?",
      "Who wrote The Wonderful Wizard of Oz?",
      "Who wrote Harry Potter?",
      "Who wrote The Chronicles of Narnia?",
      "Who wrote The Lord of the Rings?"
    ],

    thinkAndAnswer: [
      "Why do you think stories are enjoyable to read?",
      "Which book from the chapter would you like to read and why?",
      "Why are imagination and creativity important in stories?",
      "What can we learn from fictional characters?",
      "How can reading books improve our knowledge?"
    ]
  },

  {
    chapter: 50,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Toys and Their Creators",

    fillInTheBlanks: [
      "Ruth Handler is associated with the creation of the ______ doll.",
      "Lonnie George Johnson created the ______.",
      "Elliot Handler is associated with ______ toy cars.",
      "Erno Rubik created ______ Cube.",
      "Richard T. James created the ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "Who created the Barbie Doll?",
        options: ["Ruth Handler", "Erno Rubik", "Joe McVicker", "Richard T. James"],
        answer: "Ruth Handler"
      },
      {
        question: "Who created the Super Soaker?",
        options: [
          "Lonnie George Johnson",
          "Elliot Handler",
          "Ruth Handler",
          "Erno Rubik"
        ],
        answer: "Lonnie George Johnson"
      },
      {
        question: "Who created Hot Wheels toy cars?",
        options: [
          "Elliot Handler",
          "Joe McVicker",
          "Richard T. James",
          "Erno Rubik"
        ],
        answer: "Elliot Handler"
      },
      {
        question: "Who created Rubik's Cube?",
        options: ["Erno Rubik", "Ruth Handler", "Joe McVicker", "Elliot Handler"],
        answer: "Erno Rubik"
      },
      {
        question: "Who created Play-Doh?",
        options: ["Joe McVicker", "Erno Rubik", "Ruth Handler", "Lonnie George Johnson"],
        answer: "Joe McVicker"
      }
    ],

    trueOrFalse: [
      "Ruth Handler is associated with the Barbie Doll.",
      "Erno Rubik created Rubik's Cube.",
      "Joe McVicker created Play-Doh.",
      "Richard T. James created the Slinky.",
      "Lonnie George Johnson created Hot Wheels toy cars."
    ],

    answerInShort: [
      "Who created the Barbie Doll?",
      "Who created the Super Soaker?",
      "Who created Hot Wheels toy cars?",
      "Who created Rubik's Cube?",
      "Who created Play-Doh?"
    ],

    thinkAndAnswer: [
      "Why are inventors important?",
      "Which toy from the chapter would you like to play with and why?",
      "How can toys help children learn?",
      "Why is creativity important when creating a toy?",
      "What toy would you like to invent?"
    ]
  },

  {
    chapter: 51,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Riddle Up",

    fillInTheBlanks: [
      "You buy me to eat but never eat me. I am a ______.",
      "You can serve me, but you cannot eat me. I am a ______.",
      "You can catch a ______ but not throw it.",
      "I have hands but cannot clap. I am a ______.",
      "What gets wetter and wetter the more it dries? A ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What can you catch but not throw?",
        options: ["A cold", "A ball", "A stone", "A book"],
        answer: "A cold"
      },
      {
        question: "What goes up and down but never moves?",
        options: ["Stairs", "A ball", "A bird", "A car"],
        answer: "Stairs"
      },
      {
        question: "I have hands but cannot clap. What am I?",
        options: ["A clock", "A towel", "A bottle", "A keyboard"],
        answer: "A clock"
      },
      {
        question: "What gets wetter and wetter the more it dries?",
        options: ["A towel", "A clock", "A bottle", "A keyboard"],
        answer: "A towel"
      },
      {
        question: "I have keys but no doors, and space but no rooms. What am I?",
        options: ["A keyboard", "A clock", "A bottle", "A towel"],
        answer: "A keyboard"
      }
    ],

    trueOrFalse: [
      "A clock has hands but cannot clap.",
      "A towel gets wetter as it dries something.",
      "A keyboard has keys but no doors.",
      "A bottle has a neck but no head.",
      "A question never asks anything."
    ],

    answerInShort: [
      "What can you catch but not throw?",
      "What has hands but cannot clap?",
      "What gets wetter as it dries?",
      "What has keys but no doors?",
      "What has a neck but no head and wears a cap?"
    ],

    thinkAndAnswer: [
      "Why are riddles useful for developing thinking skills?",
      "Which riddle did you find most interesting and why?",
      "Create a riddle about a school object.",
      "Create a riddle about an animal.",
      "Why do riddles sometimes have surprising answers?"
    ]
  },

  {
    chapter: 52,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Series",

    fillInTheBlanks: [
      "In the series 36, 34, 30, 28, 24, the next number is ______.",
      "In the series 22, 21, 23, 22, 24, 23, the next number is ______.",
      "In the series 53, 53, 40, 40, 27, 27, the next number is ______.",
      "In the series 58, 52, 46, 40, 34, the next number is ______.",
      "In the series 201, 202, 204, 207, the next number is ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What comes next in 36, 34, 30, 28, 24, ...?",
        options: ["20", "22", "23", "26"],
        answer: "22"
      },
      {
        question: "What comes next in 22, 21, 23, 22, 24, 23, ...?",
        options: ["22", "24", "25", "26"],
        answer: "25"
      },
      {
        question: "What comes next in 53, 53, 40, 40, 27, 27, ...?",
        options: ["12", "14", "27", "53"],
        answer: "14"
      },
      {
        question: "What comes next in 58, 52, 46, 40, 34, ...?",
        options: ["26", "28", "30", "32"],
        answer: "28"
      },
      {
        question: "What comes next in 201, 202, 204, 207, ...?",
        options: ["205", "211", "208", "101"],
        answer: "211"
      }
    ],

    trueOrFalse: [
      "A series follows a particular pattern.",
      "36, 34, 30, 28 follows a decreasing pattern.",
      "58, 52, 46, 40 decreases by 6 each time.",
      "201, 202, 204, 207 increases by 1, 2, 3 and so on.",
      "A series never follows a pattern."
    ],

    answerInShort: [
      "What is a number series?",
      "What number comes after 34 in the series 36, 34, 30, 28?",
      "What number comes after 27, 27 in the given series?",
      "What is the pattern in 58, 52, 46, 40?",
      "What comes after 207 in 201, 202, 204, 207?"
    ],

    thinkAndAnswer: [
      "Why is it important to observe a pattern carefully?",
      "How can you find the missing number in a series?",
      "Create a number series with a decreasing pattern.",
      "Create a number series with an increasing pattern.",
      "Why do series questions improve logical thinking?"
    ]
  },

  {
    chapter: 53,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Repeating Patterns",

    fillInTheBlanks: [
      "A repeating pattern follows a sequence that occurs ______.",
      "In a pattern, we observe the position of shapes and ______.",
      "The problem set asks us to find what comes ______.",
      "The answer set contains different possible ______.",
      "To solve a pattern, we must observe it ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "What should we do first when solving a repeating pattern?",
        options: [
          "Observe the pattern carefully",
          "Choose randomly",
          "Ignore the first figures",
          "Count only the boxes"
        ],
        answer: "Observe the pattern carefully"
      },
      {
        question: "What do repeating patterns contain?",
        options: [
          "A sequence that repeats",
          "Only numbers",
          "Only words",
          "No order"
        ],
        answer: "A sequence that repeats"
      },
      {
        question: "What do we need to find in the problem set?",
        options: [
          "What comes next",
          "The page number",
          "The chapter number",
          "The title"
        ],
        answer: "What comes next"
      },
      {
        question: "Where do we choose the missing figure from?",
        options: ["Answer set", "Problem title", "Question number", "Chapter heading"],
        answer: "Answer set"
      },
      {
        question: "Which skill is mainly used in repeating patterns?",
        options: [
          "Logical thinking",
          "Handwriting",
          "Reading speed",
          "Spelling"
        ],
        answer: "Logical thinking"
      }
    ],

    trueOrFalse: [
      "Repeating patterns follow a particular sequence.",
      "We should observe the problem set carefully.",
      "The answer set gives possible answers.",
      "Patterns cannot contain shapes.",
      "Logical thinking helps us solve pattern questions."
    ],

    answerInShort: [
      "What is a repeating pattern?",
      "What should you observe in a pattern?",
      "What does the problem set show?",
      "What is the purpose of the answer set?",
      "Which skill helps in solving patterns?"
    ],

    thinkAndAnswer: [
      "Why is careful observation important in pattern questions?",
      "How can repeated shapes help us predict the next figure?",
      "Create a simple repeating pattern using three shapes.",
      "How are repeating patterns useful in daily life?",
      "Why do pattern questions improve logical thinking?"
    ]
  },

  {
    chapter: 54,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Drain Your Brain",

    fillInTheBlanks: [
      "If Ram is sixth in the queue from either end, there are ______ people in the queue.",
      "Something that occurs once in every minute, twice in every moment, but never in a thousand years is the letter ______.",
      "If you have me, you want to share me. If you share me, you have not got me. I am a ______.",
      "A bear without an ear is called a ______.",
      "A farmer uses 27 poles on each side of a square fence. The total number of poles is ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "If Ram is sixth from either end of a queue, how many people are there?",
        options: ["10", "11", "12", "13"],
        answer: "11"
      },
      {
        question: "What occurs once in every minute and twice in every moment?",
        options: ["The letter M", "The letter E", "The letter T", "The letter N"],
        answer: "The letter M"
      },
      {
        question: "If you have me, you want to share me. If you share me, you have not got me. What am I?",
        options: ["A secret", "Money", "Food", "A book"],
        answer: "A secret"
      },
      {
        question: "What do you call a bear without an ear?",
        options: ["B", "Bear", "Bare", "Bee"],
        answer: "B"
      },
      {
        question: "A farmer uses 27 poles on each side of a square land. How many poles are needed altogether?",
        options: ["104", "108", "100", "112"],
        answer: "104"
      }
    ],

    trueOrFalse: [
      "Ram is sixth from either end of the queue.",
      "A secret is something that you may want to share.",
      "A bear without an ear is called B.",
      "A square has four sides.",
      "The riddles require careful thinking."
    ],

    answerInShort: [
      "How many people are in the queue if Ram is sixth from either end?",
      "What occurs once in every minute and twice in every moment?",
      "What do you call a bear without an ear?",
      "How many poles are needed for the square fence?",
      "What kind of skill do riddles develop?"
    ],

    thinkAndAnswer: [
      "Why should we read a riddle carefully before answering?",
      "How can logical thinking help solve riddles?",
      "Which riddle in the chapter did you find most interesting?",
      "Create a simple riddle for your classmates.",
      "Why can a riddle have an answer different from what we first expect?"
    ]
  },

  {
    chapter: 55,
    classNumber: 5,
    subject: "General Knowledge",
    title: "Relations",

    fillInTheBlanks: [
      "A person who is the son of one's parent can be a ______.",
      "The daughter of one's parent is a ______.",
      "The mother of one's father's sister is one's ______.",
      "The brother of one's uncle's daughter is one's ______.",
      "If A is the father of B and B is not the son of A, B is A's ______."
    ],

    chooseTheCorrectAnswer: [
      {
        question: "If a man has no brother or sister, the man's father's son is who?",
        options: ["Himself", "His father", "His son", "His nephew"],
        answer: "Himself"
      },
      {
        question: "The daughter of the woman who is the mother of Rajan's mother's husband is Rajan's what?",
        options: ["Aunt", "Daughter", "Sister", "Sister-in-law"],
        answer: "Sister"
      },
      {
        question: "The mother of my father's sister is my:",
        options: ["Mother", "Daughter", "Sister", "Grandmother"],
        answer: "Grandmother"
      },
      {
        question: "The brother of my uncle's daughter is my:",
        options: ["Son", "Brother-in-law", "Cousin", "Uncle"],
        answer: "Cousin"
      },
      {
        question: "A is the father of B, but B is not the son of A. B is A's:",
        options: ["Son", "Daughter", "Niece", "Sister"],
        answer: "Daughter"
      }
    ],

    trueOrFalse: [
      "A father can have a daughter.",
      "A mother's husband is the father of her child.",
      "The mother of one's father's sister is one's grandmother.",
      "The daughter of one's uncle can be one's cousin.",
      "A daughter is always a son."
    ],

    answerInShort: [
      "What is a cousin?",
      "Who is the mother of your father's sister?",
      "If A is the father of B and B is female, what is B to A?",
      "Who can be called a sister?",
      "What is meant by a family relation?"
    ],

    thinkAndAnswer: [
      "Why is it important to understand family relationships?",
      "How can a family relation puzzle be solved step by step?",
      "Draw a simple family tree showing parents, children and grandparents.",
      "Why should we carefully identify each person's relation?",
      "Create one family-relation puzzle of your own."
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

  const classNumber = chapter.classNumber ?? chapter.className;
  const subject = chapter.subject;
  const sanitizedChapterNumber = String(
    chapter.chapterNumber ?? chapter.chapter ?? chapterIndex + 1
  )
    .replace(/^\s*CH\s*/i, "")
    .trim();
  const chapterNumber = sanitizedChapterNumber;

  return {
    chapter: `CH ${chapter.chapter}`,
    chapterNumber,
    title: chapter.title || `Chapter ${chapterIndex + 1}`,
    className: classNumber,
    subject,
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
  chapterNumber: String(chapterNumber).replace(/^\s*CH\s*/i, "").trim(),
  title: `Chapter ${chapterNumber}`,
  className: worksheetChapters[0]?.className || "5",
  subject: worksheetChapters[0]?.subject || "Science"
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