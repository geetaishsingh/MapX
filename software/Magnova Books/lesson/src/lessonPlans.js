
const createSections = (data) => {
  const titles = [
    "Fill in the Blanks",
    "Choose the Correct Answer",
    "True or False",
    "Answer These Questions",
    "Think and Answer",
  ];

  return data.map((questions, index) => ({
    id: index + 1,
    title: titles[index],
    type: index === 1 || index === 2 ? "mcq" : "write",
    questions: questions.map((item, i) => ({
      id: i + 1,
      question: item.question,
      ...(item.options ? { options: item.options } : {}),
      answer: "",
    })),
  }));
};

const fill = (questions) => questions.map((question) => ({ question }));

const mcq = (questions) =>
  questions.map(([question, ...options]) => ({ question, options }));

const tf = (questions) =>
  questions.map((question) => ({
    question,
    options: ["True", "False"],
  }));

const short = (questions) => questions.map((question) => ({ question }));

export const lessonPlans = [
  // =====================================================
  // CHAPTER 1
  // =====================================================
  {
    chapter: "1",
    title: "The Kite That Touched the Sky",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Naina's Dream",
      "The Kite Festival",
      "Courage and Confidence",
      "Practice and Patience",
      "Learning from Failure",
    ],
    sections: createSections([
      fill([
        "The winter sky over Surajpur was clear and ______.",
        "Naina lived near the old ______.",
        "Naina loved watching ______.",
        "Ravi was Naina's older ______.",
        "A kite needs wind, balance and ______ to fly high.",
      ]),
      mcq([
        ["What did Naina love watching?", "Kites", "Cars", "Trains", "Boats"],
        ["Where did Naina live?", "Surajpur", "Delhi", "Mumbai", "Jaipur"],
        ["What festival was approaching?", "Kite festival", "Diwali", "Holi", "Christmas"],
        ["Who laughed at Naina's dream?", "Ravi", "Her teacher", "Her mother", "Her friend"],
        ["What does flying a kite teach us?", "Courage and patience", "Laziness", "Anger", "Carelessness"],
      ]),
      tf([
        "Naina loved watching kites.",
        "Naina wanted her kite to touch the sky.",
        "Ravi encouraged Naina from the beginning.",
        "A kite can fly well without wind.",
        "Practice and patience help us improve.",
      ]),
      short([
        "Who was Naina?",
        "What did Naina dream of doing?",
        "Why did Ravi laugh at Naina?",
        "What difficulties did Naina face while flying her kite?",
        "What qualities help a person achieve a difficult goal?",
      ]),
      short([
        "Why should we continue trying after failure?",
        "How can you encourage someone whose efforts have failed?",
        "What does Naina's dream teach us about self-confidence?",
        "Describe a time when practice helped you improve a skill.",
        "Explain the importance of courage, patience and determination in achieving a dream.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 2
  // =====================================================
  {
    chapter: "2",
    title: "A Small Step Forward",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Raman's Learning Journey",
      "Overcoming Fear",
      "Teacher's Encouragement",
      "Small Steps Towards Progress",
      "Confidence and Perseverance",
    ],
    sections: createSections([
      fill([
        "Class 4 returned to school after the summer ______.",
        "The class teacher was Ms. ______.",
        "Raman sat in the second ______.",
        "The teacher wrote a sentence on the ______.",
        "Progress often begins with one small ______.",
      ]),
      mcq([
        ["Who was Raman's class teacher?", "Ms. Leela", "Ms. Sen", "Mrs. Rao", "Ms. Anita"],
        ["When did Class 4 return to school?", "After summer holidays", "After winter holidays", "After examinations", "During summer holidays"],
        ["What difficulty did Raman face?", "Reading words", "Playing cricket", "Drawing pictures", "Running"],
        ["What did the teacher encourage?", "Growing one step at a time", "Giving up", "Avoiding books", "Rushing through work"],
        ["What is the central message of the story?", "Small steps lead to progress", "Success comes without effort", "Fear cannot be overcome", "Mistakes must be hidden"],
      ]),
      tf([
        "Class 4 was excited after the summer holidays.",
        "Ms. Leela was the class teacher.",
        "Raman could read every word easily.",
        "Progress always happens quickly.",
        "Encouragement can help children overcome difficulties.",
      ]),
      short([
        "Who was Raman?",
        "What did Ms. Leela write on the board?",
        "Why was Raman looking at the words carefully?",
        "What did the teacher mean by growing one step at a time?",
        "How can a teacher help a struggling student?",
      ]),
      short([
        "Why is it important to learn at our own pace?",
        "How can small daily efforts improve reading skills?",
        "What should you do when a subject seems difficult?",
        "Describe how encouragement can build confidence.",
        "Explain the message of the story with an example from student life.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 3
  // =====================================================
  {
    chapter: "3",
    title: "Wings of Hope",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Meaning of Hope",
      "Courage and Confidence",
      "Learning from Mistakes",
      "Importance of Kindness",
      "Poetic Expressions and Imagery",
    ],
    sections: createSections([
      fill([
        "Hope gives us strength when a task feels ______.",
        "Hope whispers, 'Try once ______.'",
        "Courage helps us face ______.",
        "Friends and teachers help guide our ______.",
        "The poem compares little steps to growing ______.",
      ]),
      mcq([
        ["What does hope give us?", "Strength", "Fear", "Anger", "Confusion"],
        ["What should we do when an answer is wrong?", "Try again", "Stop learning", "Hide the answer", "Blame others"],
        ["What grows from within according to the poem?", "Courage", "Jealousy", "Laziness", "Pride"],
        ["Who can help guide children?", "Teachers", "Friends", "Family", "All of these"],
        ["What is the main message of the poem?", "Keep trying with hope", "Never make mistakes", "Avoid difficult tasks", "Always win"],
      ]),
      tf([
        "Hope helps us continue when work feels difficult.",
        "The poem tells us never to try again.",
        "Kind friends can encourage us.",
        "Courage helps us face difficulties.",
        "Every small effort can help us grow.",
      ]),
      short([
        "What is hope?",
        "How does hope help us?",
        "What should we do when we make a mistake?",
        "Who can encourage us when we feel discouraged?",
        "What message does the poem give to children?",
      ]),
      short([
        "Explain how hope and courage are connected.",
        "Why should we learn from our mistakes?",
        "How can kind words change someone's feelings?",
        "Describe a situation in which you would need hope.",
        "Explain the meaning of the title 'Wings of Hope'.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 4
  // =====================================================
  {
    chapter: "4",
    title: "The Greedy Brahmins",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "King Krishnadevaraya",
      "Tenali Rama's Intelligence",
      "The Golden Mangoes",
      "Greed and Gratitude",
      "Moral Lessons from Stories",
    ],
    sections: createSections([
      fill([
        "King Krishnadevaraya ruled the kingdom of ______.",
        "Tenali Rama was a Telugu poet and ______.",
        "The king wanted to honour his late ______.",
        "The golden mangoes were given as royal ______.",
        "Greed can replace feelings of ______.",
      ]),
      mcq([
        ["Who was the king in the story?", "Krishnadevaraya", "Ashoka", "Akbar", "Chandragupta"],
        ["Who helped the king solve the problem?", "Tenali Rama", "Birbal", "Kalidasa", "Tansen"],
        ["What did the king give the Brahmins?", "Golden mangoes", "Silver plates", "Gold coins", "Golden apples"],
        ["What did some Brahmins want after receiving gifts?", "Additional gifts", "A new kingdom", "A school", "A journey"],
        ["What is the main lesson of the story?", "Avoid greed and be grateful", "Always demand more", "Money is everything", "Never help others"],
      ]),
      tf([
        "Tenali Rama was known for his quick wit.",
        "King Krishnadevaraya wanted to honour his mother.",
        "The mangoes given to the Brahmins were real fruit.",
        "Some Brahmins wanted additional gifts.",
        "The story teaches us about greed and gratitude.",
      ]),
      short([
        "Who was Tenali Rama?",
        "Why did the king invite the Brahmins?",
        "What gifts did the Brahmins receive?",
        "Why were some Brahmins dissatisfied?",
        "What lesson does the story teach us?",
      ]),
      short([
        "How did Tenali Rama use his intelligence to teach a lesson?",
        "Why is gratitude more valuable than demanding extra rewards?",
        "How can greed make people behave foolishly?",
        "What would you do if you received a gift but wanted more?",
        "Explain how a clever lesson can be more effective than a long lecture.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 5
  // =====================================================
  {
    chapter: "5",
    title: "The Drum That Spoke",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Village Life and Traditions",
      "The Village Drum",
      "Observation and Investigation",
      "Finding the Truth",
      "Wisdom Without Anger",
    ],
    sections: createSections([
      fill([
        "The village in the story was called ______.",
        "A large wooden drum stood near the ______ tree.",
        "The drum announced weddings, festivals and ______.",
        "The villagers gathered in the ______.",
        "Careful observation can help us discover the ______.",
      ]),
      mcq([
        ["What was the name of the village?", "Devpur", "Haritpur", "Neergaon", "Surajpur"],
        ["Where was the wooden drum kept?", "Near the banyan tree", "Inside a school", "Near a river", "Inside a temple"],
        ["Who used the drum to call villagers together?", "The headman", "The king", "The teacher", "The farmer"],
        ["What is the main theme of the story?", "Finding truth through observation", "Winning a race", "Learning to swim", "Growing crops"],
        ["What can help solve a mystery?", "Careful observation", "Anger", "Guesswork alone", "Blaming everyone"],
      ]),
      tf([
        "The drum was important to the villagers.",
        "The drum announced village meetings.",
        "The villagers never gathered in the square.",
        "The story shows that truth can be discovered carefully.",
        "Anger is always necessary to solve a problem.",
      ]),
      short([
        "What was special about the village drum?",
        "Where did the villagers gather?",
        "What kinds of events did the drum announce?",
        "Why is observation important when solving a mystery?",
        "What lesson can we learn from the village elder?",
      ]),
      short([
        "How can careful observation help identify a thief?",
        "Why should we investigate a problem before blaming someone?",
        "How do traditional objects help a village community?",
        "Explain how silence or small signs can reveal the truth.",
        "Describe a situation in which patience would help you solve a problem.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 6
  // =====================================================
  {
    chapter: "6",
    title: "The Farmer's Golden Lesson",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Hariram and His Family",
      "The Importance of Farming",
      "Hard Work and Responsibility",
      "The Value of Effort",
      "Learning Through Experience",
    ],
    sections: createSections([
      fill([
        "The old farmer in the story was named ______.",
        "Hariram lived in a village surrounded by green ______.",
        "Hariram had three ______.",
        "Hariram worked from sunrise to ______.",
        "The story teaches that hard work can turn ordinary soil into ______.",
      ]),
      mcq([
        ["What was the farmer's name?", "Hariram", "Raman", "Ravi", "Tenali"],
        ["What did Hariram grow in his fields?", "Wheat", "Tea", "Coffee", "Cotton only"],
        ["How many sons did Hariram have?", "Two", "Three", "Four", "Five"],
        ["What had become weak as Hariram grew old?", "His back", "His eyesight only", "His voice", "His hearing"],
        ["What is the main lesson of the story?", "Hard work has great value", "Treasure is always buried", "Farming needs no effort", "Money solves every problem"],
      ]),
      tf([
        "Hariram was an old farmer.",
        "Hariram's land had once produced fine wheat.",
        "Hariram had two sons.",
        "Hariram's sons enjoyed working in the fields.",
        "The story values hard work and effort.",
      ]),
      short([
        "Who was Hariram?",
        "What did Hariram grow in his fields?",
        "Name Hariram's three sons.",
        "Why had farming become difficult for Hariram?",
        "What is the golden lesson of the story?",
      ]),
      short([
        "Why should children understand the value of hard work?",
        "How does farming teach patience and responsibility?",
        "Why is effort sometimes more valuable than money?",
        "How can a family work together to achieve a common goal?",
        "Explain the connection between hard work and success with an example.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 7
  // =====================================================
  {
    chapter: "7",
    title: "The Banyan Tree's Gift",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "The Old Banyan Tree",
      "Benefits of Trees",
      "Kavya's Love for Nature",
      "Environmental Protection",
      "Community Responsibility",
    ],
    sections: createSections([
      fill([
        "An old banyan tree stood in the centre of ______ village.",
        "The tree provided shade to farmers and ______.",
        "Birds rested safely among its ______.",
        "The girl who loved the banyan tree was named ______.",
        "The village planned to build a new ______ through the village.",
      ]),
      mcq([
        ["Where did the banyan tree stand?", "Haritpur", "Devpur", "Surajpur", "Neergaon"],
        ["Who loved the banyan tree?", "Kavya", "Naina", "Aarini", "Leela"],
        ["What did the tree provide in summer?", "Deep shade", "Plastic", "Metal", "Food for machines"],
        ["Why was the tree in danger?", "A new road was planned", "It was too young", "It was inside a school", "It had no branches"],
        ["What is the central message of the story?", "Protect trees and nature", "Cut down every old tree", "Avoid village meetings", "Never build roads"],
      ]),
      tf([
        "The banyan tree was older than most houses in the village.",
        "The tree provided shade to farmers and children.",
        "Kavya disliked the banyan tree.",
        "Birds used the tree for shelter.",
        "Old trees can be valuable to a community.",
      ]),
      short([
        "Where was the banyan tree located?",
        "How did the tree help villagers in summer?",
        "Who was Kavya?",
        "Why did the villagers discuss building a new road?",
        "Why should old trees be protected?",
      ]),
      short([
        "Describe the importance of the banyan tree to village life.",
        "How do trees help both people and animals?",
        "Why should development plans consider the environment?",
        "What could villagers do to protect the tree while improving transport?",
        "Explain how one tree can become an important part of a community.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 8
  // =====================================================
  {
    chapter: "8",
    title: "The River Needs Us",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "The River Nira",
      "Importance of Rivers",
      "Causes of Water Pollution",
      "Environmental Responsibility",
      "Community Action for Clean Water",
    ],
    sections: createSections([
      fill([
        "The town of Neergaon stood beside the River ______.",
        "The river gave water to the ______.",
        "Plastic packets floated near the river ______.",
        "Dirty water entered the river through ______.",
        "Children went on a nature walk with their teacher, Mrs. ______.",
      ]),
      mcq([
        ["Which river flowed beside Neergaon?", "River Nira", "River Ganga", "River Yamuna", "River Kaveri"],
        ["What did the river provide to fields?", "Water", "Plastic", "Smoke", "Metal"],
        ["What floated near the river steps?", "Plastic packets", "Books", "Clothes only", "Wooden desks"],
        ["What carried dirty water into the river?", "Drains", "Bridges", "Trees", "Boats"],
        ["How can children help protect a river?", "Keep waste out of the water", "Throw plastic into it", "Pour dirty water into it", "Leave waste on the bank"],
      ]),
      tf([
        "The River Nira supported life in Neergaon.",
        "The river water always remained clean.",
        "Plastic waste can pollute a river.",
        "Drains carried dirty water into the river.",
        "Children can help protect natural resources.",
      ]),
      short([
        "Where was the town of Neergaon located?",
        "How did the river help the town?",
        "What signs of pollution did the children notice?",
        "What is a riverbank?",
        "What can children do to keep rivers clean?",
      ]),
      short([
        "Explain how human activities can pollute rivers.",
        "Why are rivers important for plants, animals and people?",
        "Suggest five ways to reduce river pollution.",
        "How can students encourage their community to protect water bodies?",
        "Explain why protecting a river is a shared responsibility.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 9
  // =====================================================
  {
    chapter: "9",
    title: "Earth, Our Home",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Earth as Our Home",
      "Natural Resources",
      "Plants, Animals and Rivers",
      "Environmental Protection",
      "Gratitude for Nature",
    ],
    sections: createSections([
      fill([
        "Earth is the home of people, animals and ______.",
        "Seeds are ______ in the ground.",
        "Tall trees and flowing ______ are gifts of nature.",
        "The mountains ______ the clouds of rain.",
        "Seeds of crops such as wheat or rice are called ______.",
      ]),
      mcq([
        ["What is the main subject of the poem?", "Earth and nature", "Machines", "School rules", "Sports"],
        ["Where are seeds sown?", "In the ground", "In the sky", "On rooftops only", "Inside rivers"],
        ["What do rivers provide?", "Water", "Plastic", "Smoke", "Metal"],
        ["Which animal builds a nest in the poem?", "Sparrow", "Tiger", "Elephant", "Lion"],
        ["What should we do to Earth?", "Love and protect it", "Pollute it", "Waste its resources", "Destroy its forests"],
      ]),
      tf([
        "Earth is home to people and animals.",
        "The poem describes rivers, trees and fields.",
        "Nature has no value for human beings.",
        "A sparrow builds a nest.",
        "We should protect our natural environment.",
      ]),
      short([
        "Why is Earth called our home?",
        "Name four natural features mentioned in the poem.",
        "What does the word 'sown' mean?",
        "What is grain?",
        "How can children help keep Earth clean?",
      ]),
      short([
        "Explain why Earth belongs to all living things.",
        "How do trees and rivers support life?",
        "What would happen if people wasted natural resources?",
        "Write five actions you can take to protect the environment.",
        "Explain the message of the poem 'Earth, Our Home'.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 10
  // =====================================================
  {
    chapter: "10",
    title: "The Day the Bell Disappeared",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Life at Vidya Vihar School",
      "The Missing School Bell",
      "Observation and Reasoning",
      "Avoiding Hasty Conclusions",
      "Solving Mysteries Through Evidence",
    ],
    sections: createSections([
      fill([
        "The story begins on a bright Monday morning at ______ School.",
        "The school bell guided students throughout the ______.",
        "The principal was Mrs. ______.",
        "The peon was called ______ Uncle.",
        "Careful observation can help solve a ______.",
      ]),
      mcq([
        ["What was the name of the school?", "Vidya Vihar School", "Green Valley School", "Sunrise School", "City Public School"],
        ["Who was the principal?", "Mrs. Rao", "Ms. Leela", "Mrs. Sen", "Ms. Anita"],
        ["What happened before assembly?", "The bell did not ring", "The school closed", "The students went home", "The teachers left"],
        ["Who hurried towards the wooden frame?", "Raghav Uncle", "Raman", "Ravi", "Hariram"],
        ["What should we do before blaming someone?", "Look for evidence", "Spread rumours", "Guess immediately", "Ignore the facts"],
      ]),
      tf([
        "The story takes place at Vidya Vihar School.",
        "The school bell rang normally before assembly.",
        "Mrs. Rao was the principal.",
        "Raghav Uncle checked where the bell was kept.",
        "The story encourages careful observation.",
      ]),
      short([
        "Where did the story take place?",
        "Why was the school bell important?",
        "What happened when assembly was about to begin?",
        "Who was Raghav Uncle?",
        "Why should we avoid blaming people without evidence?",
      ]),
      short([
        "How can a small confusion create a mystery?",
        "Why is it important to check facts before making accusations?",
        "Describe the steps you would take to solve a missing-object mystery.",
        "How can teamwork help solve problems at school?",
        "Explain how observation and reasoning can prevent misunderstandings.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 11
  // =====================================================
  {
    chapter: "11",
    title: "Kalpana Chawla: The Girl Who Touched the Stars",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Kalpana Chawla's Childhood",
      "Curiosity About the Sky",
      "Education and Discipline",
      "Dreams and Determination",
      "Women in Space Exploration",
    ],
    sections: createSections([
      fill([
        "Kalpana Chawla was born in ______, Haryana.",
        "Her family called her ______ at home.",
        "Kalpana dreamed of travelling into ______.",
        "She was curious, quiet and ______.",
        "An ______ is a person trained to travel and work in space.",
      ]),
      mcq([
        ["Where was Kalpana Chawla born?", "Karnal", "Delhi", "Mumbai", "Jaipur"],
        ["What was Kalpana's nickname?", "Montu", "Ravi", "Raman", "Kavya"],
        ["What fascinated Kalpana as a child?", "The sky and aircraft", "Cooking", "Fishing", "Gardening only"],
        ["Which school did Kalpana attend in Karnal?", "Tagore Bal Niketan School", "Vidya Vihar School", "Delhi Public School", "St. Mary's School"],
        ["Which qualities helped Kalpana pursue her dream?", "Curiosity and determination", "Laziness and fear", "Carelessness", "Giving up easily"],
      ]),
      tf([
        "Kalpana Chawla grew up in Karnal, Haryana.",
        "Her family called her Montu.",
        "Kalpana was never interested in aircraft.",
        "She enjoyed observing and asking questions.",
        "Determination can help us pursue our dreams.",
      ]),
      short([
        "Who was Kalpana Chawla?",
        "Where did Kalpana grow up?",
        "What was Kalpana's nickname?",
        "Why did Kalpana enjoy watching aircraft?",
        "What qualities helped Kalpana follow her dream?",
      ]),
      short([
        "How did Kalpana's childhood curiosity influence her interests?",
        "Why are observation and questioning important in learning?",
        "How can education help a person achieve an ambitious goal?",
        "What can students learn from Kalpana Chawla's determination?",
        "Explain why children should be encouraged to pursue their interests regardless of gender.",
      ]),
    ]),
  },

  // =====================================================
  // CHAPTER 12
  // =====================================================
  {
    chapter: "12",
    title: "Keep Going",
    name: "",
    className: "4",
    date: "",
    learningFocus: [
      "Perseverance and Patience",
      "Facing Difficulties",
      "Learning from Failure",
      "Courage and Self-Belief",
      "Poetic Language and Imagery",
    ],
    sections: createSections([
      fill([
        "When the road is ______ and long, take a breath and travel on.",
        "If you stumble or fall, ______ again.",
        "Courage grows from deep ______.",
        "Every effort helps you learn and helps you ______.",
        "The poem encourages patience and ______.",
      ]),
      mcq([
        ["What should we do when we stumble?", "Rise again", "Give up", "Blame others", "Stop learning"],
        ["What grows from deep within?", "Courage", "Anger", "Fear", "Jealousy"],
        ["What does the poem say about every effort?", "It helps us learn and grow", "It is always wasted", "It guarantees victory", "It should be avoided"],
        ["What may hide the morning sun?", "Clouds", "Flowers", "Birds", "Books"],
        ["What is the main message of the poem?", "Keep trying with patience", "Win every race", "Never face difficulties", "Avoid new challenges"],
      ]),
      tf([
        "The poem describes a steep and long road.",
        "The poem advises us to give up after falling.",
        "Courage can grow from within.",
        "Every effort can help us learn.",
        "Patience and perseverance help us continue.",
      ]),
      short([
        "What should we do when we fall?",
        "What is courage?",
        "Why is every effort important?",
        "What does the steep road represent?",
        "What message does the poem give to children?",
      ]),
      short([
        "Explain how perseverance helps us achieve our goals.",
        "Why is it not necessary to win every race?",
        "How can mistakes help us become better learners?",
        "Describe a difficult task that requires patience and repeated effort.",
        "Explain the meaning of the title 'Keep Going' with an example from daily life.",
      ]),
    ]),
  },
];
