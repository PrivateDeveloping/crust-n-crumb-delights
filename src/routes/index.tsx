import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { MealPlans } from "@/components/sections/MealPlans";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crust N Crumb — Fresh, Healthy Meals in Pristina" },
      {
        name: "description",
        content:
          "Crust N Crumb is a fresh and healthy café in Pristina serving balanced salads, sandwiches, smoothies and juices, made daily with real ingredients.",
      },
      { property: "og:title", content: "Crust N Crumb — Fresh, Healthy Meals in Pristina" },
      {
        property: "og:description",
        content:
          "Balanced salads, sandwiches, smoothies and juices, made fresh daily in Pristina.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Pinyon+Script&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <MenuSection />
        <About />
        <HowItWorks />
        <Testimonials />
        <MealPlans />
        <CTABanner />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
