import Link from "next/link";
import { creditCards } from "@/data/cards";
import loansData from "@/data/personal-loans.json";
import bnplData from "@/data/bnpl.json";

export default function Home() {
  const topCards = creditCards.slice(0, 3);
  const topLoans = loansData.loans.slice(0, 3);
  const topBnpl = bnplData.providers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            AU Financial Products Hub
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Compare credit cards, personal loans, and Buy Now Pay Later services across Australia. Real data from major providers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/credit-cards" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              💳 Credit Cards
            </Link>
            <Link href="/personal-loans" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              🏦 Personal Loans
            </Link>
            <Link href="/bnpl" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              🛒 BNPL
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Credit Cards Preview */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">💳 Top Credit Cards</h2>
            <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm">View all {creditCards.length} cards →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCards.map((card) => (
              <div key={card.id} className="bg-white rounded-xl shadow-sm border p-5">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-white font-bold text-xs mb-2 ${
                  card.cardNetwork === "Visa" ? "bg-blue-600" : card.cardNetwork === "Mastercard" ? "bg-red-500" : "bg-gray-700"
                }`}>{card.cardNetwork}</div>
                <h3 className="font-bold">{card.name}</h3>
                <p className="text-sm text-gray-500">{card.issuer}</p>
                <div className="mt-3 flex gap-4 text-sm">
                  <span className="text-blue-700 font-bold">${card.annualFee}/yr</span>
                  <span className="text-orange-600 font-bold">{card.purchaseRate}% p.a.</span>
                </div>
                {card.signupBonus && <p className="text-green-700 text-xs mt-2">🎁 {card.signupBonus}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Personal Loans Preview */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🏦 Top Personal Loans</h2>
            <Link href="/personal-loans" className="text-blue-600 hover:underline text-sm">View all {loansData.loans.length} loans →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topLoans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-xl shadow-sm border p-5">
                <h3 className="font-bold">{loan.name}</h3>
                <p className="text-sm text-gray-500">{loan.lender}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><span className="text-blue-700 font-bold">{loan.minRate}%</span> — <span className="text-orange-600 font-bold">{loan.maxRate}% p.a.</span></p>
                  <p className="text-gray-500">${loan.minAmount.toLocaleString()} – ${loan.maxAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{loan.type} · {loan.minTerm}–{loan.maxTerm} years</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BNPL Preview */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🛒 Buy Now Pay Later</h2>
            <Link href="/bnpl" className="text-blue-600 hover:underline text-sm">View all {bnplData.providers.length} providers →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topBnpl.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border p-5">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.parent}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p>Max spend: <span className="font-bold text-blue-700">${p.maxAmount.toLocaleString()}</span></p>
                  <p className="text-gray-500">{p.period}</p>
                  <p className="text-xs">Late fee: {p.lateFee === 0 ? "✅ None" : `$${p.lateFee}`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose max-w-none">
          <h2>Your Guide to Australian Financial Products</h2>
          <p>
            Finding the right financial product can save you thousands of dollars. Whether you&apos;re looking for a credit card
            with the best rewards, a personal loan with the lowest rate, or a Buy Now Pay Later service that fits your
            shopping habits — our hub compares them all in one place.
          </p>
          <h3>Credit Cards</h3>
          <p>
            Australia has over 200 credit cards on the market. We compare annual fees, interest rates, rewards programs,
            and special features to help you find the best match. Categories include low-fee, low-rate, rewards, cashback,
            premium, and balance transfer cards.
          </p>
          <h3>Personal Loans</h3>
          <p>
            Whether you need funds for a car, renovation, or debt consolidation, personal loans from major banks start
            from around 6.49% p.a. We compare fixed vs variable rates, fees, loan amounts, and flexibility features
            like redraw and extra repayments.
          </p>
          <h3>Buy Now Pay Later</h3>
          <p>
            BNPL services like Afterpay, Zip, Klarna, and humm let you split purchases into interest-free installments.
            But they differ significantly in spending limits, late fees, and merchant availability. Compare them here
            before committing.
          </p>
          <h3>Disclaimer</h3>
          <p className="text-sm text-gray-500">
            This site provides general information only and does not constitute financial advice. Product details may
            change — always verify with the provider before making financial decisions.
          </p>
        </section>
      </main>
    </div>
  );
}
