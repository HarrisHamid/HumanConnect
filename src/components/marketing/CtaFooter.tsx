import { ArrowRight, Phone, PhoneCall, Wrench, Stethoscope } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import { verticalList } from "@/config/verticals";
import { DEMO_PHONE, DEMO_PHONE_HREF } from "@/config/site";

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
              Hear it answer{" "}
              <span className="italic font-light text-white/85">before you buy it.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light">
              Call the demo line, then open the dashboard for your industry — its own
              KPIs, language, and look.
            </p>

            {/* Demo line — repeated here so nobody has to scroll back up */}
            <div className="mt-8 flex justify-center">
              <a
                href={DEMO_PHONE_HREF}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white text-slate-900 font-semibold shadow-lg shadow-black/15 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="size-8 rounded-lg bg-slate-900/8 grid place-items-center">
                  <Phone className="size-4" />
                </span>
                <span className="tabular-nums text-lg tracking-tight">
                  {DEMO_PHONE.display}
                </span>
                <span className="text-sm font-normal text-slate-500 hidden sm:inline">
                  — live now
                </span>
              </a>
            </div>

            {/* Industry picker — each links into its live dashboard */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto text-left">
              {verticalList.map((v) => (
                <Link
                  key={v.id}
                  to="/$vertical"
                  params={{ vertical: v.id }}
                  data-vertical={v.id}
                  // Swapped to high-opacity slate-100 mix to match your image exactly
                  className="group flex items-start gap-4 rounded-2xl border border-white/30 bg-slate-100/90 p-5 backdrop-blur-md transition-all duration-200 hover:bg-slate-50 hover:-translate-y-0.5 shadow-lg shadow-black/5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 text-slate-800">
                    {/* Dynamic Icon Selection */}
                    {v.id === "mechanic" ? (
                      <Wrench className="h-5 w-5" />
                    ) : v.id === "dental" ? (
                      <Stethoscope className="h-5 w-5" />
                    ) : (
                      <PhoneCall className="h-5 w-5" />
                    )}
                  </span>
                  <span className="flex-1">
                    {/* Darker text styling to ensure perfect readability against the clean slate-white card */}
                    <span className="block font-semibold text-slate-900">{v.displayName}</span>
                    <span className="mt-0.5 block text-sm text-slate-600">{v.tagline}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-800 group-hover:text-slate-900">
                      See the live dashboard
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <a href="#how" className="text-sm text-white/70 hover:text-white transition-colors">
                Or see how it works →
              </a>
            </div>

            {/* Founding program — honest early-stage social proof */}
            <div className="mt-14 max-w-xl mx-auto rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md px-6 py-5 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                Founding practice program
              </p>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                We're onboarding our first practices now. Founding customers get setup
                waived, a founding rate locked for life, and a direct line to the team
                building their agent.
              </p>
              <a
                href="mailto:harrishamid260@gmail.com?subject=HumanConnect%20AI%20—%20Founding%20practice"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                Claim a founding spot
                <ArrowRight className="size-4" />
              </a>
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
