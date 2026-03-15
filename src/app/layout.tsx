import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AU Financial Products Hub | Compare Credit Cards, Loans & BNPL",
  description:
    "Compare Australian financial products — credit cards, personal loans, car loans, and Buy Now Pay Later services. Real data, updated regularly.",
  keywords: [
    "financial products australia",
    "credit card comparison",
    "personal loan comparison australia",
    "bnpl comparison australia",
    "best credit card australia",
  ],
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/credit-cards", label: "Credit Cards" },
  { href: "/personal-loans", label: "Personal Loans" },
  { href: "/bnpl", label: "BNPL" },
  { href: "/tools/credit-card-comparison", label: "Compare Tool" },
  { href: "/guides/newcomers", label: "🆕 New to AU" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AU Financial Products Hub",
              url: "https://creditcard.rollersoft.com.au",
              description: "Compare Australian credit cards, personal loans, and BNPL services with real data from major providers.",
              publisher: {
                "@type": "Organization",
                name: "AU Financial Products Hub",
              },
            }),
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto">
            <Link href="/" className="font-bold text-lg text-blue-700 whitespace-nowrap">
              💰 AU Finance Hub
            </Link>
            {navLinks.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 hover:text-blue-700 whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-16 text-sm">
          <p>© {new Date().getFullYear()} AU Financial Products Hub. For informational purposes only.</p>
          <p className="mt-2 text-xs">Data sourced from public bank and provider websites. Not financial advice.</p>
        </footer>
      </body>
    </html>
  );
}
