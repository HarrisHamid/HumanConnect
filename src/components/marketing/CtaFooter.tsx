import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function CtaFooter() {
  return (
    <>
      <section id="cta" className="py-32 relative overflow-hidden">
        {/* Gradient background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.52 0.22 265) 0%, oklch(0.62 0.19 245) 40%, oklch(0.65 0.19 222) 100%)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / 7%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 7%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Orb accent */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            top: -150,
            right: -100,
            background: "oklch(0.78 0.16 210 / 30%)",
            filter: "blur(100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 400,
            bottom: -100,
            left: -80,
            background: "oklch(0.48 0.22 270 / 40%)",
            filter: "blur(100px)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">
              Get started
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
              Ready to give your business{" "}
              <span className="italic font-light text-white/85">a voice?</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light">
              No hold music. No missed calls. No forgetting.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#industries"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-foreground font-semibold hover:bg-white/95 transition-all shadow-[0_4px_20px_oklch(0_0_0/20%)] hover:shadow-[0_8px_30px_oklch(0_0_0/30%)] hover:-translate-y-0.5"
              >
                See a live dashboard
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
              >
                How it works
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-14 flex items-center justify-center gap-8 flex-wrap">
              {[
                { label: "Calls handled / month", value: "12,000+" },
                { label: "Avg response time", value: "< 1s" },
                { label: "Customer satisfaction", value: "97%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-white/55 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center">
              <span className="size-3 text-white text-[8px] font-bold leading-none">H</span>
            </span>
            <span>© {new Date().getFullYear()} HumanConnect AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
