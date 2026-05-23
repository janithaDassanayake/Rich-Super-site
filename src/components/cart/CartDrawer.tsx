"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cartStore";
import CartItem from "./CartItem";
import { formatRs } from "@/lib/format";

export default function CartDrawer() {
  const open = useCart((s) => s.drawerOpen);
  const close = useCart((s) => s.closeDrawer);
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.totalPrice());

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 animate-fadeIn"
        onClick={close}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col animate-slideIn">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-brand-700" />
            <div className="font-bold text-slate-900">Your cart</div>
            <div className="text-xs text-slate-500">
              ({items.length} item{items.length === 1 ? "" : "s"})
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            className="p-1 rounded hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-slate-500 py-12">
              <div>
                <div className="text-5xl mb-3">🛒</div>
                <div className="font-medium">Your cart is empty</div>
                <div className="text-xs mt-1">
                  Browse the aisles and add a few items.
                </div>
                <Link
                  href="/"
                  onClick={close}
                  className="inline-block mt-4 text-sm font-semibold text-brand-700 hover:underline"
                >
                  Start shopping →
                </Link>
              </div>
            </div>
          ) : (
            items.map((i) => <CartItem key={i.product.id} item={i} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-200 p-4 space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">
                {formatRs(total)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Final total confirmed by Rich Super on WhatsApp. Delivery
              charges (if any) are quoted then.
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full py-3"
            >
              Proceed to checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
