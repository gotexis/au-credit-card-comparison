"use client";

import { useState, useMemo } from "react";
import { creditCards, CreditCard } from "@/data/cards";

const categories = [
  { value: "all", label: "All Cards" },
  { value: "low-fee", label: "No/Low Fee" },
  { value: "low-rate", label: "Low Rate" },
  { value: "rewards", label: "Rewards" },
  { value: "cashback", label: "Cashback" },
  { value: "premium", label: "Premium" },
  { value: "balance-transfer", label: "Balance Transfer" },
];

const sortOptions = [
  { value: "fee-asc", label: "Lowest Annual Fee" },
  { value: "rate-asc", label: "Lowest Interest Rate" },
  { value: "fee-desc", label: "Highest Annual Fee" },
  { value: "rewards", label: "Best Rewards" },
];

function CardRow({ card }: { card: CreditCard }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="text-4xl">{card.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg">{card.name}</h3>
          <p className="text-gray-500 text-sm">{card.issuer} · {card.cardNetwork}</p>
          {card.signupBonus && <p className="text-green-700 text-sm font-medium mt-1">🎁 {card.signupBonus}</p>}
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-700">${card.annualFee}</div>
            <div className="text-xs text-gray-500">Annual Fee</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{card.purchaseRate}%</div>
            <div className="text-xs text-gray-500">Purchase Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{card.interestFreeDays}</div>
            <div className="text-xs text-gray-500">Interest-Free Days</div>
          </div>
        </div>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="mt-3 text-blue-600 text-sm hover:underline cursor-pointer">
        {expanded ? "Hide details ▲" : "Show details ▼"}
      </button>
      {expanded && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <h4 className="font-semibold mb-2">Rates & Fees</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Cash Advance Rate: {card.cashAdvanceRate}%</li>
              <li>Foreign Transaction Fee: {card.foreignTransactionFee}%</li>
              {card.balanceTransferPeriod > 0 && <li>Balance Transfer: {card.balanceTransferRate}% for {card.balanceTransferPeriod} months</li>}
              {card.minIncome > 0 && <li>Min. Income: ${card.minIncome.toLocaleString()}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rewards</h4>
            <p className="text-gray-600 mb-2">{card.rewardsType === "none" ? "No rewards program" : card.rewardsRate}</p>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="space-y-1 text-gray-600">
              {card.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreditCardsPage() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("fee-asc");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let cards = creditCards;
    if (category !== "all") cards = cards.filter((c) => c.category === category);
    if (search) {
      const q = search.toLowerCase();
      cards = cards.filter((c) => c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q) || c.features.some((f) => f.toLowerCase().includes(q)));
    }
    return [...cards].sort((a, b) => {
      switch (sort) {
        case "fee-asc": return a.annualFee - b.annualFee;
        case "fee-desc": return b.annualFee - a.annualFee;
        case "rate-asc": return a.purchaseRate - b.purchaseRate;
        case "rewards": return b.annualFee - a.annualFee;
        default: return 0;
      }
    });
  }, [category, sort, search]);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">💳 Credit Card Comparison</h1>
          <p className="text-blue-100">Compare {creditCards.length} Australian credit cards side by side</p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search cards..." className="border rounded-lg px-4 py-2 flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="border rounded-lg px-4 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select className="border rounded-lg px-4 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <p className="text-gray-500 mb-4 text-sm">Showing {filtered.length} cards</p>
        <div className="space-y-4">
          {filtered.map((card) => <CardRow key={card.id} card={card} />)}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No cards match your filters.</p>}
        </div>
      </main>
    </div>
  );
}
