// ===== 数据 =====
let posts = JSON.parse(localStorage.getItem("posts")) || [];

if(posts.length === 0){
    for(let i=1;i<=10;i++){
        posts.push({
            title: "Post " + i,
            content: "This is content of post " + i,
            likes: 0,
            comments: []
        });
    }
    savePosts();
}

function savePosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

// ===== 渲染 =====
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

            <div class="post-actions">
                <button class="like-btn" onclick="likePost(${i}, this)">👍 ${p.likes}</button>
                <button class="delete-btn" onclick="deletePost(${i})">🗑</button>
            </div>

            <div class="comments">
                ${p.comments.map((c, ci)=>`
                    <div class="comment">
                        ${c}
                        <span class="delete-comment" onclick="deleteComment(${i}, ${ci})">✖</span>
                    </div>
                `).join("")}

                <div class="comment-input">
                    <input id="comment-${i}" placeholder="Write comment...">
                    <button onclick="addComment(${i})">Post</button>
                </div>
            </div>

        </div>
        `;

        my.innerHTML += `<div class="user-post-card">${p.title}</div>`;
        profile.innerHTML += `<div class="user-post-card">${p.title}</div>`;
    });
}

// ===== 发帖 =====
function addPost(){
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if(title && content){
        posts.unshift({title, content, likes:0, comments:[]});
        savePosts();

        document.getElementById("postTitle").value="";
        document.getElementById("postContent").value="";

        closeModal();
        renderPosts();
    }
}

// ===== 删除帖子 =====
function deletePost(i){
    if(confirm("Delete this post?")){
        posts.splice(i,1);
        savePosts();
        renderPosts();
    }
}

// ===== 点赞 =====
function likePost(i, btn){
    posts[i].likes++;
    savePosts();

    btn.classList.add("liked");
    setTimeout(()=>btn.classList.remove("liked"),300);

    renderPosts();
}

// ===== 评论 =====
function addComment(i){
    const input = document.getElementById(`comment-${i}`);
    if(input.value){
        posts[i].comments.push(input.value);
        savePosts();
        renderPosts();
    }
}

// ===== 删除评论 =====
function deleteComment(postIndex, commentIndex){
    posts[postIndex].comments.splice(commentIndex,1);
    savePosts();
    renderPosts();
}

// ===== UI =====
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