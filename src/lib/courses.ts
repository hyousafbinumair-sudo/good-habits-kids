// All course data for Super Kids Learn — ages 6-9.

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  intro: string;
  points: { icon: string; text: string }[];
  story?: { title: string; body: string; moral: string };
  videoSearch?: string; // a kid-safe YouTube search term
}

export interface QuizQ {
  q: string;
  opts: string[];
  ans: number;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  color: "sun" | "sky" | "mint" | "coral" | "grape" | "bubblegum";
  lessons: Lesson[];
  quiz: QuizQ[];
}

export const COURSES: Course[] = [
  {
    id: "civics",
    title: "Be a Good Citizen",
    tagline: "Rights, duties & community helpers",
    emoji: "🏛️",
    color: "sky",
    lessons: [
      {
        id: "community",
        title: "What is a Community?",
        emoji: "🤝",
        intro:
          "A community is a group of people who live, work and play in the same place. We help each other so everyone is safe and happy.",
        points: [
          { icon: "🏠", text: "Your home, street and city are part of your community." },
          { icon: "👨‍👩‍👧", text: "Families, neighbours and friends all matter." },
          { icon: "🌳", text: "Take care of shared places like parks and roads." },
        ],
        story: {
          title: "Aria's Tidy Park",
          body: "Aria saw rubbish in the park where she played football. She picked up a wrapper and put it in the bin. Soon her friends joined in and the park sparkled again.",
          moral: "Small kind actions make a big difference.",
        },
      },
      {
        id: "rights",
        title: "Your Rights as a Child",
        emoji: "📜",
        intro: "Every child in the world has special rights. They keep you safe, healthy and happy.",
        points: [
          { icon: "📚", text: "Right to learn and go to school." },
          { icon: "🍎", text: "Right to food, water and a home." },
          { icon: "🩺", text: "Right to healthcare when you are sick." },
          { icon: "🎨", text: "Right to play, rest and have fun." },
        ],
      },
      {
        id: "duties",
        title: "Your Duties",
        emoji: "🌟",
        intro: "Rights come with duties. A good citizen does these things every day.",
        points: [
          { icon: "🗑️", text: "Never litter — use a bin." },
          { icon: "🙏", text: "Respect elders, teachers and friends." },
          { icon: "💧", text: "Save water and electricity." },
          { icon: "🤥", text: "Always tell the truth." },
        ],
      },
      {
        id: "helpers",
        title: "Community Helpers",
        emoji: "👮",
        intro: "Many people work hard to keep the community running. Always say thanks!",
        points: [
          { icon: "👮", text: "Police keep us safe." },
          { icon: "👩‍⚕️", text: "Doctors and nurses keep us healthy." },
          { icon: "👩‍🏫", text: "Teachers help us learn." },
          { icon: "🚒", text: "Firefighters save lives." },
          { icon: "🧹", text: "Cleaners keep streets tidy." },
        ],
      },
    ],
    quiz: [
      { q: "What does a good citizen do with trash?", opts: ["Throw it on the street", "Put it in a bin", "Hide it", "Give it away"], ans: 1 },
      { q: "Which one is YOUR right?", opts: ["Skip school", "Be rude", "Get an education", "Drive a car"], ans: 2 },
      { q: "Police officers...", opts: ["Collect money", "Keep us safe", "Drive fast for fun", "Only work at night"], ans: 1 },
      { q: "We follow school rules so that...", opts: ["Teachers are happy", "Everyone is safe and learns", "We get prizes", "Nothing"], ans: 1 },
      { q: "If a friend is bullied you should...", opts: ["Join in", "Walk away", "Tell a trusted adult", "Laugh"], ans: 2 },
      { q: "Public parks belong to...", opts: ["Rich people", "Government only", "Everyone", "No-one"], ans: 2 },
      { q: "Honesty means...", opts: ["Telling lies", "Telling the truth", "Hiding things", "Stealing"], ans: 1 },
      { q: "Saving water is...", opts: ["Silly", "Important for everyone", "Only for grown-ups", "A waste of time"], ans: 1 },
    ],
  },
  {
    id: "stranger-safety",
    title: "Stranger Safety",
    tagline: "Stay safe with the NO • GO • TELL rule",
    emoji: "🚨",
    color: "coral",
    lessons: [
      {
        id: "who",
        title: "Who Is a Stranger?",
        emoji: "❓",
        intro:
          "A stranger is anyone you do NOT know personally. Most people are kind, but you must always be careful — even with friendly faces.",
        points: [
          { icon: "🙅", text: "Looking nice doesn't mean someone is safe." },
          { icon: "🚫", text: "Never go anywhere with someone you don't know." },
          { icon: "👨‍👩‍👧", text: "Always check with a parent first." },
        ],
      },
      {
        id: "no-go-tell",
        title: "NO • GO • TELL",
        emoji: "🛑",
        intro: "If something feels wrong, follow these 3 steps right away.",
        points: [
          { icon: "🙅‍♂️", text: "NO — say no loudly and clearly." },
          { icon: "🏃", text: "GO — get away fast to a busy place." },
          { icon: "🗣️", text: "TELL — tell a trusted adult immediately." },
        ],
        story: {
          title: "Bilal Speaks Up",
          body: "A man at the park said he had puppies in his car. Bilal felt funny inside. He shouted 'NO!', ran to a shopkeeper, and called his mum. The police came and the man was caught.",
          moral: "Trust your feelings. Speak up. Run to safety.",
        },
      },
      {
        id: "trusted",
        title: "Your Trusted Adults",
        emoji: "💛",
        intro: "These are the people you can ALWAYS talk to about anything.",
        points: [
          { icon: "👪", text: "Parents and guardians." },
          { icon: "👵", text: "Grandparents." },
          { icon: "👩‍🏫", text: "Your teacher and principal." },
          { icon: "👮", text: "Police officers in uniform." },
        ],
      },
      {
        id: "online",
        title: "Online Safety",
        emoji: "💻",
        intro: "Strangers exist on the internet too. Keep your details secret.",
        points: [
          { icon: "🔒", text: "Never share your name, school or address." },
          { icon: "📷", text: "Never send photos to people you don't know." },
          { icon: "🚪", text: "Tell a parent if anything feels weird." },
        ],
      },
    ],
    quiz: [
      { q: "A stranger offers you sweets. You...", opts: ["Take them", "Follow them", "Say NO and tell an adult", "Hide them"], ans: 2 },
      { q: "Who is a trusted adult?", opts: ["Anyone friendly", "Your teacher or parent", "A stranger in nice clothes", "Anyone with gifts"], ans: 1 },
      { q: "Online, never share your...", opts: ["Favourite colour", "Favourite cartoon", "Address and school", "Pet's name"], ans: 2 },
      { q: "If a stranger grabs you, you should...", opts: ["Stay quiet", "Scream and shout for help", "Be polite", "Wait"], ans: 1 },
      { q: "NO GO TELL stands for...", opts: ["No play, go home, tell stories", "Say no, get away, tell an adult", "No talk, go slow, tell friends", "None"], ans: 1 },
      { q: "Lost in a mall, you should...", opts: ["Walk alone outside", "Go to a shop counter and ask staff", "Hide", "Cry alone"], ans: 1 },
      { q: "Safe secret?", opts: ["Hidden adult secrets", "A surprise party", "Hiding hurt", "Stranger secrets"], ans: 1 },
      { q: "Your body belongs to...", opts: ["Everyone", "Only parents", "Only YOU", "Teachers"], ans: 2 },
    ],
  },
  {
    id: "health",
    title: "Health & Hygiene",
    tagline: "Wash, eat well, sleep well",
    emoji: "🧼",
    color: "mint",
    lessons: [
      {
        id: "germs",
        title: "Tiny Germs",
        emoji: "🦠",
        intro:
          "Germs are tiny living things you can't see. They can make you sick. Soap and water wash them away!",
        points: [
          { icon: "🧼", text: "Wash hands for 20 seconds (sing Happy Birthday twice!)." },
          { icon: "🤧", text: "Cover sneezes with your elbow." },
          { icon: "🚫", text: "Don't touch your face with dirty hands." },
        ],
      },
      {
        id: "habits",
        title: "Daily Habits",
        emoji: "😁",
        intro: "Healthy habits make a strong, happy body.",
        points: [
          { icon: "🪥", text: "Brush teeth twice a day." },
          { icon: "🛁", text: "Bathe every day." },
          { icon: "👕", text: "Wear clean clothes." },
          { icon: "💇", text: "Trim nails and comb hair." },
        ],
      },
      {
        id: "food",
        title: "Eat the Rainbow",
        emoji: "🥗",
        intro: "Different colours of food give different super-powers!",
        points: [
          { icon: "🍎", text: "Fruit & veg = vitamins." },
          { icon: "🥛", text: "Milk = strong bones." },
          { icon: "🌾", text: "Roti & rice = energy." },
          { icon: "🥚", text: "Eggs & beans = strong muscles." },
          { icon: "💧", text: "6–8 glasses of water every day." },
        ],
      },
      {
        id: "sleep",
        title: "Sleep & Play",
        emoji: "😴",
        intro: "Your body grows when you sleep, and gets stronger when you play.",
        points: [
          { icon: "🌙", text: "Sleep 9–11 hours every night." },
          { icon: "🏃", text: "Move and play 1 hour every day." },
          { icon: "📵", text: "Less screen time = better sleep." },
        ],
      },
    ],
    quiz: [
      { q: "Wash hands for at least...", opts: ["1 second", "20 seconds", "5 seconds", "Never"], ans: 1 },
      { q: "Brush your teeth...", opts: ["Once a week", "Only when eating sweets", "Twice a day", "Never"], ans: 2 },
      { q: "Drink how many glasses of water?", opts: ["1", "2", "6–8", "20"], ans: 2 },
      { q: "Strong bones come from...", opts: ["Chips", "Cola", "Milk", "Sweets"], ans: 2 },
      { q: "Sleep how many hours?", opts: ["4", "9–11", "1", "All day"], ans: 1 },
      { q: "When you sneeze, cover with your...", opts: ["Hand", "Elbow", "Hair", "Friend"], ans: 1 },
      { q: "A healthy snack is...", opts: ["Crisps", "Soda", "An apple", "Chocolate bar"], ans: 2 },
      { q: "Exercise makes you...", opts: ["Tired forever", "Stronger and happier", "Sad", "Sick"], ans: 1 },
    ],
  },
  {
    id: "math",
    title: "Math Magic",
    tagline: "Numbers, shapes & money",
    emoji: "🔢",
    color: "grape",
    lessons: [
      {
        id: "place-value",
        title: "Place Value",
        emoji: "🔟",
        intro:
          "In the number 247, the 2 is hundreds, the 4 is tens and the 7 is ones. Each spot has a special name!",
        points: [
          { icon: "1️⃣", text: "Ones are single units." },
          { icon: "🔟", text: "Tens are groups of 10." },
          { icon: "💯", text: "Hundreds are groups of 100." },
        ],
      },
      {
        id: "addition",
        title: "Add It Up",
        emoji: "➕",
        intro: "Adding means putting things together. 3 + 4 = 7 means 3 apples join 4 apples.",
        points: [
          { icon: "🍎", text: "Use objects to count." },
          { icon: "🧮", text: "Line up tens and ones." },
          { icon: "🔁", text: "Order doesn't matter: 3 + 4 = 4 + 3." },
        ],
      },
      {
        id: "shapes",
        title: "Shapes Around Us",
        emoji: "🔷",
        intro: "Shapes are everywhere. Squares have 4 equal sides, triangles have 3, circles are round.",
        points: [
          { icon: "🟦", text: "Square = 4 equal sides." },
          { icon: "🔺", text: "Triangle = 3 sides." },
          { icon: "⚪", text: "Circle = no corners." },
          { icon: "📐", text: "Rectangle = 4 sides, opposites equal." },
        ],
      },
      {
        id: "money",
        title: "Money Basics",
        emoji: "💰",
        intro: "Money helps us trade for the things we need. Saving means keeping some for later.",
        points: [
          { icon: "🪙", text: "Coins and notes have different values." },
          { icon: "🏦", text: "A piggy bank helps you save." },
          { icon: "🛒", text: "Needs (food) come before wants (toys)." },
        ],
      },
    ],
    quiz: [
      { q: "What is 6 + 5?", opts: ["10", "11", "12", "9"], ans: 1 },
      { q: "In 384, the digit 8 is in the...", opts: ["Ones", "Tens", "Hundreds", "Thousands"], ans: 1 },
      { q: "A triangle has...", opts: ["2 sides", "3 sides", "4 sides", "5 sides"], ans: 1 },
      { q: "12 - 7 =", opts: ["4", "5", "6", "7"], ans: 1 },
      { q: "Which is heavier? An elephant or a feather?", opts: ["Feather", "Elephant", "Same", "Don't know"], ans: 1 },
      { q: "Half of 10 is...", opts: ["2", "3", "5", "10"], ans: 2 },
      { q: "A square has how many equal sides?", opts: ["2", "3", "4", "5"], ans: 2 },
      { q: "Saving money means...", opts: ["Spend it all", "Lose it", "Keep some for later", "Burn it"], ans: 2 },
    ],
  },
  {
    id: "science",
    title: "Science Wonders",
    tagline: "Space, weather, animals & more",
    emoji: "🔬",
    color: "sun",
    lessons: [
      {
        id: "space",
        title: "Our Solar System",
        emoji: "🪐",
        intro:
          "We live on planet Earth, the third planet from the Sun. There are 8 planets dancing around the Sun!",
        points: [
          { icon: "☀️", text: "The Sun is a giant ball of hot gas." },
          { icon: "🌍", text: "Earth is the only planet with life we know of." },
          { icon: "🌕", text: "The Moon goes around Earth." },
        ],
      },
      {
        id: "weather",
        title: "Weather & Seasons",
        emoji: "🌦️",
        intro: "Weather changes every day. Seasons change every few months!",
        points: [
          { icon: "☀️", text: "Summer = hot & sunny." },
          { icon: "🍂", text: "Autumn = cool & leaves fall." },
          { icon: "❄️", text: "Winter = cold (sometimes snow!)." },
          { icon: "🌸", text: "Spring = warm & flowers bloom." },
        ],
      },
      {
        id: "states",
        title: "Solid, Liquid, Gas",
        emoji: "🧊",
        intro: "Water can be ice (solid), water (liquid) or steam (gas). Same stuff, three forms!",
        points: [
          { icon: "🧊", text: "Solid keeps its shape." },
          { icon: "💧", text: "Liquid takes the shape of its cup." },
          { icon: "💨", text: "Gas spreads out everywhere." },
        ],
      },
      {
        id: "animals",
        title: "Animal Kingdom",
        emoji: "🦁",
        intro: "Animals are grouped by what they share. Mammals have fur, birds have feathers, fish have scales.",
        points: [
          { icon: "🐶", text: "Mammals breathe air and have fur." },
          { icon: "🦅", text: "Birds have feathers and lay eggs." },
          { icon: "🐠", text: "Fish live in water and have gills." },
          { icon: "🐍", text: "Reptiles have dry, scaly skin." },
        ],
      },
    ],
    quiz: [
      { q: "How many planets in our solar system?", opts: ["6", "7", "8", "9"], ans: 2 },
      { q: "Water as a solid is called...", opts: ["Steam", "Ice", "Mist", "Cloud"], ans: 1 },
      { q: "Birds have...", opts: ["Scales", "Fur", "Feathers", "Shells"], ans: 2 },
      { q: "We live on planet...", opts: ["Mars", "Earth", "Venus", "Sun"], ans: 1 },
      { q: "Which season has snow in many places?", opts: ["Summer", "Spring", "Winter", "Autumn"], ans: 2 },
      { q: "Fish breathe with...", opts: ["Lungs", "Gills", "Skin", "Mouth"], ans: 1 },
      { q: "The Sun is a...", opts: ["Planet", "Star", "Moon", "Comet"], ans: 1 },
      { q: "Steam is water as a...", opts: ["Solid", "Liquid", "Gas", "Rock"], ans: 2 },
    ],
  },
  {
    id: "internet-safety",
    title: "Internet Safety",
    tagline: "Smart, kind & safe online",
    emoji: "💻",
    color: "bubblegum",
    lessons: [
      {
        id: "secrets",
        title: "Keep Secrets Secret",
        emoji: "🔐",
        intro: "Some things should NEVER be shared online — even if someone seems nice.",
        points: [
          { icon: "🏠", text: "Never share your address." },
          { icon: "🏫", text: "Never share your school name." },
          { icon: "📱", text: "Never share your phone number." },
          { icon: "🔑", text: "Never share passwords (not even with friends)." },
        ],
      },
      {
        id: "kind",
        title: "Be Kind Online",
        emoji: "💖",
        intro: "Behind every screen is a real person with feelings. Be the friendly one.",
        points: [
          { icon: "💬", text: "Type only what you'd say in person." },
          { icon: "🛑", text: "Never join in bullying — tell an adult." },
          { icon: "🙂", text: "Spread positive comments." },
        ],
      },
      {
        id: "screen-time",
        title: "Healthy Screen Time",
        emoji: "⏰",
        intro: "Screens are fun, but your eyes and brain need breaks too.",
        points: [
          { icon: "🕒", text: "Take a break every 20 minutes." },
          { icon: "👀", text: "Look at something far away to rest your eyes." },
          { icon: "🌳", text: "Play outside every day." },
        ],
      },
    ],
    quiz: [
      { q: "Online, you should never share your...", opts: ["Favourite food", "Address", "Favourite song", "Joke"], ans: 1 },
      { q: "If someone is mean online you...", opts: ["Be mean back", "Tell a trusted adult", "Keep it secret", "Cry alone"], ans: 1 },
      { q: "Passwords are...", opts: ["For everyone", "Secret keys — never share", "On posters", "Useless"], ans: 1 },
      { q: "After 20 minutes of screen, you should...", opts: ["Keep going", "Take a quick break", "Sleep", "Eat sweets"], ans: 1 },
      { q: "Strangers online can be...", opts: ["Trusted always", "Pretending — be careful", "Family", "Teachers"], ans: 1 },
      { q: "Best response to a rude message?", opts: ["Reply rudely", "Tell an adult", "Share with friends", "Cry"], ans: 1 },
    ],
  },
  {
    id: "manners",
    title: "Good Manners",
    tagline: "Be the kindest kid in the room",
    emoji: "🤗",
    color: "bubblegum",
    lessons: [
      {
        id: "magic-words",
        title: "Magic Words",
        emoji: "✨",
        intro: "Three little words make every day brighter.",
        points: [
          { icon: "🙏", text: "PLEASE when you ask." },
          { icon: "💛", text: "THANK YOU when you receive." },
          { icon: "🙇", text: "SORRY when you make a mistake." },
        ],
      },
      {
        id: "table",
        title: "Table Manners",
        emoji: "🍽️",
        intro: "Mealtime is happy time when we share kindly.",
        points: [
          { icon: "🤐", text: "Chew with your mouth closed." },
          { icon: "🤚", text: "Wait your turn for food." },
          { icon: "🧽", text: "Clean up after eating." },
        ],
      },
      {
        id: "listening",
        title: "Listen Well",
        emoji: "👂",
        intro: "Good listeners make the best friends.",
        points: [
          { icon: "👀", text: "Look at the person speaking." },
          { icon: "🤫", text: "Don't interrupt — wait your turn." },
          { icon: "💭", text: "Ask questions to understand." },
        ],
      },
    ],
    quiz: [
      { q: "When you ask for something say...", opts: ["Now!", "Please", "Hurry", "Mine"], ans: 1 },
      { q: "After receiving a gift...", opts: ["Walk away", "Say thank you", "Ask for more", "Throw it"], ans: 1 },
      { q: "When someone is talking, you should...", opts: ["Interrupt", "Listen", "Shout", "Leave"], ans: 1 },
      { q: "If you make a mistake, say...", opts: ["Nothing", "Sorry", "It wasn't me", "Goodbye"], ans: 1 },
      { q: "At the table chew with mouth...", opts: ["Open", "Closed", "Full", "Sideways"], ans: 1 },
      { q: "A good friend is...", opts: ["Bossy", "Kind & honest", "Mean", "Loud"], ans: 1 },
    ],
  },
];

export const TOTAL_COURSES = COURSES.length;

export function getCourse(id: string) {
  return COURSES.find((c) => c.id === id);
}
