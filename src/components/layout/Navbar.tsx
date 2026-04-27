import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/lib/cart-store";

const LEFT_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Plans", href: "#plans" },
  { label: "About Us", href: "#about" },
];
const RIGHT_LINKS = [{ label: "Find Us", href: "#contact" }];

export function Navbar({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cartFeedbackTick, setCartFeedbackTick] = useState(0);
  const previousCountRef = useRef(cart.count);

  const isOverlay = variant === "overlay";
  const shouldUseSolidBackground = !isOverlay || hasScrolled || mobileOpen;
  const headerClass = isOverlay
    ? `fixed left-0 right-0 top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
        shouldUseSolidBackground
          ? "border-blush-mid bg-background/92 shadow-soft"
          : "border-white/20 bg-background/55"
      }`
    : "sticky top-0 z-40 w-full border-b border-blush-mid bg-background/85 backdrop-blur-md";

  const linkBase = "transition-colors text-sm";
  const linkColor = "text-foreground/80 hover:text-primary";

  useEffect(() => {
    if (!isOverlay) return;

    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 12);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [isOverlay]);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeMobileMenuOnScroll = () => {
      setMobileOpen(false);
    };

    window.addEventListener("scroll", closeMobileMenuOnScroll, { passive: true });

    return () => window.removeEventListener("scroll", closeMobileMenuOnScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (cart.count > previousCountRef.current) {
      setCartFeedbackTick((tick) => tick + 1);
    }

    previousCountRef.current = cart.count;
  }, [cart.count]);

  return (
    <header className={headerClass}>
      <div className="container-cnc flex h-16 items-center justify-between gap-3 md:h-20 md:gap-4">
        <nav className="hidden flex-1 items-center gap-7 md:flex">
          {LEFT_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={`${linkBase} ${linkColor}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="flex items-center gap-2">
          <Logo size={32} variant="light" />
          <span className="whitespace-nowrap font-script text-xl font-semibold leading-none text-primary sm:text-2xl md:text-3xl">
            Crust N Crumb
          </span>
        </a>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 md:gap-5">
          <nav className="hidden items-center gap-6 md:flex">
            {RIGHT_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`${linkBase} ${linkColor}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => cart.setOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush-light"
            aria-label="Open cart"
          >
            <span
              key={`cart-icon-${cartFeedbackTick}`}
              className={cartFeedbackTick > 0 ? "cart-bag-bump inline-flex" : "inline-flex"}
            >
              <ShoppingBag className="h-5 w-5 text-foreground" />
            </span>
            {cart.count > 0 && (
              <span
                key={`cart-badge-${cartFeedbackTick}-${cart.count}`}
                className={`absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground ${
                  cartFeedbackTick > 0 ? "cart-badge-pop" : ""
                }`}
              >
                {cart.count}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-dark md:inline-block"
          >
            Order Now
          </a>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush-light md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-blush-mid bg-background shadow-soft md:hidden">
          <nav className="container-cnc flex flex-col gap-1 py-4 text-sm">
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-foreground hover:bg-blush-light"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center font-medium text-primary-foreground"
            >
              Order Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
