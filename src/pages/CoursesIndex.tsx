import { Link } from "react-router-dom";
import { COURSES } from "@/lib/courses";
import { useProgress } from "@/components/SiteChrome";
import { SEO } from "@/components/SEO";

const COLOR_BG: Record<string, string> = {
  sun: "bg-sun text-sun-foreground border-sun",
  sky: "bg-sky text-sky-foreground border-sky",
  mint: "bg-mint text-mint-foreground border-mint",
  coral: "bg-coral text-coral-foreground border-coral",
  grape: "bg-grape text-grape-foreground border-grape",
  bubblegum: "bg-bubblegum text-bubblegum-foreground border-bubblegum",
};

export default function CoursesIndex() {
  const p = useProgress();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <SEO title="All courses — Super Kids Learn" description="Browse every Super Kids Learn course: civics, safety, health, math, science, manners and online safety." />
      <h1 className="font-display text-4xl sm:text-5xl">📚 All courses</h1>
      <p className="text-muted-foreground mt-2 max-w-prose">
        Each course has short lessons, a story, and a mini quiz. Finish lessons to earn ⭐.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {COURSES.map((c) => {
          const lessonsDone = p.completedLessons.filter((l) => l.startsWith(c.id + "/")).length;
          const pct = Math.round((lessonsDone / c.lessons.length) * 100);
          return (
            <Link key={c.id} to={`/courses/${c.id}`} className={`kid-card border-4 ${COLOR_BG[c.color]}`}>
              <div className="text-5xl">{c.emoji}</div>
              <h2 className="font-display text-2xl mt-2">{c.title}</h2>
              <p className="opacity-90">{c.tagline}</p>
              <div className="mt-3 h-2 rounded-full bg-card/40 overflow-hidden">
                <div className="h-full bg-card" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-xs font-bold mt-1">{lessonsDone}/{c.lessons.length} lessons</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
