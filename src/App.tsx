import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CoursesIndex from "./pages/CoursesIndex";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import GamesHub from "./pages/GamesHub";
import GamePage from "./pages/GamePage";
import QuizPage from "./pages/QuizPage";
import BadgesPage from "./pages/BadgesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/:lessonId" element={<LessonPage />} />
        <Route path="/games" element={<GamesHub />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
