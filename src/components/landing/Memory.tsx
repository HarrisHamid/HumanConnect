import { Sparkles } from "lucide-react";

export function Memory() {
  return (
    <section id="memory" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Transcript */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/80">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-destructive/70" />
                <div className="size-2.5 rounded-full bg-warning/70" />
                <div className="size-2.5 rounded-full bg-success/70" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-[11px] font-medium text-primary">
                <Sparkles className="size-3" />
                Returning Patient
              </div>
            </div>
            <div className="p-6 space-y-4 text-sm font-mono">
              <Bubble role="ai">
                Hi Mrs. Johnson, welcome back! It's been about three months since your last visit with Dr. Patel. How can I help today?
              </Bubble>
              <Bubble role="patient">
                Oh, hi! I'd love to book a follow-up — same doctor if possible.
              </Bubble>
              <Bubble role="ai">
                Of course. Dr. Patel has Tuesday at 4:30 PM or Thursday at 10 AM. Which works better?
              </Bubble>
              <Bubble role="patient">
                Tuesday at 4:30 sounds great.
              </Bubble>
              <Bubble role="ai">
                Booked. You'll get a confirmation text shortly. Anything else?
              </Bubble>
              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-success/70 animate-pulse-dot" />
                </span>
                Call ended · 1m 24s · Booked
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="text-sm font-medium text-primary">Memory</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            It remembers them.<br />
            <span className="text-muted-foreground">So you don't have to.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
            When Mrs. Johnson calls back three months later, HumanConnect already knows her name, her last visit, and her preferred doctor.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Full patient history, instantly recalled",
              "Preferred doctors and appointment times",
              "Notes from previous calls carry forward",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, children }: { role: "ai" | "patient"; children: React.ReactNode }) {
  const isAi = role === "ai";
  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
          isAi
            ? "bg-secondary text-foreground rounded-bl-sm"
            : "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground rounded-br-sm"
        }`}
      >
        <div className={`text-[10px] uppercase tracking-wider mb-1 ${isAi ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
          {isAi ? "HumanConnect AI" : "Mrs. Johnson"}
        </div>
        {children}
      </div>
    </div>
  );
}
