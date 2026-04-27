import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function CartSummaryBar() {
  const cart = useCart();

  if (cart.count === 0 || cart.open) {
    return null;
  }

  const itemLabel = cart.count === 1 ? "item" : "items";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 sm:bottom-5">
      <div className="container-cnc">
        <button
          onClick={() => cart.setOpen(true)}
          className="cart-summary-bar pointer-events-auto mx-auto flex w-full max-w-none items-center justify-between gap-2 rounded-full border border-blush-mid/90 bg-background/96 px-3 py-3 text-left text-near-black shadow-[0_18px_40px_rgba(200,122,148,0.15)] backdrop-blur-xl transition hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(200,122,148,0.2)] sm:max-w-[27rem] sm:gap-3 sm:px-4"
          aria-label="View cart"
        >
          <span className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/14 text-primary sm:h-10 sm:w-10">
              <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </span>
            <span>
              <span className="block whitespace-nowrap font-display text-[1.35rem] leading-none sm:text-[1.7rem]">
                Your cart
              </span>
              <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-text-muted sm:text-[10px] sm:tracking-[0.22em]">
                {cart.count} {itemLabel}
              </span>
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="text-right">
              <span className="block font-display text-[1.35rem] leading-none text-primary sm:text-[1.65rem]">
                {cart.subtotal.toFixed(2)}€
              </span>
              <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-text-muted sm:text-[10px] sm:tracking-[0.22em]">
                Open order
              </span>
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blush-light text-primary sm:h-9 sm:w-9">
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
