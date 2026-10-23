"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

/** A line in the order bag. Rbma prices each order when they confirm it. */
export type CartLine = {
  /** Stable key: the same configuration adds to the same line. */
  id: string;
  name: string;
  options: string[];
  quantity: number;
};

type Action =
  | { type: "add"; line: CartLine }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const MAX_QTY = 20;

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = lines.find((l) => l.id === action.line.id);
      if (!existing) return [...lines, { ...action.line, quantity: Math.min(action.line.quantity, MAX_QTY) }];
      return lines.map((l) => (l.id === action.line.id ? { ...l, quantity: Math.min(l.quantity + action.line.quantity, MAX_QTY) } : l));
    }
    case "setQuantity":
      if (action.quantity <= 0) return lines.filter((l) => l.id !== action.id);
      return lines.map((l) => (l.id === action.id ? { ...l, quantity: Math.min(action.quantity, MAX_QTY) } : l));
    case "remove":
      return lines.filter((l) => l.id !== action.id);
    case "clear":
      return [];
    case "hydrate":
      return action.lines;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: CartLine) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rbma-bag-v2";
const INITIAL: CartLine[] = [];

const isLine = (x: unknown): x is CartLine =>
  typeof x === "object" && x !== null && typeof (x as CartLine).id === "string" && typeof (x as CartLine).quantity === "number";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, INITIAL);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) dispatch({ type: "hydrate", lines: saved.filter(isLine) });
    } catch {
      // Storage unavailable (private mode) — start with an empty bag.
    }
  }, []);

  useEffect(() => {
    // The untouched initial array means storage hasn't been read yet; never overwrite it.
    if (lines === INITIAL) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add = useCallback((line: CartLine) => {
    dispatch({ type: "add", line });
    setOpen(true);
  }, []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [lines, isOpen, add, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
