import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Memory } from "@/components/landing/Memory";
import { Dashboard } from "@/components/landing/Dashboard";
import { CtaFooter } from "@/components/landing/CtaFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HumanConnect AI — Your clinic's receptionist. Always on." },
      { name: "description", content: "HumanConnect AI answers your clinic's calls, books appointments, and remembers every patient — so your staff doesn't have to." },
      { property: "og:title", content: "HumanConnect AI — Your clinic's receptionist. Always on." },
      { property: "og:description", content: "AI voice receptionist that answers calls, books appointments, and remembers every patient." },
    ],
  }),
  component: Index,
});

function Index() {
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
