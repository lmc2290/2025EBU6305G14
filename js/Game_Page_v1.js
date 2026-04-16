/**
 * Game_Page_v1.js
 * Logic for the Educational Image Compression Game (Professional Version)
 */

// ==========================================
// 1. Global State & DOM Elements
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const imageLoader = document.getElementById('imageLoader');
const uploadUI = document.getElementById('upload-ui');

// Metric Displays
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const psnrDisplay = document.getElementById('psnr-display');
const ssimDisplay = document.getElementById('ssim-display');
const sizePercentage = document.getElementById('size-percentage');
const progressBarFill = document.getElementById('progress-bar-fill');
const feedbackMsg = document.getElementById('feedback-msg');

// Game State
let originalImage = null;
let currentMode = 'compression';
let gameTimer = null;
let secondsElapsed = 0;
let isPlaying = false;
let baseFileSize = 100000; // Mock base size for calculations

// ==========================================
// 2. Game Mode Configurations
// ==========================================
const MODE_DATA = {
  compression: {
    title: "Compression Challenge",
    instructions: `
            <p style="margin-bottom: 15px;">Welcome to the Compression Challenge! Balance size and quality.</p>
            <ul>
                <li>Upload your image to start.</li>
                <li>Adjust the compression quality slider.</li>
                <li>Aim for the lowest size while keeping PSNR above 30dB!</li>
            </ul>`,
    controlsHtml: `
            <label>JPEG Quality Level:</label>
            <div class="slider-container">
                <span>Low (Blocky)</span>
                <input type="range" id="quality-slider" min="1" max="100" value="80" oninput="handleCompressionChange(this.value)">
                <span>High (Clear)</span>
            </div>`
  },
  rle: {
    title: "RLE Game (Run-Length Encoding)",
    instructions: `
            <p style="margin-bottom: 15px;">RLE compresses data by grouping consecutive identical pixels.</p>
            <ul>
                <li>RLE struggles with photos because colors change constantly.</li>
                <li>Adjust the "Color Quantization" slider to reduce colors.</li>
                <li>See how flat color areas drastically improve RLE compression!</li>
            </ul>`,
    controlsHtml: `
            <label>Color Quantization (Make flat areas for RLE):</label>
            <div class="slider-container">
                <span>Few Colors</span>
                <input type="range" id="rle-slider" min="2" max="64" value="32" oninput="handleRLEChange(this.value)">
                <span>Many Colors</span>
            </div>`
  },
  dct: {
    title: "Advanced DCT Control",
    instructions: `
            <p style="margin-bottom: 15px;">DCT separates images into frequency components.</p>
            <ul>
                <li>High frequencies contain sharp edges and details.</li>
                <li>Low frequencies contain general colors and shapes.</li>
                <li>Cut high frequencies to save space (causes blurriness).</li>
            </ul>`,
    controlsHtml: `
            <label>Cut High Frequencies (Low-Pass Filter):</label>
            <div class="slider-container">
                <span>Keep All</span>
                <input type="range" id="dct-slider" min="0" max="20" value="0" step="1" oninput="handleDCTChange(this.value)">
                <span>Heavy Cut</span>
            </div>`
  }
};

// ==========================================
// 3. Image Upload & Canvas Rendering
// ==========================================
imageLoader.addEventListener('change', handleImageUpload);

function handleImageUpload(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      originalImage = img;
      uploadUI.style.display = 'none';
      canvas.style.display = 'block';

      // Resize canvas to fit container while maintaining aspect ratio
      const container = canvas.parentElement;
      const maxWidth = container.clientWidth - 20;
      const maxHeight = container.clientHeight - 20;

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

      // Draw initial image
      resetCanvas();
      startGame();
    }
    img.src = event.target.result;
  }
  if(e.target.files[0]) {
    baseFileSize = e.target.files[0].size;
    reader.readAsDataURL(e.target.files[0]);
  }
}

function resetCanvas() {
  if (!originalImage) return;
  ctx.filter = 'none'; // Clear filters
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
}

// ==========================================
// 4. Tab Switching Logic
// ==========================================
function switchMode(mode) {
  currentMode = mode;
  const data = MODE_DATA[mode];

  // Update Active Tab Button
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Update Text Content
  document.getElementById('page-title').innerText = data.title;
  document.getElementById('breadcrumb-title').innerText = data.title;
  document.getElementById('instruction-content').innerHTML = data.instructions;
  document.getElementById('specific-controls').innerHTML = data.controlsHtml;

  // Reset Canvas and Metrics based on mode
  resetCanvas();
  if (originalImage) {
    if (mode === 'compression') handleCompressionChange(80);
    if (mode === 'rle') handleRLEChange(32);
    if (mode === 'dct') handleDCTChange(0);
  }
}

// ==========================================
// 5. Core Game Logic & Simulations
// ==========================================

/**
 * Mode 1: JPEG Compression Simulation
 * Uses native canvas toDataURL to perform actual JPEG compression visually
 */
function handleCompressionChange(quality) {
  if (!originalImage) return;
  resetCanvas();

  const qualityLevel = quality / 100; // 0.01 to 1.0

  // Export canvas as JPEG to get artifacting
  const compressedDataUrl = canvas.toDataURL('image/jpeg', qualityLevel);

  // Draw the compressed image back to canvas to show artifacts
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Calculate dynamic metrics
    const sizeRatio = Math.max(10, Math.floor(qualityLevel * 85 + 15)); // 15% to 100%
    const psnr = (20 + (qualityLevel * 25)).toFixed(1);
    const ssim = (0.50 + (qualityLevel * 0.49)).toFixed(2);

    updateMetricsUI(sizeRatio, psnr, ssim, quality);
  };
  img.src = compressedDataUrl;
}

/**
 * Mode 2: RLE Game Simulation
 * Simulates Color Quantization to show how RLE relies on redundant data
 */
function handleRLEChange(colorLevels) {
  if (!originalImage) return;
  resetCanvas();

  // Simulated posterization (reducing color palette)
  // In a real advanced app, we'd manipulate imageData.data
  ctx.filter = `contrast(1.2) saturate(1.5) brightness(1.1) grayscale(${100 - (colorLevels/64 * 100)}%)`;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

  // RLE is lossless, so quality is perfect, but size drops drastically if colors are fewer
  const sizeRatio = Math.max(5, Math.floor((colorLevels / 64) * 100));
  updateMetricsUI(sizeRatio, "Infinity", "1.00", 100);

  feedbackMsg.innerText = sizeRatio < 30 ?
      "Great! Flat colors make RLE run-lengths much longer!" :
      "Too many colors! RLE can't find continuous pixels to group.";
}

/**
 * Mode 3: DCT / Frequency Control Simulation
 * Uses CSS Blur filter to simulate cutting high frequencies
 */
function handleDCTChange(blurAmount) {
  if (!originalImage) return;

  // Blur visually mimics the loss of high-frequency DCT coefficients
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

  // As we cut high frequencies (more blur), size drops, but quality plummets
  const sizeRatio = Math.max(15, 100 - (blurAmount * 4));
  const psnr = Math.max(15, (40 - blurAmount * 1.5)).toFixed(1);
  const ssim = Math.max(0.3, (0.98 - blurAmount * 0.03)).toFixed(2);

  updateMetricsUI(sizeRatio, psnr, ssim, 100 - (blurAmount*5));
}

// ==========================================
// 6. UI Updates and Timers
// ==========================================
function updateMetricsUI(sizeRatio, psnr, ssim, qualityVal) {
  sizePercentage.innerText = `${sizeRatio}%`;
  progressBarFill.style.width = `${sizeRatio}%`;

  psnrDisplay.innerText = `PSNR: ${psnr} ${psnr !== "Infinity" ? 'dB' : ''}`;
  ssimDisplay.innerText = `SSIM: ${ssim}`;

  // Calculate Game Score
  // Score rewards low file size but heavily penalizes low quality
  let score = 1000 + (100 - sizeRatio) * 15 - (100 - qualityVal) * 10;
  if (score < 0) score = 0;
  scoreDisplay.innerText = Math.floor(score);

  // Update Feedback Message dynamically
  if (currentMode === 'compression' || currentMode === 'dct') {
    if (sizeRatio > 80) feedbackMsg.innerText = "File is still very large. Try compressing more!";
    else if (sizeRatio < 30 && psnr < 25) feedbackMsg.innerText = "Careful! Quality is dropping too low.";
    else feedbackMsg.innerText = `"Great balance! You saved ${100 - sizeRatio}% file size."`;
  }
}

// Timer Controls
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('pause-btn').addEventListener('click', pauseGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startGame() {
  if (!originalImage) {
    alert("Please upload an image first!");
    return;
  }
  if (!isPlaying) {
    isPlaying = true;
    gameTimer = setInterval(() => {
      secondsElapsed++;
      timeDisplay.innerText = formatTime(secondsElapsed);
    }, 1000);
  }
}

function pauseGame() {
  isPlaying = false;
  clearInterval(gameTimer);
}

function restartGame() {
  pauseGame();
  secondsElapsed = 0;
  timeDisplay.innerText = "00:00";
  if (originalImage) {
    switchMode(currentMode); // Resets current mode sliders
    startGame();
  }
}