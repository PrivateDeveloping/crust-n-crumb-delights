import { Minus, Plus, Trash2, X } from "lucide-react";
import { buildWhatsAppMessage, useCart, whatsappLink } from "@/lib/cart-store";
import { CONFIG } from "@/lib/config";

export function CartDrawer() {
  const cart = useCart();
  const wa = whatsappLink(CONFIG.WHATSAPP_NUMBER, buildWhatsAppMessage(cart.lines));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-near-black/40 transition-opacity ${
          cart.open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => cart.setOpen(false)}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-soft transition-transform ${
          cart.open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cart.open}
      >
        <div className="flex items-center justify-between border-b border-blush-mid p-5">
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

        <div className="flex-1 overflow-y-auto p-5">
          {cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blush-light text-3xl">
                🌸
              </div>
              <p className="font-display text-xl text-near-black">Your cart is empty</p>
              <p className="mt-2 max-w-xs text-sm text-text-muted">
                Start with something fresh from our menu!
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-blush-mid">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex items-center gap-3 py-4">
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight text-near-black">{line.name}</p>
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
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium text-primary">{(line.price * line.qty).toFixed(2)}€</p>
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

        <div className="border-t border-blush-mid bg-cream p-5">
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted">Subtotal</p>
              <p className="text-[11px] text-text-muted">Prices in EUR</p>
            </div>
            <p className="font-display text-2xl text-near-black">{cart.subtotal.toFixed(2)}€</p>
          </div>
          <a
            href={cart.lines.length ? wa : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={cart.lines.length === 0}
            className={`block w-full rounded-full px-5 py-3.5 text-center text-sm font-semibold transition ${
              cart.lines.length
                ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                : "cursor-not-allowed bg-blush-mid text-text-muted"
            }`}
          >
            Order via WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
