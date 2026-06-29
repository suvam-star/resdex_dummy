import { Bell, Bookmark, History, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-nav text-nav-foreground border-b border-border">
      <div className="flex h-16 items-center gap-8 px-6">
        {/* Logo removed */}
        <Link to="/folder/results" className="shrink-0" aria-label="Home" />

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-7 text-[15px]">
          <a className="text-foreground/80 hover:text-foreground transition-colors" href="#">
            Jobs &amp; Responses
          </a>
          <a className="relative font-medium text-foreground" href="#">
            Resdex
            <span className="absolute -bottom-[22px] inset-x-0 h-0.5 bg-accent-tab rounded-full" />
          </a>
          <a className="text-foreground/80 hover:text-foreground transition-colors" href="#">
            Reports
          </a>
        </nav>

        <div className="flex-1" />

        {/* Right cluster */}
        <button className="hidden md:inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground">
          <History className="h-4 w-4" /> Recent
        </button>

        <div className="hidden lg:flex items-center gap-2 rounded-md border border-border bg-card px-3 h-9 w-60">
          <input
            placeholder="Search"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>

        <button className="p-1.5 rounded hover:bg-muted text-foreground/80" aria-label="Bookmarks">
          <Bookmark className="h-5 w-5" />
        </button>
        <button className="p-1.5 rounded hover:bg-muted text-foreground/80" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70 hover:bg-muted/80" aria-label="Profile">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-9 1.7-9 5v1h18v-1c0-3.3-5.7-5-9-5Z" />
          </svg>
        </button>

        <span className="h-6 w-px bg-border" />

        {/* Talent Cloud pill */}
        <button className="inline-flex items-center gap-2 rounded-md border-2 border-brand px-3 h-10">
          <span className="grid grid-cols-3 gap-[2px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-[1px] bg-brand" />
            ))}
          </span>
          <span className="text-sm font-medium leading-none">
            <span className="text-[hsl(var(--gradient-from))] font-semibold">talent</span>{" "}
            <span className="text-brand font-semibold">cloud</span>
          </span>
        </button>
      </div>
    </header>
  );
};
