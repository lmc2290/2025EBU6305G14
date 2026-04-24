// DOM Elements
const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uploadUI = document.getElementById('upload-ui');
const slider = document.getElementById('magicSlider');

const faceEmoji = document.getElementById('face-emoji');
const sizeText = document.getElementById('size-text');
const mascot = document.getElementById('mascot'); // The interactive mascot

let originalImage = null;

// === Web Audio API Sound Engine ===
let audioCtx;
let currentOsc;

function playSlideSound(percentage) {
    // Initialize AudioContext on first interaction
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Stop previous sound if sliding quickly
    if (currentOsc) {
        currentOsc.stop();
        currentOsc.disconnect();
    }

    currentOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Pitch mapping: Smaller size (lower percentage) = Higher pitch (lighter feeling)
    const freq = 800 - (percentage * 5);
    currentOsc.type = 'sine';
    currentOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Create a short, snappy envelope
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

            // Resize logic to fit container
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

            // Initialize rendering at 100% quality
            renderPixelated(100);
            updateUI(100);
        }
        img.src = event.target.result;
    }
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Listen to Slider Changes
slider.addEventListener('input', function() {
    const value = this.value;

    // Play sound feedback
    playSlideSound(value);

    // Update visual elements
    updateUI(value);

    // Apply pixelation effect if image exists
    if(originalImage) {
        renderPixelated(value);
    }
});

// Core logic to update emojis, colors, and mascot animations
function updateUI(value) {
    sizeText.innerText = value + "%";

    // Remove all previous animation classes
    mascot.classList.remove('mascot-float', 'mascot-bounce', 'mascot-shake', 'mascot-crushed');

    if (value > 80) {
        // High quality, but very heavy file size
        faceEmoji.innerText = "🤩";
        mascot.innerText = "🐘"; // Elephant
        mascot.classList.add('mascot-crushed');
        sizeText.style.background = "#ee5253"; // Red warning
    } else if (value > 50) {
        // Good quality, slightly heavy
        faceEmoji.innerText = "😊";
        mascot.innerText = "🧳"; // Suitcase
        mascot.classList.add('mascot-shake');
        sizeText.style.background = "#ff9f43"; // Orange
    } else if (value > 20) {
        // Perfect balance
        faceEmoji.innerText = "😵‍💫"; // Blurry eyes
        mascot.innerText = "🎒"; // Light backpack
        mascot.classList.add('mascot-bounce');
        sizeText.style.background = "#1dd1a1"; // Green (Good)
    } else {
        // Too blurry, but very light
        faceEmoji.innerText = "😭";
        mascot.innerText = "🎈"; // Floating balloon
        mascot.classList.add('mascot-float');
        sizeText.style.background = "#54a0ff"; // Blue (Light)
    }
}

// Simulate Blur/Pixelation by downscaling and upscaling
function renderPixelated(qualityValue) {
    // Calculate the scale factor (1.0 = 100%, 0.02 = 2%)
    let scaleFactor = qualityValue / 100;

    // Minimum scale limit so it doesn't disappear completely
    if(scaleFactor < 0.02) scaleFactor = 0.02;

    const w = canvas.width;
    const h = canvas.height;
    const scaledW = w * scaleFactor;
    const scaledH = h * scaleFactor;

    // Disable smoothing to create pixelated/blurry blocks
    ctx.imageSmoothingEnabled = false;

    // Draw downscaled image (loses data)
    ctx.drawImage(originalImage, 0, 0, scaledW, scaledH);

    // Draw back stretched to original canvas size
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
}