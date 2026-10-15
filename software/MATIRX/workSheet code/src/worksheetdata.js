javascript;
const initialWorksheet = [
  {
    classNumber: 4,
    subject: "English",
    chapter: 1,
    title: "The Bird’s Song",
    fillInTheBlanks: [
      "The poet’s home was shaped like an ______.",
      "The bird’s home became a ______ made of dry twigs.",
      "The branches were green and ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who wrote the poem?",
        options: [
          "Nirankar Dev ‘Sevak’",
          "Joseph Lauren",
          "Garnet Engle",
          "William Wordsworth",
        ],
        answer: "Nirankar Dev ‘Sevak’",
      },
      {
        question: "What was the poet’s home first compared to?",
        options: ["An egg", "A nest", "A tree", "A cage"],
        answer: "An egg",
      },
      {
        question: "What was the bird’s home made of?",
        options: ["Dry twigs", "Glass", "Cloth", "Stones"],
        answer: "Dry twigs",
      },
    ],
    trueOrFalse: [
      "The poet’s home was shaped like an egg.",
      "The nest was made of dry twigs.",
      "The poem describes how the world seems bigger as we grow.",
    ],
    answerInShort: [
      "Who wrote the poem?",
      "What did the poet’s home become?",
      "How did the poet’s view of the world change?",
    ],
    thinkAndAnswer: [
      "Why does the world seem bigger as we grow older?",
      "How do new experiences help us learn?",
      "Describe one thing you understood better as you grew up.",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 2,
    title: "The Snail of the Garden",
    fillInTheBlanks: [
      "The snail lived in a beautiful ______.",
      "It took the snail two days to cross the ______.",
      "The snail tied its luggage on its ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Where did the snail live?",
        options: ["In a garden", "In a desert", "In a river", "In a cave"],
        answer: "In a garden",
      },
      {
        question: "How long did it take the snail to cross the garden?",
        options: ["Two days", "One hour", "One week", "One month"],
        answer: "Two days",
      },
      {
        question: "What did the snail want to see?",
        options: ["The outside world", "The moon", "A school", "A palace"],
        answer: "The outside world",
      },
    ],
    trueOrFalse: [
      "The snail had spent its whole life in the same garden.",
      "The snail wanted to see the outside world.",
      "The snail decided never to leave the garden.",
    ],
    answerInShort: [
      "Where had the snail spent its whole life?",
      "Why was the snail curious about the outside world?",
      "What did the snail do before leaving the garden?",
    ],
    thinkAndAnswer: [
      "Why is it good to explore beyond what we already know?",
      "How can meeting new people help us?",
      "What new place would you like to explore and why?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 3,
    title: "The Sky is Falling",
    fillInTheBlanks: [
      "The rabbit was sleeping under a ______.",
      "A fruit falling from a tree made the rabbit think the sky was ______.",
      "The rabbit met a fox and a ______ while running.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What made the rabbit think the sky was falling?",
        options: [
          "A fruit falling",
          "A loud bird",
          "A storm",
          "A broken branch",
        ],
        answer: "A fruit falling",
      },
      {
        question: "Which animal did the rabbit meet first?",
        options: ["A fox", "A bear", "An elephant", "A deer"],
        answer: "A fox",
      },
      {
        question: "What is the main lesson of the story?",
        options: [
          "Check the truth before believing rumours",
          "Always run away",
          "Never talk to animals",
          "Believe everything immediately",
        ],
        answer: "Check the truth before believing rumours",
      },
    ],
    trueOrFalse: [
      "The rabbit was sleeping under a tree.",
      "The fox checked the truth before running.",
      "The story warns us not to believe rumours without checking.",
    ],
    answerInShort: [
      "Why did the rabbit become scared?",
      "Which animals ran with the rabbit?",
      "What lesson does the story teach?",
    ],
    thinkAndAnswer: [
      "Why should we check facts before believing something?",
      "What would you do if you heard a rumour?",
      "How can panic spread from one person to another?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 4,
    title: "Letter from Jaipur",
    fillInTheBlanks: [
      "Anmol wrote a letter to his ______.",
      "The teachers took good care of the ______.",
      "The special dish mentioned in the letter was Dal-Bati ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who wrote the letter?",
        options: ["Anmol", "Pari", "Tenali", "Neha"],
        answer: "Anmol",
      },
      {
        question: "Which place did they visit near Hawa Mahal?",
        options: ["Jantar Mantar", "India Gate", "Qutub Minar", "Taj Mahal"],
        answer: "Jantar Mantar",
      },
      {
        question: "Which dish did Anmol mention?",
        options: ["Dal-Bati Churma", "Idli-sambar", "Dhokla", "Litti-chokha"],
        answer: "Dal-Bati Churma",
      },
    ],
    trueOrFalse: [
      "Anmol wrote a letter from Jaipur.",
      "Jantar Mantar is an observatory.",
      "The letter mentions a visit to Amer Fort.",
    ],
    answerInShort: [
      "To whom did Anmol write the letter?",
      "Name two places Anmol visited in Jaipur.",
      "Which Rajasthani dish did Anmol mention?",
    ],
    thinkAndAnswer: [
      "Why are letters useful for sharing travel experiences?",
      "Which place in your city would you describe in a letter?",
      "What details should a good travel letter include?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 5,
    title: "The Fox and the Grapes",
    fillInTheBlanks: [
      "The fox was passing through an ______.",
      "The fox saw a bunch of ______ hanging on a wall.",
      "At last, the fox said the grapes were ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who composed the poem?",
        options: [
          "Joseph Lauren",
          "Nirankar Dev ‘Sevak’",
          "Garnet Engle",
          "William Wordsworth",
        ],
        answer: "Joseph Lauren",
      },
      {
        question: "What did the fox try to reach?",
        options: ["Grapes", "Apples", "Birds", "Flowers"],
        answer: "Grapes",
      },
      {
        question: "What did the fox say about the grapes after failing?",
        options: [
          "They were sour",
          "They were golden",
          "They were ripe",
          "They were sweet",
        ],
        answer: "They were sour",
      },
    ],
    trueOrFalse: [
      "The fox was hungry.",
      "The fox reached the grapes easily on the first try.",
      "The poem teaches us not to make excuses for failure.",
    ],
    answerInShort: [
      "What did the fox see on the wall?",
      "Why did the fox jump?",
      "What did the fox say after failing to get the grapes?",
    ],
    thinkAndAnswer: [
      "Why do people sometimes make excuses after failing?",
      "How should we respond when we cannot achieve something?",
      "Describe a time when trying again helped you.",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 6,
    title: "Tenali Meets Babur",
    fillInTheBlanks: [
      "Tenali Raman was famous for his ______.",
      "Babur was the Mughal ______.",
      "Tenali was promised a reward of ten thousand gold ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who was famous for his wit?",
        options: ["Tenali Raman", "Anmol", "Midas", "Velan"],
        answer: "Tenali Raman",
      },
      {
        question: "Who was the Mughal emperor in the story?",
        options: ["Babur", "Akbar", "Ashoka", "Shah Jahan"],
        answer: "Babur",
      },
      {
        question: "What quality helped Tenali in the story?",
        options: ["Intelligence", "Carelessness", "Anger", "Laziness"],
        answer: "Intelligence",
      },
    ],
    trueOrFalse: [
      "Tenali Raman was famous for his wit.",
      "Babur was a Mughal emperor.",
      "Tenali was asked to prove his mettle.",
    ],
    answerInShort: [
      "Who was Tenali Raman?",
      "Who wanted to meet Tenali?",
      "What reward was promised to Tenali?",
    ],
    thinkAndAnswer: [
      "How can intelligence help someone in a difficult situation?",
      "Why is it important to earn respect through actions?",
      "Describe a problem that can be solved by clever thinking.",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 7,
    title: "Changing into Beautiful Swan",
    fillInTheBlanks: [
      "Mother Duck had seven ______.",
      "Six eggs hatched into yellow, fluffy ______.",
      "The duckling’s only friend was his ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "How many eggs did Mother Duck have?",
        options: ["Seven", "Five", "Six", "Eight"],
        answer: "Seven",
      },
      {
        question:
          "How did the other ducklings treat the different-looking duckling?",
        options: [
          "They teased him",
          "They praised him",
          "They followed him",
          "They ignored their mother",
        ],
        answer: "They teased him",
      },
      {
        question: "What lesson does the story teach?",
        options: [
          "Do not judge by appearance",
          "Looks are everything",
          "Never help others",
          "Only be friends with similar people",
        ],
        answer: "Do not judge by appearance",
      },
    ],
    trueOrFalse: [
      "Mother Duck loved all her ducklings.",
      "The other ducklings always welcomed the different-looking duckling.",
      "The story says that everyone has their own time and place to shine.",
    ],
    answerInShort: [
      "How many eggs did Mother Duck have?",
      "Why did the other ducklings avoid the seventh duckling?",
      "Who continued to love the different-looking duckling?",
    ],
    thinkAndAnswer: [
      "Why should we not judge others by their appearance?",
      "How can you help someone who feels left out?",
      "What makes a person beautiful besides appearance?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 8,
    title: "A Trip to Kerala",
    fillInTheBlanks: [
      "Pari lives in the state of ______.",
      "Kerala is known as the land of rivers, canals and ______.",
      "The highest peak mentioned in the chapter is ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Where is Kerala located in India?",
        options: [
          "In the south",
          "In the north",
          "In the west only",
          "In the east only",
        ],
        answer: "In the south",
      },
      {
        question: "What is Kerala described as the land of?",
        options: [
          "Rivers, canals and lakes",
          "Deserts and sand dunes",
          "Snow and glaciers",
          "Factories and mines",
        ],
        answer: "Rivers, canals and lakes",
      },
      {
        question: "What are backwaters and lagoons used for in the chapter?",
        options: ["Boat trade", "Skiing", "Desert travel", "Mining"],
        answer: "Boat trade",
      },
    ],
    trueOrFalse: [
      "Pari lives in Kerala.",
      "Kerala has mountains and dense forests.",
      "The chapter describes Kerala as a desert state.",
    ],
    answerInShort: [
      "Who is the narrator of the chapter?",
      "Name two natural features of Kerala.",
      "What are backwaters used for?",
    ],
    thinkAndAnswer: [
      "What would you like to see in Kerala and why?",
      "Why should we learn about different regions of India?",
      "How can tourists protect a place’s natural beauty?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 9,
    title: "A Tree",
    fillInTheBlanks: [
      "The tree is described as big, stout and ______.",
      "Birds have built their ______ in the tree.",
      "Children sat beneath the tree’s ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who wrote the poem?",
        options: [
          "Garnet Engle",
          "William Wordsworth",
          "Joseph Lauren",
          "Nirankar Dev ‘Sevak’",
        ],
        answer: "Garnet Engle",
      },
      {
        question: "What do the branches provide to children?",
        options: ["Shade", "Books", "Food packets", "Clothes"],
        answer: "Shade",
      },
      {
        question: "What does the poem ask us to do?",
        options: [
          "Protect trees",
          "Cut all trees",
          "Ignore nature",
          "Avoid birds",
        ],
        answer: "Protect trees",
      },
    ],
    trueOrFalse: [
      "The tree has lived for many years.",
      "Birds have built nests in the tree.",
      "The poem describes the tree as an unfriendly companion.",
    ],
    answerInShort: [
      "How is the tree described in the poem?",
      "What do birds build in the tree?",
      "What does the tree provide to children?",
    ],
    thinkAndAnswer: [
      "Why are trees called our friends?",
      "How can you help protect trees?",
      "What memories might people make under a tree?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 10,
    title: "The Jurassic Age",
    fillInTheBlanks: [
      "The Jurassic Age began around 230 million years ______.",
      "Giant reptiles of the Jurassic Age were called ______.",
      "Fossils of dinosaurs can be seen in ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What ruled the earth during the Jurassic Age?",
        options: ["Giant reptiles", "Modern humans", "Cars", "Bird cages"],
        answer: "Giant reptiles",
      },
      {
        question: "What does the word dinosaur mean in the chapter?",
        options: [
          "A very big fearful lizard",
          "A small fish",
          "A flying insect",
          "A sea plant",
        ],
        answer: "A very big fearful lizard",
      },
      {
        question: "What is the present age called in the chapter?",
        options: ["Age of Man", "Age of Dinosaurs", "Ice Age", "Stone Age"],
        answer: "Age of Man",
      },
    ],
    trueOrFalse: [
      "Dinosaurs lived millions of years ago.",
      "All dinosaurs still live on Earth today.",
      "The chapter compares the Jurassic Age with the Age of Man.",
    ],
    answerInShort: [
      "What was the Jurassic Age?",
      "What were the giant reptiles called?",
      "What is the present age called in the chapter?",
    ],
    thinkAndAnswer: [
      "How do fossils help us understand the past?",
      "What might life have been like when dinosaurs lived?",
      "Why is scientific study of ancient life important?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 11,
    title: "Kites",
    fillInTheBlanks: [
      "Wind carries a kite up in the ______.",
      "Kites were first flown by the ______.",
      "In the past, kites were used for spying and ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question:
          "Where did people start flying kites more than two thousand years ago?",
        options: ["China", "India", "Egypt", "Greece"],
        answer: "China",
      },
      {
        question: "What helps a kite move upward?",
        options: ["Wind", "Rain", "Sand", "Snow"],
        answer: "Wind",
      },
      {
        question: "What did scientists use kites to carry into clouds?",
        options: ["Instruments", "Furniture", "Bookshelves", "Food carts"],
        answer: "Instruments",
      },
    ],
    trueOrFalse: [
      "Wind helps a kite fly.",
      "Kites were once used for spying.",
      "Kites have never been used for scientific purposes.",
    ],
    answerInShort: [
      "What makes a kite rise into the sky?",
      "Which country first used kites according to the chapter?",
      "How did scientists use kites?",
    ],
    thinkAndAnswer: [
      "Why do people enjoy flying kites?",
      "How can kites be useful for science?",
      "What safety rules should we follow while flying kites?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 12,
    title: "Nature’s Amazing Creatures",
    fillInTheBlanks: [
      "A camel has a big ______ on its back.",
      "A small puddle of water in a desert is called an ______.",
      "A camel is known as the Ship of the ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which animal has a hump on its back?",
        options: ["Camel", "Horse", "Tiger", "Monkey"],
        answer: "Camel",
      },
      {
        question: "What is an oasis?",
        options: [
          "A place with water and greenery in a desert",
          "A high snowy mountain",
          "A deep ocean",
          "A thick city road",
        ],
        answer: "A place with water and greenery in a desert",
      },
      {
        question: "Why is a camel suited to desert travel?",
        options: [
          "It can go a long time with little food and water",
          "It can fly",
          "It lives underwater",
          "It needs cold snow",
        ],
        answer: "It can go a long time with little food and water",
      },
    ],
    trueOrFalse: [
      "Camels are found mostly in deserts.",
      "An oasis may have water and green trees.",
      "A camel cannot travel on hot desert sand.",
    ],
    answerInShort: [
      "What is a camel’s hump?",
      "What is an oasis?",
      "Why is the camel called the Ship of the Desert?",
    ],
    thinkAndAnswer: [
      "How do animals adapt to their environments?",
      "Why should we protect animals and their habitats?",
      "Name an animal with a special body feature and explain its use.",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 13,
    title: "The River",
    fillInTheBlanks: [
      "The river carries stones, sand, mud and ______.",
      "The river flows through narrow ______.",
      "At the end, the river falls into the ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What does the river gather as it flows?",
        options: [
          "Stones, sand, mud and fish",
          "Books and toys",
          "Cars and buses",
          "Flowers only",
        ],
        answer: "Stones, sand, mud and fish",
      },
      {
        question:
          "What happens to the river as it moves through narrow valleys?",
        options: [
          "It gains speed",
          "It stops forever",
          "It turns into a road",
          "It dries immediately",
        ],
        answer: "It gains speed",
      },
      {
        question: "Where does the river finally flow?",
        options: [
          "Into the ocean",
          "Into a classroom",
          "Into a desert road",
          "Into a mountain top",
        ],
        answer: "Into the ocean",
      },
    ],
    trueOrFalse: [
      "The poem describes the journey of a river.",
      "The river is always still and silent.",
      "Many streams join to make the river mighty.",
    ],
    answerInShort: [
      "What does the river carry as it flows?",
      "What happens when the river moves through narrow valleys?",
      "Where does the river finally end?",
    ],
    thinkAndAnswer: [
      "How is a river’s journey like a person’s life?",
      "Why are rivers important to people and animals?",
      "How can we keep rivers clean?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 14,
    title: "The Real Owner",
    fillInTheBlanks: [
      "An old ______ wanted to find out which son was wiser.",
      "The father gave each son one ______.",
      "The sons had to buy something that would fill the ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "How many sons did the merchant have?",
        options: ["Two", "Three", "Four", "One"],
        answer: "Two",
      },
      {
        question: "How much money did the father give each son?",
        options: [
          "One rupee",
          "Ten rupees",
          "Five rupees",
          "One hundred rupees",
        ],
        answer: "One rupee",
      },
      {
        question: "Why did the father give his sons a test?",
        options: [
          "To find out who was wiser",
          "To make them fight",
          "To buy a horse",
          "To sell the house",
        ],
        answer: "To find out who was wiser",
      },
    ],
    trueOrFalse: [
      "The merchant wanted to distribute his property wisely.",
      "Each son was given one rupee.",
      "The father asked his sons to spend more than one rupee.",
    ],
    answerInShort: [
      "Why did the merchant test his sons?",
      "How much money did each son receive?",
      "What were the sons asked to buy?",
    ],
    thinkAndAnswer: [
      "Why should we think carefully before making decisions?",
      "How can a small amount of money be used wisely?",
      "What qualities make someone wise?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 15,
    title: "The Village Fair",
    fillInTheBlanks: [
      "Neha was happy because it was her ______.",
      "Her grandfather had promised to take her to the village ______.",
      "The toy maker had puppets and mud ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "What special day was it for Neha?",
        options: [
          "Her birthday",
          "Her exam day",
          "A sports day",
          "A rainy day",
        ],
        answer: "Her birthday",
      },
      {
        question: "Where did grandfather promise to take Neha?",
        options: ["The village fair", "The zoo", "The airport", "The museum"],
        answer: "The village fair",
      },
      {
        question: "What did the toy maker have?",
        options: [
          "Puppets and mud dolls",
          "Computers",
          "Bicycles only",
          "Books only",
        ],
        answer: "Puppets and mud dolls",
      },
    ],
    trueOrFalse: [
      "Neha was happy on her birthday.",
      "Neha hurt her leg after slipping on the stairs.",
      "The story says fairs bring no happiness.",
    ],
    answerInShort: [
      "Why was Neha happy at the beginning?",
      "Where did grandfather promise to take her?",
      "What items did the village toy maker have?",
    ],
    thinkAndAnswer: [
      "Why are village fairs enjoyable for families?",
      "What can we learn about local crafts at a fair?",
      "How would you help a friend who was hurt before a special event?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 16,
    title: "A Beautiful Day",
    fillInTheBlanks: [
      "The poem was written by William ______.",
      "The small birds ______ in the morning.",
      "The poem describes the scene after the ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who composed the poem?",
        options: [
          "William Wordsworth",
          "Garnet Engle",
          "Joseph Lauren",
          "Christina Rossetti",
        ],
        answer: "William Wordsworth",
      },
      {
        question: "What do the small birds do?",
        options: ["Twitter", "Sleep all day", "Swim", "Build roads"],
        answer: "Twitter",
      },
      {
        question: "What has ended by the end of the poem?",
        options: ["The rain", "The summer", "The night forever", "The winter"],
        answer: "The rain",
      },
    ],
    trueOrFalse: [
      "The poem describes a day after rain.",
      "The lake is described as glittering.",
      "The poem says there is no joy in the mountains.",
    ],
    answerInShort: [
      "Who wrote the poem?",
      "What do the small birds do?",
      "What is the weather like by the end of the poem?",
    ],
    thinkAndAnswer: [
      "What do you enjoy seeing after rain?",
      "How does nature show that a new day has begun?",
      "Why can a sunny day improve our mood?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 17,
    title: "P.V. Sindhu",
    fillInTheBlanks: [
      "P.V. Sindhu is a professional ______ player.",
      "She won an Olympic silver medal in ______.",
      "She began playing badminton at the age of ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Which sport does P.V. Sindhu play?",
        options: ["Badminton", "Tennis", "Cricket", "Hockey"],
        answer: "Badminton",
      },
      {
        question: "At which Olympics did she win a silver medal?",
        options: [
          "2016 Summer Olympics",
          "2008 Olympics",
          "2020 Winter Olympics",
          "2000 Olympics",
        ],
        answer: "2016 Summer Olympics",
      },
      {
        question:
          "Who inspired Sindhu to pursue badminton according to the chapter?",
        options: [
          "Pullela Gopichand",
          "A school principal",
          "A football coach",
          "A tennis umpire",
        ],
        answer: "Pullela Gopichand",
      },
    ],
    trueOrFalse: [
      "P.V. Sindhu is an Indian badminton player.",
      "Sindhu won an Olympic silver medal in 2016.",
      "The chapter says Sindhu never worked hard.",
    ],
    answerInShort: [
      "What sport does P.V. Sindhu play?",
      "What achievement did she earn at the 2016 Olympics?",
      "Who inspired her to pursue badminton?",
    ],
    thinkAndAnswer: [
      "Which qualities help an athlete succeed?",
      "How can you stay committed to a goal?",
      "Why is family support important for young people?",
    ],
  },

  {
    classNumber: 4,
    subject: "English",
    chapter: 18,
    title: "Knowing About India",
    fillInTheBlanks: [
      "India is known as the land of ______.",
      "The Taj Mahal is situated in ______.",
      "The Gateway of India is situated in ______.",
    ],
    chooseTheCorrectAnswer: [
      {
        question: "Who built the Taj Mahal?",
        options: [
          "Mughal Emperor Shah Jahan",
          "Qutb-ud-din Aibak",
          "Edwin Lutyens",
          "King George V",
        ],
        answer: "Mughal Emperor Shah Jahan",
      },
      {
        question: "Where is Qutub Minar situated?",
        options: ["New Delhi", "Mumbai", "Agra", "Jaipur"],
        answer: "New Delhi",
      },
      {
        question: "What is India Gate dedicated to?",
        options: [
          "Soldiers who died in World War I",
          "Famous poets",
          "Scientists",
          "Village farmers",
        ],
        answer: "Soldiers who died in World War I",
      },
    ],
    trueOrFalse: [
      "The Taj Mahal is in Agra, Uttar Pradesh.",
      "Qutub Minar is made of red sandstone.",
      "The Gateway of India is in New Delhi.",
    ],
    answerInShort: [
      "Why is India known as the land of monuments?",
      "Where is the Taj Mahal located?",
      "What is India Gate dedicated to?",
    ],
    thinkAndAnswer: [
      "Which Indian monument would you like to visit and why?",
      "Why are historical monuments important?",
      "How can we help protect monuments?",
    ],
  },
];

export default initialWorksheet;
