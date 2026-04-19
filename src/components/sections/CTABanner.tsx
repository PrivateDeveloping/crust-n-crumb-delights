import ctaBg from "@/assets/cta-bg.jpg";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <img src={ctaBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-near-black/65 backdrop-blur-[2px]" />
      <div className="container-cnc relative py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-tight text-white md:text-6xl">
          Start Your Nourishing
          <br /> Journey Today!
        </h2>
        <a
          href="#plans"
          className="mt-8 inline-flex rounded-full border border-white/80 px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-near-black"
        >
          Choose Your Plan
        </a>
      </div>
    </section>
  );
}
