import { notFound } from "next/navigation";
import CategorySidebar from "@/components/products/CategorySidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { CATEGORIES, categoryByKey } from "@/data/categories";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const ALL_PRODUCTS = productsData as Product[];

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const cat = categoryByKey(params.category);
  return {
    title: cat ? `${cat.name} — Rich Super` : "Rich Super",
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = categoryByKey(params.category);
  if (!cat) notFound();

  const products = ALL_PRODUCTS.filter((p) => p.category === params.category);

  const counts: Record<string, number> = {};
  for (const c of CATEGORIES) {
    counts[c.key] = ALL_PRODUCTS.filter((p) => p.category === c.key).length;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-500 mb-2">
        <a href="/" className="hover:text-brand-700">
          Home
        </a>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-700 font-medium">{cat.name}</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900">
        {cat.icon} {cat.name}
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        {cat.comingSoon
          ? "We're stocking this aisle. Check back soon."
          : `${products.length} product${products.length === 1 ? "" : "s"} available · minimum 5 units per item.`}
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <CategorySidebar active={params.category} counts={counts} />
        <div className="flex-1">
          <ProductGrid
            products={products}
            emptyMessage={
              cat.comingSoon
                ? `${cat.name} are coming soon to Rich Super.`
                : "No products in this category yet."
            }
          />
        </div>
      </div>
    </div>
  );
}
