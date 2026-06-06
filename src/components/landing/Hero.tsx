import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function Hero() {
  return (
    <section className="relative pt-40 pb-36 overflow-hidden">
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
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(248,250,255,0.84) 25%, rgba(248,250,255,0.65) 55%, rgba(248,250,255,0.30) 80%, rgba(248,250,255,0.05) 100%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white/70 backdrop-blur-sm text-sm font-medium text-primary animate-float-up animate-badge-float">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative rounded-full size-2 bg-success" />
          </span>
          AI Receptionist Active
        </div>

        <h1 className="mt-8 text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.06] animate-float-up [animation-delay:80ms]">
          Every Patient Deserves<br />
          <span className="text-gradient italic">to Be Remembered</span>
        </h1>

        <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light animate-float-up [animation-delay:160ms]">
          HumanConnect AI answers your clinic's calls, books appointments, and
          remembers every patient — so your staff doesn't have to.
        </p>

        <div className="mt-10 flex items-center justify-center animate-float-up [animation-delay:240ms]">
          <a
            href="#dashboard"
            className="btn-shine group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium glow-primary hover:opacity-95 transition-all"
          >
            See It Live
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-14 text-xs uppercase tracking-[0.22em] text-muted-foreground/50 font-medium animate-float-up [animation-delay:320ms]">
          Trusted by forward-thinking clinics
        </p>

        {/* Trust indicators */}
        <div className="mt-5 flex items-center justify-center gap-8 animate-float-up [animation-delay:400ms]">
          {["24/7 Available", "HIPAA Ready", "< 1s Response"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary/50" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
