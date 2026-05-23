import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94717233803";

  return (
    <footer className="mt-16 bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-extrabold text-white">Rich Super</div>
          <p className="text-sm text-slate-400 mt-2 max-w-xs">
            Bringing the supermarket experience online. Order via WhatsApp,
            pay on delivery.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={`https://wa.me/${phone}`}
              className="p-2 bg-brand-600 hover:bg-brand-700 rounded-full"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Shop</div>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.key}>
                <Link
                  href={`/products/${c.key}`}
                  className="text-slate-400 hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${phone}`}
                className="hover:text-white"
              >
                +{phone}
              </a>
            </li>
            <li>Open daily 8:00 AM – 9:00 PM</li>
            <li>Delivery: Colombo &amp; suburbs</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">About</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Quality groceries, friendly prices</li>
            <li>Minimum order quantity: 5 units</li>
            <li>Orders confirmed via WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Rich Super. All rights reserved.
      </div>
    </footer>
  );
}
