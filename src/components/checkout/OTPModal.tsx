"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Camera, MessageCircle, X } from "lucide-react";
import { formatRs } from "@/lib/format";
import type { PlacedOrder } from "@/types";

interface Props {
  order: PlacedOrder;
  onClose: () => void;
}

export default function OTPModal({ order, onClose }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    const payload = `RICHSUPER-ORDER-${order.ref}-${order.otp}`;
    QRCode.toDataURL(payload, {
      width: 224,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [order.ref, order.otp]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60 animate-fadeIn" />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-3xl">✅</div>
          <h2 className="text-xl font-bold mt-2">Order sent to Rich Super</h2>
          <p className="text-sm text-slate-500 mt-1">
            Show this code to confirm your order on delivery.
          </p>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500">
            Your OTP
          </div>
          <div className="font-mono text-4xl tracking-[0.4em] font-extrabold text-brand-700 mt-1">
            {order.otp}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Order ref: <span className="font-semibold">{order.ref}</span>
          </div>
        </div>

        <div className="mt-5 grid place-items-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR code for order ${order.ref}`}
              className="w-56 h-56"
            />
          ) : (
            <div className="w-56 h-56 grid place-items-center bg-slate-100 text-slate-400 text-xs rounded">
              Generating QR…
            </div>
          )}
        </div>

        <div className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Camera className="w-3.5 h-3.5" /> Screenshot this for your records
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 p-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">Order total</div>
            <div className="font-bold text-slate-900">
              {formatRs(order.total)}
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-slate-600">Items</div>
            <div className="font-semibold text-slate-900">
              {order.items.reduce((n, i) => n + i.qty, 0)}
            </div>
          </div>
        </div>

        <a
          href={order.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-full py-3"
        >
          <MessageCircle className="w-4 h-4" />
          Re-open WhatsApp
        </a>
      </div>
    </div>
  );
}
