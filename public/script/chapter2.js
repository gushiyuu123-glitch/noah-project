window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("chapter-intro");

  // 🌙 ゆっくり下へ溶けてフェードアウト
  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 4500);

  // 📖 本文フェードイン開始
  setTimeout(() => {
    document.body.classList.add("ready");
  }, 6000);

  // 🧹 完全透明になってから invisibility & remove
  setTimeout(() => {
    intro.style.visibility = "hidden";
    intro.remove();
  }, 7800);
});
