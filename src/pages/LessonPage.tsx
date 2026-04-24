import { Link, useParams } from "react-router-dom";
import { getCourse } from "@/lib/courses";
import { completeLesson } from "@/lib/progress";
import { useProgress } from "@/components/SiteChrome";
import { celebrate } from "@/lib/celebrate";
import { SEO } from "@/components/SEO";
import NotFound from "./NotFound";

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const course = courseId ? getCourse(courseId) : undefined;
  const lessonIdx = course && lessonId ? course.lessons.findIndex((l) => l.id === lessonId) : -1;
  const lesson = course && lessonIdx >= 0 ? course.lessons[lessonIdx] : undefined;
  const p = useProgress();

  if (!course || !lesson) return <NotFound />;

  const key = `${course.id}/${lesson.id}`;
  const done = p.completedLessons.includes(key);
  const next = course.lessons[lessonIdx + 1];

  function finish() {
    completeLesson(course!.id, lesson!.id);
    celebrate();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <SEO title={`${lesson.title} — ${course.title}`} description={lesson.intro} />
      <Link to={`/courses/${course.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {course.title}
      </Link>

      <div className="kid-card border-4 border-sun bg-card mt-3">
        <div className="text-6xl">{lesson.emoji}</div>
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mt-2">
          Lesson {lessonIdx + 1} of {course.lessons.length}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl mt-1">{lesson.title}</h1>
        <p className="text-lg mt-3">{lesson.intro}</p>
      </div>

      <div className="kid-card border-4 border-sky bg-card mt-5">
        <h2 className="font-display text-2xl">✨ Key ideas</h2>
        <ul className="mt-3 space-y-2">
          {lesson.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-2xl">{pt.icon}</span>
              <span className="pt-0.5">{pt.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {lesson.story && (
        <div className="kid-card border-4 border-bubblegum bg-card mt-5">
          <h2 className="font-display text-2xl">📖 Story time</h2>
          <h3 className="font-display text-xl mt-2">{lesson.story.title}</h3>
          <p className="mt-2 leading-relaxed">{lesson.story.body}</p>
          <div className="mt-3 pill bg-sun text-sun-foreground">💡 {lesson.story.moral}</div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
        <button
          onClick={finish}
          disabled={done}
          className={`kid-btn ${done ? "bg-mint text-mint-foreground cursor-default" : "bg-coral text-coral-foreground"}`}
        >
          {done ? "✅ Completed (+2 ⭐)" : "I read this! +2 ⭐"}
        </button>
        {next ? (
          <Link to={`/courses/${course.id}/${next.id}`} className="kid-btn bg-grape text-grape-foreground">
            Next: {next.emoji} {next.title} →
          </Link>
        ) : (
          <Link to={`/courses/${course.id}`} className="kid-btn bg-grape text-grape-foreground">
            🎉 Back to course
          </Link>
        )}
      </div>
    </div>
  );
}
