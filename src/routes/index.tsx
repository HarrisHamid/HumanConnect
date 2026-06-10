import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Memory } from "@/components/marketing/Memory";
import { Dashboard } from "@/components/marketing/Dashboard";
import { CtaFooter } from "@/components/marketing/CtaFooter";

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
      <CtaFooter />
    </main>
  );
}
