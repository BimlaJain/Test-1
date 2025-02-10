import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test",
  description: "FOR A WHEALTHIER LIFESTYLE. ANYTIME, ANYWHERE",
  openGraph: {
    title: "Test",
    description: "FOR A WHEALTHIER LIFESTYLE. ANYTIME, ANYWHERE",
    images: [
      {
        url: "./public/meta-img.png",
        width: 800,
        height: 600,
        alt: "Test Branding Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test",
    description: "FOR A WHEALTHIER LIFESTYLE. ANYTIME, ANYWHERE",
    images: [".//public/meta-img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
