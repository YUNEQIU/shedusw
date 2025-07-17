if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = "https://shedusw.com/mobile3.html";
}

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.image');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = `${index * 0.4}s`; // 每张图片的延迟递增
      }
    });
  }, {
    threshold: 0.5
  });
  
  images.forEach(image => {
    observer.observe(image);
  });
});

const image = document.getElementById('myImage');
let hasAnimated = false; 

function checkIfInView() {
  const rect = image.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (!hasAnimated && rect.top <= windowHeight && rect.bottom >= 0) {
    hasAnimated = true; 
    setTimeout(() => {
      image.classList.add('show');
    }, 1500); 
  }
}

window.addEventListener('scroll', checkIfInView);
window.addEventListener('load', checkIfInView);
