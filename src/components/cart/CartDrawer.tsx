import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  buildWhatsAppMessage,
  CART_ADD_EVENT,
  clearSavedOrderDetails,
  EMPTY_ORDER_DETAILS,
  getSavedOrderDetails,
  sanitizePhoneInput,
  type CartAddDetail,
  type OrderDetails,
  saveOrderDetails,
  useCart,
  whatsappLink,
} from "@/lib/cart-store";
import { CONFIG } from "@/lib/config";

export function CartDrawer() {
  const cart = useCart();
  const [highlightedLineId, setHighlightedLineId] = useState<string | null>(null);
  const [subtotalTick, setSubtotalTick] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [details, setDetails] = useState<OrderDetails>(EMPTY_ORDER_DETAILS);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const highlightTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleCartAdd = (event: Event) => {
      const detail = (event as CustomEvent<CartAddDetail>).detail;
      setHighlightedLineId(detail.id);
      setSubtotalTick((tick) => tick + 1);

      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }

      highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedLineId((current) => (current === detail.id ? null : current));
      }, 950);
    };

    window.addEventListener(CART_ADD_EVENT, handleCartAdd);

    return () => {
      window.removeEventListener(CART_ADD_EVENT, handleCartAdd);

      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cart.lines.length === 0) {
      setCheckoutOpen(false);
    }
  }, [cart.lines.length]);

  useEffect(() => {
    if (typeof document === "undefined" || !cart.open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [cart.open]);

  useEffect(() => {
    if (!checkoutOpen || typeof window === "undefined") {
      return;
    }

    try {
      setDetails(getSavedOrderDetails());
    } catch {
      // Ignore malformed saved checkout details and continue with empty fields.
    }
  }, [checkoutOpen]);

  const setDetail = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleClearSavedDetails = () => {
    setDetails(EMPTY_ORDER_DETAILS);
    setErrors({});
    clearSavedOrderDetails();
  };

  const handleSubmitOrder = () => {
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

    const message = buildWhatsAppMessage(cart.lines, {
      ...details,
      name: details.name.trim(),
      phone: details.phone.trim(),
      address: details.address?.trim(),
      note: details.note?.trim(),
    });
    const url = whatsappLink(CONFIG.WHATSAPP_NUMBER, message);

    saveOrderDetails(details);

    window.open(url, "_blank", "noopener,noreferrer");
    cart.clear();
    setCheckoutOpen(false);
    cart.setOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-near-black/40 transition-opacity duration-300 ease-out ${
          cart.open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => cart.setOpen(false)}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-dvh w-full max-w-md overflow-hidden bg-background shadow-soft transition-transform duration-300 ease-out ${
          cart.open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cart.open}
      >
        <div
          className={`flex h-full flex-col transition duration-300 ease-out ${
            checkoutOpen ? "scale-[0.985] blur-[3px]" : "scale-100 blur-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-blush-mid p-4 sm:p-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted">Your Order</p>
              <h2 className="font-display text-2xl text-near-black">{CONFIG.BRAND}</h2>
            </div>
            <button
              onClick={() => cart.setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush-light"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {cart.lines.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-5 inline-flex h-24 w-24 items-center justify-center rounded-full border border-blush-mid bg-blush-light shadow-soft">
                  <Logo size={64} variant="light" />
                </div>
                <p className="font-display text-xl text-near-black">Your cart is empty</p>
                <p className="mt-2 max-w-xs text-sm text-text-muted">
                  Start with something fresh from our menu!
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-blush-mid">
                {cart.lines.map((line) => (
                  <li
                    key={line.id}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-4 transition-colors duration-500 ${
                      highlightedLineId === line.id ? "cart-line-highlight" : ""
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg leading-tight text-near-black">
                        {line.name}
                      </p>
                      <p className="text-sm text-text-muted">{line.price.toFixed(2)}€ each</p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-blush-mid bg-blush-light p-1">
                        <button
                          onClick={() => cart.setQty(line.id, line.qty - 1)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-background"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium">{line.qty}</span>
                        <button
                          onClick={() => cart.setQty(line.id, line.qty + 1)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-background"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <p className="font-medium text-primary">
                        {(line.price * line.qty).toFixed(2)}€
                      </p>
                      <button
                        onClick={() => cart.remove(line.id)}
                        className="text-text-muted hover:text-primary"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-blush-mid bg-cream p-4 sm:p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted">Subtotal</p>
                <p className="text-[11px] text-text-muted">Prices in EUR</p>
              </div>
              <p
                key={`subtotal-${subtotalTick}-${cart.subtotal}`}
                className={`font-display text-2xl text-near-black ${
                  subtotalTick > 0 ? "cart-subtotal-pop" : ""
                }`}
              >
                {cart.subtotal.toFixed(2)}€
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              disabled={cart.lines.length === 0}
              className={`block w-full rounded-full px-5 py-3.5 text-center text-sm font-semibold transition ${
                cart.lines.length
                  ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                  : "cursor-not-allowed bg-blush-mid text-text-muted"
              }`}
            >
              Order via WhatsApp
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close checkout"
          onClick={() => setCheckoutOpen(false)}
          className={`absolute inset-0 z-10 transition-opacity duration-300 ${
            checkoutOpen ? "opacity-100" : "opacity-0"
          } ${checkoutOpen ? "pointer-events-auto bg-background/35 backdrop-blur-[2px]" : "pointer-events-none bg-transparent"}`}
        />

        <div
          className={`absolute inset-x-0 bottom-0 z-20 flex max-h-[85%] flex-col rounded-t-[2rem] border-t border-blush-mid bg-background shadow-[0_-24px_50px_rgba(28,20,24,0.16)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            checkoutOpen ? "translate-y-0" : "translate-y-full"
          }`}
          aria-hidden={!checkoutOpen}
        >
          <div className="flex items-start justify-between gap-4 border-b border-blush-mid px-5 py-4 sm:px-6">
            <div className="text-left">
              <h3 className="font-display text-3xl text-near-black">Complete Your Order</h3>
              <p className="mt-2 text-sm text-text-muted">
                Choose pickup or delivery, then add your contact details before WhatsApp opens.
              </p>
              <button
                type="button"
                onClick={handleClearSavedDetails}
                className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-primary-dark"
              >
                Clear saved details
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-blush-light"
              aria-label="Close checkout"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 px-5 py-5 sm:px-6">
            <div className="grid grid-cols-2 gap-3">
              {(["pickup", "delivery"] as const).map((option) => {
                const isActive = details.fulfillment === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDetail("fulfillment", option)}
                    className={`rounded-2xl border px-4 py-2.5 text-left transition ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-blush-mid bg-cream text-near-black hover:border-primary/40"
                    }`}
                  >
                    <span className="block font-display text-[1.45rem] leading-none capitalize">
                      {option}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] uppercase tracking-[0.16em] ${
                        isActive ? "text-primary-foreground/75" : "text-text-muted"
                      }`}
                    >
                      {option === "pickup" ? "Collect in store" : "Bring to your address"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Name
                </span>
                <Input
                  value={details.name}
                  onChange={(event) => setDetail("name", event.target.value)}
                  placeholder="Your full name"
                  className="h-11 rounded-xl border-blush-mid bg-cream"
                />
                {errors.name && <span className="text-xs text-primary-dark">{errors.name}</span>}
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
                  onChange={(event) => setDetail("phone", sanitizePhoneInput(event.target.value))}
                  placeholder="+383..."
                  className="h-11 rounded-xl border-blush-mid bg-cream"
                />
                {errors.phone && <span className="text-xs text-primary-dark">{errors.phone}</span>}
              </label>

              {details.fulfillment === "delivery" && (
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Address
                  </span>
                  <Input
                    value={details.address}
                    onChange={(event) => setDetail("address", event.target.value)}
                    placeholder="Street, number, area"
                    className="h-11 rounded-xl border-blush-mid bg-cream"
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
                  className="min-h-24 rounded-xl border-blush-mid bg-cream"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3 border-t border-blush-mid bg-cream px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="flex-1 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary transition hover:border-primary/35 hover:bg-background"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmitOrder}
              className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-dark"
            >
              Place Order
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
