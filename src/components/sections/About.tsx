import lifestyle from "@/assets/lifestyle-phone.jpg";
import { useFadeIn } from "@/hooks/use-fade-in";

const FEATURES = [
  { icon: "🌱", title: "Fresh Ingredients", desc: "Locally sourced, seasonally chosen." },
  { icon: "⚖️", title: "Balanced Nutrition", desc: "Macros tuned to your day." },
  { icon: "💰", title: "Meal Savings", desc: "Affordable plans, premium quality." },
  { icon: "💬", title: "Daily Support", desc: "We answer on WhatsApp, fast." },
];

export function About() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div ref={ref} className="container-cnc grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <img src={lifestyle} alt="Fresh meal lifestyle" loading="lazy" className="h-[480px] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 w-72 rounded-2xl bg-background p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blush-light">
                <span className="absolute inset-1 rounded-full border-4 border-primary border-r-transparent" />
              </div>
              <div>
                <p className="font-display text-base text-near-black">Today's Fresh Pick</p>
                <p className="text-[11px] text-text-muted">Balanced macros · Made to order</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-blush-light px-2 py-1 text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Fresh
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blush-light px-2 py-1 text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" /> Protein
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blush-light px-2 py-1 text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-blush-mid" /> Plant-Based
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Crust N Crumb</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-near-black md:text-6xl">
            Effortlessly
            <br /> Healthy
          </h2>
          <p className="mt-5 max-w-md text-base text-text-muted">
            You want to eat healthy, but busy days make it hard. Crust N Crumb delivers fresh,
            balanced meals made with real ingredients — ready to fuel, enjoy, and nourish your
            day in Pristina.
          </p>
          <a
            href="#menu"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
          >
            Order Now
          </a>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-blush-mid bg-background p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-light text-lg">
                  {f.icon}
                </div>
                <p className="mt-3 font-display text-lg text-near-black">{f.title}</p>
                <p className="mt-1 text-xs text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
