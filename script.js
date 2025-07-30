const quizData = [
   {
    question: "What does Advertising Technology (AdTech) primarily refer to?",
    options: [
      "The manual process of buying and selling ad space in traditional media",
      "Software and tools used to create, run, manage, measure, and optimize digital advertising campaigns",
      "Companies that exclusively deal with offline advertising campaigns",
      "A financial model for calculating ad agency commission"
    ],
    answer: 1
  },
  {
    question: "What is a Landing Page?",
    options: [
      "A page the user lands on after clicking the ad",
      "The web page where the ad is created",
      "A dashboard in the admin panel",
      "A sitemap page"
    ],
    answer: 0
  },
  {
    question: "According to The AdTech Book, what is the primary goal of an advertiser?",
    options: [
      "To develop new content for online publications",
      "To provide technical support for advertising platforms",
      "To get products or services in front of a target audience to build brand awareness, develop brand loyalty, and increase sales",
      "To manage the technical infrastructure of ad servers"
    ],
    answer: 2
  },
  {
    question: " In the context of digital advertising, what best defines a publisher?",
    options: [
      "A brand or company that buys ad space",
      "A company that develops advertising technology",
      "Any company that produces content that attracts an audience",
      "An organization responsible for setting ad industry standards"
    ],
    answer: 2
  },
  {
    question: "What is ad space in the context of digital advertising?",
    options: [
       "The software and tools used to create, run, manage, measure, and optimize digital advertising campaigns",
       "The financial model that dictates the cost for one thousand ad views",
       "The file containing the actual advertisement that the user is exposed to",
       "The available area on a publisher's website or app that is filled with advertisements"
    ],
    answer: 3
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerId;

const startPage = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionEl = document.getElementById("question");
const timerEl = document.getElementById("timer");
const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const questionCount = document.getElementById("question-count");

questionCount.innerText = quizData.length;

function startQuiz() {
  startPage.classList.add("hide");
  quiz.classList.remove("hide");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = quizData[currentQuestion];
  questionEl.innerText = question.question;
  optionButtons.forEach((btn, index) => {
    btn.innerText = question.options[index];
    btn.disabled = false;
  });
  timeLeft = 15;
  timerEl.innerText = `Time Left: ${timeLeft}s`;
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerEl.innerText = `Time Left: ${timeLeft}s`;
  if (timeLeft === 0) {
    clearInterval(timerId);
    disableOptions();
  }
}

function selectAnswer(index) {
  clearInterval(timerId);
  const correct = quizData[currentQuestion].answer;
  if (index === correct) {
    score++;
    optionButtons[index].style.backgroundColor = "#2ecc71";
  } else {
    optionButtons[index].style.backgroundColor = "#e74c3c";
    optionButtons[correct].style.backgroundColor = "#2ecc71";
  }
  disableOptions();
}

function disableOptions() {
  optionButtons.forEach(btn => {
    btn.disabled = true;
  });
}

function resetState() {
  optionButtons.forEach(btn => {
    btn.style.backgroundColor = "#f0f0f0";
  });
  nextBtn.disabled = false;
}

function nextQuestion() {
  clearInterval(timerId);
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("hide");
  result.classList.remove("hide");
  scoreEl.innerText = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
  result.classList.add("hide");
  startPage.classList.remove("hide");
}
