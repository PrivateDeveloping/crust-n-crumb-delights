import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import chickenSunshineImg from "@/assets/chicken-sunshine.webp";
import falafelKickImg from "@/assets/falafel-kick.webp";
import proteinDesireImg from "@/assets/protein-desire.webp";
import veganWishImg from "@/assets/vegan-wish.webp";
import heroBackgroundImg from "@/assets/hero100.webp";
import { Navbar } from "@/components/layout/Navbar";

const FEATURED_PRODUCTS = [
  {
    name: "Chicken Sunshine",
    tag: "Bright, balanced, protein-rich",
    price: "4.50€",
    image: chickenSunshineImg,
  },
  {
    name: "Falafel Kick",
    tag: "Crisp, plant-powered energy",
    price: "3.80€",
    image: falafelKickImg,
  },
  {
    name: "Protein Desire",
    tag: "Built for steady fuel",
    price: "6.20€",
    image: proteinDesireImg,
  },
  {
    name: "Vegan Wish",
    tag: "Fresh greens, full flavor",
    price: "5.20€",
    image: veganWishImg,
  },
];

// Background toggle:
// - Current state: keep this undefined and the hero uses bg-cream.
// - Image state: uncomment the import above and the image line below, then comment this line out.
// const HERO_BACKGROUND_STYLE = undefined;
const HERO_BACKGROUND_STYLE = { backgroundImage: `url(${heroBackgroundImg})` };

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let isSettled = false;
    const finish = () => {
      if (isSettled) return;
      isSettled = true;
      resolve();
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
      return;
    }

    const decode = image.decode?.();
    if (decode) {
      void decode.then(finish, finish);
    }
  });
}

export function Hero() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [slidesReady, setSlidesReady] = useState(false);
  const product = FEATURED_PRODUCTS[activeProduct];

  useEffect(() => {
    let isMounted = true;

    Promise.all(FEATURED_PRODUCTS.map((item) => preloadImage(item.image))).then(() => {
      if (isMounted) {
        setSlidesReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!slidesReady) return;

    const timer = window.setInterval(() => {
      setActiveProduct((current) => (current + 1) % FEATURED_PRODUCTS.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [slidesReady]);

  const goToPrevious = () => {
    setActiveProduct(
      (current) => (current - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length,
    );
  };

  const goToNext = () => {
    setActiveProduct((current) => (current + 1) % FEATURED_PRODUCTS.length);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      {HERO_BACKGROUND_STYLE && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-16 bg-cover bg-center bg-no-repeat md:top-20"
          style={HERO_BACKGROUND_STYLE}
        />
      )}
      <Navbar variant="overlay" />

      <div className="container-cnc relative z-10 grid min-h-svh grid-cols-1 items-start gap-5 pb-8 pt-20 md:min-h-[760px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14 md:pb-20 md:pt-24">
        <div className="min-w-0 max-w-none md:max-w-xl md:translate-x-10">
          <h1 className="mt-5 max-w-full text-wrap font-['Poppins',sans-serif] text-[2.55rem] font-bold leading-[1.04] text-primary drop-shadow-[0_2px_14px_rgba(255,255,255,0.8)] sm:text-5xl md:mt-6 md:text-6xl lg:text-7xl">
            Nourishing your day the tasty way.
          </h1>
          <p className="mt-4 max-w-full font-['Inter',sans-serif] text-[1.15rem] font-medium leading-7 text-text-muted/90 drop-shadow-[0_1px_10px_rgba(255,255,255,0.85)] sm:max-w-lg sm:text-lg md:mt-5">
            Balanced salads, sandwiches, smoothies, and juices built with real ingredients and
            everyday freshness.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8">
            <a
              href="#menu"
              className="inline-flex min-w-0 items-center justify-center rounded-full bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-dark sm:px-6"
            >
              Order Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex min-w-0 items-center justify-center rounded-full border border-blush-mid bg-background px-3 py-3 text-sm font-semibold text-near-black transition hover:border-primary hover:text-primary sm:px-6"
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 py-2 sm:max-w-none sm:py-0">
          <div className="relative h-[190px] overflow-hidden rounded-[2rem] border border-blush-mid bg-background/90 shadow-soft backdrop-blur-sm md:h-auto md:origin-center md:scale-80">
            <div className="absolute -right-10 -top-10 hidden h-48 w-48 rounded-full bg-blush-light md:block" />
            <div className="relative grid h-full grid-cols-[108px_1fr] items-center gap-x-4 p-5 pb-14 md:grid-cols-1 md:grid-rows-[1fr_auto] md:p-8">
              <div className="relative flex h-[108px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream md:h-[390px] md:w-full md:overflow-visible md:rounded-none md:bg-transparent">
                {FEATURED_PRODUCTS.map((item, index) => (
                  <img
                    key={item.name}
                    src={item.image}
                    alt={index === activeProduct ? item.name : ""}
                    aria-hidden={index !== activeProduct}
                    loading="eager"
                    decoding="async"
                    className={`absolute inset-0 m-auto h-full w-full select-none object-contain transition-opacity duration-500 ease-out md:max-w-[460px] ${
                      index === activeProduct ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              <div className="min-w-0 self-center md:rounded-3xl md:bg-cream md:p-5">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                      Featured
                    </p>
                    <h2 className="mt-2 line-clamp-1 font-display text-xl font-bold leading-tight text-near-black sm:text-2xl md:text-4xl">
                      {product.name}
                    </h2>
                    <p className="mt-1 line-clamp-1 text-xs font-medium text-text-muted sm:text-sm">
                      {product.tag}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold text-primary md:hidden">
                      {product.price}
                    </p>
                  </div>
                  <p className="hidden shrink-0 font-display text-3xl text-primary md:block">
                    {product.price}
                  </p>
                </div>

                <div className="mt-5 hidden items-center justify-between gap-3 md:flex">
                  <div className="flex gap-2">
                    {FEATURED_PRODUCTS.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveProduct(index)}
                        className={`h-2.5 rounded-full transition ${
                          index === activeProduct ? "w-8 bg-primary" : "w-2.5 bg-blush-mid"
                        }`}
                        aria-label={`Show ${item.name}`}
                      />
                    ))}
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={goToPrevious}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-transparent text-primary transition hover:border-primary active:bg-primary active:text-primary-foreground"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-transparent text-primary transition hover:border-primary active:bg-primary active:text-primary-foreground"
                      aria-label="Next product"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 flex gap-2 md:hidden">
                {FEATURED_PRODUCTS.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveProduct(index)}
                    className={`h-2 rounded-full transition ${
                      index === activeProduct ? "w-7 bg-primary" : "w-2 bg-blush-mid"
                    }`}
                    aria-label={`Show ${item.name}`}
                  />
                ))}
              </div>

              <div className="absolute bottom-5 right-5 flex justify-end gap-2 md:hidden">
                <button
                  onClick={goToPrevious}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 bg-transparent text-primary transition hover:border-primary active:bg-primary active:text-primary-foreground"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 bg-transparent text-primary transition hover:border-primary active:bg-primary active:text-primary-foreground"
                  aria-label="Next product"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
