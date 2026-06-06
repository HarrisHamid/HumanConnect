import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl border-b border-border shadow-[0_1px_24px_-6px_oklch(0.13_0.028_252/10%)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
            className="hover:text-foreground transition-colors duration-200 hover:text-primary"
          >
            How it works
          </a>
          <a
            href="#memory"
            className="hover:text-foreground transition-colors duration-200 hover:text-primary"
          >
            Memory
          </a>
          <a
            href="#dashboard"
            className="hover:text-foreground transition-colors duration-200 hover:text-primary"
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
