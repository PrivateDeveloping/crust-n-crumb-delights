import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import veganPlan from "@/assets/plan-vegan.jpg";
import proteinPlan from "@/assets/plan-protein.jpg";
import balancedPlan from "@/assets/plan-balanced.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFadeIn } from "@/hooks/use-fade-in";
import {
  buildPlanWhatsAppMessage,
  clearSavedOrderDetails,
  EMPTY_ORDER_DETAILS,
  getSavedOrderDetails,
  sanitizePhoneInput,
  type OrderDetails,
  saveOrderDetails,
  whatsappLink,
} from "@/lib/cart-store";
import { CONFIG } from "@/lib/config";

const PLANS = [
  {
    name: "Vegan Plan",
    desc: "100% plant-powered meals built on whole grains and seasonal vegetables.",
    image: veganPlan,
    accent: "bg-emerald-100 text-emerald-900",
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-900",
    dot: "bg-emerald-500",
    tags: ["Vegan", "5 days", "~1800 kcal/day"],
    price: 42,
    mealsPerWeek: 15,
    sample: ["Vegan Wish", "Glow Bowl", "Falafel Kick"],
    dailyMeals: [
      {
        day: "Monday",
        lunch: "Vegan Wish",
        snack: "Green Goodness",
        dinner: "Falafel Kick with seasonal greens",
      },
      {
        day: "Tuesday",
        lunch: "Glow Bowl",
        snack: "Kiwi Galore",
        dinner: "Vegan Garden with grains",
      },
      {
        day: "Wednesday",
        lunch: "Falafel Kick",
        snack: "Earth Juice",
        dinner: "Rice Capitan, plant style",
      },
      {
        day: "Thursday",
        lunch: "Vegan Garden",
        snack: "Berries Fantasy",
        dinner: "Glow Bowl with extra vegetables",
      },
      {
        day: "Friday",
        lunch: "Vegan Wish",
        snack: "Green Habit",
        dinner: "Falafel plate with hummus",
      },
    ],
  },
  {
    name: "High Protein Plan",
    desc: "Lean protein from chicken, eggs and salmon to fuel training days.",
    image: proteinPlan,
    accent: "bg-sky-100 text-sky-950",
    accentBg: "bg-sky-100",
    accentText: "text-sky-950",
    dot: "bg-sky-500",
    tags: ["High protein", "5 days", "~2100 kcal/day"],
    price: 48,
    mealsPerWeek: 15,
    sample: ["Protein Desire", "Superior Salmon", "Chicken Energy"],
    dailyMeals: [
      {
        day: "Monday",
        lunch: "Protein Desire",
        snack: "Peanut Power",
        dinner: "Chicken Sunshine plate",
      },
      {
        day: "Tuesday",
        lunch: "Superior Salmon",
        snack: "Almond Boost",
        dinner: "Spicy Chicken Origine",
      },
      {
        day: "Wednesday",
        lunch: "Chicken Energy",
        snack: "PB & J",
        dinner: "Tuna Bliss bowl",
      },
      {
        day: "Thursday",
        lunch: "Smoked Salmon",
        snack: "Peanut Power",
        dinner: "Protein Desire with greens",
      },
      {
        day: "Friday",
        lunch: "Spicy Chicken",
        snack: "Pink Lady",
        dinner: "Superior Salmon salad",
      },
    ],
  },
  {
    name: "Balanced Meals Plan",
    desc: "Macros that just work — for everyday energy and steady focus.",
    image: balancedPlan,
    accent: "bg-amber-100 text-amber-950",
    accentBg: "bg-amber-100",
    accentText: "text-amber-950",
    dot: "bg-amber-500",
    tags: ["Balanced", "5 days", "~1900 kcal/day"],
    price: 45,
    mealsPerWeek: 15,
    sample: ["Glow Bowl", "Tuna Bliss", "Rice Capitan"],
    dailyMeals: [
      {
        day: "Monday",
        lunch: "Glow Bowl",
        snack: "Kiwi Galore",
        dinner: "Chicken Sunshine",
      },
      {
        day: "Tuesday",
        lunch: "Tuna Bliss",
        snack: "Green Goodness",
        dinner: "Tasteful Avoegg",
      },
      {
        day: "Wednesday",
        lunch: "Rice Capitan",
        snack: "Pink Lady",
        dinner: "Superior Salmon",
      },
      {
        day: "Thursday",
        lunch: "Vegan Wish",
        snack: "Almond Boost",
        dinner: "Chicken Energy",
      },
      {
        day: "Friday",
        lunch: "Superior Salmon",
        snack: "Heart Juice",
        dinner: "Glow Bowl with grains",
      },
    ],
  },
];

type MealPlan = (typeof PLANS)[number];

const getKcalPerDay = (plan: MealPlan) => {
  const kcalTag = plan.tags.find((tag) => tag.toLowerCase().includes("kcal"));
  return kcalTag?.match(/\d+/)?.[0] ?? "";
};

function MealPlanDialog({ plan }: { plan: MealPlan }) {
  const [open, setOpen] = useState(false);
  const [orderingOpen, setOrderingOpen] = useState(false);
  const [details, setDetails] = useState<OrderDetails>(EMPTY_ORDER_DETAILS);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const orderScrollRef = useRef<HTMLDivElement>(null);
  const fulfillmentRef = useRef<HTMLDivElement>(null);
  const panelBaseId = useId();
  const detailsTabId = `${panelBaseId}-details-tab`;
  const detailsPanelId = `${panelBaseId}-details-panel`;
  const orderTabId = `${panelBaseId}-order-tab`;
  const orderPanelId = `${panelBaseId}-order-panel`;
  const tabBaseClass =
    "inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-[0.85rem] px-2.5 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.11em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:flex-none sm:rounded-[1.05rem] sm:px-7 sm:py-3 sm:text-[11px] sm:tracking-[0.16em]";

  useEffect(() => {
    if (!open) {
      setOrderingOpen(false);
      setErrors({});
      return;
    }

    setDetails(getSavedOrderDetails());
  }, [open]);

  const setDetail = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const scrollFulfillmentToTop = () => {
    if (!window.matchMedia("(max-width: 639px)").matches) {
      return;
    }

    requestAnimationFrame(() => {
      const scrollContainer = orderScrollRef.current;
      const target = fulfillmentRef.current;

      if (!scrollContainer || !target) {
        return;
      }

      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + targetRect.top - containerRect.top - 12,
        behavior: "smooth",
      });
    });
  };

  const handleFulfillmentChange = (fulfillment: OrderDetails["fulfillment"]) => {
    setDetail("fulfillment", fulfillment);
    scrollFulfillmentToTop();
  };

  const handleClearSavedDetails = () => {
    setDetails(EMPTY_ORDER_DETAILS);
    setErrors({});
    clearSavedOrderDetails();
  };

  const handleSubmitPlanOrder = () => {
    const nextErrors: { name?: string; phone?: string; address?: string } = {};

    if (!details.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!details.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (details.fulfillment === "delivery" && !details.address?.trim()) {
      nextErrors.address = "Address is required for delivery.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const cleanedDetails: OrderDetails = {
      ...details,
      name: details.name.trim(),
      phone: details.phone.trim(),
      address: details.address?.trim(),
      note: details.note?.trim(),
    };
    const url = whatsappLink(
      CONFIG.WHATSAPP_NUMBER,
      buildPlanWhatsAppMessage(
        {
          name: plan.name,
          price: plan.price,
        },
        cleanedDetails,
      ),
    );

    saveOrderDetails(cleanedDetails);
    window.open(url, "_blank", "noopener,noreferrer");
    setOrderingOpen(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-background shadow-soft ring-1 ring-blush-mid/50 transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(158,85,112,0.18)]">
        <img src={plan.image} alt={plan.name} loading="lazy" className="h-44 w-full object-cover" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <h3 className="font-display text-[1.75rem] leading-tight text-near-black">
              {plan.name}
            </h3>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${plan.accentBg} ${plan.accentText}`}
            >
              {plan.tags[0]}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-text-muted">{plan.desc}</p>

          <div className="mt-5 grid grid-cols-3 rounded-2xl border border-blush-mid/70 bg-cream p-3">
            {[
              { label: "Meals", value: plan.mealsPerWeek },
              { label: "Days", value: "5" },
              { label: "Kcal/day", value: getKcalPerDay(plan) },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${index === 1 ? "border-x border-blush-mid/70" : ""}`}
              >
                <p className="text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-lg leading-none text-near-black">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-text-muted">
            <span className="font-semibold text-primary-dark">This week:</span>{" "}
            {plan.sample.join(" · ")}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Weekly
              </p>
              <p className="font-display text-3xl leading-none text-near-black">€{plan.price}</p>
            </div>
            <DialogTrigger asChild>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition hover:bg-primary-dark sm:w-fit">
                View Weekly Menu
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </DialogTrigger>
          </div>
        </div>
      </article>

      <DialogContent
        hideClose
        overlayClassName="meal-plan-dialog-overlay bg-[#2f1f22]/45 backdrop-blur-[2px]"
        className="meal-plan-dialog-content top-[calc(50%+1.25rem)] h-[calc(100svh-7.5rem)] w-[calc(100vw-1rem)] max-w-6xl overflow-visible border-0 bg-transparent p-0 shadow-none sm:top-[50%] sm:h-auto sm:max-h-[88vh] sm:w-[calc(100vw-2rem)]"
      >
        <div className="relative flex h-full min-h-0 flex-col sm:h-auto">
          <div
            role="tablist"
            aria-label={`${plan.name} modal sections`}
            className="pointer-events-auto absolute left-0 top-0 z-30 inline-flex w-[69%] -translate-y-[calc(100%-1px)] items-center gap-1 rounded-t-[1.05rem] rounded-br-[1.05rem] border border-blush-mid bg-[#FDF8F5] px-1.5 pb-1.5 pt-1.5 shadow-[0_14px_30px_rgba(80,42,52,0.14)] ring-1 ring-black/5 sm:w-auto sm:gap-2 sm:rounded-t-[1.6rem] sm:rounded-br-[1.6rem] sm:px-2 sm:pb-2 sm:pt-2"
          >
            <button
              id={detailsTabId}
              role="tab"
              type="button"
              tabIndex={!orderingOpen ? 0 : -1}
              aria-selected={!orderingOpen}
              aria-controls={detailsPanelId}
              onClick={() => setOrderingOpen(false)}
              className={`${tabBaseClass} ${
                !orderingOpen
                  ? "bg-primary text-primary-foreground shadow-[0_8px_18px_rgba(158,85,112,0.24)]"
                  : "bg-transparent text-primary/80 hover:text-primary-dark"
              }`}
            >
              Plan Details
            </button>
            <button
              id={orderTabId}
              role="tab"
              type="button"
              tabIndex={orderingOpen ? 0 : -1}
              aria-selected={orderingOpen}
              aria-controls={orderPanelId}
              onClick={() => setOrderingOpen(true)}
              className={`${tabBaseClass} ${
                orderingOpen
                  ? "bg-primary text-primary-foreground shadow-[0_8px_18px_rgba(158,85,112,0.24)]"
                  : "bg-transparent text-primary/80 hover:text-primary-dark"
              }`}
            >
              Order
            </button>
          </div>

          <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-b-[1.35rem] rounded-tr-[1.35rem] border border-blush-mid bg-[#FDF8F5] shadow-[0_24px_80px_rgba(80,42,52,0.18)] sm:max-h-full sm:rounded-b-3xl sm:rounded-tr-3xl">
            <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4 md:right-5 md:top-5">
              <div className="flex shrink-0 justify-end">
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blush-mid bg-white text-primary-dark transition hover:border-primary hover:text-primary sm:h-10 sm:w-10"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1">
              <div
                id={detailsPanelId}
                role="tabpanel"
                aria-labelledby={detailsTabId}
                className={`col-start-1 row-start-1 flex min-h-0 flex-col transition-opacity duration-200 ${
                  orderingOpen ? "invisible pointer-events-none opacity-0" : "opacity-100"
                }`}
                aria-hidden={orderingOpen}
              >
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div className="px-4 pb-4 pt-5 pr-14 sm:px-6 sm:pr-20 md:px-8 md:pr-24">
                    <DialogHeader className="space-y-0 text-left">
                      <span
                        className={`mb-2 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold sm:text-xs ${plan.accent}`}
                      >
                        5 Day Week Plan
                      </span>
                      <DialogTitle className="font-display text-[2.15rem] font-normal leading-none text-near-black sm:text-4xl">
                        {plan.name}
                      </DialogTitle>
                      <DialogDescription className="mt-2 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
                        {plan.desc}
                      </DialogDescription>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {plan.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-blush-mid bg-white px-3 py-1 text-[11px] font-medium text-primary-dark sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </DialogHeader>
                  </div>

                  <div className="grid grid-cols-2 gap-3 px-4 pb-5 sm:px-6 md:px-8 lg:grid-cols-5">
                    {plan.dailyMeals.map((day) => (
                      <div
                        key={day.day}
                        className="flex min-h-[210px] flex-col rounded-[1.05rem] border border-blush-mid/80 bg-white p-3 shadow-[0_10px_30px_rgba(158,85,112,0.08)] sm:min-h-0 sm:rounded-2xl sm:p-4 lg:min-h-[250px]"
                      >
                        <p className="font-display text-[1.45rem] leading-none text-near-black sm:text-2xl">
                          {day.day}
                        </p>
                        <div className="mt-2.5 grid flex-1 gap-2 text-[12px] leading-4 text-text-muted sm:mt-4 sm:gap-4 sm:text-sm sm:leading-5">
                          <p>
                            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-primary sm:mb-1 sm:text-xs sm:tracking-[0.12em]">
                              Lunch
                            </span>
                            {day.lunch}
                          </p>
                          <p>
                            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-primary sm:mb-1 sm:text-xs sm:tracking-[0.12em]">
                              Snack
                            </span>
                            {day.snack}
                          </p>
                          <p>
                            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-primary sm:mb-1 sm:text-xs sm:tracking-[0.12em]">
                              Dinner
                            </span>
                            {day.dinner}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 border-t border-blush-mid/80 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-4 md:px-8">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
                        Weekly plan
                      </p>
                      <p className="mt-1 font-display text-[1.45rem] leading-none text-near-black sm:text-2xl">
                        From €{plan.price} / week
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderingOpen(true)}
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-dark sm:px-6 sm:py-3"
                    >
                      Order This Plan
                    </button>
                  </div>
                </div>
              </div>

              <div
                id={orderPanelId}
                role="tabpanel"
                aria-labelledby={orderTabId}
                className={`col-start-1 row-start-1 flex min-h-0 flex-col transition-opacity duration-200 ${
                  orderingOpen ? "opacity-100" : "invisible pointer-events-none opacity-0"
                }`}
                aria-hidden={!orderingOpen}
              >
                <div
                  ref={orderScrollRef}
                  className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 sm:pr-20 md:px-8 md:pr-24"
                >
                  <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
                    <div className="space-y-5 rounded-[1.35rem] border border-blush-mid bg-cream px-4 py-5 sm:rounded-[1.75rem] sm:px-5">
                      <div>
                        <h3 className="font-display text-[1.85rem] leading-none text-near-black sm:text-[2.25rem]">
                          Order {plan.name}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-text-muted">
                          Fill in your details and send your weekly plan order through WhatsApp.
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Selected Plan
                        </p>
                        <p className="mt-3 font-display text-[2rem] leading-none text-near-black">
                          {plan.name}
                        </p>
                        <p className="mt-3 text-sm text-text-muted">{plan.tags.join(" · ")}</p>
                        <p className="mt-5 font-display text-[2rem] leading-none text-primary">
                          €{plan.price}
                        </p>
                      </div>

                      <div ref={fulfillmentRef} className="grid grid-cols-2 gap-3 scroll-mt-3">
                        {(["pickup", "delivery"] as const).map((option) => {
                          const isActive = details.fulfillment === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleFulfillmentChange(option)}
                              className={`h-full rounded-2xl border px-3 py-3 text-left transition sm:px-4 ${
                                isActive
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-blush-mid bg-background text-near-black hover:border-primary/40"
                              }`}
                            >
                              <span className="block font-display text-[1.15rem] leading-none capitalize sm:text-[1.25rem]">
                                {option}
                              </span>
                              <span
                                className={`mt-1 block text-[9px] uppercase tracking-[0.1em] sm:text-[10px] sm:tracking-[0.16em] ${
                                  isActive ? "text-primary-foreground/75" : "text-text-muted"
                                }`}
                              >
                                {option === "pickup" ? "Collect in store" : "Bring to your address"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-muted sm:text-base">
                          Your Details
                        </p>
                        <button
                          type="button"
                          onClick={handleClearSavedDetails}
                          className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition hover:text-primary-dark sm:text-xs sm:tracking-[0.18em]"
                        >
                          Clear Details
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                            Name
                          </span>
                          <Input
                            value={details.name}
                            onChange={(event) => setDetail("name", event.target.value)}
                            placeholder="Your full name"
                            className="h-10 rounded-xl border-blush-mid bg-cream"
                          />
                          {errors.name && (
                            <span className="text-xs text-primary-dark">{errors.name}</span>
                          )}
                        </label>

                        <label className="block space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                            Number
                          </span>
                          <Input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            pattern="[0-9+() .-]*"
                            value={details.phone}
                            onChange={(event) =>
                              setDetail("phone", sanitizePhoneInput(event.target.value))
                            }
                            placeholder="+383..."
                            className="h-10 rounded-xl border-blush-mid bg-cream"
                          />
                          {errors.phone && (
                            <span className="text-xs text-primary-dark">{errors.phone}</span>
                          )}
                        </label>
                      </div>

                      {details.fulfillment === "delivery" && (
                        <label className="block space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                            Address
                          </span>
                          <Input
                            value={details.address}
                            onChange={(event) => setDetail("address", event.target.value)}
                            placeholder="Street, number, area"
                            className="h-10 rounded-xl border-blush-mid bg-cream"
                          />
                          {errors.address && (
                            <span className="text-xs text-primary-dark">{errors.address}</span>
                          )}
                        </label>
                      )}

                      <label className="block space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                          More Information
                        </span>
                        <Textarea
                          value={details.note}
                          onChange={(event) => setDetail("note", event.target.value)}
                          placeholder="Anything else we should know?"
                          className="min-h-28 rounded-xl border-blush-mid bg-cream"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 border-t border-blush-mid bg-cream px-4 py-4 sm:px-6 md:px-8">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderingOpen(false)}
                      className="flex-1 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary transition hover:border-primary/35 hover:bg-background"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitPlanOrder}
                      className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-dark"
                    >
                      Send Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MealPlans() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="plans" className="bg-cream pb-16 pt-8 md:pb-28 md:pt-12">
      <div ref={ref} className="container-cnc">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Find Your Fit
            </p>
            <h2 className="mt-3 font-['Poppins',sans-serif] text-3xl font-bold leading-[1.08] text-primary sm:text-4xl md:text-5xl">
              Healthy Meals
              <br /> That Fit Your Life
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:mx-auto md:[&>*:nth-child(3)]:max-w-md lg:grid-cols-3 lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(3)]:mx-0 lg:[&>*:nth-child(3)]:max-w-none">
          {PLANS.map((plan) => (
            <MealPlanDialog key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
