let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* ================= i18n ================= */
let currentLang = localStorage.getItem("lang") || "en";

function switchLang(){
    currentLang = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("lang", currentLang);
    applyLang();
}

function applyLang(){

    document.getElementById("breadcrumb").innerText =
        currentLang === "zh" ? "首页 > 个人主页" : "Home > Personal Profile";

    document.getElementById("langBtn").innerText =
        currentLang === "zh" ? "EN" : "中文";

    document.querySelector(".profile-card p").innerText =
        currentLang === "zh" ? "五级学习者" : "Level 5 Learner";

    document.querySelector(".content-box h3").innerText =
        currentLang === "zh" ? "📝 我的帖子" : "📝 My Posts";
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

/* ================= 原逻辑 ================= */
function initPage(){
    loadProfile();
    renderPosts();
    renderStats();
}

function loadProfile(){

    let savedName = localStorage.getItem("adultName");
    let savedAvatar = localStorage.getItem("adultAvatar");

    if(savedName){
        document.getElementById("profileName").innerText = savedName;
    }

    if(savedAvatar){
        document.getElementById("profileAvatar").src = savedAvatar;
    }
}

function changeName(){
    let current = document.getElementById("profileName").innerText;
    let name = prompt("Enter new name:", current);

    if(name){
        document.getElementById("profileName").innerText = name;
        localStorage.setItem("adultName", name);
    }
}

function changeAvatar(){
    document.getElementById("avatarUpload").click();
}

function uploadAvatar(e){
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(ev){
        document.getElementById("profileAvatar").src = ev.target.result;
        localStorage.setItem("adultAvatar", ev.target.result);
    }

    reader.readAsDataURL(file);
}

function renderPosts(){

    const box = document.getElementById("myPosts");

    if(posts.length === 0){
        box.innerHTML = "No posts yet.";
        return;
    }

    box.innerHTML = "";

    posts.forEach(p=>{
        box.innerHTML += `<div class="post-item">${p.title}</div>`;
    });
}

function renderStats(){

    let likes = 0;

    posts.forEach(p=>{
        likes += p.likes || 0;
    });

    document.getElementById("postCount").innerText = posts.length;
    document.getElementById("likeCount").innerText = likes;
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

/* init */
initPage();
applyLang();
changeFont(0);