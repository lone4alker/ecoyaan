# 🌿 Ecoyaan Checkout Flow 

This project is a simplified, modern, and responsive **Checkout Flow** inspired by [Ecoyaan](https://ecoyaan.com/), an eco-friendly living platform. It guides a user through the journey of reviewing their cart, providing shipping details, and completing a simulated payment.

---

## 🚀 Live Demo & Repository

- **Repository**: https://github.com/lone4alker/ecoyaan
- **Live Version**: - https://ecoyaan-sooty.vercel.app/

---

## 🛠️ Tech Stack & Technical Choices

### Core Technologies
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) - Leverages Server Components for initial data fetching.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Used for high-affordance UI components and utility-first responsiveness.
- **State Management**: [React Context API](https://react.dev/reference/react/useContext) - Manages the cart and address state across the multi-step flow.
- **Mock Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Serves the base JSON data asynchronously.

---

## 🧱 Architectural Choices

### 1. Server-Side Rendering (SSR) Strategy
- **Initial Hydration**: Cart data is fetched asynchronously on the server in `layout.tsx` using a shared `getCartData()` helper. This ensures the first paint contains the correct order details.

### 2. High-Affordance Form Validation (Regex)
- **Input Masking**: All numeric fields (Phone, PIN, Card Number, CVV) use a real-time regex filter (`/\D/g`) to strip non-digits automatically as the user types.
- **Format Validation**: Strict validation for Email formats and character lengths (10 for Phone, 6 for PIN, 16 for Card) to ensure data integrity.

### 3. Integrated State Persistence
- The `CheckoutProvider` persists the user's name and address details, allowing the **Payment Page** to dynamically recap the "Shipping To" information with the specific details provided in the previous step.

---

## ✨ Features Walkthrough

### 🛒 Screen 1: Cart / Order Summary
- **Ecoyaan Branding**: Header with location switching, search functionality, and notification badges.
- **Dynamic Data**: Strictly uses the provided JSON for Shipping fees and Subtotals.
- **Sticky UX**: A floating "Proceed to Checkout" bar for a modern mobile-first experience.

### 🚚 Screen 2: Shipping Information
- **Smart Forms**: Inputs with `inputMode="numeric"` for automatic mobile number-pad switching.
- **Validation**: Real-time error reporting for incomplete or incorrectly formatted data.

### 💳 Screen 3: Payment & Success
- **Realistic Card Flow**: Form for Card Number, Expiry, and CVV with numeric-only enforcement.
- **Payment Simulation**: Interactive button with a "Syncing Payment" loading state and an emerald glow.
- **Refined UI**: Solid, shadowed cards replace placeholder boxes for a premium experience.

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
  /lib              # Shared Data Layer (SSR & API)
  layout.tsx        # SSR Data Fetching & Global Header
  page.tsx          # Step 1: Cart Summary
```

---

## 🏃 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lone4alker/ecoyaan.git
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
