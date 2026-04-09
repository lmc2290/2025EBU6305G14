const quizData = [
    {
        question: "What does HTML mainly control in a web page?",
        options: [
            "Page structure and content",
            "Page colors only",
            "Server database",
            "Internet speed"
        ],
        answer: 0,
        explanation: "HTML is used to build the structure and content of a webpage, such as headings, paragraphs, images, and buttons."
    },
    {
        question: "What is the main role of CSS?",
        options: [
            "To store user data",
            "To make websites interactive",
            "To control style and layout",
            "To connect to the server"
        ],
        answer: 2,
        explanation: "CSS is used to control the appearance of a webpage, including colors, spacing, fonts, and layout."
    },
    {
        question: "What is JavaScript mainly used for?",
        options: [
            "Styling the page",
            "Adding interactivity and logic",
            "Replacing HTML completely",
            "Drawing only images"
        ],
        answer: 1,
        explanation: "JavaScript adds behavior to the webpage, such as button clicks, quiz checking, dynamic content, and other interactions."
    },
    {
        question: "Which combination is correct?",
        options: [
            "HTML for behavior, CSS for data, JS for structure",
            "HTML for structure, CSS for style, JS for behavior",
            "HTML for database, CSS for logic, JS for color",
            "CSS for structure, JS for style, HTML for animation"
        ],
        answer: 1,
        explanation: "The classic division is: HTML = structure, CSS = style, JavaScript = behavior."
    }
];

let currentQuestion = 0;
let selectedAnswers = new Array(quizData.length).fill(null);
let score = 0;

const questionTitle = document.querySelector(".question-card h2");
const optionsContainer = document.querySelector(".options");
const submitButton = document.querySelector(".submit-btn");
const feedbackCard = document.querySelector(".feedback-card");
const feedbackTitle = document.querySelector(".feedback-card h3");
const feedbackText = document.querySelector(".feedback-card p");
const prevButton = document.querySelector(".navigation-buttons .btn-secondary");
const nextButton = document.querySelector(".navigation-buttons .btn-primary");
const progressBar = document.querySelector(".progress");
const testContainer = document.querySelector(".test-container");

function renderQuestion() {
    const questionData = quizData[currentQuestion];
    questionTitle.textContent = `Question ${currentQuestion + 1} of ${quizData.length}: ${questionData.question}`;

    optionsContainer.innerHTML = "";

    questionData.options.forEach((optionText, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";

        if (selectedAnswers[currentQuestion] === index) {
            optionDiv.classList.add("selected");
        }

        optionDiv.innerHTML = `
            <input type="radio" id="option${index}" name="question" value="${index}" ${selectedAnswers[currentQuestion] === index ? "checked" : ""}>
            <label for="option${index}">${optionText}</label>
        `;

        optionDiv.addEventListener("click", () => {
            if (submitButton.disabled) return;

            selectedAnswers[currentQuestion] = index;
            renderQuestion();
        });

        optionsContainer.appendChild(optionDiv);
    });

    feedbackCard.className = "feedback-card";
    feedbackTitle.textContent = "";
    feedbackText.textContent = "";

    submitButton.disabled = false;
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question";

    updateProgress();
}

function updateProgress() {
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function submitAnswer() {
    const selected = selectedAnswers[currentQuestion];

    if (selected === null) {
        alert("Please select an answer before submitting.");
        return;
    }

    const questionData = quizData[currentQuestion];
    const optionElements = document.querySelectorAll(".option");

    optionElements.forEach((optionEl, index) => {
        optionEl.classList.remove("selected");

        if (index === questionData.answer) {
            optionEl.classList.add("correct");
        }

        if (index === selected && index !== questionData.answer) {
            optionEl.classList.add("wrong");
        }
    });

    if (selected === questionData.answer) {
        feedbackCard.className = "feedback-card show correct";
        feedbackTitle.textContent = "Correct!";
        feedbackText.textContent = questionData.explanation;
    } else {
        feedbackCard.className = "feedback-card show incorrect";
        feedbackTitle.textContent = "Incorrect";
        feedbackText.textContent = questionData.explanation;
    }

    submitButton.disabled = true;
}

function calculateScore() {
    score = 0;
    quizData.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            score++;
        }
    });
}

function showResult() {
    calculateScore();
    progressBar.style.width = "100%";

    testContainer.innerHTML = `
        <div class="result-card show">
            <h2>Quiz Completed</h2>
            <p>You have finished the test.</p>
            <div class="score-text">${score} / ${quizData.length}</div>
            <p>Your score is ${Math.round((score / quizData.length) * 100)}%</p>
            <button class="btn btn-primary" id="restartQuiz">Try Again</button>
        </div>
    `;

    document.getElementById("restartQuiz").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    currentQuestion = 0;
    selectedAnswers = new Array(quizData.length).fill(null);
    score = 0;

    testContainer.innerHTML = `
        <div class="question-card">
            <h2></h2>
            <div class="options"></div>
            <button class="btn btn-primary submit-btn">Submit Answer</button>
        </div>

        <div class="feedback-card">
            <h3></h3>
            <p></p>
        </div>

        <div class="navigation-buttons">
            <button class="btn btn-secondary">Previous Question</button>
            <button class="btn btn-primary">Next Question</button>
        </div>
    `;

    rebindElements();
    renderQuestion();
}

function rebindElements() {
    window.questionTitle = document.querySelector(".question-card h2");
    window.optionsContainer = document.querySelector(".options");
    window.submitButton = document.querySelector(".submit-btn");
    window.feedbackCard = document.querySelector(".feedback-card");
    window.feedbackTitle = document.querySelector(".feedback-card h3");
    window.feedbackText = document.querySelector(".feedback-card p");
    window.prevButton = document.querySelector(".navigation-buttons .btn-secondary");
    window.nextButton = document.querySelector(".navigation-buttons .btn-primary");

    submitButton.addEventListener("click", submitAnswer);

    prevButton.addEventListener("click", () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentQuestion === quizData.length - 1) {
            showResult();
        } else {
            currentQuestion++;
            renderQuestion();
        }
    });
}

submitButton.addEventListener("click", submitAnswer);

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestion === quizData.length - 1) {
        showResult();
    } else {
        currentQuestion++;
        renderQuestion();
    }
});

renderQuestion();