// community_kids_personalhomepage.js

let kidsPosts = JSON.parse(localStorage.getItem("kidsPosts")) || [];
let stars = Number(localStorage.getItem("stars")) || 0;

/* 初始化 */
function initPage(){
    renderKidsPosts();
    renderStars();
}

/* 渲染帖子 */
function renderKidsPosts(){
    const box = document.getElementById("kidsPosts");

    if(!box) return;

    if(kidsPosts.length === 0){
        box.innerHTML = `
            <div class="post-card">
                I learned something new today!
            </div>
        `;
        return;
    }

    box.innerHTML = "";

    kidsPosts.forEach(p=>{
        box.innerHTML += `
            <div class="post-card">
                ${p.text}
            </div>
        `;
    });
}

/* 星星数据 */
function renderStars(){
    const starCount = document.getElementById("starCount");
    const progressFill = document.getElementById("progressFill");

    if(starCount) starCount.innerText = stars;

    let progress = stars * 10;
    if(progress > 100) progress = 100;

    if(progressFill){
        progressFill.style.width = progress + "%";
    }
}

/* 初始化执行 */
initPage();