import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "./context/CheckoutContext";
import { getCartData } from "./lib/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoyaan | Eco-friendly Checkout",
  description: "Sustainability made easy. A simplified checkout flow inspired by Ecoyaan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartData = await getCartData();

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-muted`}>
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-2xl tracking-tight">Ecoyaan</span>
              <span className="text-secondary text-sm font-medium hidden sm:block">Sustainability made easy</span>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <CheckoutProvider initialCart={cartData}>
            {children}
          </CheckoutProvider>
        </main>

        <footer className="bg-white border-t border-border py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Ecoyaan. Inspired by the platform for eco-friendly living.
          </div>
        </footer>
      </body>
    </html>
  );
}
