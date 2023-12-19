import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Silkscreen({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />
        <div className="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
