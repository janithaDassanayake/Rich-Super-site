"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Check } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/types";
import { useCart } from "@/store/cartStore";
import { formatRs, discountPct } from "@/lib/format";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(product.minQty);
  const [added, setAdded] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  const pct = discountPct(product.mrpPrice, product.promoPrice);

  const dec = () => {
    if (qty <= product.minQty) {
      setTip(`Minimum order quantity is ${product.minQty}.`);
      window.setTimeout(() => setTip(null), 1800);
      return;
    }
    setQty((q) => q - 1);
  };

  const inc = () => setQty((q) => q + 1);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className={clsx(
        "group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-cardHover hover:border-brand-300 transition flex flex-col",
        compact ? "h-full" : "h-full"
      )}
    >
      {product.promo && (
        <div className="absolute left-2 top-2 z-10 text-[11px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase">
          Promo
        </div>
      )}
      {pct > 0 && (
        <div className="absolute right-2 top-2 z-10 text-[11px] font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
          SAVE {pct}%
        </div>
      )}

      <div className="relative aspect-square bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 240px"
          className="object-contain p-3 group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </div>
        <div className="text-xs text-slate-500">{product.unit}</div>

        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-lg font-extrabold text-brand-700">
            {formatRs(product.promoPrice)}
          </div>
          {product.mrpPrice > product.promoPrice && (
            <div className="text-xs text-mrp line-through">
              {formatRs(product.mrpPrice)}
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <div className="relative flex items-center border border-slate-300 rounded-full overflow-hidden">
            <button
              type="button"
              onClick={dec}
              aria-label="Decrease quantity"
              className="px-2 py-1.5 hover:bg-slate-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold">
              {qty}
            </span>
            <button
              type="button"
              onClick={inc}
              aria-label="Increase quantity"
              className="px-2 py-1.5 hover:bg-slate-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            {tip && (
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] px-2 py-1 rounded shadow">
                {tip}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className={clsx(
              "flex-1 text-sm font-semibold rounded-full py-2 transition",
              added
                ? "bg-emerald-100 text-emerald-700"
                : "bg-brand-600 hover:bg-brand-700 text-white"
            )}
          >
            {added ? (
              <span className="inline-flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Added
              </span>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>

        <div className="text-[10px] text-slate-400 mt-1">
          Min order: {product.minQty} units
        </div>
      </div>
    </div>
  );
}
