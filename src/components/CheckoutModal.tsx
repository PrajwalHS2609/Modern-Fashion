import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock, CreditCard, Truck, ChevronRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    formatPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    userAddresses
  } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [email, setEmail] = useState('genevieve.laurent@luxuryatelier.com');
  const [phone, setPhone] = useState('+1 (212) 555-0198');
  const [fullName, setFullName] = useState('Genevieve Laurent');
  const [street, setStreet] = useState('740 Park Avenue, Apt 12B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10021');
  const [country, setCountry] = useState('United States');
  const [deliveryOption, setDeliveryOption] = useState<'express' | 'white-glove'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'klarna' | 'cod'>('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9042');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('884');

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250;
  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discountPct) : 0;
  const baseShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25;
  const shippingAmount = deliveryOption === 'white-glove' ? baseShipping + 35 : baseShipping;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingAmount);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSelectSavedAddress = (addrId: string) => {
    const addr = userAddresses.find((a) => a.id === addrId);
    if (addr) {
      setFullName(addr.fullName);
      setStreet(addr.street);
      setCity(addr.city);
      setPostalCode(addr.postalCode);
      setCountry(addr.country);
    }
  };

  const handleCompleteOrder = () => {
    let methodLabel = 'Credit Card ending in 9042';
    if (paymentMethod === 'apple-pay') methodLabel = 'Apple Pay';
    if (paymentMethod === 'klarna') methodLabel = 'Klarna (Pay in 4)';
    if (paymentMethod === 'cod') methodLabel = 'Cash on Delivery (Courier Handover)';

    const order = placeOrder(
      {
        fullName,
        street,
        city,
        postalCode,
        country
      },
      methodLabel
    );

    setCompletedOrder(order);
    setStep('confirmation');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
    setCompletedOrder(null);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-[#171717]/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] max-w-4xl w-full max-h-[94vh] overflow-y-auto border border-[#E8DFD2] shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="p-6 bg-white border-b border-[#E8DFD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl tracking-widest text-[#171717] uppercase">
              MAISON VÉRITÉ
            </span>
            <span className="text-xs text-[#888888] uppercase tracking-wider hidden sm:inline">
              | Secure Concierge Checkout
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-[#454545]">
              <Lock className="w-3.5 h-3.5 text-[#B89B65]" />
              <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#454545] hover:text-[#171717] rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Progress */}
        {step !== 'confirmation' && (
          <div className="bg-white border-b border-[#E8DFD2] px-6 py-3 flex items-center justify-center gap-6 text-xs font-sans-body">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#171717] font-semibold' : 'text-[#888888]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Client & Shipping</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#171717] font-semibold' : 'text-[#888888]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#171717] text-white' : 'bg-[#E8DFD2] text-[#454545]'}`}>2</span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Step 1: Details & Shipping */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Contact Information */}
              <div>
                <h3 className="font-editorial text-lg text-[#171717] mb-3">1. Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Phone Number (courier updates)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>
                </div>
              </div>

              {/* Saved Address Quick Select */}
              {userAddresses.length > 0 && (
                <div className="p-4 bg-white border border-[#E8DFD2]">
                  <span className="text-[11px] uppercase tracking-wider text-[#B89B65] font-semibold block mb-2">
                    Quick Select From Saved Addresses
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {userAddresses.map((addr) => (
                      <button
                        type="button"
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr.id)}
                        className="text-xs px-3 py-1.5 border border-[#E8DFD2] hover:border-[#171717] bg-[#F7F5F0] text-[#171717] transition-colors"
                      >
                        {addr.label}: {addr.city}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              <div>
                <h3 className="font-editorial text-lg text-[#171717] mb-3">2. Delivery Address</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Street Address & Apartment
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full bg-white border border-[#E8DFD2] px-3 py-2.5 text-xs text-[#171717] focus:outline-hidden focus:border-[#171717]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div>
                <h3 className="font-editorial text-lg text-[#171717] mb-3">3. Delivery Method</h3>
                <div className="space-y-2">
                  <label
                    onClick={() => setDeliveryOption('express')}
                    className={`p-3.5 border block cursor-pointer transition-all ${
                      deliveryOption === 'express' ? 'border-[#171717] bg-white' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#B89B65]" />
                        <span className="font-semibold text-[#171717]">Complimentary Express Courier</span>
                        <span className="text-[#454545]">(2-4 Business Days)</span>
                      </div>
                      <span className="font-semibold text-[#171717]">
                        {baseShipping === 0 ? 'Free' : formatPrice(25)}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryOption('white-glove')}
                    className={`p-3.5 border block cursor-pointer transition-all ${
                      deliveryOption === 'white-glove' ? 'border-[#171717] bg-white' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#B89B65]" />
                        <span className="font-semibold text-[#171717]">White-Glove Appointment Courier</span>
                        <span className="text-[#454545]">(Scheduled evening delivery)</span>
                      </div>
                      <span className="font-semibold text-[#171717]">
                        {formatPrice(35)}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ChevronRight className="w-4 h-4 text-[#B89B65]" />
              </button>
            </div>

            {/* Sidebar Order Summary (Right 5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#E8DFD2] p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-editorial text-lg text-[#171717] pb-3 border-b border-[#E8DFD2] mb-4">
                  Order Summary ({cart.length} pieces)
                </h4>

                <div className="max-h-60 overflow-y-auto space-y-3 mb-6 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover bg-[#F2EFE8]" />
                      <div className="flex-1">
                        <h5 className="font-editorial text-sm text-[#171717] line-clamp-1">{item.product.name}</h5>
                        <p className="text-[#888888]">{item.selectedColor.name} · {item.selectedSize} · Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold tabular-nums text-[#171717] font-sans-body">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8DFD2] pt-4 space-y-2 text-xs text-[#454545] font-sans-body">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-[#171717]">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#B89B65]">
                      <span>Privilege Code ({appliedCoupon.code})</span>
                      <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="tabular-nums text-[#171717]">
                      {shippingAmount === 0 ? 'Complimentary' : formatPrice(shippingAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-editorial text-[#171717] pt-3 border-t border-[#E8DFD2]">
                    <span>Total</span>
                    <span className="font-semibold tabular-nums">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-[11px] text-[#888888] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B89B65]" />
                <span>30-Day Hassle-free Returns & Exchanges</span>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Payment & Review */}
        {step === 'payment' && (
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <button
                onClick={() => setStep('details')}
                className="text-xs text-[#454545] hover:text-[#171717] flex items-center gap-1.5 transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Shipping Details</span>
              </button>

              <h3 className="font-editorial text-xl text-[#171717]">Select Payment Method</h3>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'card' ? 'border-[#171717] bg-white font-semibold' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#B89B65]" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'apple-pay' ? 'border-[#171717] bg-white font-semibold' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                  }`}
                >
                  <span className="text-base font-bold block mb-0.5">Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'klarna' ? 'border-[#171717] bg-white font-semibold' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                  }`}
                >
                  <span className="text-xs font-bold block mb-1 text-pink-600">Klarna.</span>
                  <span>Pay in 4</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-center transition-all ${
                    paymentMethod === 'cod' ? 'border-[#171717] bg-white font-semibold' : 'border-[#E8DFD2] bg-[#F7F5F0]'
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1 text-[#B89B65]" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Inputs */}
              {paymentMethod === 'card' && (
                <div className="p-6 bg-white border border-[#E8DFD2] space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs font-mono text-[#171717]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs font-mono text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs font-mono text-[#171717]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-5 bg-white border border-[#B89B65]/40 text-xs text-[#454545] space-y-2">
                  <h4 className="font-semibold text-[#171717] flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#B89B65]" />
                    <span>Cash on Delivery Verification</span>
                  </h4>
                  <p>
                    Please have the exact amount of <span className="font-bold text-[#171717]">{formatPrice(finalTotal)}</span> ready upon courier arrival. Our courier accepts local currency or contactless credit terminal at the door.
                  </p>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-5 bg-white border border-[#E8DFD2] text-xs text-[#454545]">
                  <p>
                    Pay 4 interest-free payments of <span className="font-bold text-[#171717]">{formatPrice(Math.round(finalTotal / 4))}</span> every 2 weeks. No hidden fees.
                  </p>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-5 bg-white border border-[#E8DFD2] text-xs text-center text-[#454545]">
                  <p>Click below to authenticate securely using Touch ID / Face ID on your device.</p>
                </div>
              )}

              {/* Complete Order Button */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full py-4 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#B89B65]" />
                <span>Place Order · {formatPrice(finalTotal)}</span>
              </button>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-5 bg-white border border-[#E8DFD2] p-6 space-y-4">
              <h4 className="font-editorial text-lg text-[#171717] border-b border-[#E8DFD2] pb-3">
                Review Delivery Details
              </h4>
              <div className="text-xs text-[#454545] space-y-1">
                <p className="font-semibold text-[#171717]">{fullName}</p>
                <p>{street}</p>
                <p>{city}, {postalCode}, {country}</p>
                <p className="pt-2 text-[#888888]">{email} · {phone}</p>
              </div>

              <div className="border-t border-[#E8DFD2] pt-4 text-xs space-y-1.5 font-sans-body">
                <div className="flex justify-between">
                  <span>Total Amount Due:</span>
                  <span className="font-editorial text-base text-[#171717] font-semibold tabular-nums">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmation' && completedOrder && (
          <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#171717] text-[#B89B65] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold block mb-2">
                Order Confirmed
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal mb-2">
                Thank You, {completedOrder.shippingAddress.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-[#454545] font-sans-body">
                Your order <span className="font-mono font-bold text-[#171717]">{completedOrder.id}</span> has been transmitted to our master tailors for preparation.
              </p>
            </div>

            {/* Stepper Status Indicator */}
            <div className="p-6 bg-white border border-[#E8DFD2] text-left">
              <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-4">
                Atelier Fulfillment Status
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-sans-body">
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-[#171717] mx-auto" />
                  <span className="font-semibold text-[#171717] block text-[11px]">Confirmed</span>
                  <span className="text-[10px] text-[#888888]">Today</span>
                </div>
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-[#B89B65] mx-auto animate-pulse" />
                  <span className="font-semibold text-[#B89B65] block text-[11px]">Tailoring</span>
                  <span className="text-[10px] text-[#888888]">In Progress</span>
                </div>
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-[#E8DFD2] mx-auto" />
                  <span className="text-[#888888] block text-[11px]">Dispatch</span>
                  <span className="text-[10px] text-[#888888]">Pending</span>
                </div>
                <div className="space-y-1">
                  <div className="w-3 h-3 rounded-full bg-[#E8DFD2] mx-auto" />
                  <span className="text-[#888888] block text-[11px]">Delivered</span>
                  <span className="text-[10px] text-[#888888]">Doorstep</span>
                </div>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="p-6 bg-white border border-[#E8DFD2] text-left space-y-3 text-xs text-[#454545] font-sans-body">
              <div className="flex justify-between border-b border-[#E8DFD2] pb-2">
                <span className="font-semibold text-[#171717]">Delivery Address:</span>
                <span>{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DFD2] pb-2">
                <span className="font-semibold text-[#171717]">Payment Method:</span>
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-editorial text-[#171717]">
                <span className="font-normal">Total Paid:</span>
                <span className="font-semibold tabular-nums">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2A2A] transition-colors"
            >
              Continue Browsing Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
