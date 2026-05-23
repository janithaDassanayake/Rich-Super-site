"use client";

import Link from "next/link";
import clsx from "clsx";
import type { CategoryKey } from "@/types";
import { CATEGORIES } from "@/data/categories";

interface Props {
  active: CategoryKey | string;
  counts?: Record<string, number>;
}

export default function CategorySidebar({ active, counts }: Props) {
  return (
    <aside className="w-full md:w-60 shrink-0">
      <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 p-2">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Categories
        </div>
        <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {CATEGORIES.map((c) => {
            const isActive = c.key === active;
            const disabled = !!c.comingSoon;
            const body = (
              <span
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm whitespace-nowrap",
                  isActive
                    ? "bg-brand-50 text-brand-800 font-semibold border-l-4 border-brand-600 -ml-px"
                    : "text-slate-700 hover:bg-slate-100",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="text-lg">{c.icon}</span>
                <span className="flex-1">{c.name}</span>
                {counts && counts[c.key] !== undefined && (
                  <span className="text-xs text-slate-400">
                    {counts[c.key]}
                  </span>
                )}
                {disabled && (
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 rounded-full">
                    Soon
                  </span>
                )}
              </span>
            );
            return (
              <li key={c.key} className="md:w-full">
                {disabled ? (
                  <div>{body}</div>
                ) : (
                  <Link href={`/products/${c.key}`}>{body}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
