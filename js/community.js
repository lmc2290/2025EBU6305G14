let posts = JSON.parse(localStorage.getItem("posts")) || [];
let kidsPosts = JSON.parse(localStorage.getItem("kidsPosts")) || [];
let stars = Number(localStorage.getItem("stars")) || 0;
let kidsMode = false;

if (posts.length === 0) {
  posts = [{title:"Welcome Post",content:"Upload original image and preview smart compression.",likes:0,image:"",comments:[{user:"Amy",text:"Great feature!"},{user:"Tom",text:"Looks useful!"}]}];
}
savePosts();

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("kidsPosts", JSON.stringify(kidsPosts));
  localStorage.setItem("stars", stars);
}

/* 成人版 */
function renderPosts(data = posts) {
  const list = document.getElementById("postList");
  const my = document.getElementById("myPosts");
  if (!list || !my) return;
  list.innerHTML = ""; my.innerHTML = "";
  data.forEach((p, i) => {
    if (!p.comments) p.comments = [];
    p.comments = p.comments.map(c => typeof c === "string" ? {user:"You",text:c} : c);
    const commentHTML = p.comments.length === 0 ? `<p class="no-comment">No comments yet</p>` : p.comments.map((c, idx) => `
      <div class="comment-item"><span><strong>${c.user}:</strong> ${c.text}</span>${c.user==="You"?`<button class="mini-delete" onclick="deleteComment(${i},${idx})">🗑</button>`:""}</div>
    `).join("");
    list.innerHTML += `
      <div class="post-card">
        <div class="post-header"><img src="https://i.pravatar.cc/50?img=${i+3}" class="avatar"><div><strong>Your Name</strong><p>Just now</p></div></div>
        <h3>${p.title}</h3><p>${p.content}</p>
        ${p.image?`<div><img src="${p.image}" id="img-${i}" class="post-img"><div class="quality-wrap"><div class="quality-head"><span>Compression Preview</span><span id="qualityText-${i}">100%</span></div><input type="range" min="20" max="100" value="100" class="quality-slider" oninput="changeQuality(${i},this.value)"><div class="quality-info"><div>Original Size: <span id="origin-${i}">${calcSize(p.image)}</span></div><div>Current Size: <span id="current-${i}">${calcSize(p.image)}</span></div><div>Saved: <span id="saved-${i}">0%</span></div><div><span id="tip-${i}">Original Quality</span></div></div></div></div>`:""}
        <div class="post-actions">
          <button class="like-btn" onclick="likePost(${i})" style="color:${localStorage.getItem("liked_"+i)?"#007bff":""}">👍 ${p.likes}</button>
          <button class="like-btn" onclick="toggleComments(${i})">💬 ${p.comments.length}</button>
          <button class="delete-btn" onclick="deletePost(${i})">🗑</button>
        </div>
        <div class="comment-box" id="commentBox-${i}" style="display:none;"><div class="comment-list">${commentHTML}</div><div class="comment-input-wrap"><input type="text" id="commentInput-${i}" class="comment-input" placeholder="Write a comment..."><button class="btn btn-primary" onclick="addComment(${i})">Send</button></div></div>
      </div>
    `;
    my.innerHTML += `<p>${p.title}</p>`;
  });
}

/* 发帖 */
function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const file = document.getElementById("postImage").files[0];
  if (!title || !content) { showToast("Please complete title and content"); return; }
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      posts.unshift({title,content,likes:0,image:e.target.result,comments:[]});
      savePosts(); renderPosts(); renderLeaderboard(); closeModal(); clearInputs(); showToast("Post created");
    };
    reader.readAsDataURL(file);
  } else {
    posts.unshift({title,content,likes:0,image:"",comments:[]});
    savePosts(); renderPosts(); renderLeaderboard(); closeModal(); clearInputs(); showToast("Post created");
  }
}

/* 评论 */
function toggleComments(i){
  const b=document.getElementById(`commentBox-${i}`);
  b.style.display=b.style.display==="none"?"block":"none";
}
function addComment(i){
  const t=document.getElementById(`commentInput-${i}`).value.trim();
  if(!t){showToast("Write something");return;}
  posts[i].comments.push({user:"You",text:t});
  savePosts();renderPosts();renderLeaderboard();
  setTimeout(()=>document.getElementById(`commentBox-${i}`).style.display="block",50);
  showToast("Comment added");
}
function deleteComment(pIdx,cIdx){
  if(posts[pIdx].comments[cIdx].user!=="You")return;
  if(confirm("Delete comment?")){
    posts[pIdx].comments.splice(cIdx,1);
    savePosts();renderPosts();renderLeaderboard();
    setTimeout(()=>document.getElementById(`commentBox-${pIdx}`).style.display="block",50);
    showToast("Deleted");
  }
}

/* 点赞（只能点一次）*/
function likePost(i){
  const key="liked_"+i;
  if(localStorage.getItem(key)){
    posts[i].likes--;
    localStorage.removeItem(key);
  }else{
    posts[i].likes++;
    localStorage.setItem(key,"1");
  }
  savePosts();renderPosts();renderLeaderboard();
}

/* 删除帖子 */
function deletePost(i){
  if(!confirm("Delete post?"))return;
  posts.splice(i,1);
  savePosts();renderPosts();renderLeaderboard();
  document.getElementById("myPosts").innerHTML=posts.map(p=>`<p>${p.title}</p>`).join("");
  showToast("Deleted");
}

/* 搜索 */
function searchPosts(){
  const k=document.getElementById("searchInput").value.toLowerCase();
  renderPosts(posts.filter(p=>p.title.toLowerCase().includes(k)||p.content.toLowerCase().includes(k)));
}

/* 图片压缩 */
function changeQuality(idx,q){
  const src=posts[idx].image;
  document.getElementById(`qualityText-${idx}`).innerText=q+"%";
  smartCompress(src,q/100,(n,f)=>{
    document.getElementById(`img-${idx}`).src=n;
    const o=getKB(src),c=getKB(n);
    document.getElementById(`current-${idx}`).innerText=c.toFixed(1)+" KB";
    const s=Math.max(0,100-(c/o*100));
    document.getElementById(`saved-${idx}`).innerText=s.toFixed(0)+"%";
    let t;
    if(q>=90)t="HD Preview";else if(q>=70)t="Balanced";else if(q>=50)t="Good Compression";else if(q>=30)t="Data Saver";else t="Ultra Low";
    document.getElementById(`tip-${idx}`).innerText=t+" · "+f.toUpperCase();
  });
}
function smartCompress(src,q,cb){
  const img=new Image();
  img.onload=()=>{
    const c=document.createElement("canvas"),ctx=c.getContext("2d");
    c.width=img.width*q; c.height=img.height*q;
    ctx.drawImage(img,0,0,c.width,c.height);
    const j=c.toDataURL("image/jpeg",q),w=c.toDataURL("image/webp",q);
    getKB(w)<getKB(j)?cb(w,"webp"):cb(j,"jpeg");
  };
  img.src=src;
}
function getKB(b64){return (b64.length*3/4)/1024;}
function calcSize(b64){return getKB(b64).toFixed(1)+" KB";}

/* 儿童版 */
function renderKidsPosts(){
  const box=document.getElementById("kidsPostList");
  const starText=document.getElementById("starCount");
  if(!box)return;
  if(kidsPosts.length===0) kidsPosts=[{text:"I learned new words today!",happy:2,love:1,star:3}];
  starText.innerText=stars; box.innerHTML="";
  kidsPosts.forEach((p,i)=>{
    box.innerHTML+=`
      <div class="kids-card">
        <h3>${p.text}</h3>
        <div class="kids-actions">
          <button class="emoji-btn happy-btn" onclick="toggleHappy(${i})" style="color:${localStorage.getItem("happy_"+i)?"#ff69b4":""}">😀 ${p.happy}</button>
          <button class="emoji-btn love-btn" onclick="toggleLove(${i})" style="color:${localStorage.getItem("love_"+i)?"#ff1493":""}">❤️ ${p.love}</button>
          <button class="emoji-btn star-btn" onclick="giveStar(${i})" style="color:${localStorage.getItem("star_"+i)?"#ffd700":""}">⭐ ${p.star}</button>
        </div>
        <button class="emoji-btn" style="background:#ff4444;color:white;margin-top:8px" onclick="deleteKidsPost(${i})">Delete</button>
      </div>
    `;
  });
}

/* 儿童删除 */
function deleteKidsPost(i){
  if(!confirm("Delete this post?"))return;
  kidsPosts.splice(i,1);
  savePosts();renderKidsPosts();renderLeaderboard();
  showToast("Deleted");
}

/* 儿童互动（只能点一次）*/
function toggleHappy(i){
  const k="happy_"+i;
  localStorage.getItem(k)?(kidsPosts[i].happy--,localStorage.removeItem(k)):(kidsPosts[i].happy++,localStorage.setItem(k,"1"));
  savePosts();renderKidsPosts();
}
function toggleLove(i){
  const k="love_"+i;
  localStorage.getItem(k)?(kidsPosts[i].love--,localStorage.removeItem(k)):(kidsPosts[i].love++,localStorage.setItem(k,"1"));
  savePosts();renderKidsPosts();
}
function giveStar(i){
  const k="star_"+i;
  localStorage.getItem(k)?(kidsPosts[i].star--,localStorage.removeItem(k)):(kidsPosts[i].star++,localStorage.setItem(k,"1"));
  savePosts();renderKidsPosts();renderLeaderboard();
}

function openKidsModal(){document.getElementById("kidsModal").style.display="flex";}
function closeKidsModal(){document.getElementById("kidsModal").style.display="none";}
function addKidsPost(){
  const t=document.getElementById("kidsTemplate").value;
  kidsPosts.unshift({text:t,happy:0,love:0,star:0});
  stars++;savePosts();renderKidsPosts();renderLeaderboard();closeKidsModal();showToast("Great job! +1 Star ⭐");
}

/* 排行榜 */
function renderLeaderboard(){
  const b=document.getElementById("leaderboard"),kBoard=document.getElementById("kidsLeaderboard");
  if(!b||!kBoard)return;
  let likes=0,comments=0;
  posts.forEach(p=>{likes+=p.likes||0;comments+=p.comments?.length||0});
  const score=posts.length*5+likes*2+comments*3;
  let users=[{name:"Amy",score:32},{name:"Tom",score:26},{name:"Jack",score:18},{name:"You",score:score}];
  users.sort((a,b)=>b.score-a.score);
  b.innerHTML=users.map((u,i)=>{
    const m=i===0?"🥇":i===1?"🥈":i===2?"🥉":"🏅";
    return `<div class="rank-row ${u.name==="You"?"me-row":""}"><div class="rank-left"><span class="rank-medal">${m}</span><span>${u.name}</span></div><strong>${u.score}</strong></div>`;
  }).join("");
  let kids=[{name:"Amy",score:14},{name:"Ben",score:11},{name:"Mia",score:9},{name:"You",score:stars}];
  kids.sort((a,b)=>b.score-a.score);
  kBoard.innerHTML=kids.map((u,i)=>{
    const m=i===0?"👑":i===1?"🌟":i===2?"✨":"⭐";
    return `<div class="rank-row ${u.name==="You"?"me-row kids-me":""}"><div class="rank-left"><span class="rank-medal">${m}</span><span>${u.name}</span></div><strong>${u.score}</strong></div>`;
  }).join("");
}

/* 模式切换 */
function switchVersion(){
  kidsMode=!kidsMode;
  document.getElementById("adultVersion").style.display=kidsMode?"none":"flex";
  document.getElementById("kidsVersion").style.display=kidsMode?"flex":"none";
  document.querySelector(".mode-btn").innerText=kidsMode?"🧑 Adult Mode":"👶 Kids Mode";
  document.body.classList.toggle("kids-mode",kidsMode);
}

/* 通用 */
function openModal(){document.getElementById("postModal").style.display="flex";}
function closeModal(){document.getElementById("postModal").style.display="none";}
function clearInputs(){document.getElementById("postTitle").value="";document.getElementById("postContent").value="";document.getElementById("postImage").value="";}
function toggleDarkMode(){document.body.classList.toggle("dark");}
function showToast(t){const toast=document.getElementById("toast");toast.innerText=t;toast.style.display="block";setTimeout(()=>toast.style.display="none",2000);}

renderPosts();renderKidsPosts();renderLeaderboard();