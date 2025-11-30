import "./../styles/globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chai Bisket — an Indian eatery",
  description: "Biryani is an emotion, chai is for mood.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen pointer-events-auto bg-[#050302] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";
