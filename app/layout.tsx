import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "@/app/_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FWS Foods",
  description: "Full Stack App de vendas de lanches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
