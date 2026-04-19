import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { CONFIG } from "@/lib/config";
import { whatsappLink } from "@/lib/cart-store";

const COLUMNS = [
  { title: "Menu", links: ["Salads", "Sandwiches", "Smoothies", "Juices"] },
  { title: "Plans", links: ["Vegan", "High Protein", "Balanced", "Custom"] },
  { title: "Blog", links: ["Recipes", "Nutrition", "Stories", "Press"] },
  { title: "Contact", links: [CONFIG.LOCATION, "Pristina, Kosovo"] },
];

const TRUST = [
  "🌿 Freshly Prepared Daily",
  "🚫 No Added Sugar",
  "✅ 100% Natural Ingredients",
  "💪 High in Protein",
  "⚖️ Nutritionally Balanced",
];

export function Footer() {
  const wa = whatsappLink(CONFIG.WHATSAPP_NUMBER, "Përshëndetje! Dua të porosis nga Crust N Crumb.");
  return (
    <footer className="bg-near-black text-white/80">
      <div className="container-cnc py-16">
        <div className="flex flex-col items-center text-center">
          <Logo size={64} variant="dark" />
          <BrandWordmark size="text-4xl" className="mt-3 !text-primary" />
          <p className="mt-3 max-w-md text-sm text-white/60">
            Fresh, balanced, and lovingly made — meals that nourish your day in {CONFIG.CITY}.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-primary transition">
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
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm hover:border-primary hover:text-primary"
          >
            <MapPin className="h-4 w-4" /> {CONFIG.LOCATION}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-cnc flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-xs text-white/55">
          {TRUST.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              <span>{t}</span>
              {i < TRUST.length - 1 && <span className="text-white/20">·</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-cnc py-5 text-center text-xs text-white/45">
          © 2025 {CONFIG.BRAND} — {CONFIG.CITY} · {CONFIG.WEBSITE_URL}
        </div>
      </div>
    </footer>
  );
}
