import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const GAMES = [
  { id: "memory", emoji: "🧠", title: "Memory Match", body: "Find all the matching pairs.", color: "bg-grape text-grape-foreground border-grape" },
  { id: "sort", emoji: "🧺", title: "Safe or Risky?", body: "Sort actions into the right basket.", color: "bg-coral text-coral-foreground border-coral" },
  { id: "spot", emoji: "🔍", title: "Spot the Helper", body: "Tap the community helpers as fast as you can.", color: "bg-sky text-sky-foreground border-sky" },
] as const;

export default function GamesHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <SEO title="Fun games — Super Kids Learn" description="Play memory match, sort the safe choices, and other learning games." />
      <h1 className="font-display text-4xl sm:text-5xl">🎮 Game zone</h1>
      <p className="text-muted-foreground mt-1">Play, laugh, learn. Each game gives stars!</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {GAMES.map((g) => (
          <Link key={g.id} to={`/games/${g.id}`} className={`kid-card border-4 ${g.color} wobble`}>
            <div className="text-5xl">{g.emoji}</div>
            <div className="font-display text-2xl mt-2">{g.title}</div>
            <p className="opacity-90 mt-1">{g.body}</p>
            <div className="mt-3 pill bg-card text-foreground">Play →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
