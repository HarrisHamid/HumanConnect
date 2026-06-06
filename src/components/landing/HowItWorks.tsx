import { PhoneCall, Brain, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Patient Calls",
    body: "No hold music. No menus. Just a conversation.",
  },
  {
    icon: Brain,
    title: "AI Understands",
    body: "Context-aware, empathetic, and always available.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booked",
    body: "Confirmed instantly. Synced to your calendar.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Three steps. Zero friction.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30 grid place-items-center text-primary">
                <s.icon className="size-5" />
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
