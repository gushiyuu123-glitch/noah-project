// ===========================================
// 第5章 - 残響 (Soft Particle Ver.)
// ===========================================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w, h, t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// === 穏やかな粒子設定 ===
const PARTICLE_COUNT = 45; // 少なめで静寂感
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.8 + 0.8,
  vx: (Math.random() - 0.5) * 0.1,
  vy: (Math.random() - 0.5) * 0.1,
  hue: 215 + Math.random() * 25, // 青銀トーン
  alpha: Math.random() * 0.4 + 0.3
}));

function animate() {
  t += 0.004;
  ctx.clearRect(0, 0, w, h);

  // 柔らかな背景グラデーション
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(250,252,255,0.15)");
  g.addColorStop(1, "rgba(230,235,255,0.1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // 粒子（ゆるく漂う）
  for (const p of particles) {
    const waveX = Math.sin(t * 0.8 + p.y * 0.0015) * 0.25;
    const waveY = Math.cos(t * 0.8 + p.x * 0.0015) * 0.25;
    p.x += p.vx + waveX * 0.3;
    p.y += p.vy + waveY * 0.3;

    // 端でループ
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;

    // やわらかい発光（明滅ではなく安定光）
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 70%, 80%, ${p.alpha})`;
    ctx.shadowColor = `hsla(${p.hue}, 100%, 85%, 0.25)`;
    ctx.shadowBlur = 6;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
animate();

// === 段落フェード ===
window.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".chapter .f");
  const base = 6200;
  lines.forEach((el, i) => setTimeout(() => el.classList.add("show"), base + i * 600));
});
