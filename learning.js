document.addEventListener('DOMContentLoaded', () => {
    console.log("Learning Page V4 - UI & Sound Initialized.");

    /* =========================================
       🎵 音效系统 (极简短促版)
       ========================================= */
    const soundCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
    const soundWrong = new Audio('https://assets.mixkit.co/active_storage/sfx/2954/2954-preview.mp3');
    const soundMagic = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    soundCorrect.volume = 0.5;
    soundWrong.volume = 0.5;
    soundMagic.volume = 0.6;

    // 播放音频的安全函数（防止浏览器拦截报错）
    const safePlay = (audioElement) => {
        audioElement.currentTime = 0;
        let playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Browser blocked the audio playback:", error);
            });
        }
    };

    /* =========================================
       1. KIDS MODE TOGGLE
       ========================================= */
    const modeToggle = document.getElementById('kids-mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('kids-theme');
                safePlay(soundMagic); // 播放魔法音效
            } else {
                document.body.classList.remove('kids-theme');
            }
        });
    }

    /* =========================================
       2. QUIZ VALIDATION
       ========================================= */
    const checkBtn = document.getElementById('check-answer-btn');
    const feedback = document.getElementById('quiz-feedback');

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            // 获取选中的答案
            const selected = document.querySelector('input[name="quiz1"]:checked');
            const isKids = document.body.classList.contains('kids-theme');

            if (!selected) {
                feedback.style.color = "orange";
                feedback.innerText = isKids ? "Pick an answer first! 🤔" : "Please select an option.";
                return;
            }

            // 判断对错
            if (selected.value === "efficiency") {
                feedback.style.color = "#27ae60";
                feedback.innerText = isKids ? "🎉 Correct! You're a wizard!" : "Correct! Excellent job.";
                safePlay(soundCorrect); // 播放“叮”
            } else {
                feedback.style.color = "#e74c3c";
                feedback.innerText = isKids ? "Oops! Try again! 🥺" : "Incorrect. Try again.";
                safePlay(soundWrong); // 播放“嘟”
            }
        });
    }

    /* =========================================
       3. BEFORE/AFTER SLIDER
       ========================================= */
    const slider = document.getElementById('compression-slider');
    const highResImage = document.getElementById('slider-high-res');

    if (slider && highResImage) {
        slider.addEventListener('input', (event) => {
            highResImage.style.width = event.target.value + '%';
        });
    }
});