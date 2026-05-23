import Link from "next/link";
import { Tag } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

export default function PromoSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-14">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
            <Tag className="w-3 h-3" /> Hot promo deals
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">
            This week's biggest savings
          </h2>
        </div>
        <Link
          href="/products/snacks"
          className="hidden md:inline text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          Browse all snacks →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
