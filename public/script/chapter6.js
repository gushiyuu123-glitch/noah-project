// ===============================
// Chapter 6 – Reconstructing
// ===============================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w, h, t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// 粒子生成：モヤを作らないクリア設定
const particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.2 + 0.4,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2,
  hue: Math.random() < 0.25 ? 0 : 350,
  alpha: Math.random() * 0.3 + 0.15
}));

function animate() {
  t += 0.005;
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    const a = p.alpha * (Math.sin(t * 2 + p.x * 0.03) * 0.2 + 1);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${a})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// 段落フェード
window.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".chapter-text .f");
  const base = 5200;
  lines.forEach((el, i) =>
    setTimeout(() => el.classList.add("show"), base + i * 500)
  );
});
const noahLines = document.querySelectorAll('.noah');

setTimeout(() => {
  noahLines.forEach(line => {
    line.classList.add('glitch-break');
  });
}, 14000); // タイミングは好きに調整
