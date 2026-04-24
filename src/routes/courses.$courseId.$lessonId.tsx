import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCourse } from "@/lib/courses";
import { completeLesson } from "@/lib/progress";
import { useProgress } from "@/components/SiteChrome";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/courses/$courseId/$lessonId")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    const lessonIdx = course.lessons.findIndex((l) => l.id === params.lessonId);
    if (lessonIdx < 0) throw notFound();
    return { course, lesson: course.lessons[lessonIdx], lessonIdx };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.lesson.title} — ${loaderData?.course.title}` },
      { name: "description", content: loaderData?.lesson.intro ?? "" },
      { property: "og:title", content: loaderData?.lesson.title ?? "" },
      { property: "og:description", content: loaderData?.lesson.intro ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="text-6xl">🤷</div>
      <h1 className="font-display text-3xl mt-2">Lesson not found</h1>
      <Link to="/courses" className="kid-btn bg-coral text-coral-foreground mt-4 inline-block">
        Back to courses
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl">Oops</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { course, lesson, lessonIdx } = Route.useLoaderData();
  const p = useProgress();
  const key = `${course.id}/${lesson.id}`;
  const done = p.completedLessons.includes(key);
  const next = course.lessons[lessonIdx + 1];

  function finish() {
    completeLesson(course.id, lesson.id);
    celebrate();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link to="/courses/$courseId" params={{ courseId: course.id }} className="text-sm text-muted-foreground hover:underline">
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
          <Link
            to="/courses/$courseId/$lessonId"
            params={{ courseId: course.id, lessonId: next.id }}
            className="kid-btn bg-grape text-grape-foreground"
          >
            Next: {next.emoji} {next.title} →
          </Link>
        ) : (
          <Link
            to="/courses/$courseId"
            params={{ courseId: course.id }}
            className="kid-btn bg-grape text-grape-foreground"
          >
            🎉 Back to course
          </Link>
        )}
      </div>
    </div>
  );
}
