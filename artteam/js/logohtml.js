// logo页面
document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".image-wrapper");
  wrappers.forEach((wrapper, index) => {
    setTimeout(() => {
      wrapper.classList.add("fade-in");
    }, index * 200); // 每个图片相隔200ms依次出现
  });
});