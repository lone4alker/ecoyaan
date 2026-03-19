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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Product List */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Your Cart <span className="bg-primary text-white text-sm px-2 py-0.5 rounded-full">{cart.cartItems.length}</span>
        </h1>

        {cart.cartItems.map((item) => (
          <div key={item.product_id} className="card flex flex-col sm:flex-row items-center gap-4 transition-transform hover:scale-[1.01]">
            <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-muted rounded-md overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.product_name} 
                fill 
                className="object-cover"
                unoptimized // for placeholder/external images
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-secondary">{item.product_name}</h3>
              <p className="text-gray-500 text-sm">₹{item.product_price} per unit</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-3">
                <span className="text-sm font-medium">Quantity: {item.quantity}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary">₹{item.product_price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="card sticky top-24">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>₹{cart.shipping_fee}</span>
            </div>
            {cart.discount_applied > 0 && (
              <div className="flex justify-between text-success font-medium">
                <span>Discount Applied</span>
                <span>-₹{cart.discount_applied}</span>
              </div>
            )}
            <div className="pt-4 border-t flex justify-between font-bold text-xl text-secondary">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <Link href="/checkout/shipping" className="btn-primary w-full text-center">
            Proceed to Checkout
          </Link>
          
          <p className="mt-4 text-xs text-center text-gray-400">
            By proceeding, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
