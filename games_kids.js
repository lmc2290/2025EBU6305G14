// DOM Elements
const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const uploadUI = document.getElementById('upload-ui');
const slider = document.getElementById('magicSlider');

const faceEmoji = document.getElementById('face-emoji');
const sizeText = document.getElementById('size-text');
const mascot = document.getElementById('mascot');

let originalImage = null;

// === Web Audio API Sound Engine ===
let audioCtx;
let currentOsc;

function playSlideSound(percentage) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    if (currentOsc) {
        currentOsc.stop();
        currentOsc.disconnect();
    }

    currentOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    const freq = 800 - (percentage * 5);
    currentOsc.type = 'sine';
    currentOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    currentOsc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    currentOsc.start();
    currentOsc.stop(audioCtx.currentTime + 0.1);
}

// Handle Image Upload
imageLoader.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            uploadUI.style.display = 'none';
            canvas.style.display = 'block';

            const maxWidth = canvas.parentElement.clientWidth - 20;
            const maxHeight = canvas.parentElement.clientHeight - 20;
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            drawCompressedImage(100);
            updateUI(100);
        }
        img.src = event.target.result;
    }
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
});

// === 【新增】粒子引擎：数据掉落特效 ===
let particles = [];
let lastQuality = 100;
let animationId = null;

// 生成掉落的像素方块
function spawnDataParticles(amount) {
    const colors = ['#ff4757', '#1e90ff', '#2ed573', '#f1c40f', '#9b59b6'];
    for(let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5, // 偏上方生成
            size: Math.random() * 15 + 10,          // 像素块大小
            color: colors[Math.random() * colors.length | 0],
            vx: (Math.random() - 0.5) * 4,          // 左右随机飞溅
            vy: Math.random() * 5 + 3,              // 向下掉落
            life: 1.0                               // 生命周期
        });
    }
    if (!animationId) animateParticles();
}

// 渲染动画循环
function animateParticles() {
    // 1. 重新绘制底部的模糊图片
    drawCompressedImage(slider.value);

    // 2. 绘制掉落的方块
    let activeParticles = false;
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // 方块逐渐透明消失

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life > 0) activeParticles = true;
        else particles.splice(i, 1);
    }

    ctx.globalAlpha = 1.0; // 恢复透明度

    // 如果还有粒子存活，继续下一帧动画
    if (activeParticles) {
        animationId = requestAnimationFrame(animateParticles);
    } else {
        animationId = null;
    }
}

// Listen to Slider Changes
slider.addEventListener('input', function() {
    const value = parseInt(this.value);

    playSlideSound(value);
    updateUI(value);

    if (originalImage) {
        // 【互动核心】：只有当画质下降时，才会掉落数据碎片！
        if (value < lastQuality) {
            // 下降幅度越大，掉落的方块越多
            spawnDataParticles((lastQuality - value) * 2);
        }
        lastQuality = value;

        // 如果没有粒子动画正在运行，则手动更新图片
        if (!animationId) {
            drawCompressedImage(value);
        }

        // 【互动核心】：给 Canvas 添加物理挤压动画
        // 画质越低，图片尺寸微缩（模拟被压扁）
        const scale = 0.85 + (value / 100) * 0.15;
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transition = 'transform 0.1s ease-out';
    }
});

// Core logic to update emojis and colors
function updateUI(value) {
    sizeText.innerText = value + "%";
    mascot.classList.remove('mascot-float', 'mascot-bounce', 'mascot-shake', 'mascot-crushed');

    if (value > 80) {
        faceEmoji.innerText = "🤩";
        mascot.innerText = "🐘";
        mascot.classList.add('mascot-crushed');
        sizeText.style.background = "#ee5253";
    } else if (value > 50) {
        faceEmoji.innerText = "😊";
        mascot.innerText = "🧳";
        mascot.classList.add('mascot-shake');
        sizeText.style.background = "#ff9f43";
    } else if (value > 20) {
        faceEmoji.innerText = "😵‍💫";
        mascot.innerText = "🎒";
        mascot.classList.add('mascot-bounce');
        sizeText.style.background = "#1dd1a1";
    } else {
        faceEmoji.innerText = "😭";
        mascot.innerText = "🎈";
        mascot.classList.add('mascot-float');
        sizeText.style.background = "#54a0ff";
    }
}

// Helper: Draw the blurry image
function drawCompressedImage(qualityValue) {
    let scaleFactor = qualityValue / 100;
    if(scaleFactor < 0.02) scaleFactor = 0.02;

    const w = canvas.width;
    const h = canvas.height;
    const scaledW = w * scaleFactor;
    const scaledH = h * scaleFactor;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(originalImage, 0, 0, scaledW, scaledH);
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
}