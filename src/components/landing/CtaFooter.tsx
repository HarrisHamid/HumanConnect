import { ArrowRight } from "lucide-react";

export function CtaFooter() {
  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Ready to give your clinic <span className="text-gradient">a voice?</span>
        </h2>
        <div className="mt-10">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium glow-primary hover:opacity-95 transition-all"
          >
            Request Early Access
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No hold music. No missed calls. No forgetting.
        </p>
      </div>

      <footer className="mt-32 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} HumanConnect AI</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
