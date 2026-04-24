import { Link, useParams } from "react-router-dom";
import { MemoryGame } from "@/games/MemoryGame";
import { SortGame } from "@/games/SortGame";
import { SpotGame } from "@/games/SpotGame";
import { SEO } from "@/components/SEO";

const GAMES: Record<string, { title: string; description: string; component: () => React.ReactElement }> = {
  memory: { title: "Memory Match", description: "Flip cards and find matching pairs as fast as you can.", component: MemoryGame },
  sort: { title: "Safe or Risky?", description: "Drag each action to the right basket — safe or risky.", component: SortGame },
  spot: { title: "Spot the Helper", description: "Tap only the community helpers before time runs out!", component: SpotGame },
};

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = gameId ? GAMES[gameId] : undefined;

  if (!game) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="text-6xl">🤷</div>
        <h1 className="font-display text-3xl mt-2">Game not found</h1>
        <Link to="/games" className="kid-btn bg-coral text-coral-foreground mt-4 inline-block">Back to games</Link>
      </div>
    );
  }

  const Component = game.component;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <SEO title={`${game.title} — Super Kids Learn`} description={game.description} />
      <Link to="/games" className="text-sm text-muted-foreground hover:underline">← All games</Link>
      <h1 className="font-display text-3xl sm:text-4xl mt-2">{game.title}</h1>
      <p className="text-muted-foreground">{game.description}</p>
      <div className="mt-6">
        <Component />
      </div>
    </div>
  );
}
