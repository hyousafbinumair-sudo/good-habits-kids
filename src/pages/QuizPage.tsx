import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { COURSES, type QuizQ } from "@/lib/courses";
import { addStars, unlockBadge } from "@/lib/progress";
import { celebrate, bigCelebrate } from "@/lib/celebrate";
import { SEO } from "@/components/SEO";

interface MixedQ extends QuizQ { topic: string; }

function buildQuiz(): MixedQ[] {
  const all: MixedQ[] = COURSES.flatMap((c) => c.quiz.map((q) => ({ ...q, topic: c.title })));
  return [...all].sort(() => Math.random() - 0.5).slice(0, 10);
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<MixedQ[]>(() => buildQuiz());
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const q = questions[i];
  const pct = useMemo(() => Math.round(((i + (picked !== null ? 1 : 0)) / total) * 100), [i, picked, total]);

  function pick(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.ans) {
      const newScore = score + 1;
      setScore(newScore);
      addStars(1);
      celebrate();
      if (newScore === 5) unlockBadge("five-correct");
      if (newScore === 10) unlockBadge("ten-correct");
    }
  }

  function next() {
    if (i + 1 >= total) {
      setDone(true);
      unlockBadge("first-quiz");
      if (score === total) {
        unlockBadge("perfect-score");
        bigCelebrate();
      }
      return;
    }
    setI(i + 1);
    setPicked(null);
  }

  function restart() {
    setQuestions(buildQuiz());
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pctScore = score / total;
    const verdict =
      pctScore >= 0.9 ? { e: "🏆", t: "CHAMPION!", m: "Outstanding! You're a true Super Kid!" } :
      pctScore >= 0.7 ? { e: "🎉", t: "Amazing job!", m: "Great work — keep going!" } :
      pctScore >= 0.5 ? { e: "😊", t: "Good effort!", m: "Re-read the lessons and try again — you've got this!" } :
                        { e: "💪", t: "Keep trying!", m: "Practice makes perfect. Read a course and come back!" };
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <SEO title="Quiz results — Super Kids Learn" />
        <div className="kid-card border-4 border-grape bg-card pop-in">
          <div className="text-7xl">{verdict.e}</div>
          <h1 className="font-display text-4xl mt-2">{verdict.t}</h1>
          <div className="font-display text-5xl text-coral mt-2">{score}/{total}</div>
          <p className="text-muted-foreground mt-2">{verdict.m}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={restart} className="kid-btn bg-coral text-coral-foreground">🔄 Play again</button>
            <Link to="/courses" className="kid-btn bg-sky text-sky-foreground">📚 Study more</Link>
            <Link to="/badges" className="kid-btn bg-sun text-sun-foreground">🏆 See badges</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <SEO title="Daily quiz — Super Kids Learn" description="10 fun questions across all topics. Earn stars and unlock badges!" />
      <div className="flex items-center justify-between mb-3">
        <div className="pill bg-sky text-sky-foreground">Question {i + 1} of {total}</div>
        <div className="pill bg-sun text-sun-foreground">⭐ {score}</div>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden mb-5">
        <div className="h-full bg-coral transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="kid-card border-4 border-grape bg-card pop-in" key={i}>
        <div className="text-xs font-bold text-muted-foreground">{q.topic}</div>
        <h2 className="font-display text-2xl mt-1">{q.q}</h2>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {q.opts.map((o, idx) => {
            const isCorrect = idx === q.ans;
            const isPicked = idx === picked;
            const show = picked !== null;
            const klass = !show
              ? "bg-card border-border hover:border-coral"
              : isCorrect
                ? "bg-mint text-mint-foreground border-mint"
                : isPicked
                  ? "bg-destructive text-destructive-foreground border-destructive"
                  : "bg-card border-border opacity-70";
            return (
              <button
                key={idx}
                onClick={() => pick(idx)}
                disabled={picked !== null}
                className={`text-left rounded-2xl border-4 p-4 font-bold transition-colors ${klass}`}
              >
                {o}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className={picked === q.ans ? "text-mint-foreground font-bold" : "text-destructive font-bold"}>
              {picked === q.ans ? "✅ Correct! +1 ⭐" : "❌ Not quite — green is right."}
            </div>
            <button onClick={next} className="kid-btn bg-coral text-coral-foreground">
              {i + 1 >= total ? "See results 🎉" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
