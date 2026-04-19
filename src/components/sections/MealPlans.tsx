import { ChevronLeft, ChevronRight } from "lucide-react";
import veganPlan from "@/assets/plan-vegan.jpg";
import proteinPlan from "@/assets/plan-protein.jpg";
import balancedPlan from "@/assets/plan-balanced.jpg";
import { useFadeIn } from "@/hooks/use-fade-in";

const PLANS = [
  {
    name: "Vegan Plan",
    desc: "100% plant-powered meals built on whole grains and seasonal vegetables.",
    image: veganPlan,
  },
  {
    name: "High Protein Plan",
    desc: "Lean protein from chicken, eggs and salmon to fuel training days.",
    image: proteinPlan,
  },
  {
    name: "Balanced Meals Plan",
    desc: "Macros that just work — for everyday energy and steady focus.",
    image: balancedPlan,
  },
];

export function MealPlans() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="plans" className="bg-cream py-20 md:py-28">
      <div ref={ref} className="container-cnc">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Find Your Fit</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] text-near-black md:text-6xl">
              Healthy Meals
              <br /> That Fit Your Life
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blush-mid hover:border-primary hover:text-primary">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blush-mid hover:border-primary hover:text-primary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <article key={p.name} className="overflow-hidden rounded-3xl bg-background shadow-soft">
              <img src={p.image} alt={p.name} loading="lazy" className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display text-2xl text-near-black">{p.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.desc}</p>
                <button className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground hover:bg-primary-dark">
                  View More
                </button>
              </div>
            </article>
          ))}

          <article className="flex flex-col justify-between rounded-3xl bg-blush-light p-6">
            <p className="font-display text-2xl leading-snug text-near-black">
              Choose a meal plan that fits your lifestyle and goals.
            </p>
            <a
              href="#menu"
              className="mt-6 inline-flex w-fit items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
            >
              Order Now
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
