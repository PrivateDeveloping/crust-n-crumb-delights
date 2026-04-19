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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLines(read());
    const handler = () => setLines(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const add = useCallback((item: MenuItem) => {
    const cur = read();
    const existing = cur.find((l) => l.id === item.id);
    const next = existing
      ? cur.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
      : [...cur, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    write(next);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const cur = read();
    const next = qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty } : l));
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

export function buildWhatsAppMessage(lines: CartLine[]): string {
  const items = lines
    .map((l) => `${l.qty} x ${l.name} (${l.price.toFixed(2)}€)`)
    .join("\n");
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0).toFixed(2);
  return `Përshëndetje! Dua të porosis:\n\n${items}\nTotal: ${total}€\n\nFaleminderit!`;
}

export function whatsappLink(number: string, message: string): string {
  const clean = number.replace(/[^\d+]/g, "");
  return `https://wa.me/${clean.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
