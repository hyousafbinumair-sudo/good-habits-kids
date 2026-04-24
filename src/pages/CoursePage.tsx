import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse, COURSES, TOTAL_COURSES } from "@/lib/courses";
import { useProgress } from "@/components/SiteChrome";
import { markCourseComplete } from "@/lib/progress";
import { SEO } from "@/components/SEO";
import NotFound from "./NotFound";

const COLOR_BG: Record<string, string> = {
  sun: "bg-sun text-sun-foreground border-sun",
  sky: "bg-sky text-sky-foreground border-sky",
  mint: "bg-mint text-mint-foreground border-mint",
  coral: "bg-coral text-coral-foreground border-coral",
  grape: "bg-grape text-grape-foreground border-grape",
  bubblegum: "bg-bubblegum text-bubblegum-foreground border-bubblegum",
};

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourse(courseId) : undefined;
  const p = useProgress();

  const completedHere = course
    ? p.completedLessons.filter((l) => l.startsWith(course.id + "/"))
    : [];
  const allDone = course ? completedHere.length === course.lessons.length : false;

  useEffect(() => {
    if (course && allDone && !p.completedCourses.includes(course.id)) {
      markCourseComplete(course.id, TOTAL_COURSES);
    }
  }, [allDone, course, p.completedCourses]);

  if (!course) return <NotFound />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <SEO title={`${course.title} — Super Kids Learn`} description={course.tagline} />
      <Link to="/courses" className="text-sm text-muted-foreground hover:underline">← All courses</Link>
      <div className={`kid-card border-4 ${COLOR_BG[course.color]} mt-3`}>
        <div className="flex items-start gap-4">
          <div className="text-6xl">{course.emoji}</div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl">{course.title}</h1>
            <p className="opacity-90 mt-1">{course.tagline}</p>
            <div className="text-sm font-bold mt-2">
              {completedHere.length}/{course.lessons.length} lessons done
              {allDone && " 🎓 Course complete!"}
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl mt-8 mb-3">Lessons</h2>
      <ol className="space-y-3">
        {course.lessons.map((l, i) => {
          const done = p.completedLessons.includes(`${course.id}/${l.id}`);
          return (
            <li key={l.id}>
              <Link
                to={`/courses/${course.id}/${l.id}`}
                className="kid-card border-4 border-border bg-card flex items-center gap-4 hover:border-coral"
              >
                <div className="text-4xl">{l.emoji}</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-muted-foreground">Lesson {i + 1}</div>
                  <div className="font-display text-xl">{l.title}</div>
                </div>
                {done ? (
                  <span className="pill bg-mint text-mint-foreground">✅ Done</span>
                ) : (
                  <span className="pill bg-sun text-sun-foreground">Start →</span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Link to="/quiz" className="kid-card border-4 bg-grape text-grape-foreground border-grape">
          <div className="text-3xl">🎯</div>
          <div className="font-display text-xl mt-1">Try the daily quiz</div>
          <p className="text-sm opacity-90">Test what you learned across all topics.</p>
        </Link>
        <Link to="/games" className="kid-card border-4 bg-bubblegum text-bubblegum-foreground border-bubblegum">
          <div className="text-3xl">🎮</div>
          <div className="font-display text-xl mt-1">Play a game</div>
          <p className="text-sm opacity-90">Memory match, safe sorting, and more.</p>
        </Link>
      </div>

      <NextCoursesNav currentId={course.id} />
    </div>
  );
}

function NextCoursesNav({ currentId }: { currentId: string }) {
  const idx = COURSES.findIndex((c) => c.id === currentId);
  const prev = idx > 0 ? COURSES[idx - 1] : null;
  const next = idx < COURSES.length - 1 ? COURSES[idx + 1] : null;
  return (
    <div className="mt-6 flex justify-between gap-3">
      {prev ? (
        <Link to={`/courses/${prev.id}`} className="kid-btn bg-card border-2 border-border">
          ← {prev.emoji} {prev.title}
        </Link>
      ) : <span />}
      {next ? (
        <Link to={`/courses/${next.id}`} className="kid-btn bg-card border-2 border-border ml-auto">
          {next.emoji} {next.title} →
        </Link>
      ) : <span />}
    </div>
  );
}
