(function () {
    const state = {
        currentLang: "en",
        fontSize: 16,
        selectedDifficulty: null,
        currentQuiz: [],
        currentQuestion: 0,
        selectedAnswers: [],
        submittedAnswers: [],
        hasStarted: false,
        isCompleted: false,
        savedSnapshot: null
    };

    const elements = {
        breadcrumbText: document.getElementById("breadcrumbText"),

        logoText: document.getElementById("logoText"),
        navHome: document.getElementById("navHome"),
        navLearning: document.getElementById("navLearning"),
        navGames: document.getElementById("navGames"),
        navTest: document.getElementById("navTest"),
        navCommunity: document.getElementById("navCommunity"),

        footerTitle: document.getElementById("footerTitle"),
        footerQuickLinks: document.getElementById("footerQuickLinks"),
        footerHome: document.getElementById("footerHome"),
        footerLearning: document.getElementById("footerLearning"),
        footerGames: document.getElementById("footerGames"),
        footerTest: document.getElementById("footerTest"),
        footerCommunity: document.getElementById("footerCommunity"),

        languageLabel: document.getElementById("languageLabel"),
        fontSizeLabel: document.getElementById("fontSizeLabel"),

        introTitle: document.getElementById("introTitle"),
        introDescription: document.getElementById("introDescription"),
        infoTitle1: document.getElementById("infoTitle1"),
        infoText1: document.getElementById("infoText1"),
        infoTitle2: document.getElementById("infoTitle2"),
        infoText2: document.getElementById("infoText2"),
        infoTitle3: document.getElementById("infoTitle3"),
        infoText3: document.getElementById("infoText3"),

        resumeBox: document.getElementById("resumeBox"),
        resumeText: document.getElementById("resumeText"),
        resumeQuizBtn: document.getElementById("resumeQuizBtn"),

        difficultyTitle: document.getElementById("difficultyTitle"),
        easyName: document.getElementById("easyName"),
        easyDesc: document.getElementById("easyDesc"),
        mediumName: document.getElementById("mediumName"),
        mediumDesc: document.getElementById("mediumDesc"),
        hardName: document.getElementById("hardName"),
        hardDesc: document.getElementById("hardDesc"),

        startQuizBtn: document.getElementById("startQuizBtn"),
        goLearningBtn: document.getElementById("goLearningBtn"),

        introScreen: document.getElementById("introScreen"),
        quizScreen: document.getElementById("quizScreen"),
        resultScreen: document.getElementById("resultScreen"),

        progressLabel: document.getElementById("progressLabel"),
        progressCount: document.getElementById("progressCount"),
        progressTrack: document.getElementById("progressTrack"),
        progressBar: document.getElementById("progressBar"),

        difficultyBadge: document.getElementById("difficultyBadge"),
        questionNumberText: document.getElementById("questionNumberText"),
        questionTitle: document.getElementById("questionTitle"),
        optionsContainer: document.getElementById("optionsContainer"),
        submitBtn: document.getElementById("submitBtn"),
        prevBtn: document.getElementById("prevBtn"),
        nextBtn: document.getElementById("nextBtn"),

        statusMessage: document.getElementById("statusMessage"),
        feedbackCard: document.getElementById("feedbackCard"),
        feedbackTitle: document.getElementById("feedbackTitle"),
        feedbackText: document.getElementById("feedbackText"),

        resultDifficultyBadge: document.getElementById("resultDifficultyBadge"),
        resultTitle: document.getElementById("resultTitle"),
        resultSubtitle: document.getElementById("resultSubtitle"),
        scoreText: document.getElementById("scoreText"),
        percentageText: document.getElementById("percentageText"),
        performanceText: document.getElementById("performanceText"),
        retryBtn: document.getElementById("retryBtn"),
        reviewLearningBtn: document.getElementById("reviewLearningBtn"),
        reviewTitle: document.getElementById("reviewTitle"),
        wrongAnswersList: document.getElementById("wrongAnswersList"),

        langButtons: document.querySelectorAll("[data-lang]"),
        fontButtons: document.querySelectorAll("[data-font]"),
        difficultyButtons: document.querySelectorAll(".difficulty-btn")
    };

    function t(key) {
        return window.uiText[state.currentLang][key] || key;
    }

    function getDifficultyLabel(difficulty) {
        const map = {
            easy: t("easyName"),
            medium: t("mediumName"),
            hard: t("hardName")
        };
        return map[difficulty] || "";
    }

    function showScreen(name) {
        elements.introScreen.classList.add("hidden");
        elements.quizScreen.classList.add("hidden");
        elements.resultScreen.classList.add("hidden");

        if (name === "intro") {
            elements.introScreen.classList.remove("hidden");
        } else if (name === "quiz") {
            elements.quizScreen.classList.remove("hidden");
        } else if (name === "result") {
            elements.resultScreen.classList.remove("hidden");
        }
    }

    function showStatus(message, type = "info") {
        elements.statusMessage.textContent = message;
        elements.statusMessage.className = `status-message ${type}`;
    }

    function hideStatus() {
        elements.statusMessage.textContent = "";
        elements.statusMessage.className = "status-message hidden";
    }

    function setLanguage(lang) {
        state.currentLang = lang;

        elements.langButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        elements.logoText.textContent = t("logo");
        elements.navHome.textContent = t("navHome");
        elements.navLearning.textContent = t("navLearning");
        elements.navGames.textContent = t("navGames");
        elements.navTest.textContent = t("navTest");
        elements.navCommunity.textContent = t("navCommunity");

        elements.footerTitle.textContent = t("logo");
        elements.footerQuickLinks.textContent = t("footerQuickLinks");
        elements.footerHome.textContent = t("navHome");
        elements.footerLearning.textContent = t("navLearning");
        elements.footerGames.textContent = t("navGames");
        elements.footerTest.textContent = t("navTest");
        elements.footerCommunity.textContent = t("navCommunity");

        elements.breadcrumbText.innerHTML = t("breadcrumb");
        elements.languageLabel.textContent = t("languageLabel");
        elements.fontSizeLabel.textContent = t("fontSizeLabel");

        elements.introTitle.textContent = t("introTitle");
        elements.introDescription.textContent = t("introDescription");
        elements.infoTitle1.textContent = t("infoTitle1");
        elements.infoText1.textContent = t("infoText1");
        elements.infoTitle2.textContent = t("infoTitle2");
        elements.infoText2.textContent = t("infoText2");
        elements.infoTitle3.textContent = t("infoTitle3");
        elements.infoText3.textContent = t("infoText3");

        elements.resumeText.textContent = t("resumeText");
        elements.resumeQuizBtn.textContent = t("resumeQuiz");

        elements.difficultyTitle.textContent = t("difficultyTitle");
        elements.easyName.textContent = t("easyName");
        elements.easyDesc.textContent = t("easyDesc");
        elements.mediumName.textContent = t("mediumName");
        elements.mediumDesc.textContent = t("mediumDesc");
        elements.hardName.textContent = t("hardName");
        elements.hardDesc.textContent = t("hardDesc");

        elements.startQuizBtn.textContent = t("startTest");
        elements.goLearningBtn.textContent = t("goLearning");

        elements.progressLabel.textContent = t("progressLabel");
        elements.submitBtn.textContent = t("submitAnswer");
        elements.prevBtn.textContent = t("previousQuestion");

        elements.resultTitle.textContent = t("resultTitle");
        elements.resultSubtitle.textContent = t("resultSubtitle");
        elements.retryBtn.textContent = t("retry");
        elements.reviewLearningBtn.textContent = t("reviewLearning");
        elements.reviewTitle.textContent = t("reviewTitle");

        if (state.hasStarted && !state.isCompleted) {
            renderQuestion();
        }

        if (state.isCompleted) {
            renderResult();
        }
    }

    function setFontSize(size) {
        state.fontSize = Number(size);
        document.documentElement.style.setProperty("--base-font-size", `${state.fontSize}px`);

        elements.fontButtons.forEach((btn) => {
            btn.classList.toggle("active", Number(btn.dataset.font) === state.fontSize);
        });
    }

    function selectDifficulty(difficulty) {
        state.selectedDifficulty = difficulty;

        elements.difficultyButtons.forEach((btn) => {
            btn.classList.toggle("selected", btn.dataset.difficulty === difficulty);
        });

        elements.startQuizBtn.disabled = false;
        hideStatus();
    }

    function createNewQuizSession(difficulty) {
        const sourceQuiz = window.quizSets[difficulty];

        state.selectedDifficulty = difficulty;
        state.currentQuiz = sourceQuiz.slice();
        state.currentQuestion = 0;
        state.selectedAnswers = new Array(sourceQuiz.length).fill(null);
        state.submittedAnswers = new Array(sourceQuiz.length).fill(false);
        state.hasStarted = true;
        state.isCompleted = false;
    }

    function persistState() {
        if (!state.hasStarted || state.isCompleted || !state.selectedDifficulty) {
            window.TestStorage.clear();
            return;
        }

        window.TestStorage.save({
            currentLang: state.currentLang,
            fontSize: state.fontSize,
            selectedDifficulty: state.selectedDifficulty,
            currentQuestion: state.currentQuestion,
            selectedAnswers: state.selectedAnswers,
            submittedAnswers: state.submittedAnswers,
            hasStarted: state.hasStarted,
            isCompleted: state.isCompleted
        });
    }

    function isValidSnapshot(snapshot) {
        if (!snapshot) return false;
        if (!snapshot.hasStarted) return false;
        if (!snapshot.selectedDifficulty) return false;
        if (!window.quizSets[snapshot.selectedDifficulty]) return false;

        const quizLength = window.quizSets[snapshot.selectedDifficulty].length;

        if (!Array.isArray(snapshot.selectedAnswers) || snapshot.selectedAnswers.length !== quizLength) return false;
        if (!Array.isArray(snapshot.submittedAnswers) || snapshot.submittedAnswers.length !== quizLength) return false;
        if (typeof snapshot.currentQuestion !== "number") return false;

        return true;
    }

    function showResumeIfAvailable() {
        const snapshot = window.TestStorage.load();

        if (isValidSnapshot(snapshot)) {
            state.savedSnapshot = snapshot;
            elements.resumeBox.classList.remove("hidden");
            elements.resumeText.textContent = t("resumeText");
            elements.resumeQuizBtn.textContent = t("resumeQuiz");
        } else {
            state.savedSnapshot = null;
            elements.resumeBox.classList.add("hidden");
        }
    }

    function resumeQuiz() {
        if (!isValidSnapshot(state.savedSnapshot)) return;

        const snapshot = state.savedSnapshot;

        state.currentLang = snapshot.currentLang || "en";
        state.fontSize = Number(snapshot.fontSize) || 16;
        state.selectedDifficulty = snapshot.selectedDifficulty;
        state.currentQuiz = window.quizSets[state.selectedDifficulty].slice();
        state.currentQuestion = snapshot.currentQuestion;
        state.selectedAnswers = snapshot.selectedAnswers.slice();
        state.submittedAnswers = snapshot.submittedAnswers.slice();
        state.hasStarted = true;
        state.isCompleted = false;

        setFontSize(state.fontSize);
        setLanguage(state.currentLang);
        selectDifficulty(state.selectedDifficulty);

        showScreen("quiz");
        renderQuestion();
        persistState();
    }

    function startQuiz() {
        if (!state.selectedDifficulty) {
            showStatus(t("chooseDifficultyWarning"), "error");
            return;
        }

        createNewQuizSession(state.selectedDifficulty);
        showScreen("quiz");
        renderQuestion();
        persistState();
    }

    function updateProgress() {
        const answeredCount = state.submittedAnswers.filter(Boolean).length;
        const total = state.currentQuiz.length;
        const percentage = Math.round((answeredCount / total) * 100);

        elements.progressBar.style.width = `${percentage}%`;
        elements.progressCount.textContent = `${state.currentQuestion + 1} / ${total}`;
        elements.progressTrack.setAttribute("aria-valuenow", String(percentage));
    }

    function renderOptions(questionData) {
        elements.optionsContainer.innerHTML = "";

        questionData.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";
            optionDiv.tabIndex = 0;

            const isSelected = state.selectedAnswers[state.currentQuestion] === index;
            const isSubmitted = state.submittedAnswers[state.currentQuestion];
            const isCorrect = questionData.answer === index;

            if (isSelected) {
                optionDiv.classList.add("selected");
            }

            if (isSubmitted) {
                optionDiv.classList.add("locked");

                if (isCorrect) {
                    optionDiv.classList.add("correct");
                } else if (isSelected && !isCorrect) {
                    optionDiv.classList.add("wrong");
                }
            }

            optionDiv.innerHTML = `
                <input
                    type="radio"
                    id="option${index}"
                    name="question"
                    value="${index}"
                    ${isSelected ? "checked" : ""}
                    ${isSubmitted ? "disabled" : ""}
                    aria-label="${option[state.currentLang]}"
                >
                <label for="option${index}">${option[state.currentLang]}</label>
            `;

            const selectThisOption = () => {
                if (isSubmitted) return;
                state.selectedAnswers[state.currentQuestion] = index;
                showStatus(t("savedAnswerMessage"), "info");
                renderQuestion();
            };

            optionDiv.addEventListener("click", selectThisOption);
            optionDiv.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectThisOption();
                }
            });

            elements.optionsContainer.appendChild(optionDiv);
        });
    }

    function renderFeedback(questionData) {
        const submitted = state.submittedAnswers[state.currentQuestion];
        const selected = state.selectedAnswers[state.currentQuestion];

        if (!submitted) {
            elements.feedbackCard.className = "feedback-card";
            elements.feedbackTitle.textContent = "";
            elements.feedbackText.textContent = "";
            return;
        }

        const isCorrect = selected === questionData.answer;

        elements.feedbackCard.className = `feedback-card show ${isCorrect ? "correct" : "incorrect"}`;
        elements.feedbackTitle.textContent = isCorrect ? t("correctTitle") : t("incorrectTitle");
        elements.feedbackText.textContent = questionData.explanation[state.currentLang];
    }

    function renderQuestion() {
        const questionData = state.currentQuiz[state.currentQuestion];
        const total = state.currentQuiz.length;
        const submitted = state.submittedAnswers[state.currentQuestion];

        elements.difficultyBadge.textContent = getDifficultyLabel(state.selectedDifficulty);

        if (state.currentLang === "en") {
            elements.questionNumberText.textContent = `${t("questionLabel")} ${state.currentQuestion + 1} ${t("ofLabel")} ${total}`;
        } else {
            elements.questionNumberText.textContent = `${t("questionLabel")} ${state.currentQuestion + 1} ${t("ofLabel")} ${total}`;
        }

        elements.questionTitle.textContent = questionData.question[state.currentLang];

        if (!submitted && state.selectedAnswers[state.currentQuestion] === null) {
            hideStatus();
        }

        renderOptions(questionData);
        renderFeedback(questionData);
        updateProgress();

        elements.prevBtn.disabled = state.currentQuestion === 0;
        elements.nextBtn.textContent =
            state.currentQuestion === total - 1 ? t("finishQuiz") : t("nextQuestion");

        elements.submitBtn.disabled = submitted;
        elements.submitBtn.textContent = t("submitAnswer");
    }

    function submitCurrentAnswer() {
        const selected = state.selectedAnswers[state.currentQuestion];

        if (selected === null) {
            showStatus(t("selectAnswerWarning"), "error");
            return;
        }

        state.submittedAnswers[state.currentQuestion] = true;
        hideStatus();
        renderQuestion();
        persistState();
    }

    function goToPreviousQuestion() {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            hideStatus();
            renderQuestion();
            persistState();
        }
    }

    function goToNextQuestion() {
        if (!state.submittedAnswers[state.currentQuestion]) {
            showStatus(t("submitBeforeNextWarning"), "error");
            return;
        }

        if (state.currentQuestion === state.currentQuiz.length - 1) {
            showResult();
            return;
        }

        state.currentQuestion++;
        hideStatus();
        renderQuestion();
        persistState();
    }

    function calculateScore() {
        let score = 0;

        state.currentQuiz.forEach((question, index) => {
            if (state.selectedAnswers[index] === question.answer) {
                score++;
            }
        });

        return score;
    }

    function getPerformanceMessage(percentage) {
        if (percentage >= 80) return t("performanceHigh");
        if (percentage >= 50) return t("performanceMedium");
        return t("performanceLow");
    }

    function buildWrongAnswersReview() {
        const wrongItems = [];

        state.currentQuiz.forEach((question, index) => {
            const selected = state.selectedAnswers[index];
            const isCorrect = selected === question.answer;

            if (!isCorrect) {
                const yourAnswer =
                    selected === null
                        ? t("noAnswerText")
                        : question.options[selected][state.currentLang];

                wrongItems.push(`
                    <div class="review-item">
                        <h4>${state.currentLang === "en" ? `Question ${index + 1}` : `第 ${index + 1} 题`}</h4>
                        <p><strong>${question.question[state.currentLang]}</strong></p>
                        <p>${t("yourAnswerPrefix")} ${yourAnswer}</p>
                        <p>${t("correctPrefix")} ${question.options[question.answer][state.currentLang]}</p>
                        <p>${question.explanation[state.currentLang]}</p>
                    </div>
                `);
            }
        });

        if (wrongItems.length === 0) {
            elements.wrongAnswersList.innerHTML = `<p>${t("noWrongAnswers")}</p>`;
        } else {
            elements.wrongAnswersList.innerHTML = wrongItems.join("");
        }
    }

    function renderResult() {
        const score = calculateScore();
        const total = state.currentQuiz.length;
        const percentage = Math.round((score / total) * 100);

        elements.resultDifficultyBadge.textContent = getDifficultyLabel(state.selectedDifficulty);
        elements.resultTitle.textContent = t("resultTitle");
        elements.resultSubtitle.textContent = t("resultSubtitle");
        elements.scoreText.textContent = `${score} / ${total}`;
        elements.percentageText.textContent = `${t("scorePrefix")} ${percentage}%`;
        elements.performanceText.textContent = getPerformanceMessage(percentage);

        buildWrongAnswersReview();
    }

    function showResult() {
        state.isCompleted = true;
        renderResult();
        showScreen("result");
        window.TestStorage.clear();
        state.savedSnapshot = null;
        showResumeIfAvailable();
    }

    function retryQuiz() {
        const confirmed = window.confirm(t("restartConfirm"));
        if (!confirmed) return;

        createNewQuizSession(state.selectedDifficulty);
        showScreen("quiz");
        renderQuestion();
        persistState();
    }

    function hasUnfinishedProgress() {
        if (!state.hasStarted || state.isCompleted) return false;

        const hasAnySelection = state.selectedAnswers.some((answer) => answer !== null);
        const hasAnySubmission = state.submittedAnswers.some(Boolean);

        return hasAnySelection || hasAnySubmission;
    }

    function bindEvents() {
        elements.langButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setLanguage(button.dataset.lang);
                if (state.hasStarted && !state.isCompleted) {
                    persistState();
                } else {
                    showResumeIfAvailable();
                }
            });
        });

        elements.fontButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setFontSize(button.dataset.font);
                if (state.hasStarted && !state.isCompleted) {
                    persistState();
                }
            });
        });

        elements.difficultyButtons.forEach((button) => {
            button.addEventListener("click", () => {
                selectDifficulty(button.dataset.difficulty);
            });
        });

        elements.startQuizBtn.addEventListener("click", startQuiz);
        elements.resumeQuizBtn.addEventListener("click", resumeQuiz);
        elements.submitBtn.addEventListener("click", submitCurrentAnswer);
        elements.prevBtn.addEventListener("click", goToPreviousQuestion);
        elements.nextBtn.addEventListener("click", goToNextQuestion);
        elements.retryBtn.addEventListener("click", retryQuiz);

        window.addEventListener("beforeunload", (event) => {
            if (hasUnfinishedProgress()) {
                event.preventDefault();
                event.returnValue = t("leaveConfirm");
            }
        });
    }

    function init() {
        bindEvents();

        setFontSize(state.fontSize);
        setLanguage(state.currentLang);
        showScreen("intro");
        showResumeIfAvailable();
    }

    init();
})();