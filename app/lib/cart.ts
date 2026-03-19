import { CartData } from '../context/CheckoutContext';

const cartData: CartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "https://prod-cdn.ecoyaan.com/cdn/seller-docs/15/product/16/images/pi/16-1732852027.jpg"
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "https://prod-cdn.ecoyaan.com/cdn/seller-docs/35/product/1298/images/pi/1298-4e65b9a7-1743573249.jpg"
    }
  ],
  shipping_fee: 50,
  discount_applied: 0
};

// Simulated backend data fetcher
export async function getCartData(): Promise<CartData> {
  // In a real app, this might be:
  // const res = await db.cart.findFirst(...)
  // return res;
  
  // Simulating an asynchronous database/API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cartData);
    }, 100);
  });
}
