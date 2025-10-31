// === 背景キャンバス ===
const canvas = document.getElementById('ch1-bg');
const ctx = canvas.getContext('2d');
let w, h;
const particles = [];

// ====== サイズ調整 ======
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ====== 粒子生成 ======
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    alpha: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2
  });
}

let t = 0;

// ====== アニメーション ======
function animate() {
  t += 0.015;

  // 🎯 白い靄の原因を削除：完全クリア背景
  ctx.clearRect(0, 0, w, h);

  // ✨ 粒子の呼吸
  particles.forEach(p => {
    const breath = Math.sin(t + p.phase) * 0.2 + 0.8;
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    const alpha = p.alpha * breath;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// ====== 序章イントロ削除 ======
setTimeout(() => {
  const intro = document.getElementById("chapter-intro");
  if (intro) intro.remove();
}, 7500);
