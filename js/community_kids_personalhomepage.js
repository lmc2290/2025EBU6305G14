<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kids Personal Homepage</title>
    <link rel="stylesheet" href="css/community_kids_personalhomepage.css">

    <style>
        .top-tools{
            background:#fff;
            border-bottom:1px solid #eee;
            padding:10px 20px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            flex-wrap:wrap;
        }

        .breadcrumb{
            font-size:14px;
            color:#666;
        }

        .tool-right{
            display:flex;
            gap:8px;
        }

        .tool-btn{
            padding:6px 10px;
            border:none;
            border-radius:8px;
            background:#fff;
            box-shadow:0 2px 6px rgba(0,0,0,.08);
            cursor:pointer;
        }

        .font-btn{ width:40px; }
    </style>

</head>

<body>

<div class="top-tools">
    <div class="breadcrumb" id="breadcrumb">
        Home > Community > Kids Profile
    </div>

    <div class="tool-right">
        <button class="tool-btn" onclick="switchLang(); playSound();" id="langBtn">中文</button>
        <button class="tool-btn font-btn" onclick="changeFont(-1); playSound();">A-</button>
        <button class="tool-btn font-btn" onclick="changeFont(0); playSound();">A</button>
        <button class="tool-btn font-btn" onclick="changeFont(1); playSound();">A+</button>
    </div>
</div>

<header>
    <nav>
        <div class="logo">
            <h1>Learning with Games</h1>
        </div>
        <a href="community.html" class="back-btn" onclick="playSound();">← Back</a>
    </nav>
</header>

<main class="kids-container">
    <section class="kids-profile">
        <img id="kidsAvatar" src="https://i.pravatar.cc/120?img=5" class="avatar-large" onclick="editKidsProfile(); playSound();">
        <h2 id="kidsName" onclick="editKidsProfile(); playSound();">Little Learner</h2>
        <p>Keep Growing Every Day!</p>
        <div class="stats">
            <div class="stat-card">
                <strong id="starCount">0</strong>
                <span>Stars</span>
            </div>
            <div class="stat-card">
                <strong>#1</strong>
                <span>Rank</span>
            </div>
            <div class="stat-card">
                <strong>👑</strong>
                <span>Hero</span>
            </div>
        </div>
    </section>

    <section class="kids-grid">
        <div class="kids-box">
            <h3>📚 My Learning Posts</h3>
            <div id="kidsPosts"></div>
        </div>

        <div class="kids-box">
            <h3>🎖 Achievements</h3>
            <div class="badge">⭐ First Share</div>
            <div class="badge">🌟 5 Stars</div>
            <div class="badge">👑 Super Learner</div>
            <h3 style="margin-top:20px;">Today Progress</h3>
            <div class="progress">
                <div class="fill" id="progressFill"></div>
            </div>
        </div>
    </section>
</main>

<script src="js/community_kids_personalhomepage.js"></script>

<script>
/* 国际化 */
let currentLang = localStorage.getItem("lang") || "en";
function switchLang() {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  applyLang();
}
function applyLang() {
  if (currentLang === "zh") {
    document.getElementById("langBtn").innerText = "EN";
    document.getElementById("breadcrumb").innerHTML = "首页 > 社区 > 儿童主页";
  } else {
    document.getElementById("langBtn").innerText = "中文";
    document.getElementById("breadcrumb").innerHTML = "Home > Community > Kids Profile";
  }
}

/* 字体 */
let fontSize = Number(localStorage.getItem("fontSize")) || 16;
function changeFont(type) {
  if (type === -1) fontSize = Math.max(14, fontSize - 2);
  if (type === 0) fontSize = 16;
  if (type === 1) fontSize = Math.min(24, fontSize + 2);
  document.documentElement.style.fontSize = fontSize + "px";
  localStorage.setItem("fontSize", fontSize);
}

/* 稳定音效（不破坏按钮） */
function playSound() {
  try {
    let audio = new Audio("https://cdn.jsdelivr.net/gh/volgnv/static/kids-click.mp3");
    audio.volume = 0.4;
    audio.play().catch(e=>{});
  } catch(e){}
}

applyLang();
changeFont(0);
</script>

</body>
</html>