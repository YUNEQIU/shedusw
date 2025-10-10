function printCertificate() {
  window.print();
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const certificate = document.getElementById("certificate");

  html2canvas(certificate, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    // 横向A4：210mm x 297mm => jsPDF 用 mm 为单位
    const pdf = new jsPDF("landscape", "mm", "a4");

    // A4横向尺寸（mm）
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("certificate.pdf");
  });
}

// 图片下载
function downloadPNG() {
  const certificate = document.getElementById("certificate");
  html2canvas(certificate, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // PNG 格式
    link.download = "certificate.png";
    link.click();
  });
}

// 可以从变量或 URL 参数读取
const userName = "周 嘉璐";
const courseTitle = "穿越古今 梦回红楼梦";
const certNo = "20250918001";
const date = "2025年09月18日";

// 填充到页面
document.getElementById("userName").textContent = `${userName} `;
document.getElementById("courseTitle").textContent = `“${courseTitle}”`;
document.getElementById("certNo").textContent = certNo;
document.getElementById("date").textContent = date;

// 缩放证书文字层
function scaleCertificateText() {
  const cert = document.querySelector(".certificate");
  const textLayer = document.querySelector(".certificate-text");

  if (!cert || !textLayer) return;

  const certWidth = cert.clientWidth;
  const baseWidth = 1000; // 设计宽度
  const scale = certWidth / baseWidth;

  textLayer.style.transform = `scale(${scale})`;
}

// 初始化缩放
window.addEventListener("load", scaleCertificateText);
// 窗口大小改变时重新计算
window.addEventListener("resize", scaleCertificateText);

// 打印证书
function printCertificate() {
  window.print();
}

// 下载 PDF
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const cert = document.getElementById("certificate");

  const canvas = await html2canvas(cert);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("certificate.pdf");
}

// 下载 PNG
async function downloadPNG() {
  const cert = document.getElementById("certificate");

  const canvas = await html2canvas(cert);
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
