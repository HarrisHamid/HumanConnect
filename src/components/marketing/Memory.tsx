import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const WAVE_HEIGHTS = [0.35, 0.62, 0.88, 0.5, 1, 0.72, 0.45, 0.92, 0.65, 0.8, 0.4, 0.75];

export function Memory() {
  return (
    <section id="memory" className="py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.955 0.014 240 / 60%) 40%, oklch(0.955 0.014 240 / 60%) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* 3D iPhone mockup */}
        <Reveal direction="left">
          <div className="flex justify-center py-8">
            <PhoneMockup />
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
            knows her name, her last visit, and what she came in for.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Full customer history, instantly recalled",
              "Preferred staff, times, and services",
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
          {/* note: illustrative example; the phone mockup keeps a friendly
              returning-customer scenario rather than any one industry. */}
        </Reveal>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      y: ((x - cx) / cx) * 26,
      x: -((y - cy) / cy) * 18,
    });
  };

  const handleMouseLeave = () => setTilt(null);

  const shellTransform = tilt
    ? `rotateY(${tilt.y}deg) rotateX(${tilt.x}deg) scale(1.04)`
    : "rotateY(0deg) rotateX(0deg) scale(1)";

  const shellTransition = tilt
    ? "transform 0.07s ease-out"
    : "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)";

  const shellShadow = tilt
    ? [
        "0 90px 160px -20px rgba(8,18,55,0.55)",
        "0 35px 80px -12px rgba(8,18,55,0.4)",
        "0 10px 28px -5px rgba(8,18,55,0.24)",
        "inset 0 1px 0 rgba(255,255,255,0.72)",
        "inset 0 -1px 0 rgba(0,0,0,0.12)",
      ].join(", ")
    : [
        "0 70px 140px -20px rgba(8,18,55,0.52)",
        "0 28px 65px -12px rgba(8,18,55,0.38)",
        "0 8px 22px -5px rgba(8,18,55,0.22)",
        "inset 0 1px 0 rgba(255,255,255,0.72)",
        "inset 0 -1px 0 rgba(0,0,0,0.12)",
      ].join(", ");

  return (
    <div
      ref={wrapperRef}
      style={{ perspective: "1100px", animationPlayState: tilt ? "paused" : "running" }}
      className="relative phone-float"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -50,
          background:
            "radial-gradient(ellipse at 45% 55%, oklch(0.62 0.18 250 / 45%), oklch(0.65 0.19 222 / 28%) 50%, transparent 72%)",
          filter: "blur(44px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Phone shell */}
      <div
        className="phone-shell"
        style={{
          transform: shellTransform,
          transition: shellTransition,
          width: 268,
          height: 558,
          borderRadius: 52,
          background:
            "linear-gradient(145deg, #d8dde6 0%, #b6bcc8 28%, #e2e6ee 54%, #bec3ce 78%, #acb1bc 100%)",
          padding: 3,
          boxShadow: shellShadow,
          position: "relative",
        }}
      >
        {/* Screen glass */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 49,
            background:
              "linear-gradient(158deg, #daeeff 0%, #edf5ff 38%, #f5f9ff 72%, #eef3ff 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Screen glare / top-left reflection */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: "55%",
              height: "38%",
              background:
                "linear-gradient(148deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
              borderRadius: "49px 0 0 0",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />

          {/* Status bar */}
          <div
            style={{
              height: 52,
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: 15,
              paddingLeft: 24,
              paddingRight: 22,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0a1628", fontFamily: "Outfit, sans-serif" }}>
              9:41
            </span>

            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 13,
                left: "50%",
                transform: "translateX(-50%)",
                width: 114,
                height: 34,
                borderRadius: 20,
                background: "#000",
              }}
            />

            {/* Signal + battery */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 9 }}>
                {[4, 6, 8, 10].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: "#0a1628", borderRadius: 1 }} />
                ))}
              </div>
              <div style={{ width: 21, height: 10, borderRadius: 3, border: "1.5px solid #0a1628", padding: "1.5px", display: "flex" }}>
                <div style={{ width: "78%", background: "#0a1628", borderRadius: 1.5 }} />
              </div>
            </div>
          </div>

          {/* Call UI */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 22px 26px",
              height: "calc(100% - 52px)",
            }}
          >
            {/* AI label */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.22 265 / 0.85)",
                fontFamily: "Outfit, sans-serif",
                marginBottom: 20,
              }}
            >
              HumanConnect AI
            </div>

            {/* Avatar */}
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: "50%",
                background: "linear-gradient(135deg, oklch(0.52 0.22 265), oklch(0.65 0.19 222))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Outfit, sans-serif",
                fontSize: 27,
                fontWeight: 600,
                color: "white",
                letterSpacing: "-0.02em",
                boxShadow: "0 10px 36px oklch(0.52 0.22 265 / 42%), 0 4px 14px oklch(0.52 0.22 265 / 28%)",
                marginBottom: 14,
              }}
            >
              MJ
            </div>

            {/* Name */}
            <div
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: 22,
                fontWeight: 600,
                color: "#0a1628",
                marginBottom: 3,
                letterSpacing: "-0.01em",
              }}
            >
              Mrs. Johnson
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: "oklch(0.52 0.22 265)",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Returning customer · 3rd visit
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "0.05em",
                marginBottom: 22,
              }}
            >
              1:24
            </div>

            {/* Animated waveform */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, height: 46, marginBottom: 16 }}>
              {WAVE_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 4.5,
                    height: `${h * 100}%`,
                    borderRadius: 4,
                    background: "linear-gradient(to top, oklch(0.52 0.22 265), oklch(0.65 0.19 222 / 0.75))",
                    animation: "wave-bar 1.3s ease-in-out infinite",
                    animationDelay: `${i * 0.09}s`,
                    transformOrigin: "bottom center",
                  }}
                />
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Call controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
              {/* Mute */}
              <ControlBtn label="mute">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </ControlBtn>

              {/* End call */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f43f5e, #dc2626)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 24px rgba(239,68,68,0.52), 0 2px 8px rgba(239,68,68,0.32)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.26 8.85a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11z" />
                    <line x1="23" y1="1" x2="1" y2="23" />
                  </svg>
                </div>
                <span style={{ fontSize: 9.5, color: "#64748b", fontFamily: "Outfit, sans-serif" }}>end</span>
              </div>

              {/* Speaker */}
              <ControlBtn label="speaker">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </ControlBtn>
            </div>
          </div>
        </div>

        {/* Physical buttons — right side (power) */}
        <div style={{ position: "absolute", right: -4, top: 138, width: 4, height: 70, background: "linear-gradient(to right, #bfc4cf, #a8adb8)", borderRadius: "0 3px 3px 0" }} />

        {/* Physical buttons — left side (action) */}
        <div style={{ position: "absolute", left: -4, top: 104, width: 4, height: 30, background: "linear-gradient(to left, #bfc4cf, #a8adb8)", borderRadius: "3px 0 0 3px" }} />

        {/* Physical buttons — left side (vol up) */}
        <div style={{ position: "absolute", left: -4, top: 152, width: 4, height: 58, background: "linear-gradient(to left, #bfc4cf, #a8adb8)", borderRadius: "3px 0 0 3px" }} />

        {/* Physical buttons — left side (vol down) */}
        <div style={{ position: "absolute", left: -4, top: 222, width: 4, height: 58, background: "linear-gradient(to left, #bfc4cf, #a8adb8)", borderRadius: "3px 0 0 3px" }} />
      </div>
    </div>
  );
}

function ControlBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "rgba(203,213,225,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <span style={{ fontSize: 9.5, color: "#64748b", fontFamily: "Outfit, sans-serif" }}>{label}</span>
    </div>
  );
}
