import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flow | Personal Blog",
  description: "Coded by Inanc, Designed by AliThemes",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${sourceSans.className}  antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
