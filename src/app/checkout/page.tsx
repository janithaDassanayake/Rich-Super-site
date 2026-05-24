"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/cartStore";
import { formatRs } from "@/lib/format";
import { generateOtp, generateOrderRef } from "@/lib/otp";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import OrderForm from "@/components/checkout/OrderForm";
import OTPModal from "@/components/checkout/OTPModal";
import type { CustomerDetails, OrderDetails, PlacedOrder } from "@/types";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.totalPrice());
  const clear = useCart((s) => s.clear);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const handlePlace = ({
    customer,
    order: orderDetails,
  }: {
    customer: CustomerDetails;
    order: OrderDetails;
  }) => {
    const otp = generateOtp();
    const ref = generateOrderRef();
    const message = buildOrderMessage({
      items,
      customer,
      order: orderDetails,
      total,
      ref,
      otp,
    });
    const whatsappUrl = buildWhatsAppUrl(message);
    const placed: PlacedOrder = {
      ref,
      otp,
      total,
      items: [...items],
      customer,
      order: orderDetails,
      whatsappUrl,
    };
    setOrder(placed);
    // WhatsApp is NOT opened here — the user must first confirm the QR
    // screenshot via the modal's OK button.
  };

  const handleConfirm = () => {
    if (!order) return;
    if (typeof window !== "undefined") {
      window.open(order.whatsappUrl, "_blank", "noopener");
    }
    clear();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-500 mb-2">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-700 font-medium">Checkout</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900">Checkout</h1>
      <p className="text-slate-500 text-sm mt-1">
        Fill in your details, pick pickup or delivery, then confirm via
        WhatsApp.
      </p>

      {items.length === 0 && !order ? (
        <div className="mt-10 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          Your cart is empty.{" "}
          <Link href="/" className="text-brand-700 font-semibold hover:underline">
            Browse products
          </Link>
          .
        </div>
      ) : (
        <div className="mt-6 grid md:grid-cols-[1fr_340px] gap-8">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 md:order-2 h-fit md:sticky md:top-24">
            <h2 className="font-semibold text-slate-800 mb-3">Order summary</h2>
            <ul className="divide-y divide-slate-100">
              {(order ? order.items : items).map((i) => (
                <li key={i.product.id} className="py-3 flex gap-3">
                  <div className="relative w-14 h-14 rounded bg-slate-50 overflow-hidden shrink-0">
                    <Image
                      src={i.product.image}
                      alt={i.product.name}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 line-clamp-1">
                      {i.product.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {i.product.unit} · {formatRs(i.product.promoPrice)} × {i.qty}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {formatRs(i.product.promoPrice * i.qty)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between text-base">
              <span className="font-semibold text-slate-700">Total</span>
              <span className="font-extrabold text-brand-700 text-lg">
                {formatRs(order ? order.total : total)}
              </span>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 md:order-1">
            <OrderForm disabled={items.length === 0} onSubmit={handlePlace} />
          </section>
        </div>
      )}

      {order && (
        <OTPModal
          order={order}
          onConfirm={handleConfirm}
          onClose={() => setOrder(null)}
        />
      )}
    </div>
  );
}
