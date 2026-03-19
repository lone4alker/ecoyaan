"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '../../context/CheckoutContext';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();
  const { cart, address } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  const subtotal = cart.cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
  const grandTotal = subtotal + cart.shipping_fee - cart.discount_applied;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/checkout/success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Order Review */}
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Confirm Your Order
          </h2>
          <div className="divide-y border-t border-b mb-6">
            {cart.cartItems.map((item) => (
              <div key={item.product_id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    <Image src={item.image} alt={item.product_name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.product_name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-sm">₹{item.product_price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₹{cart.shipping_fee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total to Pay</span>
              <span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Shipping Address</h3>
            <button 
              onClick={() => router.push('/checkout/shipping')} 
              className="text-primary text-sm font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="text-gray-700 space-y-1">
            <p className="font-semibold">{address.fullName}</p>
            <p className="text-sm">{address.email} | {address.phone}</p>
            <p className="text-sm">{address.pinCode}, {address.city}, {address.state}</p>
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="card h-fit flex flex-col justify-center bg-gray-50 border-dashed border-2">
        <h2 className="text-xl font-bold mb-6 text-center">Payment Options</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-white border-primary">
            <div className="w-6 h-6 rounded-full border-4 border-primary bg-white"></div>
            <div className="flex-1">
              <p className="font-bold text-secondary">Credit / Debit Card</p>
              <p className="text-xs text-gray-400 font-medium">Safe and Secure 128-bit encryption</p>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-gray-100 opacity-60 cursor-not-allowed">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white"></div>
            <div className="flex-1">
              <p className="font-bold text-gray-500">UPI Payments (Unavailable)</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="btn-primary w-full py-4 text-lg shadow-lg relative overflow-hidden"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Securely...
            </span>
          ) : (
            "Pay Securely ₹" + grandTotal
          )}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
           Your payment information is encrypted and safe.
        </p>
      </div>
    </div>
  );
}
