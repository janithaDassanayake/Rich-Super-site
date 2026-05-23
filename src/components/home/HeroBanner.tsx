"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type Visual =
  | { kind: "image"; src: string; alt: string }
  | { kind: "emoji"; emoji: string };

interface Slide {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  ctaHref: string;
  bg: string; // tailwind gradient classes
  visual: Visual;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Welcome to Rich Super",
    title: "Your weekly groceries, on WhatsApp.",
    desc:
      "Hand-picked items, fair prices, delivered the same day to your door. Minimum 5 units per item.",
    cta: "Shop Rice & Grains",
    ctaHref: "/products/rice",
    bg: "from-brand-600 via-brand-500 to-emerald-600",
    visual: {
      kind: "image",
      src: "/storefront.png",
      alt: "Rich Super storefront with bright green facade",
    },
  },
  {
    eyebrow: "This week's deals",
    title: "Save up to 25% on snacks & biscuits.",
    desc:
      "Stock up your pantry — Munchee, Maliban, Cherish, Walkers and more.",
    cta: "See Snacks",
    ctaHref: "/products/snacks",
    bg: "from-amber-500 via-orange-500 to-rose-500",
    visual: { kind: "emoji", emoji: "🍪" },
  },
  {
    eyebrow: "Daily essentials",
    title: "Detergent, soap, milk powder — all in one place.",
    desc:
      "Family-size packs at family-friendly prices. Confirm your order in a single WhatsApp message.",
    cta: "Shop Household",
    ctaHref: "/products/household",
    bg: "from-sky-600 via-indigo-600 to-violet-600",
    visual: { kind: "emoji", emoji: "🧺" },
  },
];

export default function HeroBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section className="relative overflow-hidden">
      <div
        key={idx}
        className={`bg-gradient-to-br ${slide.bg} text-white transition-all`}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fadeIn">
            <div className="text-xs uppercase tracking-widest opacity-80">
              {slide.eyebrow}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-white/90 max-w-md">{slide.desc}</p>
            <Link
              href={slide.ctaHref}
              className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-5 py-3 rounded-full hover:bg-slate-100 transition"
            >
              {slide.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="hidden md:flex justify-end animate-fadeIn">
            {slide.visual.kind === "image" ? (
              <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
                <Image
                  src={slide.visual.src}
                  alt={slide.visual.alt}
                  fill
                  sizes="(max-width: 768px) 0px, 480px"
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/15 backdrop-blur grid place-items-center text-9xl">
                {slide.visual.emoji}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition ${
              i === idx ? "bg-white w-6" : "bg-white/50 w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
