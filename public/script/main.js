const canvas = document.getElementById('noah-bg');
const ctx = canvas.getContext('2d');
let w, h;
const particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: Math.random() * 0.5 + 0.3
  });
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
// main.js の最後に追加
const enter = document.getElementById('enter');
enter.addEventListener('click', () => {
  document.body.style.transition = 'opacity 1.8s ease';
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '/chapter1.html';
  }, 1800);
});
