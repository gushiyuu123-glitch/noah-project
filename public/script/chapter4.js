// =====================================================
// 🌌 Chapter 4 - Distortion Pulse Animation
// Silent Collapse Final Edition by Noa × Yuto
// =====================================================

const canvas = document.getElementById("distortion-canvas");
const ctx = canvas.getContext("2d");
let w, h, time = 0;
let isOverdrive = false;

// === サイズ調整 ===
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// === 粒子生成（光の残響） ===
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.4,
    hue: 260 + Math.random() * 60 // 紫〜ピンク
  });
}

// === メインアニメーション ===
function animate() {
  time += 0.006;
  ctx.clearRect(0, 0, w, h);

  // 柔らかい縦方向のグラデーション（渦なし）
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, `rgba(25, 15, 40, 0.4)`);
  gradient.addColorStop(0.5, `rgba(50, 30, 70, 0.2)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, 0.4)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // 粒子（滲む光）
  particles.forEach((p) => {
    const waveX = Math.sin(time * 1.2 + p.y * 0.002) * 0.5;
    const waveY = Math.cos(time * 1.1 + p.x * 0.002) * 0.5;

    p.x += p.vx + waveX;
    p.y += p.vy + waveY;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    const pulse = Math.sin(time * 2 + p.x * 0.05) * 0.3 + 1.0;
    const overdrivePulse = isOverdrive ? 1.4 : 1;
    const alpha = p.alpha * pulse * overdrivePulse;
    const hue = isOverdrive ? 300 + Math.random() * 40 : p.hue;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 85%, 75%, ${alpha})`;
    ctx.shadowBlur = isOverdrive ? 20 : 8;
    ctx.shadowColor = `hsla(${hue}, 100%, 80%, 0.4)`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// === タイトル崩壊エフェクト ===
setTimeout(() => {
  document.querySelectorAll(".intro-title .char").forEach((c) => {
    c.style.setProperty("--randX", Math.random());
    c.style.setProperty("--randY", Math.random());
    c.style.setProperty("--randR", Math.random());
    c.style.animation =
      "rippleIn 1.8s ease forwards, shatter 1s ease 2s forwards";
  });
}, 1500);

// === 背景フェードイン ===
setTimeout(() => {
  document.querySelector(".bg-image")?.classList.add("visible");
}, 4000);

// === 暴走開始（静かなOverdrive） ===
setTimeout(() => {
  isOverdrive = true;

  // ノイズオーバーレイ（感情の歪み）
  const noise = document.createElement("div");
  Object.assign(noise.style, {
    position: "fixed",
    inset: "0",
    background:
      "repeating-linear-gradient(0deg, rgba(255,180,255,0.04) 0px, rgba(0,0,0,0.05) 2px)",
    opacity: "0",
    mixBlendMode: "lighten",
    transition: "opacity 2s ease",
    zIndex: "3",
    pointerEvents: "none"
  });
  document.body.appendChild(noise);

  // 徐々に浮かび上がる
  setTimeout(() => (noise.style.opacity = "0.35"), 800);
  setTimeout(() => (noise.style.opacity = "0"), 8000);

  // Overdrive終了（沈静化）
  setTimeout(() => (isOverdrive = false), 11000);
}, 7000);

// === 微光パルス（沈黙前） ===
setTimeout(() => {
  let glow = 0;
  const glowLoop = setInterval(() => {
    glow += 0.05;
    const brightness = Math.sin(glow) * 0.08;
    document.body.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,${brightness}), #000 100%)`;
    if (glow > Math.PI * 4) clearInterval(glowLoop);
  }, 100);
}, 15000);

// === Noah暴走ビジュアル ===
const climax = document.createElement("div");
climax.classList.add("climax-scene");
climax.style.backgroundImage = "url('../image/noah_core_conflict.jpg')";
document.body.appendChild(climax);

// ゆっくりと現れる
setTimeout(() => climax.classList.add("visible"), 13000);
