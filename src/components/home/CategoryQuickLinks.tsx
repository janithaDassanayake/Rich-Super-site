import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function CategoryQuickLinks() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold text-slate-900">Shop by category</h2>
      <p className="text-slate-500 text-sm mt-1">
        Eight aisles, one bag, one WhatsApp message.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES.map((c) => {
          const inner = (
            <div
              className={`relative rounded-2xl p-4 border border-slate-200 hover:border-brand-400 hover:shadow-cardHover transition bg-white ${
                c.comingSoon ? "opacity-60" : ""
              }`}
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="text-sm font-semibold mt-2 text-slate-800">
                {c.name}
              </div>
              {c.comingSoon && (
                <div className="absolute top-2 right-2 text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                  Soon
                </div>
              )}
            </div>
          );
          return c.comingSoon ? (
            <div key={c.key}>{inner}</div>
          ) : (
            <Link key={c.key} href={`/products/${c.key}`}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
