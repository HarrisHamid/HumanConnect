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
            "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(248,250,255,0.96) 30%, rgba(248,250,255,0.88) 55%, rgba(248,250,255,0.55) 78%, rgba(248,250,255,0.15) 100%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="mt-8 text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.06] animate-float-up [animation-delay:80ms]">
          Any business.
          <br />
          <span className="text-gradient italic">Always answered.</span>
        </h1>

        <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light animate-float-up [animation-delay:160ms]">
          HumanConnect AI picks up every call, books the appointment, and remembers every customer —
          so your team never has to choose between the phone and the person in front of them.
        </p>

        <div className="mt-10 flex items-center justify-center animate-float-up [animation-delay:240ms]">
          <a
            href="#cta"
            className="btn-shine group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium glow-primary hover:opacity-95 transition-all"
          >
            See a live dashboard
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-14 text-xs uppercase tracking-[0.22em] text-muted-foreground/50 font-medium animate-float-up [animation-delay:320ms]">
          Built for the businesses that run on the phone
        </p>

        {/* Trust indicators */}
        <div className="mt-5 flex items-center justify-center gap-8 animate-float-up [animation-delay:400ms]">
          {["24/7 Available", "Books in real time", "< 1s Response"].map((item) => (
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
