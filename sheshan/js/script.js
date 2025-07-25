document.addEventListener('click', function playMusic() {
    const audio = new Audio('https://shedusw.com/sheshan/music/music.mp3');
    audio.loop = true;
    audio.play().then(() => {
        console.log('背景音乐已开始播放');
    }).catch(error => {
        console.error('自动播放失败：', error);
    });
    // 只绑定一次，播放后解绑
    document.removeEventListener('click', playMusic);
});


const openBtn = document.getElementById("openBtn");
const modal = document.getElementById("modal");

// 打开弹窗
openBtn.addEventListener("click", () => {
    modal.style.display = "flex"; // 显示并居中
});

// 点击空白区域关闭弹窗
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


const menu = document.getElementById("menu");
const modal2 = document.getElementById("modal2");

// 打开弹窗
menu.addEventListener("click", () => {
    modal2.style.display = "flex"; // 显示并居中
});

// 点击空白区域关闭弹窗
modal2.addEventListener("click", (e) => {
    if (e.target === modal2) {
        modal2.style.display = "none";
    }
});
