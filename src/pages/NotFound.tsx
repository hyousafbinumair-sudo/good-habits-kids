import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <div className="text-7xl mb-4">🧐</div>
        <h1 className="font-display text-4xl">Page not found</h1>
        <p className="mt-2 text-muted-foreground">This page wandered off to play.</p>
        <Link to="/" className="kid-btn bg-coral text-coral-foreground mt-6 inline-block">
          🏠 Go home
        </Link>
      </div>
    </div>
  );
}
