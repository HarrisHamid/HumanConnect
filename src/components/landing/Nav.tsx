import { Phone } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-6">
      <div className="max-w-5xl mx-auto bg-white/92 backdrop-blur-xl border border-border shadow-[0_4px_32px_-8px_oklch(0.13_0.028_252/12%)] rounded-2xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="size-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[0_2px_8px_oklch(0.52_0.22_265/30%)]">
            <Phone className="size-4 text-white" />
          </span>
          <span className="text-foreground">
            HumanConnect{" "}
            <span className="text-muted-foreground font-normal">AI</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a
            href="#how"
            className="hover:text-primary transition-colors duration-200"
          >
            How it works
          </a>
          <a
            href="#memory"
            className="hover:text-primary transition-colors duration-200"
          >
            Memory
          </a>
          <a
            href="#dashboard"
            className="hover:text-primary transition-colors duration-200"
          >
            Dashboard
          </a>
        </nav>

        <a
          href="#dashboard"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/8 border border-primary/20 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-200"
        >
          See demo
        </a>
      </div>
    </header>
  );
}
