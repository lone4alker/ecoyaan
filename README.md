# 🌿 Ecoyaan Checkout Flow 

This project is a simplified, modern, and responsive **Checkout Flow** inspired by [Ecoyaan](https://ecoyaan.com/), an eco-friendly living platform. It guides a user through the journey of reviewing their cart, providing shipping details, and completing a simulated payment.

---

## 🚀 Live Demo & Repository

- **Repository**: https://github.com/lone4alker/ecoyaan
- **Live Version**: - https://ecoyaan-sooty.vercel.app/

---

## 🛠️ Tech Stack & Technical Choices

### Core Technologies
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) - Chosen for its superior Server-Side Rendering (SSR) capabilities and performance optimizations.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Used for rapid UI development and implementing a custom, eco-themed design system.
- **State Management**: [React Context API](https://react.dev/reference/react/useContext) - Selected to maintain a single source of truth for the cart and address details across multiple steps without the overhead of Redux for this scope.
- **Mock Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Implemented a mock API to serve the initial cart data.

---

## 🧱 Architectural Choices

### 1. Server-Side Rendering (SSR) Strategy
To demonstrate best practices for data fetching:
- **Server Component Fetching**: In `app/layout.tsx`, we call a shared `getCartData()` function directly on the server. 
- **Hydration**: This server-fetched data is passed as an `initialCart` prop to our `CheckoutProvider`. This ensures that the user sees the products immediately on the first render, improving SEO and the Core Web Vitals (LCP).

### 2. Centralized Data Layer (`app/lib/cart.ts`)
To follow the **DRY (Don't Repeat Yourself)** principle:
- We created a central `lib/cart.ts` that serves as the "Backend Database" for both our **API Route** and our **Server Component Fetch**. This ensures that data updates in one place reflect across the entire application instantly.

### 3. State Persistence & Flow Management
- **Context API**: We use a custom `useCheckout` hook to manage the state. This allows us to keep the user's "Shipping Address" and "Cart Items" in memory as they navigate from `/` to `/checkout/shipping` and `/checkout/payment`.
- **Form Validation**: Implemented custom validation for the Shipping Form, including regex patterns for Email and Phone (10-digit check) and required fields.

---

## ✨ Features Walkthrough

### 🛒 Screen 1: Cart / Order Summary
- Displays a detailed list of eco-friendly products.
- Real-time calculation of Subtotal, Shipping Fee (₹50), and Grand Total.
- Mobile-responsive product cards.

### 🚚 Screen 2: Shipping Information
- Integrated form validation with error messages.
- Clean and modern inputs with focus states.
- Persists data to the global context for the final review.

### 💳 Screen 3: Payment & Success
- **Final Review**: Shows the user their selected items and address before they pay.
- **Simulated Payment**: A realistic "Pay" button with a processing state (2-second loading animation).
- **Success Redirection**: A celebratory "Order Successful" page with a generated Order ID.

---

## 📂 Project Structure
```text
/app
  /api/cart         # Mock API Route
  /checkout
    /shipping       # Shipping Form Page
    /payment        # Payment Review Page
    /success        # Success State Page
  /context          # CheckoutContext & State Logic
  /lib              # Shared Data Logic (SSR Helper)
  layout.tsx        # SSR Data Fetching & Provider
  page.tsx          # Step 1: Cart Summary
```

---

## 🏃 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone [your-repo-link]
   cd ecoyaan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit**: [http://localhost:3000](http://localhost:3000)
