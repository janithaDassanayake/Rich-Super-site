export type CategoryKey =
  | "rice"
  | "dairy"
  | "soap"
  | "snacks"
  | "beverages"
  | "household"
  | "vegetables"
  | "frozen";

export interface Category {
  key: CategoryKey;
  name: string;
  icon: string; // emoji
  comingSoon?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryKey;
  image: string;
  unit: string;
  mrpPrice: number;
  promoPrice: number;
  minQty: number;
  trending: boolean;
  promo: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

export interface PlacedOrder {
  ref: string;
  otp: string;
  total: number;
  items: CartItem[];
  customer: CustomerDetails;
  whatsappUrl: string;
}
