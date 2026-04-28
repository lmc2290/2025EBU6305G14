/**
 * Game_Page_v1.js
 * Logic for the Educational Image Compression Game (Professional Version)
 */

// ==========================================
// 1. Global State & Elements
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
let baseFileSize = 100000;

// Specific Game States
let rleDifficulty = 'Easy';
let dctTargetBlur = 0;
let currentDCTBlur = 0;
let freqBackgroundCanvas = null;

let dctImageObj = null;
const DEFAULT_DCT_IMAGE_SRC = 'image_a48e5b.jpg';

const RLE_COLORS = [
  { name: 'Red', hex: '#ff4757' },
  { name: 'Blue', hex: '#1e90ff' },
  { name: 'Green', hex: '#2ed573' }
];

// Compression Challenge 关卡数据与状态
let compCurrentLevel = 0;
let ultimateSaves = []; // 用于存储终极关卡的3次提交

const COMPRESSION_LEVELS = [
  {
    type: 'standard',
    client: "Blogger Bob",
    story: "I need a tiny thumbnail for my blog list. It will be displayed very small, so I don't care if it's a bit blocky, just make it load FAST!",
    targetSize: 20,
    targetPSNR: 0
  },
  {
    type: 'standard',
    client: "Social Media Influencer",
    story: "I'm posting this to MyGram. It needs to look decent on mobile phones, but the app limits my file size.",
    targetSize: 45,
    targetPSNR: 30
  },
  {
    type: 'standard',
    client: "Professional Print Shop",
    story: "We are printing this for a billboard. We can tolerate a slightly large file, but the quality must be near-perfect! No visible artifacts allowed.",
    targetSize: 85,
    targetPSNR: 38
  },
  {
    type: 'ultimate',
    client: "Ultimate Boss: The Lead Web Developer",
    story: "I need 3 versions of this image: a Thumbnail, a Mobile display, and a High-Res Desktop version. You have a STRICT TOTAL BUDGET of 150% for all three combined! Average quality must stay above 28dB.",
    budget: 150,
    avgPSNR: 28
  }
];

// ==========================================
// 2. Mode Configurations
// ==========================================
const MODE_DATA = {
  compression: {
    title: "Compression Challenge",
    instructions: `
            <div id="comp-mission-brief" style="background: #e1f5fe; padding: 15px; border-left: 5px solid #3498db; border-radius: 4px; margin-bottom: 15px;">
                <h4 style="color: #2980b9; margin-bottom: 5px;">Mission Board</h4>
                <p>Upload an image to reveal your first client contract!</p>
            </div>
            <ul>
                <li>Read the client's strict requirements carefully.</li>
                <li>Adjust the slider to balance Size and Quality (PSNR).</li>
                <li>Click <b>Submit</b> to evaluate your compression!</li>
            </ul>`,
    controlsHtml: `
            <div id="comp-controls-area" style="opacity: 0.5; pointer-events: none;">
                <label style="font-weight: bold; color: #2c3e50;">Adjust JPEG Quality:</label>
                <div class="slider-container" style="margin: 15px 0;">
                    <span style="color: #e74c3c;">Low (Blocky)</span>
                    <input type="range" id="quality-slider" min="1" max="100" value="100" oninput="handleCompressionChange(this.value)">
                    <span style="color: #2ecc71;">High (Clear)</span>
                </div>
                <button class="controls button rle-check-btn" id="comp-submit-btn" onclick="submitCompression()" style="width: 100%;">📬 Submit to Client</button>
            </div>`
  },
  rle: {
    title: "RLE Puzzle (Run-Length Encoding)",
    instructions: `
            <p style="margin-bottom: 15px;">Compress the data manually!</p>
            <ul>
                <li>Look at the sequence of colored blocks above.</li>
                <li>Count how many consecutive blocks of the same color there are.</li>
                <li>Input the number and select the color below.</li>
                <li>Hit Compress and watch the space shrink!</li>
            </ul>`,
    controlsHtml: `<div id="rle-inputs-container"></div>`
  },
  dct: {
    title: "Advanced DCT Control",
    instructions: `
            <p style="margin-bottom: 15px;">DCT separates images into frequency components.</p>
            <ul>
                <li><strong>Top-Left (Origin):</strong> Low frequencies (general colors).</li>
                <li><strong>Bottom-Right:</strong> High frequencies (sharp edges/details).</li>
                <li>Watch the Frequency Map: as you cut high frequencies, the image blurs, but file size drops massively!</li>
            </ul>`,
    controlsHtml: ``
  }
};

// ==========================================
// 3. Setup & Upload Logic
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

      resetCanvas();

      if (currentMode === 'compression') {
        compCurrentLevel = 0;
        ultimateSaves = [];
        loadCompressionLevel();
        startGame();
      }
    }
    img.src = event.target.result;
  }
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }
}

function resetCanvas() {
  if (!originalImage) return;
  ctx.filter = 'none';
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
}

function loadDCTImage(callback) {
  if (dctImageObj) return callback();
  const img = new Image();
  img.onload = () => { dctImageObj = img; callback(); };
  img.src = DEFAULT_DCT_IMAGE_SRC;
}

// ==========================================
// 4. Tab Switching Logic
// ==========================================
function switchMode(mode, event) {
  currentMode = mode;
  const data = MODE_DATA[mode];

  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (event) event.target.classList.add('active');

  document.getElementById('page-title').innerText = data.title;
  document.getElementById('instruction-content').innerHTML = data.instructions;

  const specificControls = document.getElementById('specific-controls');
  if (specificControls) specificControls.innerHTML = data.controlsHtml;

  const rleVisualArea = document.getElementById('rle-visual-area');
  const canvasContainer = document.getElementById('canvas-container');
  const metricsBox = document.querySelector('.metrics-box');
  const bottomControls = document.querySelector('.game-panel > .controls');

  pauseGame();
  secondsElapsed = 0;
  timeDisplay.innerText = "00:00";

  if (mode === 'rle') {
    canvasContainer.style.display = 'flex';
    canvas.style.display = 'none';
    uploadUI.style.display = 'none';
    rleVisualArea.style.display = 'flex';
    if (metricsBox) metricsBox.style.display = 'none';
    if (bottomControls) bottomControls.style.display = 'none';
    showRLEStartScreen();

  } else if (mode === 'dct') {
    canvasContainer.style.display = 'none';
    rleVisualArea.style.display = 'none';
    if (metricsBox) metricsBox.style.display = 'flex';
    if (bottomControls) bottomControls.style.display = 'none';
    showDCTStartScreen();

  } else {
    rleVisualArea.style.display = 'none';
    canvasContainer.style.display = 'flex';
    if (metricsBox) metricsBox.style.display = 'flex';
    if (bottomControls) bottomControls.style.display = 'none';

    if (originalImage) {
      canvas.style.display = 'block';
      uploadUI.style.display = 'none';
      loadCompressionLevel();
      startGame();
    } else {
      canvas.style.display = 'none';
      uploadUI.style.display = 'block';
      scoreDisplay.innerText = "0";
      feedbackMsg.innerText = "Upload an image to start your career!";
    }
  }
}

// ==========================================
// 5. Compression Challenge (Career + Ultimate Mode)
// ==========================================
let currentCompMetrics = { size: 100, psnr: "Infinity" };

function loadCompressionLevel() {
  if (compCurrentLevel >= COMPRESSION_LEVELS.length) {
    document.getElementById('comp-mission-brief').innerHTML = `
            <h4 style="color: #27ae60;">🎉 Career Completed!</h4>
            <p>You have satisfied all clients and conquered the Ultimate Boss! You are a Master Compression Engineer!</p>
        `;
    document.getElementById('comp-controls-area').style.display = 'none';
    feedbackMsg.style.color = "#2ecc71";
    feedbackMsg.innerText = "Game Over. Your final score is locked in!";
    pauseGame();
    return;
  }

  const level = COMPRESSION_LEVELS[compCurrentLevel];
  const brief = document.getElementById('comp-mission-brief');
  const submitBtn = document.getElementById('comp-submit-btn');

  if (level.type === 'standard') {
    brief.style.borderLeft = "5px solid #3498db";
    brief.style.background = "#e1f5fe";
    brief.innerHTML = `
            <h4 style="color: #2980b9; margin-bottom: 5px;">Client ${compCurrentLevel + 1}: ${level.client}</h4>
            <p style="font-size: 14px; font-style: italic; color: #555; margin-bottom: 10px;">"${level.story}"</p>
            <div style="background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #bce8f1;">
                <b style="color: #e74c3c;">Targets:</b><br>
                📉 Size: Must be <b>&le; ${level.targetSize}%</b><br>
                ✨ Quality: ${level.targetPSNR > 0 ? `Must be <b>&ge; ${level.targetPSNR} dB</b>` : `Any quality is acceptable.`}
            </div>
        `;
    submitBtn.innerText = "📬 Submit to Client";
    submitBtn.style.backgroundColor = "#2ecc71";

  } else if (level.type === 'ultimate') {
    let totalUsed = ultimateSaves.reduce((sum, save) => sum + save.size, 0);
    let stages = ["Thumbnail", "Mobile Display", "High-Res Desktop"];
    let currentTarget = stages[ultimateSaves.length];

    let historyHtml = '<ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px;">';
    for (let i = 0; i < 3; i++) {
      if (i < ultimateSaves.length) {
        historyHtml += `<li style="color: #27ae60;">✅ ${stages[i]}: Size <b>${ultimateSaves[i].size}%</b>, PSNR <b>${ultimateSaves[i].psnr}dB</b></li>`;
      } else if (i === ultimateSaves.length) {
        historyHtml += `<li style="color: #e67e22; font-weight:bold;">▶ ${stages[i]}: Pending your choice...</li>`;
      } else {
        historyHtml += `<li style="color: #95a5a6;">⏳ ${stages[i]}: Locked</li>`;
      }
    }
    historyHtml += '</ul>';

    let currentAvgPsnr = ultimateSaves.length > 0
        ? (ultimateSaves.reduce((sum, s) => sum + s.psnr, 0) / ultimateSaves.length).toFixed(1)
        : "0.0";

    brief.style.borderLeft = "5px solid #8e44ad";
    brief.style.background = "#f4ecf7";
    brief.innerHTML = `
            <h4 style="color: #8e44ad; margin-bottom: 5px;">🔥 Final Boss: ${level.client}</h4>
            <p style="font-size: 14px; font-style: italic; color: #555; margin-bottom: 10px;">"${level.story}"</p>
            <div style="background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #d2b4de;">
                <b style="color: #e74c3c;">Global Constraints:</b><br>
                📦 Total Budget: <b>${level.budget}%</b> (Used: <span style="color:${totalUsed>level.budget?'red':'#2ecc71'}">${totalUsed}%</span>)<br>
                ✨ Minimum Avg PSNR: <b>${level.avgPSNR} dB</b> (Current Avg: ${currentAvgPsnr} dB)<br>
                <hr style="margin: 8px 0; border: 0; border-top: 1px dashed #eee;">
                <b style="color: #2980b9;">Submission Tracker:</b>
                ${historyHtml}
            </div>
        `;
    submitBtn.innerText = `💾 Save ${currentTarget} Version`;
    submitBtn.style.backgroundColor = "#9b59b6";
  }

  const controls = document.getElementById('comp-controls-area');
  if (controls) {
    controls.style.opacity = '1';
    controls.style.pointerEvents = 'auto';
    document.getElementById('quality-slider').value = 100;
  }

  handleCompressionChange(100);
  feedbackMsg.style.color = "#7f8c8d";
  feedbackMsg.innerText = "Adjust the slider to meet the targets...";
}

function handleCompressionChange(quality) {
  if (!originalImage) return;
  resetCanvas();

  const qualityLevel = quality / 100;
  const compressedDataUrl = canvas.toDataURL('image/jpeg', qualityLevel);
  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    currentCompMetrics.size = Math.max(5, Math.floor(qualityLevel * 95 + 5));
    currentCompMetrics.psnr = qualityLevel === 1 ? "Infinity" : (20 + (qualityLevel * 25)).toFixed(1);
    const ssim = qualityLevel === 1 ? "1.00" : (0.50 + (qualityLevel * 0.49)).toFixed(2);

    sizePercentage.innerText = `${currentCompMetrics.size}%`;
    progressBarFill.style.width = `${currentCompMetrics.size}%`;
    psnrDisplay.innerText = `PSNR: ${currentCompMetrics.psnr} ${currentCompMetrics.psnr !== "Infinity" ? 'dB' : ''}`;
    ssimDisplay.innerText = `SSIM: ${ssim}`;
  };
  img.src = compressedDataUrl;
}

function submitCompression() {
  const level = COMPRESSION_LEVELS[compCurrentLevel];
  const currentPSNRValue = currentCompMetrics.psnr === "Infinity" ? 100 : parseFloat(currentCompMetrics.psnr);

  // --- 方案一：标准关卡逻辑 ---
  if (level.type === 'standard') {
    let isSuccess = true;
    let failReason = "";

    if (currentCompMetrics.size > level.targetSize) {
      isSuccess = false;
      failReason = "File is still too large!";
    } else if (currentPSNRValue < level.targetPSNR) {
      isSuccess = false;
      failReason = "The quality is too blurry for the client!";
    }

    if (isSuccess) {
      playSuccessSound();

      // === 【成就 Hook】：校验是否达成 Pixel Saver ===
      checkAchievements('compression_saved', currentCompMetrics.size);

      feedbackMsg.style.color = "#2ecc71";
      feedbackMsg.innerText = `Contract Fulfilled! Client is happy. (+500 pts)`;

      let currentScore = parseInt(scoreDisplay.innerText) || 0;
      scoreDisplay.innerText = currentScore + 500 + (level.targetSize - currentCompMetrics.size) * 10;

      const btn = document.getElementById('comp-submit-btn');
      btn.innerText = "🚀 Next Client";
      btn.style.backgroundColor = "#f39c12";
      btn.onclick = () => {
        compCurrentLevel++;
        loadCompressionLevel();
        btn.onclick = submitCompression;
      };
    } else {
      feedbackMsg.style.color = "#e74c3c";
      feedbackMsg.innerText = `Client Rejected: ${failReason}`;
      document.getElementById('comp-controls-area').animate([
        { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
      ], { duration: 300 });

      let currentScore = parseInt(scoreDisplay.innerText) || 0;
      if (currentScore > 50) scoreDisplay.innerText = currentScore - 50;
    }

    // --- 方案三：极限资源分配（Boss战）逻辑 ---
  } else if (level.type === 'ultimate') {
    ultimateSaves.push({ size: currentCompMetrics.size, psnr: currentPSNRValue });

    if (ultimateSaves.length < 3) {
      playSuccessSound();

      // === 【成就 Hook】：即使是子任务提交，也计算节省的空间 ===
      checkAchievements('compression_saved', currentCompMetrics.size);

      feedbackMsg.style.color = "#3498db";
      feedbackMsg.innerText = `Version saved! Now allocate space for the next one.`;
      loadCompressionLevel();
    } else {
      let totalSize = ultimateSaves.reduce((sum, s) => sum + s.size, 0);
      let avgPSNR = ultimateSaves.reduce((sum, s) => sum + s.psnr, 0) / 3;

      if (totalSize <= level.budget && avgPSNR >= level.avgPSNR) {
        playSuccessSound();
        feedbackMsg.style.color = "#2ecc71";
        feedbackMsg.innerText = `Ultimate Boss Defeated! Perfect Resource Management! (+2000 pts)`;

        let currentScore = parseInt(scoreDisplay.innerText) || 0;
        scoreDisplay.innerText = currentScore + 2000;

        const btn = document.getElementById('comp-submit-btn');
        btn.innerText = "🏆 View Final Results";
        btn.style.backgroundColor = "#f1c40f";
        btn.onclick = () => {
          compCurrentLevel++;
          loadCompressionLevel();
        };
      } else {
        let failReason = totalSize > level.budget ? `Exceeded Data Budget (${totalSize}% > ${level.budget}%)!` : `Average quality too low (${avgPSNR.toFixed(1)} < ${level.avgPSNR})!`;
        feedbackMsg.style.color = "#e74c3c";
        feedbackMsg.innerText = `Boss Fight Failed: ${failReason} Try again!`;

        document.getElementById('comp-controls-area').animate([
          { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
        ], { duration: 300 });

        let currentScore = parseInt(scoreDisplay.innerText) || 0;
        if (currentScore > 200) scoreDisplay.innerText = currentScore - 200;

        ultimateSaves = [];
        setTimeout(loadCompressionLevel, 2000);
      }
    }
  }
}

// ==========================================
// 6. DCT Challenge Logic
// ==========================================
function showDCTStartScreen() {
  pauseGame();
  timeDisplay.innerText = "00:00";

  const area = document.getElementById('specific-controls');
  area.innerHTML = `
        <div class="rle-start-screen" style="padding: 40px 0;">
            <h3 style="color: #2c3e50; font-size: 28px;">Frequency Detective</h3>
            <p>Find the hidden frequency cut-off point!</p>
            <button class="btn-primary" style="font-size: 20px; padding: 12px 30px; margin-top: 20px;" onclick="startDCTChallenge()">▶ START CHALLENGE</button>
        </div>
    `;

  loadDCTImage(() => {});
}

function startDCTChallenge() {
  loadDCTImage(() => {
    dctTargetBlur = Math.floor(Math.random() * 13) + 2;
    currentDCTBlur = 0;

    const controls = document.getElementById('specific-controls');

    controls.innerHTML = `
            <div class="dct-challenge-container" style="display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%;">
                
                <div style="display: flex; gap: 20px; justify-content: center; width: 100%;">
                    <div style="text-align: center; flex: 1;">
                        <span style="font-weight: bold; color: #e74c3c; font-size: 16px;">TARGET BLUR</span>
                        <canvas id="targetCanvas" style="display: block; margin: 8px auto 0; width: 100%; max-width: 400px; border: 3px solid #e74c3c; border-radius: 8px; aspect-ratio: 4/3; object-fit: cover;"></canvas>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <span style="font-weight: bold; color: #3498db; font-size: 16px;">YOUR IMAGE</span>
                        <canvas id="currentCanvas" style="display: block; margin: 8px auto 0; width: 100%; max-width: 400px; border: 3px solid #3498db; border-radius: 8px; aspect-ratio: 4/3; object-fit: cover;"></canvas>
                    </div>
                </div>

                <div style="display: flex; gap: 20px; align-items: center; background: #f1f2f6; padding: 20px; border-radius: 12px; width: 100%; max-width: 800px;">
                    <div style="text-align:center">
                        <span style="font-weight: bold; color: #2ecc71; font-size: 12px;">FREQ MAP</span><br>
                        <canvas id="dct-freq-canvas" width="100" height="100" style="display: block; margin: 5px auto 0; background: #000; border-radius: 5px;"></canvas>
                    </div>
                    <div style="flex: 1;">
                        <label style="font-weight: bold;">Adjust Low-Pass Filter (Cut High Frequencies):</label>
                        <input type="range" id="dct-slider" min="0" max="20" value="0" style="width: 100%; margin-top: 15px;" oninput="handleDCTChange(this.value)">
                    </div>
                </div>

                <div class="rle-helper-row" style="display: flex; gap: 15px;">
                    <button class="rle-secondary-btn" onclick="showDCTStartScreen()">⬅️ Back</button>
                    <button class="controls button rle-check-btn" onclick="checkDCTMatch()" style="margin: 0; padding: 10px 20px;">Check Match!</button>
                </div>
            </div>
        `;

    const tCanvas = document.getElementById('targetCanvas');
    tCanvas.width = 400; tCanvas.height = 300;
    const tCtx = tCanvas.getContext('2d');
    tCtx.filter = `blur(${dctTargetBlur}px)`;
    tCtx.drawImage(dctImageObj, 0, 0, 400, 300);

    const cCanvas = document.getElementById('currentCanvas');
    cCanvas.width = 400; cCanvas.height = 300;

    secondsElapsed = 0;
    timeDisplay.innerText = "00:00";
    startGame();
    handleDCTChange(0);

    feedbackMsg.innerText = "Match the Target Blur to pass!";
    feedbackMsg.style.color = "#7f8c8d";
  });
}

function getFreqBackground(w, h) {
  if (!freqBackgroundCanvas) {
    freqBackgroundCanvas = document.createElement('canvas');
    freqBackgroundCanvas.width = w;
    freqBackgroundCanvas.height = h;
    const bCtx = freqBackgroundCanvas.getContext('2d');
    bCtx.fillStyle = '#000';
    bCtx.fillRect(0, 0, w, h);
    for(let i=0; i<500; i++) {
      const x = Math.pow(Math.random(), 2) * w;
      const y = Math.pow(Math.random(), 2) * h;
      const intensity = Math.floor(255 - (Math.sqrt(x*x + y*y)/w * 200));
      bCtx.fillStyle = `rgba(${intensity}, ${intensity}, 255, ${Math.random()})`;
      bCtx.fillRect(x, y, 1.5, 1.5);
    }
    bCtx.fillStyle = '#fff';
    bCtx.beginPath(); bCtx.arc(0, 0, 5, 0, Math.PI*2); bCtx.fill();
  }
  return freqBackgroundCanvas;
}

function handleDCTChange(blurAmount) {
  currentDCTBlur = parseFloat(blurAmount);
  if (!dctImageObj) return;

  const cCanvas = document.getElementById('currentCanvas');
  if (cCanvas) {
    const cCtx = cCanvas.getContext('2d');
    cCtx.filter = `blur(${blurAmount}px)`;
    cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    cCtx.drawImage(dctImageObj, 0, 0, cCanvas.width, cCanvas.height);
  }

  const freqCanvas = document.getElementById('dct-freq-canvas');
  if (freqCanvas) {
    const fCtx = freqCanvas.getContext('2d');
    const w = freqCanvas.width;
    const h = freqCanvas.height;

    fCtx.drawImage(getFreqBackground(w, h), 0, 0);

    const cutRatio = 1 - (blurAmount / 22);
    const radius = Math.max(5, (w * 1.5) * cutRatio);

    fCtx.fillStyle = 'rgba(231, 76, 60, 0.6)';
    fCtx.beginPath();
    fCtx.moveTo(0,0); fCtx.lineTo(w,0); fCtx.lineTo(w,h); fCtx.lineTo(0,h); fCtx.lineTo(0,0);
    fCtx.arc(0, 0, radius, 0, Math.PI / 2, false);
    fCtx.fill();

    fCtx.strokeStyle = '#e74c3c';
    fCtx.lineWidth = 2;
    fCtx.beginPath();
    fCtx.arc(0, 0, radius, 0, Math.PI / 2, false);
    fCtx.stroke();
  }

  const sizeRatio = Math.max(15, 100 - (blurAmount * 4));
  const psnr = Math.max(15, (40 - blurAmount * 1.5)).toFixed(1);
  const ssim = Math.max(0.3, (0.98 - blurAmount * 0.03)).toFixed(2);

  sizePercentage.innerText = `${sizeRatio}%`;
  progressBarFill.style.width = `${sizeRatio}%`;
  psnrDisplay.innerText = `PSNR: ${psnr} dB`;
  ssimDisplay.innerText = `SSIM: ${ssim}`;
}

function checkDCTMatch() {
  const diff = Math.abs(currentDCTBlur - dctTargetBlur);
  if (diff <= 1.0) {
    pauseGame();
    playSuccessSound();
    feedbackMsg.innerText = "Match Found! You've correctly identified the frequency cut-off.";
    feedbackMsg.style.color = "#2ecc71";

    const bonus = Math.max(0, 500 - secondsElapsed * 10);
    scoreDisplay.innerText = parseInt(scoreDisplay.innerText) + bonus;

    const btn = document.querySelector('.dct-challenge-container .rle-check-btn');
    btn.innerText = "Next Level";
    btn.onclick = startDCTChallenge;
  } else {
    feedbackMsg.innerText = diff > 6 ? "Not even close! Look closer at the details." : "Almost there! Fine-tune the slider.";
    feedbackMsg.style.color = "#e74c3c";
  }
}

// ==========================================
// 7. RLE Puzzle Logic
// ==========================================
function showRLEStartScreen() {
  pauseGame();
  timeDisplay.innerText = "00:00";
  const area = document.getElementById('rle-visual-area');
  area.innerHTML = `
        <div class="rle-start-screen">
            <h2 style="color: #2c3e50;">RLE Challenge</h2>
            <p>Pick your difficulty to begin the timer!</p>
            <div class="difficulty-group">
                <button class="diff-btn easy ${rleDifficulty==='Easy'?'selected':''}" onclick="setRleDifficulty('Easy')">Easy</button>
                <button class="diff-btn medium ${rleDifficulty==='Medium'?'selected':''}" onclick="setRleDifficulty('Medium')">Medium</button>
                <button class="diff-btn hard ${rleDifficulty==='Hard'?'selected':''}" onclick="setRleDifficulty('Hard')">Hard</button>
            </div>
            <button class="btn-primary" style="font-size: 24px; padding: 15px 50px; margin-top: 20px;" onclick="startRLEChallenge()">▶ START CHALLENGE</button>
        </div>
    `;
  document.getElementById('specific-controls').innerHTML = '';
}

function setRleDifficulty(diff) {
  rleDifficulty = diff;
  showRLEStartScreen();
}

function startRLEChallenge() {
  pauseGame();
  secondsElapsed = 0;
  timeDisplay.innerText = "00:00";
  scoreDisplay.innerText = "1000";

  const area = document.getElementById('rle-visual-area');
  area.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #2c3e50; text-align: center;">Original Sequence</h3>
        <div id="rle-blocks-container" class="rle-blocks-container"></div>
    `;

  initRLEPuzzleWithDifficulty(rleDifficulty);
  startGame();
}

function initRLEPuzzleWithDifficulty(diff) {
  let targetTotal = 10;
  let segmentCount = 3;

  if (diff === 'Medium') { targetTotal = 20; segmentCount = 5; }
  if (diff === 'Hard') { targetTotal = 40; segmentCount = 8; }

  const blocksContainer = document.getElementById('rle-blocks-container');
  blocksContainer.style.display = 'grid';
  blocksContainer.style.gridTemplateColumns = 'repeat(10, 40px)';
  blocksContainer.style.gap = '8px 5px';
  blocksContainer.style.justifyContent = 'center';
  blocksContainer.style.margin = '0 auto';
  blocksContainer.style.padding = '20px';
  blocksContainer.style.background = '#f8f9fa';
  blocksContainer.style.borderRadius = '10px';
  blocksContainer.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
  blocksContainer.style.width = 'max-content';

  const controlsContainer = document.getElementById('specific-controls');
  controlsContainer.innerHTML = '<div id="rle-inputs-container"></div>';
  const inputsContainer = document.getElementById('rle-inputs-container');

  currentRLEAnswer = [];
  totalOriginalBlocks = targetTotal;

  let counts = Array(segmentCount).fill(1);
  let remaining = targetTotal - segmentCount;

  while (remaining > 0) {
    let idx = Math.floor(Math.random() * segmentCount);
    if (counts[idx] < 12) {
      counts[idx]++;
      remaining--;
    }
  }

  let lastColorIndex = -1;
  for (let i = 0; i < segmentCount; i++) {
    let colorIndex;
    do { colorIndex = Math.floor(Math.random() * RLE_COLORS.length); } while (colorIndex === lastColorIndex);
    lastColorIndex = colorIndex;

    const count = counts[i];
    const colorObj = RLE_COLORS[colorIndex];
    currentRLEAnswer.push({ count: count, color: colorObj.name });

    for (let j = 0; j < count; j++) {
      const block = document.createElement('div');
      block.className = 'rle-block';
      block.style.backgroundColor = colorObj.hex;
      block.dataset.segment = i;
      blocksContainer.appendChild(block);
    }

    const inputGroup = document.createElement('div');
    inputGroup.className = 'rle-input-group';
    inputGroup.innerHTML = `
            <input type="number" placeholder="#" id="rle-num-${i}">
            <span> x </span>
            <select id="rle-color-${i}">
                <option value="">Color...</option>
                ${RLE_COLORS.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
            </select>
        `;
    inputsContainer.appendChild(inputGroup);
  }

  const actionGroup = document.createElement('div');
  actionGroup.className = 'rle-action-group';

  const compressBtn = document.createElement('button');
  compressBtn.className = 'controls button rle-check-btn';
  compressBtn.id = 'rle-compress-btn';
  compressBtn.innerHTML = '🗜️ Compress Data!';
  compressBtn.onclick = checkRLEPuzzle;
  actionGroup.appendChild(compressBtn);

  const helperRow = document.createElement('div');
  helperRow.className = 'rle-helper-row';
  helperRow.id = 'rle-helper-row';

  const backBtn = document.createElement('button');
  backBtn.className = 'rle-secondary-btn';
  backBtn.innerHTML = '⬅️ Back to Menu';
  backBtn.onclick = showRLEStartScreen;

  const answerBtn = document.createElement('button');
  answerBtn.className = 'rle-secondary-btn';
  answerBtn.id = 'rle-answer-btn';
  answerBtn.innerHTML = '💡 Show Answer';
  answerBtn.onclick = showRLEAnswer;

  helperRow.appendChild(backBtn);
  helperRow.appendChild(answerBtn);
  actionGroup.appendChild(helperRow);
  inputsContainer.appendChild(actionGroup);

  sizePercentage.innerText = `100%`;
  progressBarFill.style.width = `100%`;
  feedbackMsg.innerText = "Count the blocks and compress!";
  feedbackMsg.style.color = "#7f8c8d";
}

function checkRLEPuzzle() {
  let isCorrect = true;
  for (let i = 0; i < currentRLEAnswer.length; i++) {
    const userNum = parseInt(document.getElementById(`rle-num-${i}`).value);
    const userColor = document.getElementById(`rle-color-${i}`).value;
    if (userNum !== currentRLEAnswer[i].count || userColor !== currentRLEAnswer[i].color) {
      isCorrect = false; break;
    }
  }

  if (!isCorrect) {
    feedbackMsg.style.color = "#e74c3c";
    feedbackMsg.innerText = "Oops! Check your numbers and colors again.";
    document.getElementById('rle-inputs-container').animate([
      { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
    ], { duration: 300 });
    return;
  }

  pauseGame();
  playSuccessSound();

  // === 【成就 Hook】：校验是否达成 RLE Master ===
  checkAchievements('rle_complete', secondsElapsed);

  feedbackMsg.style.color = "#2ecc71";
  feedbackMsg.innerText = "Awesome! Data successfully compressed via RLE!";

  const blocksContainer = document.getElementById('rle-blocks-container');
  blocksContainer.style.display = 'flex';
  blocksContainer.style.flexWrap = 'wrap';

  for (let i = 0; i < currentRLEAnswer.length; i++) {
    const segmentBlocks = blocksContainer.querySelectorAll(`.rle-block[data-segment="${i}"]`);
    segmentBlocks.forEach((block, index) => {
      if (index > 0) {
        block.style.width = '0px'; block.style.margin = '0px';
        block.style.opacity = '0'; block.style.padding = '0px';
        block.style.overflow = 'hidden';
      } else {
        block.classList.add('merged');
        block.innerText = `${currentRLEAnswer[i].count}x`;
      }
    });
  }

  const compressedBlocksCount = currentRLEAnswer.length;
  const sizeRatio = Math.floor((compressedBlocksCount / totalOriginalBlocks) * 100);

  setTimeout(() => {
    sizePercentage.innerText = `${sizeRatio}%`;
    progressBarFill.style.width = `${sizeRatio}%`;
  }, 500);

  document.querySelectorAll('.rle-input-group input, .rle-input-group select').forEach(el => el.disabled = true);

  const compressBtn = document.getElementById('rle-compress-btn');
  compressBtn.innerText = "🔄 Play Again";
  compressBtn.onclick = startRLEChallenge;

  const answerBtn = document.getElementById('rle-answer-btn');
  if (answerBtn) answerBtn.style.display = 'none';

  const helperRow = document.getElementById('rle-helper-row');
  if (helperRow) helperRow.querySelector('button').innerHTML = '⬅️ Change Difficulty';
}

function showRLEAnswer() {
  pauseGame();
  for (let i = 0; i < currentRLEAnswer.length; i++) {
    document.getElementById(`rle-num-${i}`).value = currentRLEAnswer[i].count;
    document.getElementById(`rle-color-${i}`).value = currentRLEAnswer[i].color;
  }
  feedbackMsg.style.color = "#f39c12";
  feedbackMsg.innerText = "Answer revealed. Timer stopped.";
  document.querySelectorAll('.rle-input-group input, .rle-input-group select').forEach(el => el.disabled = true);

  const compressBtn = document.getElementById('rle-compress-btn');
  compressBtn.innerText = "🔄 Try Another";
  compressBtn.style.backgroundColor = "#f39c12";
  compressBtn.onclick = () => { compressBtn.style.backgroundColor = ""; startRLEChallenge(); };

  const answerBtn = document.getElementById('rle-answer-btn');
  if (answerBtn) answerBtn.style.display = 'none';
}

function playSuccessSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  osc.connect(gainNode); gainNode.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.5);
}

// ==========================================
// 8. Timer & Start Logic
// ==========================================
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    gameTimer = setInterval(() => {
      secondsElapsed++;
      timeDisplay.innerText = formatTime(secondsElapsed);

      if (currentMode === 'rle') {
        let currentScore = parseInt(scoreDisplay.innerText);
        if (currentScore > 0 && secondsElapsed % 2 === 0) {
          scoreDisplay.innerText = currentScore - 10;
        }
      }
    }, 1000);
  }
}

function pauseGame() {
  isPlaying = false;
  clearInterval(gameTimer);
}

// ==========================================
// 9. Achievement System (LocalStorage)
// ==========================================

// 初始化成就数据结构
let userStats = {
  totalMBDSaved: 0,
  rleBestTime: Infinity,
  unlocked: {
    pixelSaver: false,
    rleMaster: false
  }
};

// 从本地存储加载数据
function loadStats() {
  const saved = localStorage.getItem('compression_game_stats');
  if (saved) {
    userStats = JSON.parse(saved);
    updateAchievementUI();
  }
}

// 保存数据到本地
function saveStats() {
  localStorage.setItem('compression_game_stats', JSON.stringify(userStats));
  updateAchievementUI();
}

// 更新界面显示状态
function updateAchievementUI() {
  const pixelBadge = document.getElementById('ach-pixel-saver');
  const rleBadge = document.getElementById('ach-rle-master');

  if (pixelBadge && userStats.unlocked.pixelSaver) {
    pixelBadge.classList.add('unlocked');
  }
  if (rleBadge && userStats.unlocked.rleMaster) {
    rleBadge.classList.add('unlocked');
  }
}

// 核心判定函数
function checkAchievements(type, value) {
  let newlyUnlocked = false;

  if (type === 'compression_saved') {
    // 假设原始文件是 1MB，计算本次节省的 MB
    const savedThisTime = (100 - value) / 100;
    userStats.totalMBDSaved += savedThisTime;

    if (userStats.totalMBDSaved >= 10 && !userStats.unlocked.pixelSaver) {
      userStats.unlocked.pixelSaver = true;
      newlyUnlocked = true;
    }
  }

  if (type === 'rle_complete') {
    // value 是通关秒数
    if (value < 30 && !userStats.unlocked.rleMaster) {
      userStats.unlocked.rleMaster = true;
      newlyUnlocked = true;
    }
    if (value < userStats.rleBestTime) userStats.rleBestTime = value;
  }

  if (newlyUnlocked) {
    setTimeout(() => {
      alert("🎉 New Achievement Unlocked! Check your achievements board.");
    }, 300); // 稍微延迟一下，让原本的过关反馈先渲染
  }
  saveStats();
}

// ==========================================
// 10. Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadStats(); // 页面一加载就读取勋章数据
  switchMode('compression');
});