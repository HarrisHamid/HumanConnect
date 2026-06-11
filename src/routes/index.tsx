import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { Scenario } from "@/components/marketing/Scenario";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Memory } from "@/components/marketing/Memory";
import { Dashboard } from "@/components/marketing/Dashboard";
import { CtaFooter } from "@/components/marketing/CtaFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HumanConnect AI — The AI receptionist for dental practices" },
      {
        name: "description",
        content:
          "HumanConnect AI answers your practice's phone 24/7, books patients straight into your calendar, and hands anything unusual to your staff. Call the live demo: (609) 256-8360.",
      },
      { property: "og:title", content: "HumanConnect AI — The AI receptionist for dental practices" },
      {
        property: "og:description",
        content:
          "Answers every call 24/7, books into your calendar, warm handoff for everything else. Call the live demo: (609) 256-8360.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Scenario />
      <HowItWorks />
      <Memory />
      <Dashboard />
      <CtaFooter />
    </main>
  );
}
