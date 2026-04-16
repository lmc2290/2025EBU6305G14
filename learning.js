document.addEventListener('DOMContentLoaded', () => {
    console.log("Learning Page V2 Initialized.");

    /* --- KIDS MODE TOGGLE LOGIC --- */
    const modeToggle = document.getElementById('kids-mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('kids-theme');
                console.log("Switched to Kids Mode");
            } else {
                document.body.classList.remove('kids-theme');
                console.log("Switched to Pro Mode");
            }
        });
    }

    /* --- QUIZ VALIDATION LOGIC --- */
    const checkBtn = document.getElementById('check-answer-btn');
    const feedback = document.getElementById('quiz-feedback');

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            const selected = document.querySelector('input[name="quiz1"]:checked');
            const isKids = document.body.classList.contains('kids-theme');

            if (!selected) {
                feedback.style.color = "orange";
                feedback.innerText = isKids ? "Pick an answer first! 🤔" : "Please select an option.";
                return;
            }

            if (selected.value === "efficiency") {
                feedback.style.color = "green";
                feedback.innerText = isKids ? "🎉 Correct! You're a wizard!" : "Correct! Efficiency is key.";
            } else {
                feedback.style.color = "red";
                feedback.innerText = isKids ? "Oops! Try again! 🥺" : "Incorrect. Try again.";
            }
        });
    }
});