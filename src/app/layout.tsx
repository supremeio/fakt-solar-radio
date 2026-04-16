import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAKT Solar Radio",
  description: "A solar-powered radio experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-linen font-[family-name:var(--font-figtree)]">
        {children}
      </body>
    </html>
  );
}
