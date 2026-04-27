import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import lifestyle from "@/assets/bowlAboutUs1.webp";
import { useFadeIn } from "@/hooks/use-fade-in";

const GOOGLE_REVIEWS = [
  {
    name: "Anyla",
    meta: "Local Guide",
    text: "I am beyond happy with my visit. Warm colors, wood, and plenty of tables indoors and outdoors.",
  },
  {
    name: "Silvia Pračková",
    meta: "Google review",
    text: "Amazing tasty vegan and gluten free pie and smoothie. Super nice personnel and a very cozy place.",
  },
  {
    name: "Erjon Peci",
    meta: "Local Guide",
    text: "The best place in Prishtina to eat brunch. Super healthy menu packed with flavour.",
  },
  {
    name: "Modest Syla",
    meta: "Local Guide",
    text: "Definitely a must for the health conscious. Great staff, fresh ingredients, and squeezed juices.",
  },
  {
    name: "linda cena",
    meta: "Local Guide",
    text: "Warm atmosphere, fast service, and amazing food for breakfast or lunch.",
  },
  {
    name: "Imelda GREGUS",
    meta: "Local Guide",
    text: "Definitely a MustStopPlace in Pristina. Delicious, crunchy, fresh, tasty.",
  },
  {
    name: "francis mauric",
    meta: "Local Guide",
    text: "When you want a break from burek and qebapa, this is a solid alternative.",
  },
  {
    name: "Katiuzca Chavez",
    meta: "Local Guide",
    text: "Beautiful place with many vegetarian options. Friendly staff.",
  },
  {
    name: "FJOLLA BESIMI",
    meta: "Local Guide",
    text: "My favorite healthy restaurant in Prishtina for sure. In love with their Berry Fantasy smoothie.",
  },
  {
    name: "Jane Doe",
    meta: "Google review",
    text: "You can't visit without stopping by. Everything is beautiful, and the food is delicious.",
  },
];

export function About() {
  const ref = useFadeIn<HTMLDivElement>();
  const [activeReview, setActiveReview] = useState(0);
  const review = GOOGLE_REVIEWS[activeReview];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % GOOGLE_REVIEWS.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="about" className="bg-cream pb-8 pt-16 md:pb-12 md:pt-28">
      <div ref={ref} className="container-cnc grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
        <div className="order-2 flex h-full flex-col lg:order-1">
          <div className="overflow-hidden rounded-[1.75rem] border border-blush-light bg-background/65 p-2 shadow-soft md:rounded-[2rem]">
            <img
              src={lifestyle}
              alt="Fresh meal lifestyle"
              loading="lazy"
              className="h-[280px] w-full rounded-[1.25rem] object-cover object-center sm:h-[340px] md:rounded-[1.5rem] lg:h-[400px]"
            />
          </div>
          <div className="mt-4 w-full rounded-2xl bg-background p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-0.5 text-primary" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" strokeWidth={1.8} />
                ))}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Google review
              </p>
            </div>

            <div key={review.name} className="mt-3 min-h-[116px]" aria-live="polite">
              <p className="font-display text-lg leading-snug text-near-black">“{review.text}”</p>
              <p className="mt-3 text-xs font-medium text-text-muted">
                {review.name} · {review.meta}
              </p>
            </div>

            <div className="mt-4 flex gap-1.5">
              {GOOGLE_REVIEWS.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveReview(index)}
                  className={`h-1.5 rounded-full transition ${
                    index === activeReview ? "w-6 bg-primary" : "w-1.5 bg-blush-mid"
                  }`}
                  aria-label={`Show review by ${item.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center px-3 sm:px-0 lg:order-2">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Why Crust N Crumb
          </p>
          <h2 className="mt-4 font-['Poppins',sans-serif] text-4xl font-bold leading-[1.05] text-primary sm:text-2xl md:whitespace-nowrap md:text-4xl">
            Effortlessly Healthy
          </h2>
          <p className="mt-5 max-w-lg font-['Inter',sans-serif] text-xl leading-relaxed text-text-muted">
            You want to eat healthy, but busy days make it hard. Crust N Crumb delivers fresh,
            balanced meals made with real ingredients ready to fuel, enjoy, and nourish your day in
            Pristina.
          </p>
          <p className="hidden max-w-lg font-['Inter',sans-serif] text-xl leading-relaxed text-text-muted md:block">
            Healthy food, softened by color, freshness, and the small pleasure of being cared for.
          </p>

          <a
            href="#menu"
            className="mt-6 inline-flex w-fit items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-dark"
          >
            Start Eating Better →
          </a>

          <div className="relative mt-8 max-w-xl overflow-hidden pb-2 pt-1">
            <div className="relative">
              <div className="h-px w-28 bg-primary/35" />

              <div className="mt-7 border-l-4 border-primary bg-blush-light/45 px-5 py-4 shadow-soft">
                <p className="font-display text-xl italic leading-relaxed text-primary-dark sm:text-2xl">
                  Made for mornings that move, lunches that linger, and days that deserve something
                  lighter.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Salads", "Sandwiches", "Smoothies", "Juices"].map((label) => (
                  <a
                    key={label}
                    href="#menu"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("menu-category-select", { detail: label }),
                      );
                    }}
                    className="rounded-full border border-primary/35 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition hover:border-primary hover:bg-blush-light"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
