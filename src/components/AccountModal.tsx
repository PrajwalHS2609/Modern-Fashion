import React, { useState } from 'react';
import { X, Package, MapPin, Heart, User, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    orders,
    userAddresses,
    addAddress,
    removeAddress,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    openQuickView
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // New address state
  const [newLabel, setNewLabel] = useState('Milan Studio');
  const [newFullName, setNewFullName] = useState('Genevieve Laurent');
  const [newStreet, setNewStreet] = useState('Via Montenapoleone 8');
  const [newCity, setNewCity] = useState('Milan');
  const [newPostal, setNewPostal] = useState('20121');
  const [newCountry, setNewCountry] = useState('Italy');

  if (!isAccountOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      label: newLabel,
      fullName: newFullName,
      street: newStreet,
      city: newCity,
      postalCode: newPostal,
      country: newCountry,
      isDefault: false
    });
    setShowAddAddressForm(false);
  };

  return (
    <div
      onClick={() => setIsAccountOpen(false)}
      className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#E8DFD2] shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DFD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#171717] text-[#B89B65] flex items-center justify-center font-editorial text-lg">
              GL
            </div>
            <div>
              <h3 className="font-editorial text-xl text-[#171717]">Lady Genevieve Laurent</h3>
              <span className="text-xs text-[#888888] font-sans-body">Maison Vérité Private Patron Since 2024</span>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-[#454545] hover:text-[#171717] rounded-full transition-colors"
            aria-label="Close client account"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#E8DFD2] px-6 flex gap-6 text-xs font-sans-body overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'orders' ? 'border-[#171717] text-[#171717] font-semibold' : 'border-transparent text-[#888888] hover:text-[#171717]'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#B89B65]" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'wishlist' ? 'border-[#171717] text-[#171717] font-semibold' : 'border-transparent text-[#888888] hover:text-[#171717]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#B89B65]" />
            <span>Saved Pieces ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'addresses' ? 'border-[#171717] text-[#171717] font-semibold' : 'border-transparent text-[#888888] hover:text-[#171717]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#B89B65]" />
            <span>Saved Addresses ({userAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'profile' ? 'border-[#171717] text-[#171717] font-semibold' : 'border-transparent text-[#888888] hover:text-[#171717]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#B89B65]" />
            <span>Profile & Style Preferences</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-white border border-[#E8DFD2] p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD2] pb-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#888888] block">Order Identifier</span>
                        <span className="font-mono font-bold text-sm text-[#171717]">{ord.id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-sans-body">
                        <span className="text-[#888888]">Placed {ord.date}</span>
                        <span className="px-2.5 py-0.5 bg-[#F7F5F0] border border-[#B89B65]/40 text-[#171717] font-semibold">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={item.productImage} alt={item.productName} className="w-12 h-14 object-cover bg-[#F2EFE8]" />
                            <div>
                              <h5 className="font-editorial text-sm text-[#171717]">{item.productName}</h5>
                              <p className="text-[#888888]">{item.selectedColor} · Size {item.selectedSize} · Qty {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold tabular-nums text-sm text-[#171717]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E8DFD2] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#454545] gap-2">
                      <p>Delivered to: {ord.shippingAddress.street}, {ord.shippingAddress.city}</p>
                      <div className="flex items-center gap-2">
                        <span>Total Paid:</span>
                        <span className="font-editorial text-base font-semibold text-[#171717] tabular-nums">
                          {formatPrice(ord.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white border border-[#E8DFD2]">
                  <p className="text-xs text-[#888888]">No orders found in your client history.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((prod) => (
                    <div key={prod.id} className="bg-white border border-[#E8DFD2] p-4 flex flex-col justify-between">
                      <div className="aspect-[4/5] bg-[#F2EFE8] overflow-hidden mb-3">
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-editorial text-base text-[#171717] mb-1 line-clamp-1">{prod.name}</h4>
                        <span className="text-xs font-semibold tabular-nums text-[#171717] block mb-3">
                          {formatPrice(prod.price)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            addToCart(prod, prod.colors[0], prod.sizes[0], 1);
                            toggleWishlist(prod.id);
                          }}
                          className="flex-1 py-2 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-wider font-semibold"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="p-2 border border-[#E8DFD2] text-[#888888] hover:text-[#171717]"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-[#E8DFD2]">
                  <p className="text-xs text-[#888888]">You have no saved pieces in your private curation.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-editorial text-lg text-[#171717]">Registered Destinations</h4>
                <button
                  onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                  className="px-3.5 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B89B65]" />
                  <span>Add New Destination</span>
                </button>
              </div>

              {showAddAddressForm && (
                <form onSubmit={handleCreateAddress} className="p-6 bg-white border border-[#E8DFD2] space-y-4 animate-in fade-in duration-200">
                  <h5 className="font-editorial text-base text-[#171717]">New Delivery Destination</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">Label (e.g. Milan Villa)</label>
                      <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        required
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        required
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">Street Address</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      required
                      className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        required
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={newPostal}
                        onChange={(e) => setNewPostal(e.target.value)}
                        required
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">Country</label>
                      <input
                        type="text"
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        required
                        className="w-full bg-[#F7F5F0] border border-[#E8DFD2] px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="px-4 py-2 border border-[#E8DFD2] text-xs text-[#454545]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold"
                    >
                      Save Destination
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userAddresses.map((addr) => (
                  <div key={addr.id} className="bg-white border border-[#E8DFD2] p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#171717]">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] text-[#B89B65] font-semibold uppercase tracking-wider">Default</span>
                        )}
                      </div>
                      <p className="text-xs text-[#454545] font-semibold">{addr.fullName}</p>
                      <p className="text-xs text-[#888888]">{addr.street}</p>
                      <p className="text-xs text-[#888888]">{addr.city}, {addr.postalCode}, {addr.country}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E8DFD2] flex justify-end">
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="text-xs text-[#888888] hover:text-[#171717] flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#E8DFD2] p-6 max-w-xl mx-auto space-y-6">
              <h4 className="font-editorial text-lg text-[#171717]">Sartorial Preferences</h4>
              <div className="space-y-4 text-xs font-sans-body text-[#454545]">
                <div>
                  <span className="font-semibold text-[#171717] block mb-1">Preferred Silhouette Cut:</span>
                  <p>Architectural / Deconstructed Relaxed Tailoring</p>
                </div>
                <div>
                  <span className="font-semibold text-[#171717] block mb-1">Standard Garment Size:</span>
                  <p>38 FR / M (Chest: 88 cm, Waist: 68 cm)</p>
                </div>
                <div>
                  <span className="font-semibold text-[#171717] block mb-1">Personal Stylist Assigned:</span>
                  <p>Claire Delacroix (Paris 7th Arrondissement Showroom)</p>
                </div>
                <div className="pt-4 border-t border-[#E8DFD2]">
                  <span className="font-semibold text-[#171717] block mb-1">Privilege Tier:</span>
                  <p className="text-[#B89B65] font-semibold">Atelier Patron — Complimentary Tailoring & Private Viewings</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
