import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/lib/cart-store";

const LEFT_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Plans", href: "#plans" },
  { label: "About Us", href: "#about" },
];
const RIGHT_LINKS = [
  { label: "Blog", href: "#" },
  { label: "FAQ", href: "#" },
];

export function Navbar({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOverlay = variant === "overlay";
  const headerClass = isOverlay
    ? "absolute top-0 left-0 right-0 z-30 w-full border-b border-white/15 bg-transparent"
    : "sticky top-0 z-40 w-full border-b border-blush-mid bg-background/85 backdrop-blur-md";

  const linkBase = "transition-colors text-sm";
  const linkColor = isOverlay ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary";

  return (
    <header className={headerClass}>
      <div className="container-cnc flex h-16 items-center justify-between gap-4 md:h-20">
        <nav className="hidden flex-1 items-center gap-7 md:flex">
          {LEFT_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={`${linkBase} ${linkColor}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="flex items-center gap-2">
          <Logo size={32} variant={isOverlay ? "dark" : "light"} />
          <span
            className={`font-script text-2xl md:text-3xl leading-none ${
              isOverlay ? "text-white" : "text-primary"
            }`}
          >
            Crust N Crumb
          </span>
        </a>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
          <nav className="hidden items-center gap-6 md:flex">
            {RIGHT_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`${linkBase} ${linkColor}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => cart.setOpen(true)}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full ${
              isOverlay ? "hover:bg-white/15" : "hover:bg-blush-light"
            }`}
            aria-label="Open cart"
          >
            <ShoppingBag className={`h-5 w-5 ${isOverlay ? "text-white" : "text-foreground"}`} />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {cart.count}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition md:inline-block ${
              isOverlay
                ? "bg-white text-near-black hover:bg-white/90"
                : "bg-primary text-primary-foreground hover:bg-primary-dark"
            }`}
          >
            Order Now
          </a>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              isOverlay ? "text-white hover:bg-white/15" : "hover:bg-blush-light"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-blush-mid bg-background md:hidden">
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
