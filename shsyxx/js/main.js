/* menu */
document.addEventListener('DOMContentLoaded', function () {

  const nav = document.querySelector('.main-nav');
  const menuItems = Array.from(document.querySelectorAll('.main-nav__item.has-mega'));
  const mega = document.getElementById('megaMenu');

  let megaTimeout;

  function openMega() {
    clearTimeout(megaTimeout);
    mega.classList.add('show');
    menuItems.forEach(it => it.classList.add('open'));
    mega.setAttribute('aria-hidden', 'false');
  }
  function closeMega() {
    clearTimeout(megaTimeout);
    megaTimeout = setTimeout(() => {
      mega.classList.remove('show');
      menuItems.forEach(it => it.classList.remove('open'));
      mega.setAttribute('aria-hidden', 'true');
    }, 180);
  }

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', openMega);
    item.addEventListener('mouseleave', closeMega);
  });

  mega.addEventListener('mouseenter', openMega);
  mega.addEventListener('mouseleave', closeMega);


  /* ---------- 新闻轮播 ---------- */
  const items = document.querySelectorAll('.carousel__item');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel__btn.prev');
  const nextBtn = document.querySelector('.carousel__btn.next');
  let index = 0;
  let carouselTimer;

  function showIndex(i) {
    items.forEach((it, idx) => it.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    index = i;
  }

  function next() { showIndex((index + 1) % items.length); }
  function prev() { showIndex((index - 1 + items.length) % items.length); }

  dots.forEach(d => d.addEventListener('click', e => {
    const i = parseInt(e.target.dataset.index, 10);
    showIndex(i);
    resetTimer();
  }));
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

  function startTimer() {
    carouselTimer = setInterval(next, 3000);
  }
  function resetTimer() {
    clearInterval(carouselTimer);
    startTimer();
  }

  showIndex(0);
  startTimer();


  /* DIV5 */
  function setupTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const btns = container.querySelectorAll('.tabs-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.toggle('active', x === b));
        const target = b.dataset.target;
        const lists = container.querySelectorAll('.list');
        lists.forEach(l => l.classList.toggle('active', l.id === target));
      });
    });
  }

  setupTabs('.tabs-left');
  setupTabs('.tabs-center');


  const honorRows = document.querySelectorAll('.honor-row');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  honorRows.forEach(r => obs.observe(r));


  menuItems.forEach(item => {
    item.addEventListener('mouseenter', e => {
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mega.contains(e.target)) {
      closeMega();
    }
  });

});

/* 数字 */
window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter');
  const target = 23;
  const duration = 6000;
  const stepTime = 50;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter2');
  const target = 52;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter3');
  const target = 193;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter4');
  const target = 14;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter5');
  const target = 48;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter6');
  const target = 82;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter7');
  const target = 16;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter8');
  const target = 7;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter9');
  const target = 92;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('myCounter10');
  const target = 122;
  const duration = 6000;
  const stepTime = 20;

  let current = 0;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, stepTime);
});

/* 图片轮播 */
document.addEventListener('DOMContentLoaded', () => {

  const images = [
    'images/xuesheng1.avif',
    'images/xuesheng2.avif',
    'images/xuesheng3.avif',
    'images/xuesheng4.avif',
    'images/xuesheng5.avif'
  ];

  let index = 0;
  const imgElement = document.getElementById('autoImage');

  setInterval(() => {
    index = (index + 1) % images.length;
    imgElement.src = images[index];
  }, 2000);
});


const schoolnewsRightNews = document.querySelectorAll('.schoolnews_right-news .schoolnews_news-item');
const schoolnewsImage = document.querySelector('.schoolnews_menu-image img');

schoolnewsRightNews.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const imgSrc = item.getAttribute('data-img');
    if(imgSrc) {
      schoolnewsImage.src = imgSrc;
    }
  });
});
