import { Clock, Instagram, MessageCircle, Navigation, Phone } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";
import { whatsappLink } from "@/lib/cart-store";
import { CONFIG } from "@/lib/config";

const HOURS = [
  { day: "Monday - Saturday", time: "9:00 AM - 6:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export function FindUs() {
  const ref = useFadeIn<HTMLDivElement>();
  const wa = whatsappLink(CONFIG.WHATSAPP_NUMBER, "Përshëndetje! Dua të kontaktoj Crust N Crumb.");

  return (
    <section id="contact" className="bg-background py-16 md:py-28">
      <div ref={ref} className="container-cnc">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Find Us</p>
            <h2 className="mt-4 font-['Poppins',sans-serif] text-3xl font-bold leading-[1.08] text-primary sm:text-4xl md:text-5xl">
              Stop by for
              <br /> something fresh
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted/95">
              Visit Crust N Crumb on Andrea Gropa in Pristina, order ahead on WhatsApp, or follow
              the latest plates and daily updates on Instagram.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 border-y border-blush-light py-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="h-5 w-5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">Hours</p>
                </div>
                <div className="mt-4 space-y-2">
                  {HOURS.map((item) => (
                    <div key={item.day} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-text-muted">{item.day}</span>
                      <span className="text-sm font-semibold text-near-black">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 text-primary">
                  <Phone className="h-5 w-5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">Contacts</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`tel:${CONFIG.WHATSAPP_NUMBER}`}
                    className="inline-flex items-center gap-2 rounded-full border border-blush-mid px-4 py-2 text-sm font-semibold text-near-black transition hover:border-primary hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={CONFIG.INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blush-mid px-4 py-2 text-sm font-semibold text-near-black transition hover:border-primary hover:text-primary"
                  >
                    <Instagram className="h-4 w-4" />
                    {CONFIG.INSTAGRAM_HANDLE}
                  </a>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blush-mid px-4 py-2 text-sm font-semibold text-near-black transition hover:border-primary hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Map column ── */}
          <div className="min-w-0">
            <div
              className="map-wrapper relative overflow-hidden rounded-lg border border-blush-light bg-cream shadow-soft"
              style={{ height: "320px" }}
            >
              {/*
                Negative marginTop crops the info card at the top (~90px).
                The iframe is made taller by the same amount so the visible
                map area stays the same size. The container's overflow:hidden
                also clips the bottom-right controls strip.
              */}
              <iframe
                title="Crust N Crumb location on Google Maps"
                src={CONFIG.MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  height: "calc(100% + 230px)",
                  marginTop: "-160px",
                  border: 0,
                  display: "block",
                  transform: "translateY(60px)",
                }}
              />

              <a
                href={CONFIG.LOCATION_URL}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-background px-5 py-2.5 text-sm font-semibold text-primary shadow-[0_14px_30px_rgba(28,20,24,0.12)] transition hover:border-primary/35 hover:bg-blush-light active:bg-primary active:text-primary-foreground"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>

            <style>{`
              @media (min-width: 640px) {
                .map-wrapper { height: 380px !important; }
              }
              @media (min-width: 1024px) {
                .map-wrapper { height: 470px !important; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
