import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import proteinImg from "@/assets/protein-desire.png";
import veganImg from "@/assets/vegan-wish.png";
import glowImg from "@/assets/glow-bowl.jpg";
import { useFadeIn } from "@/hooks/use-fade-in";

const PILLS = ["Weight Loss", "High Protein", "Vegan Plan", "Balanced Meals"];

const REVIEWS = [
  {
    quote:
      "I never thought healthy eating could be this easy. The portions are perfect, the flavors are great, and I've lost 4kg in just six weeks without feeling hungry or deprived.",
    name: "Sarah M.",
    city: "Pristina",
  },
  {
    quote:
      "The Glow Bowl is my morning ritual now. Every meal feels handmade with care — and it actually keeps me full until evening.",
    name: "Arta K.",
    city: "Pristina",
  },
  {
    quote:
      "Best healthy food in Pristina. The pink palette of the menu, the freshness — it all just feels right. I order weekly.",
    name: "Endrit B.",
    city: "Pristina",
  },
];

export function Testimonials() {
  const [activePill, setActivePill] = useState(0);
  const [idx, setIdx] = useState(0);
  const ref = useFadeIn<HTMLDivElement>();
  const review = REVIEWS[idx];

  return (
    <section className="bg-background py-20 md:py-28">
      <div ref={ref} className="container-cnc grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="flex flex-wrap gap-2">
            {PILLS.map((p, i) => (
              <button
                key={p}
                onClick={() => setActivePill(i)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  i === activePill
                    ? "bg-primary text-primary-foreground"
                    : "border border-blush-mid bg-background text-text-muted hover:text-near-black"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-8 flex -space-x-2">
            {[veganImg, proteinImg, glowImg].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Reviewer"
                className="h-10 w-10 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>

          <blockquote className="mt-6 font-display text-2xl italic leading-relaxed text-near-black md:text-3xl">
            "{review.quote}"
          </blockquote>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-medium text-near-black">{review.name}</p>
              <p className="text-sm text-text-muted">{review.city}</p>
              <div className="mt-1 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blush-mid hover:border-primary hover:text-primary"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blush-mid hover:border-primary hover:text-primary"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-2xl bg-blush-light">
            <img src={proteinImg} alt="Before" className="h-72 w-full object-cover" />
            <p className="bg-background py-3 text-center text-xs font-medium uppercase tracking-widest text-text-muted">
              Before
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-blush-light">
            <img src={glowImg} alt="After" className="h-72 w-full object-cover" />
            <p className="bg-background py-3 text-center text-xs font-medium uppercase tracking-widest text-primary">
              After
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
