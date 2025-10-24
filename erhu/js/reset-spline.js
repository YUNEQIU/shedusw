document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.querySelector(".reset");
  const erhuContainer = document.querySelector(".erhu");

  resetBtn.addEventListener("click", () => {
    const oldViewer = erhuContainer.querySelector("spline-viewer");
    if (!oldViewer) return;

    const splineURL = oldViewer.getAttribute("url");

    erhuContainer.removeChild(oldViewer);

    const newViewer = document.createElement("spline-viewer");
    newViewer.setAttribute("url", splineURL);

    erhuContainer.appendChild(newViewer);
  });
});