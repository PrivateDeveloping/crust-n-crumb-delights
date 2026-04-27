import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { CONFIG } from "@/lib/config";
import { whatsappLink } from "@/lib/cart-store";

const COLUMNS = [
  { title: "Menu", links: ["Salads", "Sandwiches", "Smoothies", "Juices"] },
  { title: "Plans", links: ["Vegan", "High Protein", "Balanced", "Custom"] },
  { title: "Visit", links: [CONFIG.LOCATION, "Mon-Sat 9AM-6PM", "Sunday Closed"] },
  { title: "Contact", links: [CONFIG.PHONE_NUMBER, CONFIG.INSTAGRAM_HANDLE, CONFIG.WEBSITE_URL] },
];

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappLink(
    CONFIG.WHATSAPP_NUMBER,
    "Përshëndetje! Dua të porosis nga Crust N Crumb.",
  );
  return (
    <footer className="bg-near-black text-white/80">
      <div className="container-cnc py-14 md:py-16">
        <div className="flex flex-col items-center text-center">
          <Logo size={64} variant="dark" />
          <BrandWordmark size="text-4xl" className="mt-3 !text-primary" />
          <p className="mt-3 max-w-md text-sm text-white/60">
            Fresh, balanced, and lovingly made — meals that nourish your day in {CONFIG.CITY}.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#contact" className="transition hover:text-primary">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CONFIG.INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-primary hover:text-primary"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-primary hover:text-primary"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={CONFIG.LOCATION_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 max-w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:border-primary hover:text-primary"
          >
            <MapPin className="h-4 w-4" /> {CONFIG.LOCATION}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-cnc py-5 text-center text-xs text-white/45">
          <p className="mb-2">
            We save your cart and checkout details on this device to make future ordering faster.
          </p>
          © {year} {CONFIG.BRAND} — {CONFIG.CITY} · {CONFIG.WEBSITE_URL}
        </div>
      </div>
    </footer>
  );
}
