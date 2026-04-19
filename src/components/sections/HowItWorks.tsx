import { useState } from "react";
import chefImg from "@/assets/chef-hands.jpg";
import { useFadeIn } from "@/hooks/use-fade-in";

const STEPS = [
  { id: "01", title: "Browse the Menu", desc: "Explore our daily fresh lineup of salads, sandwiches, smoothies and juices." },
  { id: "02", title: "Pick Your Items", desc: "Add favourites to your cart — mix and match to fit your day." },
  { id: "03", title: "Cooked Fresh Daily", desc: "Our team prepares every meal using high-quality ingredients and balanced recipes. No preservatives, no shortcuts — just wholesome food made with care." },
  { id: "04", title: "Pick Up or WhatsApp Order", desc: "Send your order via WhatsApp or stop by our spot in Pristina." },
];

export function HowItWorks() {
  const [active, setActive] = useState("03");
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-blush-light py-20 md:py-28">
      <div ref={ref} className="container-cnc grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How to Order</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-near-black md:text-6xl">
            How Crust N Crumb
            <br /> Delivers Freshness
          </h2>
          <div className="relative mt-10 overflow-hidden rounded-3xl">
            <img src={chefImg} alt="Chef preparing fresh ingredients" loading="lazy" className="h-80 w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <ul className="divide-y divide-blush-mid">
            {STEPS.map((step) => {
              const isActive = step.id === active;
              return (
                <li key={step.id}>
                  <button
                    onClick={() => setActive(step.id)}
                    className="grid w-full grid-cols-[auto_1fr] items-start gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display leading-none transition-all ${
                        isActive ? "text-5xl text-primary md:text-6xl" : "text-3xl text-text-muted"
                      }`}
                    >
                      ({step.id})
                    </span>
                    <div>
                      <p
                        className={`font-display transition ${
                          isActive ? "text-3xl text-near-black" : "text-xl text-text-muted"
                        }`}
                      >
                        {step.title}
                      </p>
                      {isActive && (
                        <p className="mt-3 max-w-md text-sm text-text-muted">{step.desc}</p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
