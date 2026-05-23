"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { formatRs } from "@/lib/format";
import type { CartItem as CartItemType } from "@/types";

export default function CartItem({ item }: { item: CartItemType }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const min = item.product.minQty;
  const sub = item.qty * item.product.promoPrice;

  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="relative w-16 h-16 rounded-lg bg-slate-50 shrink-0 overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium line-clamp-2 text-slate-800">
          {item.product.name}
        </div>
        <div className="text-xs text-slate-500">
          {item.product.unit} · {formatRs(item.product.promoPrice)}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-slate-300 rounded-full text-sm">
            <button
              onClick={() => setQty(item.product.id, item.qty - 1)}
              disabled={item.qty <= min}
              className="px-2 py-1 disabled:opacity-30"
              aria-label="Decrease"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-semibold">{item.qty}</span>
            <button
              onClick={() => setQty(item.product.id, item.qty + 1)}
              className="px-2 py-1"
              aria-label="Increase"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-sm font-bold text-brand-700">
            {formatRs(sub)}
          </div>
        </div>
        <div className="text-[10px] text-slate-400 mt-1">
          Min {min} units
        </div>
      </div>

      <button
        aria-label="Remove from cart"
        onClick={() => remove(item.product.id)}
        className="self-start p-1 text-slate-400 hover:text-rose-600"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
