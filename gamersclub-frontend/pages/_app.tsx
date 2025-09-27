import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthContext"; // importe o AuthProvider
import { CartProvider } from "@/lib/CardContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <AuthProvider>
        <Navbar />
        <main className="pt-20">
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </CartProvider>
  );
}

