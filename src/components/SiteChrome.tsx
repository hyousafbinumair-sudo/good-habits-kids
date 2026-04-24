import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { loadProgress, type Progress } from "@/lib/progress";

export function useProgress() {
  const [p, setP] = useState<Progress>(() => loadProgress());
  useEffect(() => {
    setP(loadProgress());
    const handler = () => setP(loadProgress());
    window.addEventListener("skl:progress", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("skl:progress", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return p;
}

export function SiteHeader() {
  const p = useProgress();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b-4 border-sun">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:animate-bounce">🦸</span>
          <span className="font-display text-xl sm:text-2xl bg-gradient-to-r from-coral via-bubblegum to-grape bg-clip-text text-transparent">
            Super Kids Learn
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          <NavItem to="/courses">📚 Courses</NavItem>
          <NavItem to="/games">🎮 Games</NavItem>
          <NavItem to="/quiz">🎯 Quiz</NavItem>
          <NavItem to="/badges">🏆 Badges</NavItem>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/badges" className="pill bg-sun text-sun-foreground">
            ⭐ <span>{p.stars}</span>
          </Link>
          <Link to="/badges" className="pill bg-coral text-coral-foreground">
            🔥 <span>{p.streak}d</span>
          </Link>
          <Link to="/profile" className="pill bg-grape text-grape-foreground">
            <span>{p.avatar}</span>
            <span className="hidden sm:inline">{p.name}</span>
          </Link>
          <button
            className="md:hidden kid-btn bg-sky text-sky-foreground !px-3 !py-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            <NavItem to="/courses" onClick={() => setOpen(false)}>📚 Courses</NavItem>
            <NavItem to="/games" onClick={() => setOpen(false)}>🎮 Games</NavItem>
            <NavItem to="/quiz" onClick={() => setOpen(false)}>🎯 Quiz</NavItem>
            <NavItem to="/badges" onClick={() => setOpen(false)}>🏆 Badges</NavItem>
            <NavItem to="/profile" onClick={() => setOpen(false)}>👤 Profile</NavItem>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-3 py-2 rounded-full font-bold hover:bg-sun/40 transition-colors"
      activeProps={{ className: "px-3 py-2 rounded-full font-bold bg-sun text-sun-foreground" }}
    >
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-sun bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-display text-lg">🦸 Super Kids Learn</div>
          <p className="text-muted-foreground mt-1">
            A friendly place for ages 6–9 to learn and play.
          </p>
        </div>
        <div>
          <div className="font-display mb-2">Explore</div>
          <ul className="space-y-1">
            <li><Link to="/courses" className="hover:underline">Courses</Link></li>
            <li><Link to="/games" className="hover:underline">Games</Link></li>
            <li><Link to="/quiz" className="hover:underline">Quiz</Link></li>
            <li><Link to="/badges" className="hover:underline">Badges</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display mb-2">For grown-ups</div>
          <p className="text-muted-foreground">
            All progress is saved on this device. No accounts, no ads, no tracking.
          </p>
        </div>
      </div>
    </footer>
  );
}
