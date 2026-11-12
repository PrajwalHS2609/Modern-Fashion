import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserAddress, Currency, ViewMode, ProductColor } from '../types';
import { PRODUCTS, BLAZER_IMAGE } from '../data/products';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedGender: 'all' | 'women' | 'men';
  setSelectedGender: (gender: 'all' | 'women' | 'men') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Coupon
  appliedCoupon: { code: string; discountPct: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (shippingDetails: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }, paymentMethod: string) => Order;

  // User addresses
  userAddresses: UserAddress[];
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeAddress: (id: string) => void;

  // Toasts
  toasts: Toast[];
  removeToast: (id: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;

  // Navigation helpers
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (category: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 }
};

const INITIAL_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-1',
    label: 'Primary Residence',
    fullName: 'Lady Genevieve Laurent',
    street: '740 Park Avenue, Apt 12B',
    city: 'New York',
    postalCode: '10021',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Paris Pied-à-terre',
    fullName: 'Lady Genevieve Laurent',
    street: '18 Rue de l’Université',
    city: 'Paris',
    postalCode: '75007',
    country: 'France',
    isDefault: false
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'MV-98421-2026',
    date: '10 Nov 2026',
    items: [
      {
        productId: 'mv-001',
        productName: 'The Sovereign Double-Breasted Wool Blazer',
        productImage: BLAZER_IMAGE,
        selectedColor: 'Midnight Charcoal',
        selectedSize: '38 FR',
        price: 680,
        quantity: 1
      }
    ],
    subtotal: 680,
    discount: 102,
    shipping: 0,
    total: 578,
    status: 'In Transit',
    shippingAddress: {
      fullName: 'Genevieve Laurent',
      street: '740 Park Avenue, Apt 12B',
      city: 'New York',
      postalCode: '10021',
      country: 'United States'
    },
    paymentMethod: 'Mastercard ending in 9042'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_verite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maison_verite_wishlist');
      return saved ? JSON.parse(saved) : ['mv-001', 'mv-004'];
    } catch {
      return ['mv-001', 'mv-004'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('maison_verite_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [userAddresses, setUserAddresses] = useState<UserAddress[]>(() => {
    try {
      const saved = localStorage.getItem('maison_verite_addresses');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<'all' | 'women' | 'men'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_verite_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_verite_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_verite_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_verite_addresses', JSON.stringify(userAddresses));
    } catch {
      // ignore
    }
  }, [userAddresses]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (priceUSD: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = Math.round(priceUSD * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const addToCart = (product: Product, color: ProductColor, size: string, quantity: number = 1) => {
    const itemKey = `${product.id}-${color.name}-${size}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity
          }
        ];
      }
    });
    addToast('Added to Shopping Bag', `${product.name} (${color.name}, ${size}) added.`, 'success');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Removed from Bag', 'Item removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MAISON15' || clean === 'WELCOME15') {
      setAppliedCoupon({ code: clean, discountPct: 0.15 });
      addToast('Privilege Code Applied', '15% courtesy reduction applied to your bag.', 'success');
      return true;
    } else if (clean === 'VOGUE20') {
      setAppliedCoupon({ code: clean, discountPct: 0.20 });
      addToast('Privilege Code Applied', '20% editorial privilege applied.', 'success');
      return true;
    } else {
      addToast('Invalid Code', 'The code entered is not valid or has expired.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Code Removed', 'Privilege code removed.', 'info');
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', `${product?.name || 'Item'} removed from saved pieces.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', `${product?.name || 'Item'} saved to your private curation.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const placeOrder = (
    shippingAddress: {
      fullName: string;
      street: string;
      city: string;
      postalCode: string;
      country: string;
    },
    paymentMethod: string
  ): Order => {
    const discount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discountPct) : 0;
    const shipping = cartSubtotal >= 250 ? 0 : 25;
    const total = cartSubtotal - discount + shipping;

    const newOrder: Order = {
      id: `MV-${Math.floor(10000 + Math.random() * 90000)}-2026`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0],
        selectedColor: item.selectedColor.name,
        selectedSize: item.selectedSize,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal: cartSubtotal,
      discount,
      shipping,
      total,
      status: 'Confirmed',
      shippingAddress,
      paymentMethod
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const addAddress = (address: Omit<UserAddress, 'id'>) => {
    const newAddr: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    setUserAddresses((prev) => [...prev, newAddr]);
    addToast('Address Saved', 'New delivery destination registered.', 'success');
  };

  const removeAddress = (id: string) => {
    setUserAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address Removed', 'Destination address removed.', 'info');
  };

  const navigateToProduct = (product: Product) => {
    setQuickViewProduct(product);
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedGender,
        setSelectedGender,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        isContactOpen,
        setIsContactOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        userAddresses,
        addAddress,
        removeAddress,
        toasts,
        removeToast,
        addToast,
        navigateToProduct,
        navigateToCategory
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
