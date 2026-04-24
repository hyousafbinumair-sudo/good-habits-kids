// Local-first progress tracking for Super Kids Learn.
// Stores stars, badges, completed lessons, and daily streak in localStorage.

export type BadgeId =
  | "first-visit"
  | "first-quiz"
  | "five-correct"
  | "ten-correct"
  | "perfect-score"
  | "course-explorer"
  | "all-courses"
  | "streak-3"
  | "streak-7";

export interface Progress {
  stars: number;
  badges: BadgeId[];
  completedLessons: string[]; // courseId/lessonId
  completedCourses: string[];
  streak: number;
  lastVisit: string; // YYYY-MM-DD
  name: string;
  avatar: string; // emoji
}

const KEY = "skl_progress_v1";

const DEFAULT: Progress = {
  stars: 0,
  badges: ["first-visit"],
  completedLessons: [],
  completedCourses: [],
  streak: 1,
  lastVisit: today(),
  name: "Super Kid",
  avatar: "🦸",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toISOString().slice(0, 10) === y.toISOString().slice(0, 10);
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      saveProgress(DEFAULT);
      return DEFAULT;
    }
    const p = { ...DEFAULT, ...JSON.parse(raw) } as Progress;
    // Streak management on load
    if (p.lastVisit !== today()) {
      if (isYesterday(p.lastVisit)) p.streak += 1;
      else p.streak = 1;
      p.lastVisit = today();
      if (p.streak >= 3 && !p.badges.includes("streak-3")) p.badges.push("streak-3");
      if (p.streak >= 7 && !p.badges.includes("streak-7")) p.badges.push("streak-7");
      saveProgress(p);
    }
    return p;
  } catch {
    return DEFAULT;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("skl:progress", { detail: p }));
}

export function addStars(n: number) {
  const p = loadProgress();
  p.stars += n;
  saveProgress(p);
  return p;
}

export function unlockBadge(id: BadgeId) {
  const p = loadProgress();
  if (!p.badges.includes(id)) {
    p.badges.push(id);
    saveProgress(p);
  }
  return p;
}

export function completeLesson(courseId: string, lessonId: string) {
  const p = loadProgress();
  const key = `${courseId}/${lessonId}`;
  if (!p.completedLessons.includes(key)) {
    p.completedLessons.push(key);
    p.stars += 2;
    if (p.completedLessons.length === 1) unlockBadge("course-explorer");
    saveProgress(p);
  }
  return p;
}

export function markCourseComplete(courseId: string, totalCourses: number) {
  const p = loadProgress();
  if (!p.completedCourses.includes(courseId)) {
    p.completedCourses.push(courseId);
    p.stars += 5;
    if (p.completedCourses.length >= totalCourses) unlockBadge("all-courses");
    saveProgress(p);
  }
  return p;
}

export function setProfile(name: string, avatar: string) {
  const p = loadProgress();
  p.name = name || p.name;
  p.avatar = avatar || p.avatar;
  saveProgress(p);
  return p;
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("skl:progress"));
}

export const BADGE_META: Record<BadgeId, { emoji: string; label: string; hint: string }> = {
  "first-visit": { emoji: "🌟", label: "First Visit", hint: "Welcome aboard!" },
  "first-quiz": { emoji: "🎯", label: "Quiz Rookie", hint: "Finish a quiz" },
  "five-correct": { emoji: "🏅", label: "High Five", hint: "5 correct answers" },
  "ten-correct": { emoji: "🏆", label: "Brain Boost", hint: "10 correct answers" },
  "perfect-score": { emoji: "💯", label: "Perfect Score", hint: "Ace a quiz" },
  "course-explorer": { emoji: "🧭", label: "Explorer", hint: "Finish 1 lesson" },
  "all-courses": { emoji: "🎓", label: "Graduate", hint: "Complete every course" },
  "streak-3": { emoji: "🔥", label: "On Fire", hint: "3-day streak" },
  "streak-7": { emoji: "⚡", label: "Lightning", hint: "7-day streak" },
};
