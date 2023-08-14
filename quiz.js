import questions from "./questions.js";
import Quiz from "./QuizClass.js";



function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  const optionsList = document.getElementById("options");

  questionElement.textContent = question.question;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("options");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => handleAnswerClick(index));
    optionsList.appendChild(optionElement);
  });
}

function handleAnswerClick(selectedIndex) {
  if (selectedIndex === quiz.getCurrentQuestion().correctAnswer) {
    quiz.score++;
    displayResult("Correct!", true);
  } else {
    displayResult("Incorrect!", false);
  }
  moveToNextQuestion();
}

function displayResult(message, isCorrect) {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("none");
  resultElement.textContent = message;
  if (isCorrect) {
    resultElement.classList.add("correct");
  } else {
    resultElement.classList.add("incorrect");
  }
  setTimeout(() => {
    resultElement.textContent = "";
    resultElement.classList.add("none");
    resultElement.classList.remove("correct", "incorrect");
  }, 1500);
}

function moveToNextQuestion() {
  quiz.currentQuestionIndex++;

  if (quiz.currentQuestionIndex < quiz.questions.length) {
    displayQuestion(quiz.getCurrentQuestion());
    stopTimer();
    startTimer();
  } else {
    displayFinalScore();
  }
}

function startTimer() {
  const timeElement = document.getElementById("time");
  let timeRemaining = quiz.timeLimit;

  quiz.timer = setInterval(() => {
    timeElement.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(quiz.timer);
      moveToNextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(quiz.timer);
}

function displayFinalScore() {
  const finalScore = quiz.score;
  const quizContainer = document.getElementById("quiz-container");

  const scoreElement = document.createElement("div");
  scoreElement.classList.add("final_result");
  scoreElement.textContent = `Your Score: ${finalScore}/${quiz.questions.length}`;
  quizContainer.appendChild(scoreElement);

  const restartButton = document.createElement("button");

  restartButton.textContent = "Restart Quiz";
  scoreElement.appendChild(restartButton);

  restartButton.classList.add("restart-button");
  stopTimer();
  restartButton.addEventListener("click", () => {
    quiz.currentQuestionIndex = 0;
    quiz.score = 0;
    displayQuestion(quiz.getCurrentQuestion());
    startTimer();
    quizContainer.removeChild(scoreElement);
    quizContainer.removeChild(restartButton);
  });
}

const quiz = new Quiz(questions);

const quizContainer = document.getElementById("quiz-container");

const startButton = document.querySelector(".start_button");
startButton.addEventListener("click", function () {
  quizContainer.classList.remove("none");
  displayQuestion(quiz.getCurrentQuestion());
  startTimer();
  startButton.classList.add("none");
});
