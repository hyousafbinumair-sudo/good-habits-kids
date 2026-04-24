import { Link } from "react-router-dom";
import { COURSES } from "@/lib/courses";
import { useProgress } from "@/components/SiteChrome";
import { BADGE_META } from "@/lib/progress";
import { SEO } from "@/components/SEO";

const COLOR_BG: Record<string, string> = {
  sun: "bg-sun text-sun-foreground border-sun",
  sky: "bg-sky text-sky-foreground border-sky",
  mint: "bg-mint text-mint-foreground border-mint",
  coral: "bg-coral text-coral-foreground border-coral",
  grape: "bg-grape text-grape-foreground border-grape",
  bubblegum: "bg-bubblegum text-bubblegum-foreground border-bubblegum",
};

export default function HomePage() {
  const p = useProgress();
  const recent = p.badges.slice(-4);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <SEO
        title="Super Kids Learn — fun courses, games & quizzes for ages 6–9"
        description="Welcome! Pick a colourful course, play a game, or earn badges in the daily quiz."
      />
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div>
          <div className="pill bg-sun text-sun-foreground mb-3">🌟 Hi {p.name}!</div>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05]">
            Learn cool stuff.{" "}
            <span className="bg-gradient-to-r from-coral via-bubblegum to-grape bg-clip-text text-transparent">
              Earn shiny stars.
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-prose">
            Bite-size lessons, fun games, and a daily quiz — all made for super kids aged 6 to 9.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/courses" className="kid-btn bg-coral text-coral-foreground text-lg">🚀 Start learning</Link>
            <Link to="/games" className="kid-btn bg-mint text-mint-foreground text-lg">🎮 Play a game</Link>
            <Link to="/quiz" className="kid-btn bg-grape text-grape-foreground text-lg">🎯 Daily quiz</Link>
          </div>
        </div>
        <div className="relative">
          <div className="kid-card bg-card border-sun float-y">
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Courses" value={COURSES.length} emoji="📚" />
              <Stat label="Stars" value={p.stars} emoji="⭐" />
              <Stat label="Streak" value={`${p.streak}d`} emoji="🔥" />
            </div>
            <div className="mt-4">
              <div className="text-sm font-bold text-muted-foreground mb-2">Latest badges</div>
              <div className="flex gap-2 flex-wrap">
                {recent.map((b) => (
                  <div key={b} className="pill bg-sun text-sun-foreground">
                    {BADGE_META[b].emoji} {BADGE_META[b].label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl sm:text-4xl">Pick a course 📚</h2>
          <Link to="/courses" className="hidden sm:inline font-bold underline">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c) => {
            const done = p.completedCourses.includes(c.id);
            const lessonsDone = p.completedLessons.filter((l) => l.startsWith(c.id + "/")).length;
            return (
              <Link
                key={c.id}
                to={`/courses/${c.id}`}
                className={`kid-card wobble ${COLOR_BG[c.color]} border-4 group`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-5xl">{c.emoji}</div>
                  {done && <span className="pill bg-card text-foreground">✅ Done</span>}
                </div>
                <h3 className="font-display text-2xl mt-3">{c.title}</h3>
                <p className="opacity-90 mt-1">{c.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                  <span>📖 {c.lessons.length} lessons</span>
                  <span>{lessonsDone}/{c.lessons.length} done</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-5">
        <FeatureBlock to="/games" color="bubblegum" emoji="🎮" title="Play games" body="Memory match, sort the safe choices, and more." />
        <FeatureBlock to="/quiz" color="grape" emoji="🎯" title="Daily quiz" body="10 random questions across every topic." />
        <FeatureBlock to="/badges" color="sun" emoji="🏆" title="Your badges" body="Track stars, streaks and shiny rewards." />
      </section>
    </div>
  );
}

function Stat({ label, value, emoji }: { label: string; value: number | string; emoji: string }) {
  return (
    <div>
      <div className="text-3xl">{emoji}</div>
      <div className="font-display text-2xl">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureBlock({ to, color, emoji, title, body }: { to: string; color: keyof typeof COLOR_BG; emoji: string; title: string; body: string }) {
  return (
    <Link to={to} className={`kid-card ${COLOR_BG[color]} border-4`}>
      <div className="text-4xl">{emoji}</div>
      <h3 className="font-display text-xl mt-2">{title}</h3>
      <p className="opacity-90 mt-1 text-sm">{body}</p>
    </Link>
  );
}
