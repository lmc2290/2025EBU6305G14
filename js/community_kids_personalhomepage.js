let kidsPosts = JSON.parse(localStorage.getItem("kidsPosts")) || [];
let stars = Number(localStorage.getItem("stars")) || 0;

/* ================= i18n ================= */
let currentLang = localStorage.getItem("lang") || "en";

function switchLang(){
    currentLang = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("lang", currentLang);
    applyLang();
}

function applyLang(){

    document.getElementById("breadcrumb").innerText =
        currentLang === "zh" ? "首页 > 儿童主页" : "Home > Kids Profile";

    document.getElementById("langBtn").innerText =
        currentLang === "zh" ? "EN" : "中文";

    document.querySelector(".kids-profile p").innerText =
        currentLang === "zh" ? "每天都在成长！" : "Keep Growing Every Day!";

    document.querySelector(".kids-box h3").innerText =
        currentLang === "zh" ? "📚 我的学习记录" : "📚 My Learning Posts";
}

/* ================= 字号 ================= */
let fontSize = Number(localStorage.getItem("fontSize")) || 16;

function changeFont(type){

    if(type === -1) fontSize = Math.max(14, fontSize - 2);
    if(type === 0) fontSize = 16;
    if(type === 1) fontSize = Math.min(24, fontSize + 2);

    document.documentElement.style.fontSize = fontSize + "px";
    localStorage.setItem("fontSize", fontSize);
}

/* ================= 原逻辑不变 ================= */
function initPage(){
    renderKidsPosts();
    renderStars();
}

function renderKidsPosts(){
    const box = document.getElementById("kidsPosts");

    if(!box) return;

    if(kidsPosts.length === 0){
        box.innerHTML = `<div class="post-card">I learned something new today!</div>`;
        return;
    }

    box.innerHTML = "";

    kidsPosts.forEach(p=>{
        box.innerHTML += `<div class="post-card">${p.text}</div>`;
    });
}

function renderStars(){
    const starCount = document.getElementById("starCount");
    const progressFill = document.getElementById("progressFill");

    if(starCount) starCount.innerText = stars;

    let progress = Math.min(stars * 10, 100);

    if(progressFill){
        progressFill.style.width = progress + "%";
    }
}

/* init */
initPage();
applyLang();
changeFont(0);