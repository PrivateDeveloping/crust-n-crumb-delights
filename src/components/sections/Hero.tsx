import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import glowImg from "@/assets/glow-bowl.jpg";
import { Navbar } from "@/components/layout/Navbar";

export function Hero() {
  return (
    <section id="top" className="relative bg-background">
      {/* Full-bleed image with overlaid navbar */}
      <div className="relative h-[92vh] min-h-[680px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Fresh healthy bowls and juices"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* subtle bottom darken so giant word reads */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-black/25" />

        {/* Overlay navbar */}
        <Navbar variant="overlay" />

        {/* Left content block */}
        <div className="container-cnc relative flex h-full flex-col justify-center pb-40 pt-24 md:pb-48">
          <div className="max-w-md text-white">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide">
              <Sparkles className="h-4 w-4" /> Mindful Eating
            </span>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Healthy food, thoughtfully prepared with real ingredients and balanced nutrition.
              Made to support your body, fit your lifestyle, and bring peace of mind.
            </p>
            <a
              href="#menu"
              className="mt-7 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-near-black shadow-soft transition hover:bg-white/90"
            >
              Order Now
            </a>
          </div>
        </div>

        {/* Floating product card bottom-right */}
        <div className="absolute bottom-44 right-4 z-10 w-[260px] overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-3 backdrop-blur-md md:right-10 md:bottom-52">
          <div className="overflow-hidden rounded-xl">
            <img src={glowImg} alt="Glow Bowl" className="h-44 w-full object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-between rounded-full bg-white px-4 py-2 text-near-black">
            <span className="text-sm font-medium">Glow Bowl</span>
            <a
              href="#menu"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-near-black text-white transition hover:bg-primary"
              aria-label="View Glow Bowl"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Giant overlapping word, anchored to bottom of image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="container-cnc">
            <h1
              className="font-display font-bold leading-[0.82] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(80px, 14vw, 200px)", transform: "translateY(22%)" }}
            >
              Nourishing
            </h1>
          </div>
        </div>
      </div>

      {/* Spacer so the descender of the giant word has room before the next section */}
      <div className="h-[6vw] min-h-[40px] bg-background" />
    </section>
  );
}
