export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  size: string;
  fabric: string;
  priceCents: number;
  image: string;
  quantity: number;
}

export interface FabricOption {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  images: string[];
  spinFrames: string[];
  sizes: string[];
  outOfStockSizes: string[];
  fabricOptions: FabricOption[];
  fabric: string;
  sku: string;
  inStock: boolean;
  category: string;
  createdAt: string;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  email: string;
  totalCents: number;
  items: CartItem[];
  status: string;
  createdAt: string;
}
