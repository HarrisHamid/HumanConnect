import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { DEMO_PHONE, DEMO_PHONE_HREF } from "@/config/site";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Shader animation — fills the hero section */}
      <div className="absolute inset-0 pointer-events-none">
        <ShaderAnimation />
      </div>

      {/* Radial white overlay — keeps content readable, lets rings glow at edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(248,250,255,0.96) 30%, rgba(248,250,255,0.88) 55%, rgba(248,250,255,0.55) 78%, rgba(248,250,255,0.15) 100%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Live badge — the agent really is on this number */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-success/25 bg-success/8 text-sm animate-float-up">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative rounded-full size-2 bg-success" />
          </span>
          <span className="text-success font-medium">
            Our agent is answering this number right now
          </span>
        </div>

        <h1 className="mt-8 text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.06] animate-float-up [animation-delay:80ms]">
          Every call answered.
          <br />
          <span className="text-gradient italic">Every chair filled.</span>
        </h1>

        <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light animate-float-up [animation-delay:160ms]">
          HumanConnect AI answers your practice's phone 24/7, books patients straight
          into your calendar, and hands anything unusual to your staff — so the front
          desk never has to choose between the phone and the patient in front of them.
        </p>

        {/* Primary CTA — the live demo line */}
        <div className="mt-10 flex flex-col items-center gap-4 animate-float-up [animation-delay:240ms]">
          <a
            href={DEMO_PHONE_HREF}
            className="btn-shine group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground glow-primary hover:opacity-95 transition-all"
          >
            <span className="size-9 rounded-xl bg-white/15 grid place-items-center">
              <Phone className="size-4.5" />
            </span>
            <span className="text-left">
              <span className="block text-xl font-semibold tracking-tight tabular-nums">
                Call {DEMO_PHONE.display}
              </span>
              <span className="block text-xs text-white/75 font-light">
                Talk to the agent. Try to stump it.
              </span>
            </span>
          </a>

          <a
            href="#dashboard"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Or see the dashboard it writes to
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-14 text-xs uppercase tracking-[0.22em] text-muted-foreground/50 font-medium animate-float-up [animation-delay:320ms]">
          Built for dental practices · also answering for auto shops
        </p>

        {/* Trust indicators — structural truths only, no invented stats */}
        <div className="mt-5 flex items-center justify-center gap-8 flex-wrap animate-float-up [animation-delay:400ms]">
          {[
            "Picks up by the second ring",
            "Books into your calendar",
            "Warm handoff for anything clinical",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary/50" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 animate-float-up [animation-delay:460ms]">
          <Link
            to="/$vertical"
            params={{ vertical: "mechanic" }}
            className="text-xs text-muted-foreground/60 hover:text-primary transition-colors"
          >
            Run an auto shop instead? See your version →
          </Link>
        </div>
      </div>
    </section>
  );
}
