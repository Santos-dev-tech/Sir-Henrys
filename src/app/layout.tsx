import type { Metadata } from "next";
import "./globals.css";
import Marquee from "@/components/Marquee";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Ashworth & Grey — Bespoke Tailoring",
  description:
    "Garments shaped by hand, finished by eye. Each piece crafted from the world's finest cloths — cut once, worn for decades. Est. 1897, London.",
  openGraph: {
    title: "Ashworth & Grey — Bespoke Tailoring",
    description:
      "Garments shaped by hand, finished by eye. Each piece crafted from the world's finest cloths — cut once, worn for decades.",
    type: "website",
    siteName: "Ashworth & Grey",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-offwhite text-primary antialiased">
        <SmoothScroll>
          <Marquee />
          <Header />
          <CartDrawer />
          {children}
          <Footer />
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
