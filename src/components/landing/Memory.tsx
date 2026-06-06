import { Sparkles, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function Memory() {
  return (
    <section id="memory" className="py-32 relative overflow-hidden">
      {/* Background stripe */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.955 0.014 240 / 60%) 40%, oklch(0.955 0.014 240 / 60%) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* Transcript card */}
        <Reveal direction="left">
          <div className="relative">
            {/* Glow behind card */}
            <div
              className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 50%, oklch(0.62 0.18 250 / 18%), transparent 70%)",
              }}
            />

            <div
              className="relative rounded-2xl border border-border bg-white overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-destructive/50" />
                  <div className="size-3 rounded-full bg-warning/50" />
                  <div className="size-3 rounded-full bg-success/50" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-medium text-primary">
                  <Sparkles className="size-3" />
                  Returning Patient
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="p-6 space-y-4 text-sm">
                <Bubble role="ai">
                  Hi Mrs. Johnson, welcome back! It's been about three months since
                  your last visit with Dr. Patel. How can I help today?
                </Bubble>
                <Bubble role="patient">
                  Oh, hi! I'd love to book a follow-up — same doctor if possible.
                </Bubble>
                <Bubble role="ai">
                  Of course. Dr. Patel has Tuesday at 4:30 PM or Thursday at 10 AM.
                  Which works better?
                </Bubble>
                <Bubble role="patient">Tuesday at 4:30 sounds great.</Bubble>
                <Bubble role="ai">
                  Booked. You'll get a confirmation text shortly. Anything else?
                </Bubble>

                {/* Call ended bar */}
                <div className="flex items-center gap-2 pt-3 text-xs text-muted-foreground border-t border-border mt-2">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 rounded-full bg-success/60 animate-pulse-dot" />
                  </span>
                  Call ended · 1m 24s · Booked
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy block */}
        <Reveal direction="right">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary">
            Memory
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            It remembers them.
            <br />
            <span className="text-muted-foreground font-normal italic">
              So you don't have to.
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-light max-w-lg">
            When Mrs. Johnson calls back three months later, HumanConnect already
            knows her name, her last visit, and her preferred doctor.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Full patient history, instantly recalled",
              "Preferred doctors and appointment times",
              "Notes from previous calls carry forward",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-4.5 text-primary shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/6 border border-primary/15">
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="tabular-nums font-semibold text-lg text-foreground">94%</span>
              first-call resolution rate
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "ai" | "patient";
  children: React.ReactNode;
}) {
  const isAi = role === "ai";
  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
          isAi
            ? "bg-secondary text-foreground rounded-bl-sm border border-border"
            : "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm shadow-[0_2px_12px_oklch(0.52_0.22_265/25%)]"
        }`}
      >
        <div
          className={`text-[10px] uppercase tracking-wider mb-1.5 font-medium ${
            isAi ? "text-muted-foreground" : "text-white/70"
          }`}
        >
          {isAi ? "HumanConnect AI" : "Mrs. Johnson"}
        </div>
        {children}
      </div>
    </div>
  );
}
