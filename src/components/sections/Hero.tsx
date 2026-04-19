import heroImg from "@/assets/hero.jpg";
import glowImg from "@/assets/glow-bowl.jpg";
import { Logo } from "@/components/brand/Logo";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Fresh healthy salad bowls and juices"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/0 to-black/45" />

        <div className="container-cnc relative flex h-full flex-col justify-between py-10">
          {/* Top-left overlay */}
          <div className="max-w-md rounded-2xl bg-background/90 p-6 backdrop-blur-sm shadow-soft">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              🌸 Mindful Eating
            </span>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Healthy food, thoughtfully prepared and well-seasoned to nourish moments.
              Made to support your lifestyle, served fresh daily in Pristina.
            </p>
            <a
              href="#menu"
              className="mt-5 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
            >
              Order Now
            </a>
            <div className="mt-5 flex items-center gap-3 border-t border-blush-mid pt-4">
              <Logo size={48} variant="light" />
              <div>
                <p className="font-display text-lg leading-tight text-near-black">Crust N Crumb</p>
                <p className="text-[11px] uppercase tracking-widest text-text-muted">Healthy · Daily</p>
              </div>
            </div>
          </div>

          {/* Bottom-right floating card */}
          <div className="ml-auto w-72 rounded-2xl bg-background/95 p-4 shadow-soft backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img
                src={glowImg}
                alt="Glow Bowl"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-display text-lg leading-tight text-near-black">Glow Bowl</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="rounded-full bg-blush-light px-2 py-0.5 text-[10px] text-text-muted">420 kcal</span>
                  <span className="rounded-full bg-blush-light px-2 py-0.5 text-[10px] text-text-muted">22g Protein</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant overlapping word */}
      <div className="relative -mt-[8vw] overflow-hidden bg-background pb-6 pt-0">
        <div className="container-cnc">
          <h1 className="hero-word relative z-10">Nourishing</h1>
        </div>
      </div>
    </section>
  );
}
