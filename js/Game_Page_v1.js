// upload images
const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uploadUI = document.getElementById('upload-ui');

imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      uploadUI.style.display = 'none';
      canvas.style.display = 'block';

      // adjust canvas with maximum limits
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
      ctx.drawImage(img, 0, 0, width, height);

      drawMockGrid(width, height);
    }
    img.src = event.target.result;
  }
  if(e.target.files[0]){
    reader.readAsDataURL(e.target.files[0]);
  }
}

function drawMockGrid(w, h) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  const cols = 8;
  const rows = 4;
  const cellW = w / cols;
  const cellH = h / rows;

  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellW, 0);
    ctx.lineTo(i * cellW, h);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * cellH);
    ctx.lineTo(w, j * cellH);
    ctx.stroke();
  }
}

// changing game modes
const gameData = {
  compression: {
    title: "Compression Challenge",
    instructions: `
                    <p style="margin-bottom: 15px;">Welcome to the Compression Challenge! Balance size and quality.</p>
                    <ul>
                        <li>Upload your image to start.</li>
                        <li>Adjust the compression quality slider.</li>
                        <li>Watch the PSNR and SSIM metrics change.</li>
                    </ul>`,
    controlsHtml: `
                    <label>Quality Level (JPEG Simulation):</label>
                    <div class="slider-container">
                        <span>Low</span>
                        <input type="range" min="1" max="100" value="80" oninput="updateMetrics(this.value)">
                        <span>High</span>
                    </div>`
  },
  rle: {
    title: "Run-Length Encoding (RLE)",
    instructions: `
                    <p style="margin-bottom: 15px;">Learn how RLE groups identical pixels to save space.</p>
                    <ul>
                        <li>Hover over the image to see raw pixel data.</li>
                        <li>Scan rows to create "Runs" of colors.</li>
                        <li>RLE is lossless, so quality metrics stay perfect!</li>
                    </ul>`,
    controlsHtml: `
                    <label>RLE Scan Direction:</label>
                    <div style="margin-top: 10px;">
                        <input type="radio" name="scan" checked> Horizontal (Row by Row)
                        <input type="radio" name="scan" style="margin-left: 15px;"> Vertical (Column by Column)
                    </div>`
  },
  dct: {
    title: "Advanced DCT Control",
    instructions: `
                    <p style="margin-bottom: 15px;">Manipulate frequencies using Discrete Cosine Transform.</p>
                    <ul>
                        <li>Adjust the slider to cut high frequencies.</li>
                        <li>Notice how edges become blurry (loss of detail).</li>
                        <li>Lower frequencies maintain the core image structure.</li>
                    </ul>`,
    controlsHtml: `
                    <label>Cut High Frequencies (DCT Quantization):</label>
                    <div class="slider-container">
                        <span>Keep All</span>
                        <input type="range" min="0" max="100" value="50" oninput="updateMetrics(100 - this.value)">
                        <span>Heavy Cut</span>
                    </div>`
  }
};

function switchMode(mode) {
  // update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // update title, instruction and UI
  const data = gameData[mode];
  document.getElementById('page-title').innerText = data.title;
  document.getElementById('breadcrumb-title').innerText = data.title;
  document.getElementById('instruction-content').innerHTML = data.instructions;
  document.getElementById('specific-controls').innerHTML = data.controlsHtml;

  // Reset feedbacks
  if (mode === 'rle') {
    document.getElementById('psnr-display').innerText = "PSNR: Infinity (Lossless)";
    document.getElementById('ssim-display').innerText = "SSIM: 1.00 (Lossless)";
    document.getElementById('progress-bar-fill').style.width = "45%";
    document.getElementById('size-percentage').innerText = "45%";
    document.getElementById('feedback-msg').innerText = '"RLE is highly effective for flat color areas!"';
  } else {
    updateMetrics(80); // Reset for lossy
  }
}

// simple interactive feedbacks
function updateMetrics(value) {
  // calculating quality metrics
  const psnr = (20 + (value / 100) * 25).toFixed(1);
  const ssim = (0.5 + (value / 100) * 0.49).toFixed(2);
  const sizePercent = Math.floor((value / 100) * 80 + 20); // 20% to 100%

  document.getElementById('psnr-display').innerText = `PSNR: ${psnr} dB`;
  document.getElementById('ssim-display').innerText = `SSIM: ${ssim}`;

  document.getElementById('progress-bar-fill').style.width = `${sizePercent}%`;
  document.getElementById('size-percentage').innerText = `${sizePercent}%`;

  document.getElementById('score-display').innerText = Math.floor(1000 + (100 - sizePercent) * 10 - (100 - value) * 5);

  let msg = '"Good balance of size and quality!"';
  if(sizePercent < 40) msg = '"File is very small, but watch out for artifacts."';
  if(sizePercent > 80) msg = '"High quality, but the file size is quite large."';
  document.getElementById('feedback-msg').innerText = msg;
}
