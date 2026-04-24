import { useEffect, useRef, useState } from "react";
import { addStars } from "@/lib/progress";
import { bigCelebrate } from "@/lib/celebrate";

const HELPERS = ["👮", "👩‍⚕️", "👩‍🏫", "🚒", "👨‍🚒", "🩺"];
const OTHERS = ["🍎", "🚗", "🎈", "⚽", "🐶", "🌳", "📱", "🎒"];

interface Bubble { id: number; emoji: string; isHelper: boolean; x: number; y: number; }

export function SpotGame() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(30);
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => setTime((t) => t - 1), 1000);
    const spawn = setInterval(() => {
      const isHelper = Math.random() < 0.45;
      const pool = isHelper ? HELPERS : OTHERS;
      const emoji = pool[Math.floor(Math.random() * pool.length)];
      const x = 5 + Math.random() * 80;
      const y = 5 + Math.random() * 70;
      const b: Bubble = { id: ++idRef.current, emoji, isHelper, x, y };
      setBubbles((bs) => [...bs, b]);
      setTimeout(() => setBubbles((bs) => bs.filter((x) => x.id !== b.id)), 1800);
    }, 600);
    return () => { clearInterval(tick); clearInterval(spawn); };
  }, [running]);

  useEffect(() => {
    if (time <= 0 && running) {
      setRunning(false);
      const stars = Math.max(1, Math.floor(score / 3));
      addStars(stars);
      if (score >= 15) bigCelebrate();
    }
  }, [time, running, score]);

  function start() {
    setRunning(true); setTime(30); setScore(0); setBubbles([]);
  }

  function tap(b: Bubble) {
    setBubbles((bs) => bs.filter((x) => x.id !== b.id));
    setScore((s) => (b.isHelper ? s + 1 : Math.max(0, s - 1)));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="pill bg-sun text-sun-foreground">⏱ {time}s</div>
        <div className="pill bg-mint text-mint-foreground">Score: {score}</div>
        <button onClick={start} className="kid-btn bg-coral text-coral-foreground">
          {running ? "Restart" : "Start"}
        </button>
      </div>

      <div className="relative h-[420px] rounded-3xl border-4 border-sky bg-sky/30 overflow-hidden">
        {!running && time === 30 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="text-5xl">🔍</div>
            <h2 className="font-display text-2xl mt-2">Tap only the helpers!</h2>
            <p className="text-sm text-muted-foreground mt-1">
              👮 👩‍⚕️ 👩‍🏫 🚒 — avoid everything else.
            </p>
          </div>
        )}
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={() => tap(b)}
            className="absolute text-5xl pop-in hover:scale-125 transition-transform"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            {b.emoji}
          </button>
        ))}
        {!running && time <= 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 text-center p-6">
            <div className="text-5xl">🎉</div>
            <h2 className="font-display text-2xl mt-1">Time's up!</h2>
            <p>Final score: {score}</p>
            <button onClick={start} className="kid-btn bg-coral text-coral-foreground mt-3">Play again</button>
          </div>
        )}
      </div>
    </div>
  );
}
