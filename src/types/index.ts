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

export type OrderType = "pickup" | "delivery";

export interface PickupSchedule {
  date: string; // YYYY-MM-DD
  slotLabel: string; // e.g. "12:30 PM – 2:30 PM"
}

export interface DeliveryDetails {
  landmark: string;
  notes: string;
  date: string; // YYYY-MM-DD
}

export interface OrderDetails {
  orderType: OrderType;
  pickup?: PickupSchedule;
  delivery?: DeliveryDetails;
}

export interface PlacedOrder {
  ref: string;
  otp: string;
  total: number;
  items: CartItem[];
  customer: CustomerDetails;
  order: OrderDetails;
  whatsappUrl: string;
}
