import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MemoryGame } from "@/games/MemoryGame";
import { SortGame } from "@/games/SortGame";
import { SpotGame } from "@/games/SpotGame";

const GAMES: Record<string, { title: string; description: string; component: () => React.ReactElement }> = {
  memory: {
    title: "Memory Match",
    description: "Flip cards and find matching pairs as fast as you can.",
    component: MemoryGame,
  },
  sort: {
    title: "Safe or Risky?",
    description: "Drag each action to the right basket — safe or risky.",
    component: SortGame,
  },
  spot: {
    title: "Spot the Helper",
    description: "Tap only the community helpers before time runs out!",
    component: SpotGame,
  },
};

export const Route = createFileRoute("/games/$gameId")({
  loader: ({ params }) => {
    const g = GAMES[params.gameId];
    if (!g) throw notFound();
    return { gameId: params.gameId, game: g };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.game.title} — Super Kids Learn` },
      { name: "description", content: loaderData?.game.description ?? "" },
      { property: "og:title", content: loaderData?.game.title ?? "" },
      { property: "og:description", content: loaderData?.game.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="text-6xl">🤷</div>
      <h1 className="font-display text-3xl mt-2">Game not found</h1>
      <Link to="/games" className="kid-btn bg-coral text-coral-foreground mt-4 inline-block">
        Back to games
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl">Oops</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: GamePage,
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const Component = game.component;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link to="/games" className="text-sm text-muted-foreground hover:underline">← All games</Link>
      <h1 className="font-display text-3xl sm:text-4xl mt-2">{game.title}</h1>
      <p className="text-muted-foreground">{game.description}</p>
      <div className="mt-6">
        <Component />
      </div>
    </div>
  );
}
