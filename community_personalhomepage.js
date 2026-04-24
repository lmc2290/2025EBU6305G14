// community_personalhomepage.js

let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* 初始化页面 */
function initPage(){
    renderPosts();
    renderStats();
}

/* 渲染我的帖子 */
function renderPosts(){
    const box = document.getElementById("myPosts");

    if(!box) return;

    if(posts.length === 0){
        box.innerHTML = `<p>No posts yet.</p>`;
        return;
    }

    box.innerHTML = "";

    posts.forEach(p => {
        box.innerHTML += `
            <div class="post-item">
                ${p.title}
            </div>
        `;
    });
}

/* 渲染统计 */
function renderStats(){
    const postCount = document.getElementById("postCount");
    const likeCount = document.getElementById("likeCount");

    let likes = 0;

    posts.forEach(p=>{
        likes += p.likes || 0;
    });

    if(postCount) postCount.innerText = posts.length;
    if(likeCount) likeCount.innerText = likes;
}

/* 深色模式 */
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

/* 初始化 */
initPage();
