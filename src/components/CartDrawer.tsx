import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setCurrentView
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discountPct) : 0;
  const shippingAmount = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0 ? 0 : 25;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setCurrentView('catalog');
  };

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 bg-[#171717]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] max-w-md w-full h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DFD2] animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#E8DFD2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#B89B65]" />
            <h3 className="font-editorial text-xl text-[#171717]">Shopping Bag</h3>
            <span className="text-xs text-[#454545] tabular-nums">({cart.length} items)</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#454545] hover:text-[#171717] rounded-full transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E8DFD2] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-sans-body">
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-[#171717] font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#B89B65]" />
                <span>Complimentary Express Shipping Unlocked</span>
              </span>
            ) : (
              <span className="text-[#454545]">
                Add <span className="font-semibold text-[#171717]">{formatPrice(amountNeededForFreeShipping)}</span> more for Complimentary Express Shipping
              </span>
            )}
            <span className="font-semibold text-[#171717] tabular-nums">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E8DFD2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B89B65] transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white border border-[#E8DFD2] flex gap-4 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 aspect-[4/5] bg-[#F2EFE8] overflow-hidden shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-editorial text-sm text-[#171717] leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#888888] hover:text-[#171717] transition-colors p-0.5"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#454545] mt-1 font-sans-body">
                      <span>{item.selectedColor.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8DFD2]/60">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E8DFD2] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#171717] hover:bg-[#F7F5F0]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#171717] hover:bg-[#F7F5F0]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-editorial text-sm text-[#171717] font-semibold tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
              <h4 className="font-editorial text-xl text-[#171717] mb-2">Your Bag is Empty</h4>
              <p className="text-xs text-[#454545] font-sans-body mb-6 max-w-xs mx-auto">
                Discover tailored coats, pure cashmere knitwear, and handcrafted leather accessories from our current collection.
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Coupon & Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8DFD2] space-y-4">
            
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 bg-[#F7F5F0] border border-[#B89B65]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#171717]">
                    <Tag className="w-3.5 h-3.5 text-[#B89B65]" />
                    <span className="font-semibold">{appliedCoupon.code}</span>
                    <span className="text-[#B89B65]">({Math.round(appliedCoupon.discountPct * 100)}% off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#888888] hover:text-[#171717] text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter privilege code (e.g. WELCOME15)..."
                    className="flex-1 bg-[#F7F5F0] border border-[#E8DFD2] text-xs px-3 py-2 text-[#171717] uppercase tracking-wider focus:outline-hidden focus:border-[#171717]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-wider font-semibold shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#454545] font-sans-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#171717]">{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#B89B65]">
                  <span>Privilege Reduction</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span className="tabular-nums text-[#171717]">
                  {shippingAmount === 0 ? 'Complimentary' : formatPrice(shippingAmount)}
                </span>
              </div>
              <div className="flex justify-between text-base font-editorial text-[#171717] pt-2 border-t border-[#E8DFD2]">
                <span>Total Amount</span>
                <span className="font-semibold tabular-nums">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B89B65]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#888888]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89B65]" />
              <span>256-bit Encrypted Checkout · Duties Calculated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
