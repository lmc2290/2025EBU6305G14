document.addEventListener('DOMContentLoaded', () => {
    console.log("Learning Page V4 - UI, Sound & Gamification Initialized.");

    /* =========================================
       🎵 V3 音效系统
       ========================================= */
    const soundCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
    const soundWrong = new Audio('https://assets.mixkit.co/active_storage/sfx/2954/2954-preview.mp3');
    const soundMagic = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    soundCorrect.volume = 0.5; soundWrong.volume = 0.5; soundMagic.volume = 0.6;

    const safePlay = (audioElement) => {
        audioElement.currentTime = 0;
        let playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => console.warn("Audio blocked:", err));
        }
    };

    /* =========================================
       📈 V4 FEATURE: 顶部阅读进度条
       ========================================= */
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            // 计算滚动百分比
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            // 实时更新进度条宽度
            progressBar.style.width = scrollPercentage + '%';
        });
    }

    /* =========================================
       🎉 V4 FEATURE: 纯 JS 全屏撒花特效函数
       ========================================= */
    const shootConfetti = () => {
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#ff9ff3'];
        // 生成 50 片随机的彩纸
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            document.body.appendChild(confetti);

            // 随机分配颜色、横向位置、下落速度和延迟
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'; // 2到4秒不等
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            // 动画结束后自动清理垃圾节点
            setTimeout(() => { confetti.remove(); }, 4500);
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
                safePlay(soundMagic);
            } else {
                document.body.classList.remove('kids-theme');
            }
        });
    }

    /* =========================================
       2. QUIZ VALIDATION (触发撒花!)
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
                feedback.style.color = "#27ae60";
                // V4 升级：答对时给予专属勋章称号
                feedback.innerHTML = isKids
                    ? "🎉 Correct! You earned the <strong>Compression Wizard Badge! 🏅</strong>"
                    : "Correct! You are now a <strong>Compression Master. 🏅</strong>";

                safePlay(soundCorrect); // 播放“叮”
                shootConfetti();        // 👑 触发全屏撒花！

            } else {
                feedback.style.color = "#e74c3c";
                feedback.innerText = isKids ? "Oops! Try again! 🥺" : "Incorrect. Try again.";
                safePlay(soundWrong);
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