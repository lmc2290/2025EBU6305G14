
const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uploadUI = document.getElementById('upload-ui');
const slider = document.getElementById('magicSlider');

const faceEmoji = document.getElementById('face-emoji');
const sizeText = document.getElementById('size-text');

let originalImage = null;

// deal with uploaded images
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

            // initialize
            renderPixelated(100);
        }
        img.src = event.target.result;
    }
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
});

// listen to slider
slider.addEventListener('input', function() {
    const value = this.value;

    // update UI condition
    updateUI(value);

    if(originalImage) {
        renderPixelated(value);
    }
});

// update emoji and words
function updateUI(value) {
    sizeText.innerText = value + "%";

    if (value > 80) {
        faceEmoji.innerText = "🤩";
    } else if (value > 50) {
        faceEmoji.innerText = "😊";
    } else if (value > 20) {
        faceEmoji.innerText = "😵‍💫";
    } else {
        faceEmoji.innerText = "😭";
    }
}

// simulate blurry
function renderPixelated(qualityValue) {

    // calculate the scale factor
    let scaleFactor = qualityValue / 100;

    // 2% minimum
    if(scaleFactor < 0.02) scaleFactor = 0.02;

    const w = canvas.width;
    const h = canvas.height;
    const scaledW = w * scaleFactor;
    const scaledH = h * scaleFactor;

    ctx.imageSmoothingEnabled = false;

    // loss details
    ctx.drawImage(originalImage, 0, 0, scaledW, scaledH);

    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
}