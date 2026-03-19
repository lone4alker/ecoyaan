"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCheckout } from '../../context/CheckoutContext';

export default function SuccessPage() {
  const { address } = useCheckout();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate a random order number
    const rand = Math.floor(Math.random() * 90000000) + 10000000;
    setOrderNumber(`ECO-${rand}`);
  }, []);

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <div className="card flex flex-col items-center p-12 bg-white rounded-3xl shadow-xl border-t-8 border-primary overflow-hidden relative">
        <div className="mb-8 p-6 bg-green-50 rounded-full animate-bounce">
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-primary fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-secondary mb-3">Order Successful!</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Thank you for choosing sustainability, <span className="font-bold text-gray-700">{address.fullName || 'Ecoyaan User'}</span>! Your order has been placed successfully.
        </p>

        <div className="w-full bg-muted rounded-2xl p-6 mb-8 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Order ID:</span>
            <span className="text-sm font-mono font-bold text-secondary tracking-tighter">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Delivery to:</span>
            <span className="text-sm font-semibold text-secondary">{address.city || 'Mumbai'}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-8">
           We've sent a confirmation email to <strong>{address.email || 'your inbox'}</strong>. 
           Expect delivery within 3-5 business days.
        </p>

        <Link href="/" className="btn-primary w-full shadow-lg">
          Continue Shopping
        </Link>

        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 italic text-sm">
          <small>Together, we are making a difference. 🌿</small>
        </div>
      </div>
    </div>
  );
}
