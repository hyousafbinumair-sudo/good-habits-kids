import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgress } from "@/components/SiteChrome";
import { BADGE_META, type BadgeId } from "@/lib/progress";
import { COURSES } from "@/lib/courses";

export const Route = createFileRoute("/badges")({
  head: () => ({
    meta: [
      { title: "Your badges & stars — Super Kids Learn" },
      { name: "description", content: "See your stars, streak and badges. Keep learning to unlock more!" },
      { property: "og:title", content: "Your badges & stars" },
      { property: "og:description", content: "Track stars, streaks and shiny rewards." },
    ],
  }),
  component: BadgesPage,
});

const ALL_BADGES: BadgeId[] = [
  "first-visit", "first-quiz", "five-correct", "ten-correct", "perfect-score",
  "course-explorer", "all-courses", "streak-3", "streak-7",
];

function BadgesPage() {
  const p = useProgress();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl">🏆 Your trophy room</h1>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Stat title="Stars" value={p.stars} emoji="⭐" color="bg-sun text-sun-foreground" />
        <Stat title="Day streak" value={p.streak} emoji="🔥" color="bg-coral text-coral-foreground" />
        <Stat title="Lessons done" value={p.completedLessons.length} emoji="📖" color="bg-mint text-mint-foreground" />
      </div>

      <h2 className="font-display text-2xl mt-10 mb-3">Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ALL_BADGES.map((b) => {
          const meta = BADGE_META[b];
          const earned = p.badges.includes(b);
          return (
            <div
              key={b}
              className={`kid-card border-4 text-center ${
                earned ? "bg-sun text-sun-foreground border-sun pop-in" : "bg-card border-border opacity-60"
              }`}
            >
              <div className={`text-5xl ${earned ? "" : "grayscale"}`}>{meta.emoji}</div>
              <div className="font-display text-lg mt-1">{meta.label}</div>
              <div className="text-xs opacity-80">{meta.hint}</div>
              <div className="text-xs font-bold mt-2">{earned ? "✅ Earned" : "🔒 Locked"}</div>
            </div>
          );
        })}
      </div>

      <h2 className="font-display text-2xl mt-10 mb-3">Course progress</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {COURSES.map((c) => {
          const done = p.completedLessons.filter((l) => l.startsWith(c.id + "/")).length;
          const pct = Math.round((done / c.lessons.length) * 100);
          return (
            <Link
              key={c.id}
              to="/courses/$courseId"
              params={{ courseId: c.id }}
              className="kid-card border-4 border-border bg-card hover:border-coral"
            >
              <div className="flex items-center gap-3">
                <div className="text-4xl">{c.emoji}</div>
                <div className="flex-1">
                  <div className="font-display text-xl">{c.title}</div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
                    <div className="h-full bg-coral" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">{done}/{c.lessons.length} lessons</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ title, value, emoji, color }: { title: string; value: number; emoji: string; color: string }) {
  return (
    <div className={`kid-card border-4 ${color}`}>
      <div className="text-4xl">{emoji}</div>
      <div className="font-display text-3xl mt-1">{value}</div>
      <div className="text-sm font-bold opacity-90">{title}</div>
    </div>
  );
}
