document.addEventListener('DOMContentLoaded', () => {
    console.log("Learning Page V3 Initialized with Sound Effects.");

    /* =========================================
       🎵 V3 FEATURE: 音效预加载 (Audio Preloading)
       ========================================= */
    const soundCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'); // 极短促的清脆“叮”声
    const soundWrong = new Audio('https://assets.mixkit.co/active_storage/sfx/2954/2954-preview.mp3');   // 极短促的轻微“嘟”声
    const soundMagic = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');  // 可爱的“啵”气泡点击音（适合 Kids Mode）
    // 设置音量
    soundCorrect.volume = 0.5;
    soundWrong.volume = 0.5;
    soundMagic.volume = 0.6;

    /* =========================================
       1. KIDS MODE TOGGLE LOGIC (带音效)
       ========================================= */
    const modeToggle = document.getElementById('kids-mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('kids-theme');
                console.log("Switched to Kids Mode");

                // 切到儿童模式时，播放魔法音效！✨
                // 添加 .catch 避免浏览器自动播放拦截报错
                soundMagic.currentTime = 0;
                soundMagic.play().catch(err => console.log("Audio playback prevented:", err));
            } else {
                document.body.classList.remove('kids-theme');
                console.log("Switched to Pro Mode");
            }
        });
    }

    /* =========================================
       2. QUIZ VALIDATION LOGIC (带音效)
       ========================================= */
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
                feedback.style.color = "#27ae60"; // 现代的高级绿色
                feedback.innerText = isKids ? "🎉 Correct! You're a wizard!" : "Correct! Excellent job.";

                // 答对了，播放正确的音效！
                soundCorrect.currentTime = 0;
                soundCorrect.play().catch(err => console.log("Audio playback prevented:", err));

            } else {
                feedback.style.color = "#e74c3c"; // 现代的高级红色
                feedback.innerText = isKids ? "Oops! Try again! 🥺" : "Incorrect. Try again.";

                // 答错了，播放错误的音效！
                soundWrong.currentTime = 0;
                soundWrong.play().catch(err => console.log("Audio playback prevented:", err));
            }
        });
    }

    /* =========================================
       3. IMAGE BEFORE/AFTER SLIDER
       ========================================= */
    const slider = document.getElementById('compression-slider');
    const highResImage = document.getElementById('slider-high-res');

    if (slider && highResImage) {
        // 监听滑块的拖动事件
        slider.addEventListener('input', (event) => {
            // 获取滑块当前的值 (0 到 100)
            const sliderValue = event.target.value;
            // 实时改变高清图的宽度百分比
            highResImage.style.width = sliderValue + '%';
        });
    }
});