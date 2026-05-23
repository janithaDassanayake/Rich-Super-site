import type { CartItem, CustomerDetails } from "@/types";
import { formatRs } from "./format";

const SHOP = process.env.NEXT_PUBLIC_SHOP_NAME ?? "Rich Super";

const orderNumber = (): string =>
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94717233803";

interface BuildArgs {
  items: CartItem[];
  customer: CustomerDetails;
  total: number;
  ref: string;
  otp: string;
}

export const buildOrderMessage = ({
  items,
  customer,
  total,
  ref,
  otp,
}: BuildArgs): string => {
  const lines: string[] = [];
  lines.push(`🛒 *NEW ORDER — ${SHOP}*`);
  lines.push("──────────────────────────");
  lines.push(`🧾 Ref: ${ref}`);
  lines.push(`👤 Customer: ${customer.name}`);
  lines.push(`📞 Phone: ${customer.phone}`);
  lines.push(`📍 Address: ${customer.address}`);
  lines.push("");
  lines.push("📦 *Order Items:*");
  for (const i of items) {
    const sub = i.qty * i.product.promoPrice;
    lines.push(
      `• ${i.product.name} (${i.product.unit}) × ${i.qty} — ${formatRs(sub)}`
    );
  }
  lines.push("");
  lines.push("──────────────────────────");
  lines.push(`💰 *Total: ${formatRs(total)}*`);
  lines.push(`🔐 *OTP: ${otp}*`);
  lines.push("──────────────────────────");
  lines.push(`Received via ${SHOP}`);
  return lines.join("\n");
};

export const buildWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${orderNumber()}?text=${encodeURIComponent(message)}`;
};
