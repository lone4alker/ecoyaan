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
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.pinCode) newErrors.pinCode = "PIN Code is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
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
    <div className="max-w-3xl mx-auto py-4">
      <div className="card shadow-lg bg-white p-8">
        <h1 className="text-2xl font-bold mb-8 text-secondary border-b pb-4">Shipping Information</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name *</label>
              <input 
                type="text" name="fullName" value={formData.fullName} 
                onChange={handleChange} className="input-field" placeholder="Anoop Sharma"
              />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email Address *</label>
              <input 
                type="email" name="email" value={formData.email} 
                onChange={handleChange} className="input-field" placeholder="anoop@example.com"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Phone Number *</label>
              <input 
                type="tel" name="phone" value={formData.phone} 
                onChange={handleChange} className="input-field" placeholder="9876543210"
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">PIN Code *</label>
              <input 
                type="text" name="pinCode" value={formData.pinCode} 
                onChange={handleChange} className="input-field" placeholder="400001"
              />
              {errors.pinCode && <p className="error-text">{errors.pinCode}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">City *</label>
              <input 
                type="text" name="city" value={formData.city} 
                onChange={handleChange} className="input-field" placeholder="Mumbai"
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold mb-1 text-gray-700">State *</label>
              <input 
                type="text" name="state" value={formData.state} 
                onChange={handleChange} className="input-field" placeholder="Maharashtra"
              />
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button 
              type="button" onClick={() => router.back()} 
              className="px-6 py-3 text-secondary font-semibold hover:bg-gray-50 rounded-lg transition"
            >
              Back to Cart
            </button>
            <button type="submit" className="btn-primary flex-1">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
