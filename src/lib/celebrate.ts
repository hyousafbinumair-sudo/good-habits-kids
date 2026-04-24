import confetti from "canvas-confetti";

export function celebrate() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFD93D", "#FF6B35", "#4ECDC4", "#6BCB77", "#FF6B9D", "#C77DFF"],
  });
}

export function bigCelebrate() {
  const end = Date.now() + 800;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
