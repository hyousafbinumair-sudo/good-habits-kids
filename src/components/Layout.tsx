import { Outlet } from "react-router-dom";
import { SiteHeader, SiteFooter } from "./SiteChrome";

export default function Layout() {
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
