import { Plus } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MENU, type MenuCategory } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-store";
import { useFadeIn } from "@/hooks/use-fade-in";

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>("Salads");
  const [showAll, setShowAll] = useState(false);
  const cart = useCart();
  const ref = useFadeIn<HTMLDivElement>();

  const items = MENU.filter((m) => m.category === active);
  const visible = showAll ? items : items.slice(0, 4);

  return (
    <section id="menu" className="bg-background py-16 md:py-24">
      <div ref={ref} className="container-cnc">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-blush-mid pb-4">
          {CATEGORIES.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => {
                  setActive(c);
                  setShowAll(false);
                }}
                className={`relative pb-3 text-sm transition ${
                  isActive ? "font-semibold text-near-black" : "text-text-muted hover:text-near-black"
                }`}
              >
                {c}
                <sup className="ml-1 text-[10px] text-text-muted">
                  {MENU.filter((m) => m.category === c).length || ""}
                </sup>
                {isActive && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
          <span className="ml-auto inline-flex items-center gap-2 text-sm text-text-muted">
            Filter <span className="text-base">≡</span>
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-blush-light p-10 text-center">
            <p className="font-display text-2xl text-near-black">Custom Meal Plans</p>
            <p className="mt-2 text-sm text-text-muted">
              Choose from our Vegan, High Protein, or Balanced plans below.
            </p>
            <a
              href="#plans"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
            >
              View Plans
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-blush-mid/60 bg-cream p-5 transition hover:shadow-soft"
              >
                {item.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-background px-3 py-1 text-[11px] font-medium text-primary shadow-soft">
                    {item.badge}
                  </span>
                )}
                <div className="mx-auto mt-2 aspect-square w-full max-w-[180px] overflow-hidden rounded-full bg-background">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-center font-display text-xl text-near-black">{item.name}</h3>
                <p className="mt-1 text-center text-xs text-text-muted">
                  {item.kcal} · {item.protein}
                </p>
                <div className="mt-4 flex items-center justify-between rounded-full bg-background px-4 py-2">
                  <span className="font-medium text-primary">{item.price.toFixed(2)}€</span>
                  <button
                    onClick={() => cart.add(item)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-dark"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {items.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-full border border-primary px-7 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              {showAll ? "Show Less" : "View All Menu"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
