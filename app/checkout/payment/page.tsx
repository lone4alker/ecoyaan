"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '../../context/CheckoutContext';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();
  const { cart, address } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });

  if (!cart) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const subtotal = cart.cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
  const grandTotal = subtotal + cart.shipping_fee - cart.discount_applied;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/checkout/success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto py-8">
      {/* 1. Order Review & Address */}
      <div className="space-y-8">
        <div className="ecoyaan-card shadow-sm border-gray-100 p-8 sm:p-10">
          <h2 className="text-xl font-black text-secondary tracking-tight mb-8">Review Order</h2>
          <div className="divide-y border-t border-b border-gray-50 mb-8">
            {cart.cartItems.map((item) => (
              <div key={item.product_id} className="py-5 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative bg-gray-50 rounded-xl overflow-hidden border border-gray-50">
                    <Image src={item.image} alt={item.product_name} fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary leading-tight max-w-[200px]">{item.product_name}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-secondary">₹{item.product_price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-500 font-medium tracking-tight">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 font-medium tracking-tight">
              <span>Delivery Fee</span>
              <span>₹{cart.shipping_fee}</span>
            </div>
            <div className="flex justify-between font-black text-xl pt-4 border-t border-gray-100 mt-4 text-secondary">
              <span>Grand Total</span>
              <span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        <div className="ecoyaan-card shadow-sm border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-secondary tracking-tight">Shipping To:</h3>
            <button 
              onClick={() => router.push('/checkout/shipping')} 
              className="text-primary text-xs font-black uppercase tracking-wider hover:underline"
            >
              Change
            </button>
          </div>
          <div className="text-gray-700 space-y-2">
            <p className="font-bold text-lg">{address.fullName || 'Guest User'}</p>
            <p className="text-sm font-medium text-gray-400">
              {[address.email, address.phone].filter(Boolean).join(' • ')}
            </p>
            <p className="gap-1 flex flex-wrap text-sm text-gray-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {[address.pinCode, address.city, address.state].filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Unified Payment Card */}
      <div className="ecoyaan-card shadow-lg border-gray-100 p-8 sm:p-10 h-fit bg-white">
        <h2 className="text-xl font-black text-secondary tracking-tight mb-8">Payment Securely</h2>
        
        <form onSubmit={handlePayment} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 border-2 border-primary rounded-2xl bg-white shadow-sm shadow-primary/5">
              <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
              <div className="flex-1">
                <p className="font-black text-secondary text-sm">Debit / Credit Card</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Safe & Encryption Guarded</p>
              </div>
            </div>

            {/* Card Inputs */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="col-span-full">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Card Number</label>
                <input 
                  type="text" 
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="xxxx xxxx xxxx xxxx" 
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300 font-mono text-sm shadow-sm"
                  value={cardData.number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                    setCardData({...cardData, number: val});
                  }}
                />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Expiry Date</label>
                <input 
                  type="text" 
                  required
                  inputMode="numeric"
                  placeholder="MM / YY" 
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300 font-mono text-sm shadow-sm"
                  value={cardData.expiry}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                    setCardData({...cardData, expiry: val});
                  }}
                />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">CVV</label>
                <input 
                  type="password" 
                  required
                  inputMode="numeric"
                  placeholder="***" 
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300 font-mono text-sm shadow-sm"
                  value={cardData.cvv}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').substring(0, 3);
                    setCardData({...cardData, cvv: val});
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isProcessing}
              className="btn-ecoyaan w-full py-5 text-lg shadow-xl shadow-primary/20 relative overflow-hidden flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Syncing Payment...
                </span>
              ) : (
                `Pay Securely ₹${grandTotal}`
              )}
            </button>
            <p className="mt-6 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
               100% Payment Security Assurance <br/>
               SSL Encrypted Payment Gateway
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
