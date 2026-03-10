import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AU Credit Card Comparison | Compare Australian Credit Cards 2026",
  description:
    "Compare Australian credit cards side by side. Find the best rewards, lowest fees, and best interest rates for your needs.",
  keywords: [
    "credit card comparison australia",
    "best credit card australia",
    "compare credit cards",
    "low interest credit card",
    "rewards credit card australia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
