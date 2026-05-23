export const formatRs = (n: number): string => {
  return "Rs. " + Math.round(n).toLocaleString("en-IN");
};

export const discountPct = (mrp: number, promo: number): number => {
  if (mrp <= 0 || promo >= mrp) return 0;
  return Math.round(((mrp - promo) / mrp) * 100);
};
