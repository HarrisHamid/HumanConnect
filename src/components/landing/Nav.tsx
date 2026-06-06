import { Phone } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center">
            <Phone className="size-4 text-primary-foreground" />
          </span>
          <span>HumanConnect <span className="text-muted-foreground font-normal">AI</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#memory" className="hover:text-foreground transition-colors">Memory</a>
          <a href="#dashboard" className="hover:text-foreground transition-colors">Dashboard</a>
        </nav>
        <a
          href="#cta"
          className="text-sm px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          Early Access
        </a>
      </div>
    </header>
  );
}
