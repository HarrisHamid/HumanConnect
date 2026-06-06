import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Shader background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <ShaderAnimation />
      </div>
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium animate-float-up">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative rounded-full size-2 bg-success" />
          </span>
          AI Receptionist Active
        </div>

        <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] animate-float-up [animation-delay:80ms]">
          Every Patient Deserves<br />
          <span className="text-gradient">to Be Remembered</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-float-up [animation-delay:160ms]">
          HumanConnect AI answers your clinic's calls, books appointments, and remembers every patient — so your staff doesn't have to.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-float-up [animation-delay:240ms]">
          <a
            href="#dashboard"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium glow-primary hover:opacity-95 transition-all"
          >
            See It Live
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground/60 animate-float-up [animation-delay:320ms]">
          Trusted by forward-thinking clinics
        </p>
      </div>
    </section>
  );
}
