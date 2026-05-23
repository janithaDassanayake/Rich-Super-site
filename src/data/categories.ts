import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { key: "rice", name: "Rice & Grains", icon: "🌾" },
  { key: "dairy", name: "Dairy & Yoghurt", icon: "🥛" },
  { key: "soap", name: "Soap & Personal Care", icon: "🧼" },
  { key: "snacks", name: "Snacks & Biscuits", icon: "🍪" },
  { key: "beverages", name: "Beverages", icon: "🧃" },
  { key: "household", name: "Household & Cleaning", icon: "🧹" },
  { key: "vegetables", name: "Fresh Vegetables", icon: "🥦", comingSoon: true },
  { key: "frozen", name: "Frozen Foods", icon: "❄️", comingSoon: true },
];

export const categoryByKey = (key: string): Category | undefined =>
  CATEGORIES.find((c) => c.key === key);
