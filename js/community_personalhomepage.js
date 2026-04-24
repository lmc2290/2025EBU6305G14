// community_personalhomepage.js

let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* 初始化 */
function initPage(){
    loadProfile();
    renderPosts();
    renderStats();
}

/* 读取资料 */
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

/* 修改名字 */
function changeName(){

    let current =
    document.getElementById("profileName").innerText;

    let name = prompt("Enter your new name:", current);

    if(name && name.trim() !== ""){
        document.getElementById("profileName").innerText = name;
        localStorage.setItem("adultName", name);
    }
}

/* 点击头像 */
function changeAvatar(){
    document.getElementById("avatarUpload").click();
}

/* 上传头像 */
function uploadAvatar(event){

    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){
        const img = e.target.result;

        document.getElementById("profileAvatar").src = img;

        localStorage.setItem("adultAvatar", img);
    }

    reader.readAsDataURL(file);
}

/* 我的帖子 */
function renderPosts(){

    const box = document.getElementById("myPosts");

    if(posts.length === 0){
        box.innerHTML = `<p>No posts yet.</p>`;
        return;
    }

    box.innerHTML = "";

    posts.forEach(p=>{

        box.innerHTML += `
            <div class="post-item">
                ${p.title}
            </div>
        `;
    });
}

/* 统计 */
function renderStats(){

    let likes = 0;

    posts.forEach(p=>{
        likes += p.likes || 0;
    });

    document.getElementById("postCount").innerText = posts.length;
    document.getElementById("likeCount").innerText = likes;
}

/* 深色模式 */
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

/* 启动 */
initPage();