const quizData = [
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
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "High Text Machine Language"
    ],
    answer: 2
  },
  {
    question: "Which language is used for styling web pages?",
    options: [
      "HTML",
      "JQuery",
      "CSS",
      "XML"
    ],
    answer: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: [
      "Python Script",
      "JQuery",
      "Django",
      "NodeJS"
    ],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    answer: 0
  }
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
