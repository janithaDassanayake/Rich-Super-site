"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  add: (product: Product, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,

      add: (product, qty) =>
        set((s) => {
          const desired = Math.max(qty ?? product.minQty, product.minQty);
          const idx = s.items.findIndex((i) => i.product.id === product.id);
          if (idx === -1) {
            return { items: [...s.items, { product, qty: desired }] };
          }
          const next = [...s.items];
          next[idx] = { ...next[idx], qty: next[idx].qty + desired };
          return { items: next };
        }),

      setQty: (productId, qty) =>
        set((s) => {
          const idx = s.items.findIndex((i) => i.product.id === productId);
          if (idx === -1) return s;
          const min = s.items[idx].product.minQty;
          const next = [...s.items];
          next[idx] = { ...next[idx], qty: Math.max(qty, min) };
          return { items: next };
        }),

      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.product.id !== productId),
        })),

      clear: () => set({ items: [] }),

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),

      totalCount: () => get().items.reduce((n, i) => n + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((n, i) => n + i.qty * i.product.promoPrice, 0),
    }),
    {
      name: "rich-super-cart",
      partialize: (s) => ({ items: s.items }),
    }
  )
);
