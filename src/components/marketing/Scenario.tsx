import { CalendarCheck, MoonStar, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { DEMO_PHONE } from "@/config/site";

// The single most persuasive story we can tell: the call that every
// practice misses, answered. Copy is a realistic scenario, not a
// transcript of a real patient — and is labeled as such.

const TRANSCRIPT: { speaker: "agent" | "caller"; text: string }[] = [
  {
    speaker: "agent",
    text: "Thanks for calling Bright Smile Dental. The office is closed, but I can still help — what's going on?",
  },
  {
    speaker: "caller",
    text: "Hi — I just cracked a filling at dinner. It's pretty sore. Any chance I can get in tomorrow?",
  },
  {
    speaker: "agent",
    text: "Sorry about that — let's get you in. Dr. Patel has 9:15 or 11:40 tomorrow morning. Which works better?",
  },
  { speaker: "caller", text: "9:15, please." },
  {
    speaker: "agent",
    text: "Done — you're booked for 9:15 AM with Dr. Patel, and I've texted you a confirmation. If the pain gets worse tonight, call back and I'll reach the on-call line.",
  },
];

const MATH = [
  {
    value: "1 in 3",
    label: "calls to dental practices go unanswered — after hours, at lunch, or while the desk is with a patient",
  },
  {
    value: "$700–1,200",
    label: "typical first-year value of a single new patient",
  },
  {
    value: "~85%",
    label: "of routine booking calls handled end-to-end — the rest get a warm handoff to your staff, by design",
  },
];

export function Scenario() {
  return (
    <section id="after-hours" className="py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, oklch(0.52 0.22 265 / 7%), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* Copy + the math */}
        <Reveal direction="left">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary">
            After hours
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Tuesday, 7:42 PM.
            <br />
            <span className="text-muted-foreground font-normal italic">
              Your office closed at five.
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-light max-w-lg">
            Maria bites into dinner and her filling cracks. She calls the first
            practice on Google and gets voicemail — so she calls the next one on
            the list. The practice that answers gets the patient.
          </p>

          <div className="mt-10 space-y-5 max-w-lg">
            {MATH.map((stat) => (
              <div key={stat.value} className="flex items-baseline gap-4">
                <span className="text-2xl font-semibold text-foreground tabular-nums shrink-0 w-28">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground/60 max-w-lg">
            Industry averages — once you're live, the dashboard shows your own numbers.
          </p>
        </Reveal>

        {/* Transcript card — nighttime panel */}
        <Reveal direction="right">
          <div
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{
              background:
                "linear-gradient(165deg, oklch(0.22 0.045 262) 0%, oklch(0.16 0.04 268) 55%, oklch(0.13 0.035 270) 100%)",
              boxShadow:
                "0 40px 90px -25px oklch(0.2 0.06 265 / 55%), 0 12px 32px -10px oklch(0.2 0.06 265 / 35%)",
            }}
          >
            {/* Moonlight glow */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                width: 320,
                height: 320,
                top: -140,
                right: -90,
                background: "radial-gradient(circle, oklch(0.65 0.19 222 / 22%), transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Header */}
            <div className="relative px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="size-8 rounded-lg bg-white/8 border border-white/10 grid place-items-center">
                  <MoonStar className="size-4 text-sky-300/80" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/90 leading-none">
                    Incoming call · 7:42 PM
                  </p>
                  <p className="text-[11px] text-white/40 mt-1">
                    Bright Smile Dental · office closed
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300/90">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                Answered · 2nd ring
              </span>
            </div>

            {/* Transcript */}
            <div className="relative px-6 py-6 space-y-3.5">
              {TRANSCRIPT.map((line, i) => (
                <Reveal key={i} delay={150 + i * 120}>
                  <div className={`flex ${line.speaker === "caller" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed rounded-2xl ${
                        line.speaker === "agent"
                          ? "bg-white/8 border border-white/10 text-white/85 rounded-bl-md"
                          : "bg-gradient-to-br from-primary to-accent text-white rounded-br-md"
                      }`}
                    >
                      {line.speaker === "agent" && (
                        <span className="block text-[9.5px] font-semibold uppercase tracking-widest text-sky-300/70 mb-1">
                          HumanConnect Agent
                        </span>
                      )}
                      {line.text}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Outcome footer */}
            <Reveal delay={800}>
              <div className="relative px-6 py-4 border-t border-white/8 flex items-center justify-between gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/12 border border-emerald-300/25 text-[12px] font-medium text-emerald-300">
                  <CalendarCheck className="size-3.5" />
                  Booked — tomorrow, 9:15 AM
                </span>
                <span className="text-[11px] text-white/40">
                  Logged to your dashboard with a full summary
                </span>
              </div>
            </Reveal>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            Illustrative scenario — hear the real thing at{" "}
            <a href={`tel:${DEMO_PHONE.tel}`} className="text-primary/80 hover:text-primary font-medium inline-flex items-center gap-1">
              <Phone className="size-3" />
              {DEMO_PHONE.display}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
