// ====== 用户信息填充 ======
const userName = "周 嘉璐";
const courseTitle = "穿越古今 梦回红楼梦";
const certNo = "20250918001";
const date = "2025年09月18日";

// 填充到页面
document.getElementById("userName").textContent = `${userName} `;
document.getElementById("courseTitle").textContent = `“${courseTitle}”`;
document.getElementById("certNo").textContent = certNo;
document.getElementById("date").textContent = date;

// ====== 证书文字层缩放 ======
function scaleCertificateText() {
  const cert = document.querySelector(".certificate");
  const textLayer = document.querySelector(".certificate-text");

  if (!cert || !textLayer) return;

  const certWidth = cert.clientWidth;
  const baseWidth = 1000; // 设计稿宽度
  const scale = certWidth / baseWidth;

  textLayer.style.transform = `scale(${scale})`;
}

// 初始化缩放
window.addEventListener("load", scaleCertificateText);
// 窗口大小改变时重新计算
window.addEventListener("resize", scaleCertificateText);

// ====== 打印证书 ======
function printCertificate() {
  window.print();
}

// ====== 下载 PDF（高分辨率 A4 横向） ======
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const cert = document.getElementById("certificate");

  // 高分辨率截图，scale可调（越大越清晰）
  const canvas = await html2canvas(cert, { scale: 3, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  // 创建 A4 横向 PDF
  const pdf = new jsPDF("landscape", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // 图片按 A4 横向填充
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  pdf.save("certificate.pdf");
}

// ====== 下载 PNG（高清） ======
async function downloadPNG() {
  const cert = document.getElementById("certificate");

  // 高分辨率截图
  const canvas = await html2canvas(cert, { scale: 3, useCORS: true });
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
