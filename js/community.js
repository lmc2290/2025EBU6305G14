
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let kidsPosts = JSON.parse(localStorage.getItem("kidsPosts")) || [];
let stars = Number(localStorage.getItem("stars")) || 0;
let kidsMode = false;

/* ---------- INIT ---------- */
if (posts.length === 0) {
  posts = [
    {
      title: "Welcome Post",
      content: "Upload original image and preview smart compression.",
      likes: 0,
      image: ""
    }
  ];
}

savePosts();

/* ---------- SAVE ---------- */
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("kidsPosts", JSON.stringify(kidsPosts));
  localStorage.setItem("stars", stars);
}

/* ---------- 成人版渲染 ---------- */
function renderPosts(data = posts) {
  const list = document.getElementById("postList");
  const my = document.getElementById("myPosts");

  if (!list || !my) return;

  list.innerHTML = "";
  my.innerHTML = "";

  data.forEach((p, i) => {
    list.innerHTML += `
    <div class="post-card">

      <div class="post-header">
        <img src="https://i.pravatar.cc/50?img=${i + 3}" class="avatar">
        <div>
          <strong>Your Name</strong>
          <p>Just now</p>
        </div>
      </div>

      <h3>${p.title}</h3>
      <p>${p.content}</p>

      ${
        p.image
          ? `
      <img src="${p.image}" id="img-${i}" class="post-img">

      <div class="quality-wrap">
        <div class="quality-head">
          <span>Compression Preview</span>
          <span id="qualityText-${i}">100%</span>
        </div>

        <input type="range"
        min="20"
        max="100"
        value="100"
        class="quality-slider"
        oninput="changeQuality(${i},this.value)">

        <div class="quality-info">
          <div>Original Size:
          <span id="origin-${i}">${calcSize(p.image)}</span></div>

          <div>Current Size:
          <span id="current-${i}">${calcSize(p.image)}</span></div>

          <div>Saved:
          <span id="saved-${i}">0%</span></div>

          <div>
          <span id="tip-${i}">Original Quality</span>
          </div>
        </div>
      </div>
      `
          : ""
      }

      <div class="post-actions">
        <button class="like-btn" onclick="likePost(${i})">👍 ${p.likes}</button>
        <button class="delete-btn" onclick="deletePost(${i})">🗑</button>
      </div>

    </div>
    `;

    my.innerHTML += `<p>${p.title}</p>`;
  });
}

/* ---------- 成人版发帖 ---------- */
function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const file = document.getElementById("postImage").files[0];

  if (!title || !content) {
    showToast("Please complete title and content");
    return;
  }

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      posts.unshift({
        title,
        content,
        likes: 0,
        image: e.target.result
      });

      savePosts();
      renderPosts();
      closeModal();
      clearInputs();
      showToast("Post created");
    };

    reader.readAsDataURL(file);
  } else {
    posts.unshift({
      title,
      content,
      likes: 0,
      image: ""
    });

    savePosts();
    renderPosts();
    closeModal();
    clearInputs();
    showToast("Post created");
  }
}

/* ---------- 成人版压缩 ---------- */
function changeQuality(index, quality) {
  const original = posts[index].image;

  document.getElementById(`qualityText-${index}`).innerText =
    quality + "%";

  smartCompress(original, quality / 100, function (newImg, format) {
    document.getElementById(`img-${index}`).src = newImg;

    const originalSize = getKB(original);
    const currentSize = getKB(newImg);

    document.getElementById(`current-${index}`).innerText =
      currentSize.toFixed(1) + " KB";

    let saved = 100 - (currentSize / originalSize) * 100;
    if (saved < 0) saved = 0;

    document.getElementById(`saved-${index}`).innerText =
      saved.toFixed(0) + "%";

    let tip = "";

    if (quality >= 90) tip = "HD Preview";
    else if (quality >= 70) tip = "Balanced Quality";
    else if (quality >= 50) tip = "Good Compression";
    else if (quality >= 30) tip = "Data Saver";
    else tip = "Ultra Low Size";

    tip += " · " + format.toUpperCase();

    document.getElementById(`tip-${index}`).innerText = tip;
  });
}

function smartCompress(src, quality, callback) {
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width * quality;
    canvas.height = img.height * quality;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const jpg = canvas.toDataURL("image/jpeg", quality);
    const webp = canvas.toDataURL("image/webp", quality);

    if (getKB(webp) < getKB(jpg)) callback(webp, "webp");
    else callback(jpg, "jpeg");
  };

  img.src = src;
}

/* ---------- 成人版功能 ---------- */
function likePost(i) {
  posts[i].likes++;
  savePosts();
  renderPosts();
}

function deletePost(i) {
  if (confirm("Delete this post?")) {
    posts.splice(i, 1);
    savePosts();
    renderPosts();
    showToast("Deleted");
  }
}

function searchPosts() {
  const key = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const result = posts.filter(
    p =>
      p.title.toLowerCase().includes(key) ||
      p.content.toLowerCase().includes(key)
  );

  renderPosts(result);
}

/* ---------- 儿童版 ---------- */
function renderKidsPosts() {
  const box = document.getElementById("kidsPostList");
  const starText = document.getElementById("starCount");

  if (!box) return;

  if (kidsPosts.length === 0) {
    kidsPosts = [
      {
        text: "I learned new words today!",
        happy: 2,
        love: 1,
        star: 3
      },
      {
        text: "I finished a game challenge!",
        happy: 4,
        love: 2,
        star: 5
      }
    ];
  }

  starText.innerText = stars;

  let badges = "";

  if (kidsPosts.length >= 1) badges += `<span class="badge">⭐ First Post</span>`;
  if (stars >= 5) badges += `<span class="badge">🌟 5 Stars</span>`;
  if (stars >= 10) badges += `<span class="badge">👑 Super Learner</span>`;

  box.innerHTML = `
    <div class="kids-welcome">
      <h2>🌈 Welcome Little Learner!</h2>
      <p>Today Goal Progress</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${Math.min(
          stars * 10,
          100
        )}%"></div>
      </div>
      <div class="badge-wrap">${badges}</div>
    </div>
  `;

  kidsPosts.forEach((p, i) => {
    box.innerHTML += `
    <div class="kids-card rainbow-card">
      <h3>${p.text}</h3>

      <div class="kids-actions">
        <button class="emoji-btn" onclick="emojiLike(${i},'😀')">😀 ${p.happy}</button>
        <button class="emoji-btn" onclick="emojiLike(${i},'❤️')">❤️ ${p.love}</button>
        <button class="emoji-btn" onclick="emojiLike(${i},'⭐')">⭐ ${p.star}</button>
      </div>
    </div>
    `;
  });
}

function openKidsModal() {
  document.getElementById("kidsModal").style.display = "flex";
}

function closeKidsModal() {
  document.getElementById("kidsModal").style.display = "none";
}

function addKidsPost() {
  const text = document.getElementById("kidsTemplate").value;

  kidsPosts.unshift({
    text,
    happy: 0,
    love: 0,
    star: 0
  });

  stars += 1;

  savePosts();
  renderKidsPosts();
  closeKidsModal();
  showToast("Great job! +1 Star ⭐");
}

function emojiLike(i, type) {
  if (type === "😀") kidsPosts[i].happy++;
  if (type === "❤️") kidsPosts[i].love++;
  if (type === "⭐") kidsPosts[i].star++;

  savePosts();
  renderKidsPosts();
}

/* ---------- 模式切换 ---------- */
function switchVersion() {
  kidsMode = !kidsMode;

  document.getElementById("adultVersion").style.display =
    kidsMode ? "none" : "flex";

  document.getElementById("kidsVersion").style.display =
    kidsMode ? "flex" : "none";

  document.querySelector(".mode-btn").innerText =
    kidsMode ? "🧑 Adult Mode" : "👶 Kids Mode";

  /* 关键：切换主题 */
  document.body.classList.toggle("kids-mode", kidsMode);
}

/* ---------- 通用 ---------- */
function openModal() {
  document.getElementById("postModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("postModal").style.display = "none";
}

function clearInputs() {
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function showToast(text) {
  const toast = document.getElementById("toast");

  toast.innerText = text;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function getKB(base64) {
  return (base64.length * 3) / 4 / 1024;
}

function calcSize(base64) {
  return getKB(base64).toFixed(1) + " KB";
}

/* ---------- 初始化 ---------- */
renderPosts();
renderKidsPosts();