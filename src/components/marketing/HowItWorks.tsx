import { PhoneCall, Brain, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: PhoneCall,
    title: "A Customer Calls",
    body: "No hold music. No menus. Just a conversation.",
    color: "from-blue-500/10 to-blue-400/5 border-blue-200/60",
    iconBg: "from-primary/15 to-primary/5 border-primary/20 text-primary",
  },
  {
    icon: Brain,
    title: "AI Understands",
    body: "Context-aware, empathetic, and always available.",
    color: "from-sky-500/10 to-sky-400/5 border-sky-200/60",
    iconBg: "from-accent/15 to-accent/5 border-accent/20 text-accent",
  },
  {
    icon: CalendarCheck,
    title: "Handled Instantly",
    body: "Booked, quoted, or routed — and logged to your dashboard.",
    color: "from-indigo-500/10 to-indigo-400/5 border-indigo-200/60",
    iconBg: "from-primary/15 to-primary/5 border-primary/20 text-primary",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-32 relative">
      {/* Subtle background tint */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.68 0.12 240 / 8%), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Three steps.{" "}
            <span className="text-muted-foreground font-normal italic">Zero friction.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-5 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 animate-draw-line"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100 + 150}>
              <div
                className={`group relative p-8 rounded-2xl border bg-gradient-to-br ${s.color} bg-white/80 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Step number */}
                <div className="absolute top-6 right-6 text-[11px] font-mono font-medium text-muted-foreground/50 tabular-nums">
                  0{i + 1}
                </div>

                <div
                  className={`size-12 rounded-xl bg-gradient-to-br ${s.iconBg} border grid place-items-center`}
                >
                  <s.icon className="size-5" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed font-light">
                  {s.body}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 h-0.5 w-8 rounded-full bg-primary/30 group-hover:w-full group-hover:bg-primary/50 transition-all duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
