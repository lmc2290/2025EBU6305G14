/* community.js */

let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* ---------- INIT ---------- */
if (posts.length === 0) {
  posts = [
    {
      title: "Welcome Post",
      content: "Upload original image and preview smart compression.",
      likes: 0,
      image: "",
      comments: []
    }
  ];
  savePosts();
}

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

/* ---------- RENDER ---------- */
function renderPosts(data = posts) {

  const list = document.getElementById("postList");
  const my = document.getElementById("myPosts");

  list.innerHTML = "";
  my.innerHTML = "";

  data.forEach((p, i) => {

    list.innerHTML += `
    <div class="post-card">

      <div class="post-header">
        <img src="https://i.pravatar.cc/50?img=${i+3}" class="avatar">
        <div>
          <strong>Your Name</strong>
          <p>Just now</p>
        </div>
      </div>

      <h3>${p.title}</h3>
      <p>${p.content}</p>

      ${p.image ? `
      <img src="${p.image}" id="img-${i}" class="post-img">

      <div class="quality-wrap">

        <div class="quality-head">
          <span>Compression Preview</span>
          <span id="qualityText-${i}">100%</span>
        </div>

        <input
          type="range"
          min="20"
          max="100"
          value="100"
          class="quality-slider"
          oninput="changeQuality(${i},this.value)"
        >

        <div class="quality-info">

          <div>Original Size:
            <span id="origin-${i}">${calcSize(p.image)}</span>
          </div>

          <div>Current Size:
            <span id="current-${i}">${calcSize(p.image)}</span>
          </div>

          <div>Saved:
            <span id="saved-${i}">0%</span>
          </div>

          <div>
            <span id="tip-${i}">Original Quality</span>
          </div>

        </div>
      </div>
      ` : ""}

      <div class="post-actions">
        <button class="like-btn" onclick="likePost(${i})">👍 ${p.likes}</button>
        <button class="delete-btn" onclick="deletePost(${i})">🗑</button>
      </div>

    </div>
    `;

    my.innerHTML += `<p>${p.title}</p>`;
  });
}

/* ---------- ADD POST ---------- */
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
        image: e.target.result,
        comments: []
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
      image: "",
      comments: []
    });

    savePosts();
    renderPosts();
    closeModal();
    clearInputs();
    showToast("Post created");
  }
}

/* ---------- SMART PREVIEW ---------- */
function changeQuality(index, quality) {

  const original = posts[index].image;

  document.getElementById(`qualityText-${index}`).innerText =
    quality + "%";

  smartCompress(original, quality / 100, function(newImg, format){

    document.getElementById(`img-${index}`).src = newImg;

    const originalSize = getKB(original);
    const currentSize = getKB(newImg);

    document.getElementById(`current-${index}`).innerText =
      currentSize.toFixed(1) + " KB";

    let saved = 100 - (currentSize / originalSize * 100);

    if(saved < 0) saved = 0;

    document.getElementById(`saved-${index}`).innerText =
      saved.toFixed(0) + "%";

    /* 状态提示 */
    let tip = "";

    if(quality >= 90){
      tip = "HD Preview";
    }else if(quality >= 70){
      tip = "Balanced Quality";
    }else if(quality >= 50){
      tip = "Good Compression";
    }else if(quality >= 30){
      tip = "Data Saver";
    }else{
      tip = "Ultra Low Size";
    }

    if(saved === 0 && quality < 100){
      tip = "No extra saving on this image";
    }

    tip += " · " + format.toUpperCase();

    document.getElementById(`tip-${index}`).innerText = tip;

  });

}

/* ---------- SMART COMPRESS ---------- */
function smartCompress(src, quality, callback){

  const img = new Image();

  img.onload = function(){

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    /* 分辨率同步缩放 */
    const scale = quality;

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img,0,0,canvas.width,canvas.height);

    /* JPEG版本 */
    const jpg = canvas.toDataURL("image/jpeg", quality);

    /* WEBP版本（更先进） */
    const webp = canvas.toDataURL("image/webp", quality);

    /* 选更小的 */
    if(getKB(webp) < getKB(jpg)){
      callback(webp,"webp");
    }else{
      callback(jpg,"jpeg");
    }

  };

  img.src = src;
}

/* ---------- UTIL ---------- */
function getKB(base64){
  return (base64.length * 3 / 4 / 1024);
}

function calcSize(base64){
  return getKB(base64).toFixed(1) + " KB";
}

/* ---------- ACTION ---------- */
function likePost(i){
  posts[i].likes++;
  savePosts();
  renderPosts();
}

function deletePost(i){

  if(confirm("Delete this post?")){
    posts.splice(i,1);
    savePosts();
    renderPosts();
    showToast("Deleted");
  }
}

function searchPosts(){

  const key =
    document.getElementById("searchInput").value.toLowerCase();

  const result = posts.filter(p =>
    p.title.toLowerCase().includes(key) ||
    p.content.toLowerCase().includes(key)
  );

  renderPosts(result);
}

/* ---------- UI ---------- */
function openModal(){
  document.getElementById("postModal").style.display = "flex";
}

function closeModal(){
  document.getElementById("postModal").style.display = "none";
}

function clearInputs(){
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

function showToast(text){

  const toast = document.getElementById("toast");

  toast.innerText = text;
  toast.style.display = "block";

  setTimeout(()=>{
    toast.style.display = "none";
  },2000);
}

renderPosts();