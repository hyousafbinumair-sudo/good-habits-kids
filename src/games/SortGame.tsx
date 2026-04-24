import { useState } from "react";
import { addStars } from "@/lib/progress";
import { celebrate, bigCelebrate } from "@/lib/celebrate";

interface Item { id: number; emoji: string; text: string; safe: boolean; }

const ITEMS: Item[] = [
  { id: 1, emoji: "🧼", text: "Wash hands before eating", safe: true },
  { id: 2, emoji: "🚫", text: "Take candy from a stranger", safe: false },
  { id: 3, emoji: "🪥", text: "Brush teeth twice a day", safe: true },
  { id: 4, emoji: "🚸", text: "Cross the road without looking", safe: false },
  { id: 5, emoji: "📞", text: "Tell parent if scared online", safe: true },
  { id: 6, emoji: "🔑", text: "Share your password", safe: false },
  { id: 7, emoji: "🥗", text: "Eat fruit and veggies", safe: true },
  { id: 8, emoji: "🚪", text: "Open the door to a stranger", safe: false },
];

export function SortGame() {
  const [pool, setPool] = useState<Item[]>(() => [...ITEMS].sort(() => Math.random() - 0.5));
  const [safe, setSafe] = useState<Item[]>([]);
  const [risky, setRisky] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function place(item: Item, asSafe: boolean) {
    const correct = item.safe === asSafe;
    setPool((p) => p.filter((i) => i.id !== item.id));
    if (asSafe) setSafe((s) => [...s, item]);
    else setRisky((s) => [...s, item]);
    if (correct) {
      setScore((n) => n + 1);
      celebrate();
    }
    if (pool.length === 1) {
      setDone(true);
      addStars(3 + (correct ? 1 : 0));
      if (score + (correct ? 1 : 0) === ITEMS.length) bigCelebrate();
    }
  }

  function reset() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5));
    setSafe([]); setRisky([]); setScore(0); setDone(false);
  }

  const current = pool[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="pill bg-sun text-sun-foreground">Score: {score}/{ITEMS.length}</div>
        <button onClick={reset} className="kid-btn bg-card border-2 border-border">🔄 Restart</button>
      </div>

      {!done && current && (
        <div className="kid-card border-4 border-grape bg-card text-center pop-in" key={current.id}>
          <div className="text-6xl">{current.emoji}</div>
          <p className="text-xl font-display mt-2">{current.text}</p>
          <p className="text-sm text-muted-foreground mt-1">Tap a basket below.</p>
        </div>
      )}

      {done && (
        <div className="kid-card border-4 border-mint bg-mint text-mint-foreground text-center pop-in">
          <div className="text-5xl">🎉</div>
          <h2 className="font-display text-2xl">All sorted!</h2>
          <p>Score: {score} / {ITEMS.length}</p>
          <button onClick={reset} className="kid-btn bg-card border-2 border-border mt-3">Play again</button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-5">
        <Bin
          title="✅ Safe"
          color="bg-mint text-mint-foreground border-mint"
          items={safe}
          onClick={() => current && place(current, true)}
          enabled={!!current}
        />
        <Bin
          title="🚫 Risky"
          color="bg-coral text-coral-foreground border-coral"
          items={risky}
          onClick={() => current && place(current, false)}
          enabled={!!current}
        />
      </div>
    </div>
  );
}

function Bin({
  title, color, items, onClick, enabled,
}: { title: string; color: string; items: Item[]; onClick: () => void; enabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className={`kid-card border-4 ${color} text-left disabled:opacity-60`}
    >
      <div className="font-display text-xl">{title}</div>
      <div className="text-xs opacity-80 mt-1">{items.length} items</div>
      <div className="mt-3 flex flex-wrap gap-1">
        {items.map((i) => <span key={i.id} className="text-2xl">{i.emoji}</span>)}
      </div>
    </button>
  );
}
