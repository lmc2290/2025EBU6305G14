let posts = [];

// 初始化帖子
for(let i=1;i<=20;i++){
    posts.push({
        title: "Post " + i,
        content: "This is content of post " + i,
        likes: 0,
        comments: []
    });
}

function renderPosts() {
    const list = document.getElementById("postList");
    const my = document.getElementById("myPosts");
    const profile = document.getElementById("profilePosts");

    list.innerHTML = "";
    my.innerHTML = "<h4>Your Posts</h4>";
    profile.innerHTML = "";

    posts.forEach((p, i) => {

        list.innerHTML += `
        <div class="post-card">
            <div class="post-header">
                <img src="https://i.pravatar.cc/40?img=${i}" class="avatar">
                <span>Your Name</span>
            </div>

            <h4>${p.title}</h4>
            <p>${p.content}</p>

            <button onclick="likePost(${i})">👍 ${p.likes}</button>

            <div class="comments">
                ${p.comments.map(c=>`<div class="comment">${c}</div>`).join("")}
                <input placeholder="Write comment..." onkeypress="addComment(event, ${i})">
            </div>
        </div>
        `;

        my.innerHTML += `<div class="user-post-card">${p.title}</div>`;
        profile.innerHTML += `<div class="user-post-card">${p.title}</div>`;
    });
}

// ✅ 发帖功能恢复
function addPost(){
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if(title && content){
        posts.unshift({
            title,
            content,
            likes: 0,
            comments: []
        });

        // 清空输入框（优化体验）
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";

        closeModal();
        renderPosts();
    }
}

function likePost(i){
    posts[i].likes++;
    renderPosts();
}

function addComment(e, i){
    if(e.key==="Enter"){
        posts[i].comments.push(e.target.value);
        renderPosts();
    }
}

function openModal(){
    document.getElementById('postModal').style.display='flex';
}
function closeModal(){
    document.getElementById('postModal').style.display='none';
}

function openProfile(){
    document.querySelector('.community-container').style.display='none';
    document.getElementById('profilePage').style.display='block';
}
function closeProfile(){
    document.querySelector('.community-container').style.display='flex';
    document.getElementById('profilePage').style.display='none';
}

renderPosts();