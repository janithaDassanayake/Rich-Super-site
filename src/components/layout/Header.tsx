"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { CATEGORIES } from "@/data/categories";

export default function Header() {
  const count = useCart((s) => s.totalCount());
  const openDrawer = useCart((s) => s.openDrawer);
  // Cart count must come from client-side store; defer to avoid hydration flash.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-full bg-brand-600 grid place-items-center text-white font-black text-lg">
            R
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-brand-700 text-lg">
              Rich Super
            </div>
            <div className="text-[11px] text-slate-500 -mt-0.5">
              Order online · WhatsApp delivery
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-1 ml-4 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="px-3 py-2 rounded-md hover:bg-slate-100"
          >
            Home
          </Link>
          {CATEGORIES.slice(0, 5).map((c) => (
            <Link
              key={c.key}
              href={`/products/${c.key}`}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-3 py-2 w-72">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            placeholder="Search Rich Super..."
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>

        <button
          aria-label="Open cart"
          onClick={openDrawer}
          className="relative p-2 rounded-full hover:bg-slate-100"
        >
          <ShoppingCart className="w-6 h-6 text-slate-700" />
          {mounted && count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-brand-600 text-white text-[11px] font-bold">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
