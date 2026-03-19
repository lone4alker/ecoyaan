"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

interface CheckoutContextType {
  cart: CartData | null;
  address: ShippingAddress;
  setCart: (cart: CartData) => void;
  setAddress: (address: ShippingAddress) => void;
  isLoading: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const defaultAddress: ShippingAddress = {
  fullName: '',
  email: '',
  phone: '',
  pinCode: '',
  city: '',
  state: '',
};

export function CheckoutProvider({ 
  children, 
  initialCart 
}: { 
  children: ReactNode; 
  initialCart?: CartData | null;
}) {
  const [cart, setCart] = useState<CartData | null>(initialCart || null);
  const [address, setAddress] = useState<ShippingAddress>(defaultAddress);
  const [isLoading, setIsLoading] = useState(!initialCart);

  useEffect(() => {
    if (!initialCart) {
      const fetchCart = async () => {
        try {
          const res = await fetch('/api/cart');
          const data = await res.json();
          setCart(data);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCart();
    }
  }, [initialCart]);

  return (
    <CheckoutContext.Provider value={{ cart, address, setCart, setAddress, isLoading }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
