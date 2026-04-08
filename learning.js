// Ensure the entire HTML document is fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {

    console.log("Learning page script successfully loaded!");

    // 1. Get the 'Check Answer' button element from the DOM
    const checkBtn = document.getElementById('check-answer-btn');

    // 2. Bind a click event listener to the button (Silent for V1)
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            // For V1, the button clicks silently without any annoying popups.
            // Actual validation logic (checking correct/wrong answers) will be implemented here in V2.
            console.log("Check Answer button clicked.");
        });
    }

    // 3. Note: Logic for the interactive Image Slider (Before/After comparison) will be added to this file in V2.
});