//资源下载页面
const resourcecard = document.getElementById("resourcecard");

let isDragging = false;
let lastX = 0;
let rotationY = 0;
let velocity = 0;
let animationFrame;

// 鼠标按下
resourcecard.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.clientX;
  cancelAnimationFrame(animationFrame); // 停止惯性动画
});

// 鼠标松开
window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    inertia();
  }
});

// 鼠标移动
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - lastX;
  velocity = dx; // 当前速度 = 当前移动差值
  rotationY += dx * 0.5;
  resourcecard.style.transform = `rotateY(${rotationY}deg)`;
  lastX = e.clientX;
});

// 惯性动画
function inertia() {
  velocity *= 0.95; // 每一帧减速（摩擦力）
  if (Math.abs(velocity) > 0.1) {
    rotationY += velocity * 0.5;
    resourcecard.style.transform = `rotateY(${rotationY}deg)`;
    animationFrame = requestAnimationFrame(inertia);
  } else {
    cancelAnimationFrame(animationFrame);
  }
}