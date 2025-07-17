$(function () {
  $("#nav-ul>li").mouseenter(
    function () {
      $(this).siblings("li").removeClass("nav-active")
      $(this).addClass("nav-active")
    }
  ).mouseleave(
    function () {
      $(this).removeClass("nav-active")
    }
  )
  $("#nav-ul").mouseleave(
    function () {
      $(this).children().eq(0).addClass("nav-active")
    }
  )

  $.stellar({
    horizontalScrolling: false,
    responsive: true
  })
})

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.section');

  // 创建IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);  
      }
    });
  }, {
    threshold: 0.5 
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});

window.addEventListener('scroll', function () {
  const div = document.querySelector('.codefont');
  const divPosition = div.getBoundingClientRect().top; 
  const windowHeight = window.innerHeight; 

  if (divPosition < windowHeight) {
    div.style.opacity = 1;
    div.style.transform = 'translateY(0)'; 
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.yvesklein');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight;  
  
  if (divPosition < windowHeight * 0.8) {  
    div.style.opacity = 1;
    div.style.transform = 'scale(1)'; 
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.building img');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight;  
  
  if (divPosition < windowHeight * 0.8) {  
    div.style.opacity = 1;  
    div.style.transform = 'translateX(0)';  
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.examine img');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight;  
  
  if (divPosition < windowHeight * 0.8) {  
    div.style.opacity = 1;
    div.style.transform = 'scale(1)';  
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.bg .domainfont img');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight;  
  
  if (divPosition < windowHeight * 0.8) {  
    div.style.opacity = 1; 
    div.style.transform = 'translateY(0)'; 
  }
});

window.addEventListener('scroll', function() {
  const element = document.getElementById('scrollEffect');
  const scrollY = window.scrollY; 
  const rect = element.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    const scaleValue = Math.max(1, 0 - scrollY / 1000); 
    const opacityValue = Math.min(1, (scrollY - rect.top + window.innerHeight) / window.innerHeight); 
    element.style.transform = `scale(${scaleValue})`;
    element.style.opacity = opacityValue;
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.gold');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight; 
  
  if (divPosition < windowHeight * 0.7) { 
    div.style.opacity = 1;
    div.style.transform = 'scale(1)'; 
  }
});

window.addEventListener('scroll', function() {
  const div = document.querySelector('.embroidery');
  const divPosition = div.getBoundingClientRect().top;  
  const windowHeight = window.innerHeight; 
  
  if (divPosition < windowHeight * 0.5) {  
    div.style.opacity = 1;
    div.style.transform = 'scale(1)';  
  }
});
