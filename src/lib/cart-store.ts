import { useEffect, useState, useCallback } from "react";
import type { MenuItem } from "./menu-data";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const STORAGE_KEY = "cnc-cart-v1";
const EVENT = "cnc-cart-update";
export const CART_ADD_EVENT = "cnc-cart-item-added";
let cartOpen = false;

export interface CartAddDetail {
  id: string;
  name: string;
  qty: number;
  isNewLine: boolean;
}

export interface OrderDetails {
  fulfillment: "pickup" | "delivery";
  name: string;
  phone: string;
  address?: string;
  note?: string;
}

export const CHECKOUT_DETAILS_KEY = "cnc-checkout-details-v1";
export const EMPTY_ORDER_DETAILS: OrderDetails = {
  fulfillment: "pickup",
  name: "",
  phone: "",
  address: "",
  note: "",
};

export function sanitizePhoneInput(value: string): string {
  return value
    .replace(/[^\d+\s().-]/g, "")
    .replace(/(?!^)\+/g, "")
    .replace(/^\++/, "+");
}

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpenState] = useState(cartOpen);

  useEffect(() => {
    setLines(read());
    setOpenState(cartOpen);
    const handler = () => {
      setLines(read());
      setOpenState(cartOpen);
    };
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setOpen = useCallback((next: boolean) => {
    cartOpen = next;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(EVENT));
    }
  }, []);

  const add = useCallback((item: MenuItem) => {
    const cur = read();
    const existing = cur.find((l) => l.id === item.id);
    const next = existing
      ? cur.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
      : [...cur, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    write(next);
    if (typeof window !== "undefined") {
      const qty = existing ? existing.qty + 1 : 1;
      window.dispatchEvent(
        new CustomEvent<CartAddDetail>(CART_ADD_EVENT, {
          detail: { id: item.id, name: item.name, qty, isNewLine: !existing },
        }),
      );
    }
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const cur = read();
    const next =
      qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty } : l));
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);

  return { lines, count, subtotal, add, setQty, remove, clear, open, setOpen };
}

export function buildWhatsAppMessage(lines: CartLine[], details?: OrderDetails): string {
  const items = lines.map((l) => `${l.qty} x ${l.name} (${l.price.toFixed(2)}€)`).join("\n");
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0).toFixed(2);
  const customerLines = details
    ? [
        `Type: ${details.fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
        `Name: ${details.name}`,
        `Phone: ${details.phone}`,
        details.fulfillment === "delivery" && details.address
          ? `Address: ${details.address}`
          : null,
        details.note ? `More information: ${details.note}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : null;

  return `Përshëndetje! Dua të porosis:\n\n${
    customerLines ? `${customerLines}\n\n` : ""
  }${items}\nTotal: ${total}€\n\nFaleminderit!`;
}

export function buildPlanWhatsAppMessage(
  plan: { name: string; price: number },
  details?: OrderDetails,
): string {
  const customerLines = details
    ? [
        `Type: ${details.fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
        `Name: ${details.name}`,
        `Phone: ${details.phone}`,
        details.fulfillment === "delivery" && details.address
          ? `Address: ${details.address}`
          : null,
        details.note ? `More information: ${details.note}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : null;

  return `Përshëndetje! Dua të porosis meal plan:\n\n${
    customerLines ? `${customerLines}\n\n` : ""
  }Plan: ${plan.name}\nPrice: ${plan.price.toFixed(2)}€ / week\n\nFaleminderit!`;
}

export function getSavedOrderDetails(): OrderDetails {
  if (typeof window === "undefined") {
    return EMPTY_ORDER_DETAILS;
  }

  try {
    const raw = window.localStorage.getItem(CHECKOUT_DETAILS_KEY);
    if (!raw) {
      return EMPTY_ORDER_DETAILS;
    }

    const saved = JSON.parse(raw) as Partial<OrderDetails>;
    return {
      fulfillment: saved.fulfillment === "delivery" ? "delivery" : "pickup",
      name: saved.name ?? "",
      phone: sanitizePhoneInput(saved.phone ?? ""),
      address: saved.address ?? "",
      note: saved.note ?? "",
    };
  } catch {
    return EMPTY_ORDER_DETAILS;
  }
}

export function saveOrderDetails(details: OrderDetails) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CHECKOUT_DETAILS_KEY,
    JSON.stringify({
      fulfillment: details.fulfillment,
      name: details.name.trim(),
      phone: sanitizePhoneInput(details.phone).trim(),
      address: details.address?.trim() ?? "",
      note: details.note?.trim() ?? "",
    }),
  );
}

export function clearSavedOrderDetails() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CHECKOUT_DETAILS_KEY);
}

export function whatsappLink(number: string, message: string): string {
  const clean = number.replace(/[^\d+]/g, "");
  return `https://wa.me/${clean.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
