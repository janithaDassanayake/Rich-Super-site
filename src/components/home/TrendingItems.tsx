"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

export default function TrendingItems({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  if (products.length === 0) return null;

  const scrollBy = (delta: number) => {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Trending now</h2>
          <p className="text-slate-500 text-sm mt-1">
            What other Rich Super customers are loading into their carts.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollBy(-600)}
            aria-label="Scroll left"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(600)}
            aria-label="Scroll right"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-6 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-56 sm:w-60"
          >
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
