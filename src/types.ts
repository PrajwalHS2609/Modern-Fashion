export type Currency = 'USD' | 'EUR' | 'GBP';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  sizePurchased?: string;
  colorPurchased?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'Women' | 'Men' | 'Outerwear' | 'Knitwear' | 'Accessories' | 'Footwear';
  gender: 'women' | 'men' | 'unisex';
  occasion: 'Everyday' | 'Workwear' | 'Occasion' | 'Casual' | 'Vacation';
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  tag?: 'New Arrival' | 'Best Seller' | 'Limited Edition' | 'Artisanal';
  description: string;
  fabric: string;
  craftsmanship: string;
  care: string;
  inStock: boolean;
  stockCount?: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Atelier Tailoring' | 'In Transit' | 'Delivered';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface UserAddress {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export type ViewMode = 'home' | 'catalog' | 'lookbook' | 'journal' | 'story';
