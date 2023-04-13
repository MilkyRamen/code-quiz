const quiz = [
    {
        question: "which keyword doesnt declare variables in javascript",
        answers: ["var", "const", "div", "let"],
        correct: "div"
    },

    {
        question: "how do you comment in css",
        answers: ["//", "<!--", "/*"],
        correct: "/*"
    },

    {
        question: "when linking a stylesheet where do you put the link",
        answers: ["head", "body", "<p>", "header"],
        correct:"head"
    }

];

let  currentQuestion = 0;
let timer = 60;
let score = 0;

document.getElementById("start").addEventListener("click", startQuiz)

function startQuiz() {
    document.getElementById("start").style.display = "none";

    showQuestion();

    setInterval(updateTimer, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const answerContainer = document.getElementById("answer-container");
    questionContainer.textContent = quiz[currentQuestion].question;

    answerContainer.innerHTML = "";

    quiz[currentQuestion].answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", handleAnswer);
        answerContainer.appendChild(button);
    })
}

function handleAnswer(event) {
    const selectedAnswer = event.target.textContent;
    if (selectedAnswer === quiz[currentQuestion].correct) {
        score++;
    } else {
        timer -= 10;
    }

    currentQuestion++;
    if (currentQuestion < quiz.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    timer--;
    const timerElement = document.getElementById("timer");
    if (timerElement !== null){
        timerElement.textContent = 'Time: $(timer)';
    }
    document.getElementById("timer").textContent = 'Time: ${timer}';
}

function endQuiz() {
    clearInterval(timerInterval);

    const questionContainer = document.getElementById("question-container");
    const answerContainer = document.getElementById("answer-container");
    questionContainer.style.display = "none";
    answerContainer.style.display = "none";

    const formContainer = document.getElementById("form-container");
    const scoreDisplay = document.getElementById("score-display");
    formContainer.style.display = "block";
    scoreDisplay.textContent = `Your score is ${score}`;

    const form = document.getElementById("initials-form");
  form.addEventListener("submit", saveScore);
}

function saveScore(event) {
    event.preventDefault();

    const initials = document.getElementById("initials-input").value;

    const scoreObject = {
        initials: initials,
        score: score
};

const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(scoreObject);
  localStorage.setItem("scores", JSON.stringify(scores));

  window.location.href = "high-scores.html";
}