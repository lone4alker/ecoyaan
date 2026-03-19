"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCheckout } from './context/CheckoutContext';

export default function CartPage() {
  const { cart, isLoading } = useCheckout();

  if (isLoading || !cart) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const subtotal = cart.cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
  const grandTotal = subtotal + cart.shipping_fee - cart.discount_applied;

  return (
    <div className="space-y-6 pb-32">
      {/* 1. Savings Banner */}
      {cart.discount_applied > 0 && (
        <div className="banner-savings">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>
          <div>
            <p className="font-bold text-sm">You saved ₹{cart.discount_applied} in total</p>
            <p className="text-xs text-secondary opacity-80">Great choice! You're making sustainable shopping more rewarding.</p>
          </div>
        </div>
      )}

      {/* 2. Delivery Address Placeholder */}
      <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-300">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-gray-800">Delivery address:</span>
          <button className="text-[10px] font-bold px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary-hover hover:text-white transition-colors">
            Add address
          </button>
        </div>
        <p className="text-xs text-gray-400 font-medium italic">No default address set. Please add an address.</p>
      </div>

      {/* 3. List Header */}
      <div className="flex items-center justify-between py-2">
        <h2 className="font-bold text-gray-800">List of added items</h2>
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 border-2 border-primary rounded flex items-center justify-center bg-primary text-white">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <span className="text-[10px] font-bold text-gray-700 group-hover:text-primary transition-colors">Deselect All Products</span>
        </label>
      </div>

      {/* 4. Cart Items */}
      <div className="space-y-8 mt-4 overflow-hidden">
        {cart.cartItems.map((item) => (
          <div key={item.product_id} className="relative group">
            <div className="flex gap-6 items-start">
              {/* Checkbox */}
              <div className="pt-8">
                <div className="w-4 h-4 border-2 border-primary rounded bg-primary text-white flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100">
                <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.product_name} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized 
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-secondary max-w-lg leading-tight">
                      {item.product_name}
                    </h3>
                    <div className="flex gap-4">
                      <button className="text-primary hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
                      <button className="text-gray-400 hover:text-primary transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8m0 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"/></svg></button>
                      <button className="text-primary hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2 max-w-2xl">
                    Product Features: Soft natural coir fiber for excellent scrubbing, softened by proprietary chemical-free methods. Exclusive use of long bristles alone to reduce shedding and avoid clogging of drains. Does not leave scratches on Teflon...
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-bold text-sm">₹{item.product_price}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-500">Qty:</span>
                      <div className="flex items-center gap-2">
                        <button className="qty-btn">-</button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button className="qty-btn">+</button>
                      </div>
                    </div>
                    <button className="text-primary text-[10px] font-bold hover:underline">Save for later</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Totals Footer Area */}
      <div className="max-w-7xl mx-auto py-8 space-y-3">
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>Total items: {cart.cartItems.length}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>Delivery Fee:</span>
          <span>₹{cart.shipping_fee}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
          <span className="text-lg font-extrabold text-secondary">Grand Total:</span>
          <span className="text-xl font-black text-secondary">₹{grandTotal}</span>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] py-4 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <Link href="/checkout/shipping" className="btn-ecoyaan">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
