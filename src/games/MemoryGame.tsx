import { useEffect, useMemo, useState } from "react";
import { addStars } from "@/lib/progress";
import { celebrate, bigCelebrate } from "@/lib/celebrate";

const PAIR_EMOJIS = ["🦸", "🦊", "🐼", "🐯", "🐶", "🦄", "🐸", "🦉"];

interface Card { id: number; emoji: string; matched: boolean; flipped: boolean; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = shuffle(PAIR_EMOJIS).slice(0, 6);
  const deck = shuffle([...pairs, ...pairs]).map((emoji, i) => ({
    id: i,
    emoji,
    matched: false,
    flipped: false,
  }));
  return deck;
}

export function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [rewarded, setRewarded] = useState(false);

  const won = useMemo(() => deck.length > 0 && deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    setMoves((m) => m + 1);
    const ca = deck[a]; const cb = deck[b];
    if (ca.emoji === cb.emoji) {
      setTimeout(() => {
        setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setPicked([]);
      }, 350);
    } else {
      setTimeout(() => {
        setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
        setPicked([]);
      }, 800);
    }
  }, [picked, deck]);

  useEffect(() => {
    if (won && !rewarded) {
      setRewarded(true);
      addStars(5);
      bigCelebrate();
    }
  }, [won, rewarded]);

  function flip(i: number) {
    if (picked.length === 2) return;
    if (deck[i].flipped || deck[i].matched) return;
    setDeck((d) => d.map((c, idx) => (idx === i ? { ...c, flipped: true } : c)));
    setPicked((p) => [...p, i]);
  }

  function reset() {
    setDeck(buildDeck());
    setPicked([]);
    setMoves(0);
    setRewarded(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="pill bg-sun text-sun-foreground">Moves: {moves}</div>
        <button onClick={reset} className="kid-btn bg-card border-2 border-border">🔄 Restart</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {deck.map((c, i) => {
          const show = c.flipped || c.matched;
          return (
            <button
              key={c.id}
              onClick={() => flip(i)}
              className={`aspect-square rounded-3xl text-5xl flex items-center justify-center border-4 transition-transform ${
                show
                  ? c.matched
                    ? "bg-mint text-mint-foreground border-mint scale-95"
                    : "bg-sun text-sun-foreground border-sun"
                  : "bg-grape text-grape-foreground border-grape hover:scale-105"
              }`}
              aria-label="Memory card"
            >
              {show ? c.emoji : "❓"}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="kid-card border-4 border-mint bg-mint text-mint-foreground mt-6 text-center pop-in">
          <div className="text-5xl">🎉</div>
          <h2 className="font-display text-2xl mt-1">You did it!</h2>
          <p>{moves} moves — earned ⭐⭐⭐⭐⭐</p>
          <button onClick={() => { reset(); celebrate(); }} className="kid-btn bg-card border-2 border-border mt-3">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
