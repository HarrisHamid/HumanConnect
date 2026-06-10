import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Memory } from "@/components/marketing/Memory";
import { Dashboard } from "@/components/marketing/Dashboard";
import { CtaFooter } from "@/components/marketing/CtaFooter";
import { VerticalCard } from "@/components/picker/VerticalCard";
import { verticalList } from "@/config/verticals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HumanConnect AI — Your business's AI receptionist. Always on." },
      { name: "description", content: "HumanConnect AI answers your calls, books appointments, and remembers every customer — so your staff doesn't have to." },
      { property: "og:title", content: "HumanConnect AI — Your business's AI receptionist. Always on." },
      { property: "og:description", content: "AI voice receptionist that answers calls, books appointments, and remembers every customer." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Memory />
      <Dashboard />

      {/* Industry picker */}
      <section id="industries" className="px-6 py-28 bg-secondary/40 scroll-mt-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">
              Live dashboards
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Pick your industry
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto font-light">
              Each one is a real, working dashboard with its own KPIs, language, and
              look. Open one and watch the calls roll in.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
            {verticalList.map((v) => (
              <VerticalCard key={v.id} vertical={v} />
            ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
