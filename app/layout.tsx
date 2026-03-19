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
        <header className="bg-white border-b border-border sticky top-0 z-50 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center justify-between gap-4">
              {/* Logo & Platform Info */}
              <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                <span className="text-primary font-bold text-2xl tracking-tight">Ecoyaan</span>
                <span className="text-secondary text-xs font-semibold hidden lg:block leading-tight">Sustainability <br/> made easy</span>
              </div>

              {/* Location Indicator (Mumbai) */}
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <div className="flex flex-col">
                  <span className="font-bold">Mumbai, 400099</span>
                  <span className="text-primary font-medium hover:underline">Update Location</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    placeholder="Search for 'Soaps', 'Panty Liners'..." 
                    className="w-full px-6 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-full focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400 text-sm shadow-inner"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2 text-xs cursor-pointer group hover:text-primary transition-all">
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Hello 👋</span>
                    <span className="font-bold text-gray-800 group-hover:text-primary">Log in</span>
                  </div>
                </div>

                <div className="relative cursor-pointer text-secondary hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </div>

                <div className="relative cursor-pointer text-secondary hover:scale-110 transition-transform group">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">2</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-primary pt-0.5 pb-0.5 flex justify-center text-[10px] text-white font-bold tracking-widest uppercase">
           India's 1st GenAI-Powered Marketplace for Eco-Friendly Living
        </div>

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
