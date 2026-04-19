import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
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
    ? "absolute top-0 left-0 right-0 z-40 w-full border-b border-white/15 bg-transparent text-white"
    : "sticky top-0 z-40 w-full border-b border-blush-mid bg-background/85 backdrop-blur-md text-foreground";

  return (
    <header className={headerClass}>
      {/* color tokens scoped to overlay */}
      {isOverlay ? <style>{`.cnc-nav-link{color:rgba(255,255,255,0.92)}.cnc-nav-link:hover{color:#fff}`}</style> : null}
      <div className="container-cnc flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Left links */}
        <nav className="hidden flex-1 items-center gap-7 text-sm text-foreground/80 md:flex">
          {LEFT_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Center brand */}
        <a href="#top" className="flex items-center gap-2">
          <Logo size={36} variant="light" />
          <BrandWordmark size="text-2xl md:text-3xl" />
        </a>

        {/* Right links + CTA */}
        <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
          <nav className="hidden items-center gap-6 text-sm text-foreground/80 md:flex">
            {RIGHT_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => cart.setOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush-light"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
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
        <div className="border-t border-blush-mid bg-background md:hidden">
          <nav className="container-cnc flex flex-col gap-1 py-4 text-sm">
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-blush-light"
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
