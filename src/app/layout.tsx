import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "debug.",
  description:
    "debug is a mindfulness gaming app that rewards you for relieving stress and anxiety, all on-chain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-secondary">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
