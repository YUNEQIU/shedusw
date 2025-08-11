// 收藏
const img = document.querySelector('.studycontent img');
img.addEventListener('click', () => {
  img.classList.toggle('grayscale');
});

const tabs = document.querySelectorAll('#top > div');
const bottom = document.getElementById('bottom');

// 看一看
function renderKan() {
  bottom.innerHTML = `
    <h2>看一看</h2>
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
  {
    question: "北京大观园在什么地方？",
    options: ["新疆", "北京", "海南岛", "香港"],
  },
  {
    question: "北京大观园的开放时间是什么？",
    options: ["24小时", "仅节假日开放", "7:300-17:30", "闭园"],
  },
  {
    question: "北京大观园的门票是多少？",
    options: ["五元", "十元", "抽签", "免费"],
  },
  {
    question: "北京大观园里有什么？",
    options: ["古建筑", "北京烤鸭", "豆汁", "文创商品"],
  },
  {
    question: "你还会来北京大观园吗？",
    options: ["不好说", "天天来", "再说吧", "天气好的时候"],
  },
];

function renderXue() {
  let formHtml = `<h2>学一学</h2><form id="quizForm">`;
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
  formHtml += `<input type="submit" value="提交" /></form>`;
  bottom.innerHTML = formHtml;

  const form = document.getElementById('quizForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert("您的答题已提交，谢谢！");
  });
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
  panelBtn.addEventListener('click', () => {
    alert('弹出面板功能待实现');
  });
}

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

tabs.forEach(t => {
  t.addEventListener('click', () => {
    switchTab(t.dataset.tab);
  });
});
