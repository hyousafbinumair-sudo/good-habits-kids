import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

import appCss from "../styles.css?url";

function NotFoundComponent() {
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Super Kids Learn — fun lessons, games & quizzes for ages 6–9" },
      {
        name: "description",
        content:
          "A bright, kid-friendly learning hub. Courses on civics, safety, health, math, science, manners and online safety, plus games, quizzes and badges.",
      },
      { name: "author", content: "Super Kids Learn" },
      { property: "og:title", content: "Super Kids Learn" },
      { property: "og:description", content: "Fun courses, games and quizzes for kids 6–9." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Nunito:wght@400;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
