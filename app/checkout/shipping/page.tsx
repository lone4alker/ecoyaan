"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '../../context/CheckoutContext';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

export default function ShippingPage() {
  const router = useRouter();
  const { address, setAddress } = useCheckout();
  const [formData, setFormData] = useState(address);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    let newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.pinCode) {
      newErrors.pinCode = "PIN Code is required";
    } else if (formData.pinCode.length !== 6) {
      newErrors.pinCode = "PIN Code must be exactly 6 digits";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Numeric-only filtering for Phone and PIN
    let filteredValue = value;
    if (name === 'phone') {
      filteredValue = value.replace(/\D/g, '').substring(0, 10);
    } else if (name === 'pinCode') {
      filteredValue = value.replace(/\D/g, '').substring(0, 6);
    }

    setFormData({ ...formData, [name]: filteredValue });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setAddress(formData);
      router.push('/checkout/payment');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="ecoyaan-card shadow-sm border-gray-100 p-8 sm:p-12">
        <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
          <h1 className="text-xl font-extrabold text-secondary tracking-tight">Delivery Details</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-full">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">Full Name *</label>
              <input 
                type="text" name="fullName" value={formData.fullName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm" 
                placeholder="e.g. Anoop Shetty"
              />
              {errors.fullName && <p className="error-text text-[10px] font-bold mt-1.5">{errors.fullName}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">Email Address *</label>
              <input 
                type="email" name="email" value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm" 
                placeholder="anoop@example.com"
              />
              {errors.email && <p className="error-text text-[10px] font-bold mt-1.5">{errors.email}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">Phone Number *</label>
              <input 
                type="tel" name="phone" value={formData.phone} 
                onChange={handleChange} 
                inputMode="numeric"
                maxLength={10}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm font-mono" 
                placeholder="9876543210"
              />
              {errors.phone && <p className="error-text text-[10px] font-bold mt-1.5">{errors.phone}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">PIN Code *</label>
              <input 
                type="text" name="pinCode" value={formData.pinCode} 
                onChange={handleChange} 
                inputMode="numeric"
                maxLength={6}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm font-mono" 
                placeholder="400001"
              />
              {errors.pinCode && <p className="error-text text-[10px] font-bold mt-1.5">{errors.pinCode}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">City *</label>
              <input 
                type="text" name="city" value={formData.city} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm" 
                placeholder="Mumbai"
              />
              {errors.city && <p className="error-text text-[10px] font-bold mt-1.5">{errors.city}</p>}
            </div>

            <div className="col-span-full">
              <label className="block text-[10px] uppercase tracking-widest font-black text-gray-500 mb-2">State *</label>
              <input 
                type="text" name="state" value={formData.state} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm" 
                placeholder="Maharashtra"
              />
              {errors.state && <p className="error-text text-[10px] font-bold mt-1.5">{errors.state}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4 pt-10 border-t border-gray-50">
            <button 
              type="button" onClick={() => router.back()} 
              className="px-6 py-3 text-gray-400 text-sm font-bold hover:text-secondary transition-all"
            >
              Back to Summary
            </button>
            <button type="submit" className="btn-ecoyaan flex-1 shadow-md">
              Confirm Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
