const toggleBtn = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove('active');
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector('.nav-menu');
  const hoverBg = document.querySelector('.nav-hover-bg');
  const menuItems = Array.from(navMenu.querySelectorAll('a, .dropbtn'));

  // ✅ 包括“工具”
  const animatedItems = ["首页", "课程", "项目", "数据", "体验", "读本", "活动", "工具"];

  menuItems.forEach(item => {
    const text = item.textContent.trim();

    if (animatedItems.includes(text)) {
      item.addEventListener('mouseenter', () => {
        const rect = item.getBoundingClientRect();
        const containerRect = navMenu.getBoundingClientRect();
        const offsetLeft = rect.left - containerRect.left;
        const offsetTop = rect.top - containerRect.top;

        hoverBg.style.width = `${rect.width}px`;
        hoverBg.style.height = `${rect.height}px`;
        hoverBg.style.left = `${offsetLeft}px`;
        hoverBg.style.top = `${offsetTop}px`;

        // ✅ 始终使用 scale() 动画
        hoverBg.style.opacity = 1;
        hoverBg.style.transform = 'scale(1)';
      });

      item.addEventListener('mouseleave', (e) => {
        const related = e.relatedTarget;
        if (!navMenu.contains(related)) {
          hoverBg.style.opacity = 0;
          hoverBg.style.transform = 'scale(0)';
        }
      });
    }
  });

  navMenu.addEventListener('mouseleave', () => {
    hoverBg.style.opacity = 0;
    hoverBg.style.transform = 'scale(0)';
  });
});




// 滚动图
const strip = document.querySelector(".image-strip");
const images = strip.querySelectorAll("img");

images.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    strip.style.animationPlayState = "paused";
    img.classList.add("flipping");

    // ✅ 给其它图片加上模糊效果
    images.forEach((otherImg) => {
      if (otherImg !== img) {
        otherImg.classList.add("blurred");
      }
    });
  });

  img.addEventListener("mouseleave", () => {
    img.classList.remove("flipping");
    strip.style.animationPlayState = "running";

    // ✅ 移除所有模糊
    images.forEach((otherImg) => {
      otherImg.classList.remove("blurred");
    });
  });
});

// 课程

const items = document.querySelectorAll(".album-item");

items.forEach(item => {
  item.addEventListener("mouseenter", () => {
    items.forEach(i => i.classList.remove("expanded-item"));
    item.classList.add("expanded-item");
  });
});

// 鼠标移出整体区域时重置（可选）
document.querySelector(".album-container").addEventListener("mouseleave", () => {
  items.forEach(i => i.classList.remove("expanded-item"));
});

// 视频
document.querySelectorAll('.video3').forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

//课程列表

// 切换菜单展开/收起
function toggleSubMenu(header) {
  const arrow = header.querySelector(".arrow");
  const submenu = header.nextElementSibling;
  submenu.classList.toggle("show");
  arrow.classList.toggle("rotate");
}

// 加载资源内容到右侧
function loadContent(type, url) {
  const preview = document.getElementById("preview");

  if (type === 'video') {
    preview.innerHTML = `
      <video controls width="100%" height="610px" style="border-radius: 20px;" autoplay loop>
        <source src="videos/8.mp4" type="video/mp4">
        您的浏览器不支持视频播放。
      </video>
    `;

  } else if (type === 'pdf') {
    preview.innerHTML = `
      <iframe src="pdf/test.pdf" width="100%" height="680px" style="border: none; border-radius: 8px;"></iframe>
    `;

  } else {
    preview.innerHTML = `<p>无法识别的文件类型。</p>`;
  }
}
