// === Canvas設定 ===
const canvas = document.getElementById('ch3-bg');
const ctx = canvas.getContext('2d');
let w, h;
let drops = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// === 雨生成 ===
for (let i = 0; i < 160; i++) {
  drops.push({
    x: Math.random() * w,
    y: Math.random() * h,
    l: Math.random() * 1.5 + 1,
    speed: Math.random() * 3 + 2,
    color:
      Math.random() > 0.6
        ? `rgba(180,140,255,${Math.random() * 0.7 + 0.3})` // 紫がかった雨
        : `rgba(200,200,255,${Math.random() * 0.6 + 0.2})`, // 淡い白
  });
}

// === 雨アニメーション ===
function animate() {
  ctx.clearRect(0, 0, w, h);
  drops.forEach((p) => {
    ctx.beginPath();
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y + p.l * 10);
    ctx.lineWidth = 1;
    ctx.stroke();

    p.y += p.speed;
    if (p.y > h) {
      p.y = -10;
      p.x = Math.random() * w;
    }
  });
  requestAnimationFrame(animate);
}
animate();


// === 光の破片Canvas ===
const flashCanvas = document.createElement('canvas');
flashCanvas.classList.add('glass-shards');
document.body.appendChild(flashCanvas);
const fctx = flashCanvas.getContext('2d');
flashCanvas.width = w;
flashCanvas.height = h;

// === やわらかい光の破片エフェクト ===
function gentleFlash() {
  const particles = [];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: w / 2 + (Math.random() - 0.5) * 250,
      y: h / 2 + (Math.random() - 0.5) * 120,
      r: Math.random() * 2 + 1,
      alpha: 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 1.5,
    });
  }

  let frame = 0;
  function flashAnim() {
    fctx.clearRect(0, 0, w, h);
    fctx.globalCompositeOperation = "lighter";

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      fctx.beginPath();
      fctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      fctx.fillStyle = `rgba(210,190,255,${p.alpha})`;
      fctx.fill();
    });

    frame++;
    if (frame < 60) requestAnimationFrame(flashAnim);
  }

  flashAnim();
}

// === タイトル崩壊＆光破片を同期 ===
setTimeout(() => {
  const title = document.querySelector('.intro-title');
  if (title) {
    title.classList.add('shatter'); // CSS崩壊
    gentleFlash(); // 同時に光の破片
  }
}, 2200);

// === 背景フェードイン（本文出現） ===
setTimeout(() => {
  const bg = document.querySelector('.bg-image');
  if (bg) bg.classList.add('visible');
}, 6500);
