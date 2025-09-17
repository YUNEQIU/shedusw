document.addEventListener('DOMContentLoaded', () => {

  // 收藏功能
  const img = document.querySelector('.studycontent img');
  if (img) {
    img.addEventListener('click', () => {
      img.classList.toggle('grayscale');
    });
  }

  // 顶部标签切换
  const tabs = document.querySelectorAll('#top > div');
  const bottom = document.getElementById('bottom');

  // 看一看
  function renderKan() {
    bottom.innerHTML = `
      <h2>看一看</h2>
      <p style="text-align: center; padding-bottom: 10px;">北京大观园简介视频</p>
      <video controls autoplay muted>
        <source src="videos/bjdgy.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
    `;
  }

  // 听一听
  function renderTing() {
    bottom.innerHTML = `
      <h2>听一听</h2>
      <div style="text-align:center; margin-bottom: 15px;">
        <img class="listen-img" src="images/hlmcd.avif" alt="music" width="300" height="300" />
      </div>
      <audio controls>
        <source src="music/bgm.mp3" type="audio/mpeg" />
        您的浏览器不支持音频播放。
      </audio>
    `;
  }

  // 学一学
  const quizData = [
    { question: "北京大观园在什么地方？", options: ["新疆", "北京", "海南岛", "香港"] },
    { question: "北京大观园的开放时间是什么？", options: ["24小时", "仅节假日开放", "7:300-17:30", "闭园"] },
    { question: "北京大观园的门票是多少？", options: ["五元", "十元", "抽签", "免费"] },
    { question: "北京大观园里有什么？", options: ["古建筑", "北京烤鸭", "豆汁", "文创商品"] },
    { question: "你还会来北京大观园吗？", options: ["不好说", "天天来", "再说吧", "天气好的时候"] }
  ];

  function renderXue() {
    let formHtml = `<h2>学一学</h2><div class="quiz-container"><form id="quizForm">`;
    quizData.forEach((q, idx) => {
      formHtml += `<div class="question">
      <p>${q.question}</p>`;
      q.options.forEach((opt, i) => {
        const optionId = `q${idx}_opt${i}`;
        formHtml += `
        <label for="${optionId}">
          <input type="radio" name="q${idx}" id="${optionId}" value="${opt}" required /> ${opt}
        </label>
      `;
      });
      formHtml += `</div>`;
    });
    formHtml += `<input type="submit" value="提交" /></form></div>`;
    bottom.innerHTML = formHtml;

    const form = document.getElementById('quizForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        alert("您的答题已提交，谢谢！");
      });
    }
  }

  // 评一评
  function renderPing() {
    bottom.innerHTML = `
      <h2>评一评</h2>
      <div id="comment-section">
        <textarea placeholder="请输入您的评论..."></textarea>
        <div class="upload-icon" title="上传图片" tabindex="0" role="button" aria-label="上传图片">
          <img src="images/imageupload.avif" alt="上传图片" />
        </div>
        <button class="panel-btn" type="button">弹出面板</button>
        <div class="btn-group">
          <button type="button">点位简介</button>
          <button type="button">发表评论</button>
        </div>
      </div>
    `;

    const panelBtn = bottom.querySelector('.panel-btn');
    if (panelBtn) {
      panelBtn.addEventListener('click', () => {
        alert('弹出面板功能待实现');
      });
    }
  }

  // 切换标签
  function switchTab(tab) {
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = Array.from(tabs).find(t => t.dataset.tab === tab);
    if (activeTab) activeTab.classList.add('active');

    switch (tab) {
      case 'kan': renderKan(); break;
      case 'ting': renderTing(); break;
      case 'xue': renderXue(); break;
      case 'ping': renderPing(); break;
    }
  }

  if (tabs.length) {
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        switchTab(t.dataset.tab);
      });
    });
  }

  // 卡片动画
  const cards = document.querySelectorAll('.card');
  if (!cards.length) {
    console.warn('没有找到 .card，检查HTML是否正确。');
  } else {
    cards.forEach((card, index) => {
      setTimeout(() => card.classList.add('show'), index * 140);
    });
  }
});

// 文化背景图片
const currentPage = window.location.pathname.split("/").pop();

let backgroundImage;

switch (currentPage) {
  case "gdwh1.html":
    backgroundImage = "images/gdwhbj1.avif";
    break;
  case "gdwh2.html":
    backgroundImage = "images/gdwhbj2.avif";
    break;
  case "gdwh3.html":
    backgroundImage = "images/gdwhbj3.avif";
    break;
  case "gdwh4.html":
    backgroundImage = "images/gdwhbj4.avif";
    break;
  case "gdwh5.html":
    backgroundImage = "images/gdwhbj5.avif";
    break;
  case "gdwh6.html":
    backgroundImage = "images/gdwhbj6.avif";
    break;
  case "gdwh7.html":
    backgroundImage = "images/gdwhbj7.avif";
    break;

  case "hswh1.html":
    backgroundImage = "images/hswhbj1.avif";
    break;
  case "hswh2.html":
    backgroundImage = "images/hswhbj2.avif";
    break;
  case "hswh3.html":
    backgroundImage = "images/hswhbj3.avif";
    break;
  case "hswh4.html":
    backgroundImage = "images/hswhbj4.avif";
    break;
  case "hswh5.html":
    backgroundImage = "images/hswhbj5.avif";
    break;
  case "hswh6.html":
    backgroundImage = "images/hswhbj6.avif";
    break;
  case "hswh7.html":
    backgroundImage = "images/hswhbj7.avif";
    break;
  case "hswh8.html":
    backgroundImage = "images/hswhbj8.avif";
    break;
  case "hswh9.html":
    backgroundImage = "images/hswhbj9.avif";
    break;
  case "hswh10.html":
    backgroundImage = "images/hswhbj10.avif";
    break;
  case "hswh11.html":
    backgroundImage = "images/hswhbj11.avif";
    break;

  case "jwwh1.html":
    backgroundImage = "images/jwwhbj1.avif";
    break;
  case "jwwh2.html":
    backgroundImage = "images/jwwhbj2.avif";
    break;
  case "jwwh3.html":
    backgroundImage = "images/jwwhbj3.avif";
    break;
  case "jwwh4.html":
    backgroundImage = "images/jwwhbj4.avif";
    break;
  case "jwwh5.html":
    backgroundImage = "images/jwwhbj5.avif";
    break;
  case "jwwh6.html":
    backgroundImage = "images/jwwhbj6.avif";
    break;
  case "jwwh7.html":
    backgroundImage = "images/jwwhbj7.avif";
    break;
  case "jwwh8.html":
    backgroundImage = "images/jwwhbj8.avif";
    break;
  case "jwwh9.html":
    backgroundImage = "images/jwwhbj9.avif";
    break;
  case "jwwh10.html":
    backgroundImage = "images/jwwhbj10.avif";
    break;
  case "jwwh11.html":
    backgroundImage = "images/jwwhbj11.avif";
    break;
  case "jwwh12.html":
    backgroundImage = "images/jwwhbj12.avif";
    break;
  case "jwwh13.html":
    backgroundImage = "images/jwwhbj13.avif";
    break;
  case "jwwh14.html":
    backgroundImage = "images/jwwhbj14.avif";
    break;
  case "jwwh15.html":
    backgroundImage = "images/jwwhbj15.avif";
    break;
  case "jwwh16.html":
    backgroundImage = "images/jwwhbj16.avif";
    break;
  case "jwwh17.html":
    backgroundImage = "images/jwwhbj17.avif";
    break;
  case "jwwh18.html":
    backgroundImage = "images/jwwhbj18.avif";
    break;
  case "jwwh19.html":
    backgroundImage = "images/jwwhbj19.avif";
    break;
  case "jwwh20.html":
    backgroundImage = "images/jwwhbj20.avif";
    break;
  case "jwwh21.html":
    backgroundImage = "images/jwwhbj21.avif";
    break;

  case "cxwh1.html":
    backgroundImage = "images/cxwhbj1.avif";
    break;
  case "cxwh2.html":
    backgroundImage = "images/cxwhbj2.avif";
    break;
  case "cxwh3.html":
    backgroundImage = "images/cxwhbj3.avif";
    break;
  case "cxwh4.html":
    backgroundImage = "images/cxwhbj4.avif";
    break;
  case "cxwh5.html":
    backgroundImage = "images/cxwhbj5.avif";
    break;
  case "cxwh6.html":
    backgroundImage = "images/cxwhbj6.avif";
    break;
  case "cxwh7.html":
    backgroundImage = "images/cxwhbj7.avif";
    break;
  case "cxwh8.html":
    backgroundImage = "images/cxwhbj8.avif";
    break;
  case "cxwh9.html":
    backgroundImage = "images/cxwhbj9.avif";
    break;
  case "cxwh10.html":
    backgroundImage = "images/cxwhbj10.avif";
    break;
  case "cxwh11.html":
    backgroundImage = "images/cxwhbj11.avif";
    break;
  case "cxwh12.html":
    backgroundImage = "images/cxwhbj12.avif";
    break;
  case "cxwh13.html":
    backgroundImage = "images/cxwhbj13.avif";
    break;
  case "cxwh14.html":
    backgroundImage = "images/cxwhbj14.avif";
    break;
  case "cxwh15.html":
    backgroundImage = "images/cxwhbj15.avif";
    break;

  default:
    backgroundImage = "images/gdwhbj.avif";
    break;
}

document.querySelector('.background').style.backgroundImage = `url('${backgroundImage}')`;
