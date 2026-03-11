"use client";

import { useState, useMemo } from "react";
import bnplData from "@/data/bnpl.json";

type Provider = (typeof bnplData.providers)[number];

const sortOptions = [
  { value: "amount-desc", label: "Highest Limit" },
  { value: "amount-asc", label: "Lowest Limit" },
  { value: "rating-desc", label: "Best Rated" },
  { value: "fee-asc", label: "Lowest Late Fee" },
];

function ProviderCard({ p }: { p: Provider }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg">{p.name}</h3>
          <p className="text-gray-500 text-sm">{p.parent}</p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-700">${p.maxAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Max Spend</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{p.installments > 0 ? `${p.installments}x` : "Flex"}</div>
            <div className="text-xs text-gray-500">Payments</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{p.lateFee === 0 ? "✅" : `$${p.lateFee}`}</div>
            <div className="text-xs text-gray-500">Late Fee</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">⭐ {p.appRating}</div>
            <div className="text-xs text-gray-500">App Rating</div>
          </div>
        </div>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="mt-3 text-blue-600 text-sm hover:underline cursor-pointer">
        {expanded ? "Hide details ▲" : "Show details ▼"}
      </button>
      {expanded && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <h4 className="font-semibold mb-2">Payment Terms</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Period: {p.period}</li>
              <li>Interest rate: {p.interestRate === 0 ? "✅ 0% (interest-free)" : `${p.interestRate}% p.a.`}</li>
              <li>Account fee: {p.accountFee === 0 ? "✅ $0" : `$${p.accountFee}/mo`}</li>
              <li>Max late fee: {p.maxLateFee}</li>
              <li>Credit check: {p.creditCheck}</li>
              <li>Age: {p.ageRequirement}+</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="space-y-1 text-gray-600">
              {p.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
            <h4 className="font-semibold mb-2 mt-3">Categories</h4>
            <div className="flex flex-wrap gap-1">
              {p.categories.map((c, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Merchants: {p.merchantCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BnplPage() {
  const [sort, setSort] = useState("amount-desc");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let providers = bnplData.providers;
    if (search) {
      const q = search.toLowerCase();
      providers = providers.filter((p) => p.name.toLowerCase().includes(q) || p.parent.toLowerCase().includes(q));
    }
    return [...providers].sort((a, b) => {
      switch (sort) {
        case "amount-desc": return b.maxAmount - a.maxAmount;
        case "amount-asc": return a.maxAmount - b.maxAmount;
        case "rating-desc": return b.appRating - a.appRating;
        case "fee-asc": return a.lateFee - b.lateFee;
        default: return 0;
      }
    });
  }, [sort, search]);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-purple-700 to-pink-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">🛒 Buy Now Pay Later Comparison</h1>
          <p className="text-purple-100">Compare {bnplData.providers.length} BNPL providers in Australia</p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search providers..." className="border rounded-lg px-4 py-2 flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="border rounded-lg px-4 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <p className="text-gray-500 mb-4 text-sm">Showing {filtered.length} providers · Last updated: {bnplData.lastUpdated}</p>
        <div className="space-y-4">
          {filtered.map((p) => <ProviderCard key={p.id} p={p} />)}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No providers match your search.</p>}
        </div>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Quick Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Provider</th>
                  <th className="p-3 text-right">Max Spend</th>
                  <th className="p-3 text-center">Payments</th>
                  <th className="p-3 text-center">Late Fee</th>
                  <th className="p-3 text-center">Interest</th>
                  <th className="p-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {bnplData.providers.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-right">${p.maxAmount.toLocaleString()}</td>
                    <td className="p-3 text-center">{p.installments > 0 ? `${p.installments}x` : "Flex"}</td>
                    <td className="p-3 text-center">{p.lateFee === 0 ? "✅ None" : `$${p.lateFee}`}</td>
                    <td className="p-3 text-center">{p.interestRate === 0 ? "0%" : `${p.interestRate}%`}</td>
                    <td className="p-3 text-center">⭐ {p.appRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
