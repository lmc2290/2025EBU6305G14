// community.js

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let lang = "en";

if(posts.length === 0){
for(let i=1;i<=6;i++){
posts.push({
title:"Post "+i,
content:"This is content of post "+i,
likes:0,
comments:[],
image:""
});
}
savePosts();
}

function savePosts(){
localStorage.setItem("posts",JSON.stringify(posts));
}

function renderPosts(listData = posts){

const list = document.getElementById("postList");
const my = document.getElementById("myPosts");
const profile = document.getElementById("profilePosts");
const board = document.getElementById("scoreboard");

list.innerHTML="";
my.innerHTML="";
profile.innerHTML="";
board.innerHTML="";

listData.forEach((p,i)=>{

list.innerHTML += `
<div class="post-card">

<div class="post-header">
<img src="https://i.pravatar.cc/40?img=${i+2}" class="avatar">
<div>
<strong>Your Name</strong>
<p>2 mins ago</p>
</div>
</div>

<h3>${p.title}</h3>
<p>${p.content}</p>

${p.image ? `<img src="${p.image}" class="post-img">` : ""}

<div class="post-actions">
<button class="like-btn" onclick="likePost(${i})">👍 ${p.likes}</button>
<button class="delete-btn" onclick="deletePost(${i})">🗑</button>
</div>

<div class="comments">
${p.comments.map((c,ci)=>`
<div class="comment">
${c}
<span onclick="deleteComment(${i},${ci})"> ✖</span>
</div>
`).join("")}

<div class="comment-input">
<input id="comment-${i}" placeholder="comment...">
<button onclick="addComment(${i})">Post</button>
</div>

</div>
</div>
`;

my.innerHTML += `<p>${p.title}</p>`;
profile.innerHTML += `<div class="side-card">${p.title}</div>`;

});

for(let i=1;i<=5;i++){
board.innerHTML += `<p>${i}. Learner ${i} - ${120-i*10} pts</p>`;
}

}

function addPost(){

const title = document.getElementById("postTitle").value;
const content = document.getElementById("postContent").value;
const file = document.getElementById("postImage").files[0];

if(!title || !content) return;

if(file){

const reader = new FileReader();

reader.onload = function(e){

compressImage(e.target.result,function(img){

posts.unshift({
title,
content,
likes:0,
comments:[],
image:img
});

savePosts();
renderPosts();
closeModal();
showToast("Post created");

});

};

reader.readAsDataURL(file);

}else{

posts.unshift({
title,
content,
likes:0,
comments:[],
image:""
});

savePosts();
renderPosts();
closeModal();
showToast("Post created");

}

clearInputs();

}

function compressImage(src,callback){

const img = new Image();

img.onload = function(){

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = img.height * (600/img.width);

ctx.drawImage(img,0,0,canvas.width,canvas.height);

callback(canvas.toDataURL("image/jpeg",0.65));

};

img.src = src;

}

function clearInputs(){
document.getElementById("postTitle").value="";
document.getElementById("postContent").value="";
document.getElementById("postImage").value="";
}

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

function addComment(i){
const input = document.getElementById(`comment-${i}`);

if(input.value){
posts[i].comments.push(input.value);
savePosts();
renderPosts();
}
}

function deleteComment(i,ci){
posts[i].comments.splice(ci,1);
savePosts();
renderPosts();
}

function searchPosts(){
const key = document.getElementById("searchInput").value.toLowerCase();

const result = posts.filter(p =>
p.title.toLowerCase().includes(key) ||
p.content.toLowerCase().includes(key)
);

renderPosts(result);
}

function openModal(){
document.getElementById("postModal").style.display="flex";
}

function closeModal(){
document.getElementById("postModal").style.display="none";
}

function openProfile(){
document.querySelector(".community-container").style.display="none";
document.getElementById("profilePage").style.display="block";
}

function closeProfile(){
document.querySelector(".community-container").style.display="flex";
document.getElementById("profilePage").style.display="none";
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

function toggleLanguage(){

lang = lang === "en" ? "cn" : "en";

document.getElementById("exploreTitle").innerText =
lang === "en" ? "Explore Posts" : "探索帖子";

}

function showToast(text){

const toast = document.getElementById("toast");

toast.innerText = text;
toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},2000);

}

renderPosts();