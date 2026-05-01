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

/* =========================
   🆕 我的帖子（已加删除功能）
========================= */
function renderPosts(){

    const box = document.getElementById("myPosts");

    if(posts.length === 0){
        box.innerHTML = `<p>No posts yet.</p>`;
        return;
    }

    box.innerHTML = "";

    posts.forEach((p, index)=>{

        box.innerHTML += `
            <div class="post-item" style="display:flex;justify-content:space-between;align-items:center;gap:10px;">

                <span>${p.title}</span>

                <!-- 🗑 删除按钮（新增，不影响原功能） -->
                <button onclick="deletePost(index=${index})"
                        style="
                            border:none;
                            background:#ff4d4f;
                            color:white;
                            padding:6px 10px;
                            border-radius:8px;
                            cursor:pointer;
                        ">
                    🗑
                </button>

            </div>
        `;
    });
}

/* 🆕 删除帖子 */
function deletePost(index){

    if(!confirm("Delete this post?")) return;

    posts.splice(index, 1);

    localStorage.setItem("posts", JSON.stringify(posts));

    renderPosts();
    renderStats();
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