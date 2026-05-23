import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyMessage }: Props) {
  if (products.length === 0) {
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500">
        {emptyMessage ?? "No products in this category yet."}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
