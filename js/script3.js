const hero = document.getElementById('mascot');
window.addEventListener('scroll', () => {
    const scrollOffset = window.scrollY;
    hero.style.backgroundPositionY = `${scrollOffset * 0.3}px`;
});

if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = "https://shedusw.com/mobile2.html"; 
}
