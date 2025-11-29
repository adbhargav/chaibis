import "./../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chai Bisket — an Indian eatery",
  description: "Biryani is an emotion, chai is for mood.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";