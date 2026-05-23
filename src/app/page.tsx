import HeroBanner from "@/components/home/HeroBanner";
import CategoryQuickLinks from "@/components/home/CategoryQuickLinks";
import TrendingItems from "@/components/home/TrendingItems";
import PromoSection from "@/components/home/PromoSection";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const ALL_PRODUCTS = productsData as Product[];

export default function HomePage() {
  const trending = ALL_PRODUCTS.filter((p) => p.trending).slice(0, 18);
  const promos = ALL_PRODUCTS.filter((p) => p.promo).slice(0, 8);

  return (
    <>
      <HeroBanner />
      <CategoryQuickLinks />
      <TrendingItems products={trending} />
      <PromoSection products={promos} />
    </>
  );
}
