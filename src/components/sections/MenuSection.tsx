import { Check, Drumstick, Flame, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, MENU, type MenuCategory } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-store";
import { useFadeIn } from "@/hooks/use-fade-in";

const CATEGORY_HASHES: Record<MenuCategory, string> = {
  Salads: "menu-salads",
  Sandwiches: "menu-sandwiches",
  Smoothies: "menu-smoothies",
  Juices: "menu-juices",
  "Meal Plans": "menu-meal-plans",
};

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>("Salads");
  const [showAll, setShowAll] = useState(false);
  const [contentSlideDirection, setContentSlideDirection] = useState<"left" | "right">("right");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const categoryRefs = useRef<Record<MenuCategory, HTMLButtonElement | null>>({
    Salads: null,
    Sandwiches: null,
    Smoothies: null,
    Juices: null,
    "Meal Plans": null,
  });
  const addFeedbackTimeoutRef = useRef<number | null>(null);
  const collapseAnimationTimeoutRef = useRef<number | null>(null);
  const categoryNavRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const cart = useCart();
  const ref = useFadeIn<HTMLDivElement>();

  const items = MENU.filter((m) => m.category === active);
  const visible = showAll ? items : items.slice(0, 4);
  const contentSlideClass =
    contentSlideDirection === "right"
      ? "menu-content-slide-from-right"
      : "menu-content-slide-from-left";

  const selectCategory = (category: MenuCategory) => {
    const currentIndex = CATEGORIES.indexOf(active);
    const nextIndex = CATEGORIES.indexOf(category);

    if (nextIndex !== currentIndex) {
      setContentSlideDirection(nextIndex > currentIndex ? "right" : "left");
      setActive(category);
    }

    setShowAll(false);
  };

  useEffect(() => {
    const activateCategory = (category: MenuCategory) => {
      setActive((current) => {
        const currentIndex = CATEGORIES.indexOf(current);
        const nextIndex = CATEGORIES.indexOf(category);

        if (nextIndex !== currentIndex) {
          setContentSlideDirection(nextIndex > currentIndex ? "right" : "left");
        }

        return category;
      });
      setShowAll(false);
    };

    const syncCategoryFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      const category = CATEGORIES.find((item) => CATEGORY_HASHES[item] === hash);

      if (!category) return;

      activateCategory(category);
    };

    const syncCategoryFromEvent = (event: Event) => {
      const category = CATEGORIES.find((item) => item === (event as CustomEvent<string>).detail);

      if (!category) return;

      activateCategory(category);
    };

    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);
    window.addEventListener("menu-category-select", syncCategoryFromEvent);

    return () => {
      window.removeEventListener("hashchange", syncCategoryFromHash);
      window.removeEventListener("menu-category-select", syncCategoryFromEvent);
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = categoryRefs.current[active];
      if (!activeButton) return;

      setIndicator({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        ready: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  useEffect(() => {
    const categoryNav = categoryNavRef.current;
    const activeButton = categoryRefs.current[active];

    if (!categoryNav || !activeButton || !window.matchMedia("(max-width: 639px)").matches) {
      return;
    }

    const activeIndex = CATEGORIES.indexOf(active);
    const groupStartIndex = Math.min(Math.max(activeIndex - 1, 0), CATEGORIES.length - 3);
    const groupStartButton = categoryRefs.current[CATEGORIES[groupStartIndex]];

    categoryNav.scrollTo({
      left: groupStartButton?.offsetLeft ?? 0,
      behavior: "smooth",
    });
  }, [active]);

  useEffect(
    () => () => {
      if (addFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(addFeedbackTimeoutRef.current);
      }
      if (collapseAnimationTimeoutRef.current !== null) {
        window.clearTimeout(collapseAnimationTimeoutRef.current);
      }
    },
    [],
  );

  const handleAddToCart = (item: (typeof MENU)[number]) => {
    cart.add(item);
    setJustAddedId(item.id);

    if (addFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(addFeedbackTimeoutRef.current);
    }

    addFeedbackTimeoutRef.current = window.setTimeout(() => {
      setJustAddedId((current) => (current === item.id ? null : current));
    }, 900);
  };

  const handleToggleShowAll = () => {
    if (showAll) {
      const currentHeight = contentWrapperRef.current?.getBoundingClientRect().height ?? null;

      if (currentHeight !== null) {
        setContentHeight(currentHeight);
      }

      setShowAll(false);

      window.requestAnimationFrame(() => {
        const nextHeight = contentWrapperRef.current?.scrollHeight ?? null;

        if (nextHeight !== null) {
          setContentHeight(nextHeight);
        }

        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      if (collapseAnimationTimeoutRef.current !== null) {
        window.clearTimeout(collapseAnimationTimeoutRef.current);
      }

      collapseAnimationTimeoutRef.current = window.setTimeout(() => {
        setContentHeight(null);
      }, 320);

      return;
    }

    setShowAll(true);
  };

  return (
    <section id="menu" className="bg-background py-14 md:py-24">
      <div ref={ref} className="container-cnc scroll-mt-2">
        <div
          ref={categoryNavRef}
          className="relative mb-8 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto border-b border-blush-mid pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:gap-6 sm:[scrollbar-width:auto] [&::-webkit-scrollbar]:hidden sm:[&::-webkit-scrollbar]:block"
        >
          {CATEGORIES.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                id={CATEGORY_HASHES[c]}
                ref={(node) => {
                  categoryRefs.current[c] = node;
                }}
                onClick={() => selectCategory(c)}
                className={`relative shrink-0 basis-[calc((100%_-_1.5rem)/3)] snap-start pb-3 text-center text-sm transition sm:basis-auto sm:text-left ${
                  isActive
                    ? "font-semibold text-near-black"
                    : "text-text-muted hover:text-near-black"
                }`}
              >
                {c}
                <sup className="ml-1 text-[10px] text-text-muted">
                  {MENU.filter((m) => m.category === c).length || ""}
                </sup>
              </button>
            );
          })}
          <span
            aria-hidden="true"
            className={`absolute bottom-4 h-0.5 rounded-full bg-primary transition-[transform,width,opacity] duration-300 ease-out ${
              indicator.ready ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
            }}
          />
          <span className="ml-auto hidden shrink-0 items-center gap-2 text-sm text-text-muted sm:inline-flex">
            Filter <span className="text-base">≡</span>
          </span>
        </div>

        <div
          ref={contentWrapperRef}
          className={`overflow-hidden ${
            contentHeight !== null
              ? "transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              : ""
          }`}
          style={contentHeight !== null ? { height: `${contentHeight}px` } : undefined}
        >
          <div key={active} className={contentSlideClass}>
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {visible.map((item) => {
                  const isJustAdded = justAddedId === item.id;

                  return (
                    <article
                      key={item.id}
                      className="group relative flex min-w-0 flex-col rounded-2xl border border-blush-mid/60 bg-cream p-3 transition hover:shadow-soft sm:p-5"
                    >
                      {item.badge && (
                        <span className="absolute left-2 top-2 z-10 rounded-full bg-background px-2 py-0.5 text-[9px] font-medium text-primary shadow-soft sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px]">
                          {item.badge}
                        </span>
                      )}
                      <div className="mx-auto mt-2 aspect-square w-full max-w-[110px] overflow-hidden rounded-full bg-background sm:max-w-[150px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 text-center font-display text-base leading-tight text-near-black sm:text-xl">
                        {item.name}
                      </h3>
                      {item.ingredients?.length ? (
                        <p className="line-clamp-2 mt-2 text-center text-[11px] leading-4 text-text-muted sm:text-[12px] sm:leading-5">
                          {item.ingredients.join(", ")}
                        </p>
                      ) : null}
                      {item.tags?.length ? (
                        <div className="mt-3 flex flex-wrap justify-center gap-1 sm:gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-blush-mid bg-background/70 px-1.5 py-0.5 text-[9px] text-primary-dark sm:px-2 sm:text-[10px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-4 flex items-center justify-between rounded-full bg-background px-3 py-1.5 sm:px-4 sm:py-2">
                        <span className="text-sm font-medium text-primary sm:text-base">
                          {item.price.toFixed(2)}€
                        </span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground transition-all duration-300 sm:h-8 sm:w-8 ${
                            isJustAdded
                              ? "scale-110 bg-primary-dark shadow-[0_10px_25px_rgba(200,122,148,0.3)]"
                              : "bg-primary hover:bg-primary-dark"
                          }`}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <span
                            className={`transition-transform duration-300 ${
                              isJustAdded ? "cart-plus-to-check" : ""
                            }`}
                          >
                            {isJustAdded ? (
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {items.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleToggleShowAll}
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
