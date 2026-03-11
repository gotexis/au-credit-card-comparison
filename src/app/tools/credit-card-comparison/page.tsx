"use client";

import { useState } from "react";
import { creditCards, CreditCard } from "@/data/cards";

export default function CreditCardComparisonTool() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const selectedCards = creditCards.filter((c) => selected.includes(c.id));

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-indigo-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold mb-2">🔍 Credit Card Comparison Tool</h1>
          <p className="text-blue-100">Select up to 4 cards to compare side by side</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
          {creditCards.map((card) => (
            <button
              key={card.id}
              onClick={() => toggle(card.id)}
              className={`p-3 rounded-lg border text-left text-sm transition ${
                selected.includes(card.id)
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="font-bold">{card.name}</div>
              <div className="text-xs text-gray-500">{card.issuer}</div>
            </button>
          ))}
        </div>

        {selectedCards.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Feature</th>
                  {selectedCards.map((c) => (
                    <th key={c.id} className="p-3 text-center">{c.name}<br/><span className="text-xs font-normal text-gray-500">{c.issuer}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-3 font-medium">Annual Fee</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">${c.annualFee}</td>)}</tr>
                <tr className="border-b bg-gray-50"><td className="p-3 font-medium">Purchase Rate</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.purchaseRate}%</td>)}</tr>
                <tr className="border-b"><td className="p-3 font-medium">Cash Advance Rate</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.cashAdvanceRate}%</td>)}</tr>
                <tr className="border-b bg-gray-50"><td className="p-3 font-medium">Interest-Free Days</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.interestFreeDays}</td>)}</tr>
                <tr className="border-b"><td className="p-3 font-medium">Foreign Tx Fee</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.foreignTransactionFee}%</td>)}</tr>
                <tr className="border-b bg-gray-50"><td className="p-3 font-medium">Rewards</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.rewardsType === "none" ? "None" : c.rewardsRate}</td>)}</tr>
                <tr className="border-b"><td className="p-3 font-medium">Network</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">{c.cardNetwork}</td>)}</tr>
                <tr className="border-b bg-gray-50"><td className="p-3 font-medium">Min Income</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center">${c.minIncome.toLocaleString()}</td>)}</tr>
                <tr className="border-b"><td className="p-3 font-medium">Signup Bonus</td>{selectedCards.map((c) => <td key={c.id} className="p-3 text-center text-xs">{c.signupBonus || "—"}</td>)}</tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedCards.length === 0 && (
          <p className="text-center text-gray-400 py-12">Select cards above to start comparing.</p>
        )}
      </main>
    </div>
  );
}
