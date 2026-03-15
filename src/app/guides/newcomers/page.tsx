import Link from "next/link";
import { Metadata } from "next";
import cardsData from "@/data/cards.json";
import { CreditCard } from "@/data/cards";

export const metadata: Metadata = {
  title: "Credit Cards for Newcomers to Australia | First Credit Card Guide 2026",
  description:
    "New to Australia? Compare credit cards designed for migrants, international students, and new residents. No credit history required options, no foreign transaction fees, and low income requirements.",
  keywords: [
    "credit card new to australia",
    "migrant credit card australia",
    "international student credit card",
    "first credit card australia",
    "no credit history credit card australia",
  ],
};

export default function NewcomersGuidePage() {
  const cards = cardsData.cards as CreditCard[];
  const newcomerCards = cards.filter((c) => c.bestFor?.includes("newcomers") || c.minIncome <= 20000 || c.foreignTransactionFee === 0);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            🆕 Credit Cards for Newcomers to Australia
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Just arrived in Australia? Here&apos;s your guide to getting your first credit card — no
            local credit history needed.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Guide */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4">📋 What You Need to Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">✅ Eligibility Basics</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Must be 18+ years old</li>
                <li>• Australian address required (rental is fine)</li>
                <li>• Need an Australian income source</li>
                <li>• Passport + visa details for ID verification</li>
                <li>• Some banks accept employment offer letters</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">💡 Tips for Newcomers</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Start with a <strong>low-fee or no-fee card</strong></li>
                <li>• Look for <strong>0% foreign transaction fees</strong> if you send money overseas</li>
                <li>• Keep credit limit low initially</li>
                <li>• Pay in full each month to build credit history</li>
                <li>• After 6-12 months, you can upgrade to a rewards card</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cards for newcomers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">💳 Recommended Cards for Newcomers</h2>
          <div className="space-y-4">
            {newcomerCards.map((card) => (
              <div key={card.id} className="bg-white rounded-xl shadow-sm border p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{card.name}</h3>
                    <p className="text-gray-500 text-sm">{card.issuer} · {card.cardNetwork}</p>
                    {card.signupBonus && (
                      <p className="text-green-700 text-sm font-medium mt-1">🎁 {card.signupBonus}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-700">${card.annualFee}/yr</div>
                      <div className="text-xs text-gray-500">Annual Fee</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600">{card.purchaseRate}%</div>
                      <div className="text-xs text-gray-500">Rate</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{card.foreignTransactionFee}%</div>
                      <div className="text-xs text-gray-500">FX Fee</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {card.foreignTransactionFee === 0 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">No FX fees</span>
                  )}
                  {card.annualFee === 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">No annual fee</span>
                  )}
                  {card.minIncome <= 20000 && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Low income OK</span>
                  )}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Why for newcomers:</strong>{" "}
                  {card.foreignTransactionFee === 0 ? "No fees on international transactions. " : ""}
                  {card.annualFee === 0 ? "Zero annual fee keeps costs down. " : ""}
                  {card.minIncome <= 20000 ? "Low minimum income requirement. " : ""}
                  {card.features.slice(0, 2).join(". ")}.
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 prose max-w-none">
          <h2>Frequently Asked Questions</h2>

          <h3>Can I get a credit card without Australian credit history?</h3>
          <p>
            Yes. Several banks offer credit cards to newcomers. You&apos;ll typically need proof of
            income (payslips or employment contract), valid visa, and Australian address. Banks like
            ANZ, Bankwest, and ING are known to be newcomer-friendly.
          </p>

          <h3>Should I get a credit card or debit card first?</h3>
          <p>
            If you&apos;re building credit history, a credit card (paid off in full monthly) is better.
            However, if you&apos;re concerned about overspending, start with a debit card and apply for
            a credit card once you&apos;re settled.
          </p>

          <h3>What&apos;s a foreign transaction fee and why does it matter?</h3>
          <p>
            A foreign transaction fee (typically 2-3%) is charged when you make purchases in a foreign
            currency or from overseas merchants. If you still have subscriptions or send money to your
            home country, a 0% FX fee card saves significant money.
          </p>

          <h3>How long does it take to build credit in Australia?</h3>
          <p>
            Most lenders look for at least 6-12 months of credit history. Pay your credit card on time,
            keep utilization below 30%, and avoid multiple applications in a short period.
          </p>
        </section>

        <div className="text-center">
          <Link href="/credit-cards" className="bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition inline-block">
            Compare All Credit Cards →
          </Link>
        </div>
      </main>
    </div>
  );
}
