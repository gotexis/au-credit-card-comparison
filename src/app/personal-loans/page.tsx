"use client";

import { useState, useMemo } from "react";
import loansData from "@/data/personal-loans.json";

type Loan = (typeof loansData.loans)[number];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "fixed", label: "Fixed Rate" },
  { value: "variable", label: "Variable Rate" },
];

const sortOptions = [
  { value: "rate-asc", label: "Lowest Rate" },
  { value: "amount-desc", label: "Highest Amount" },
  { value: "fee-asc", label: "Lowest Fees" },
];

function LoanRow({ loan }: { loan: Loan }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg">{loan.name}</h3>
          <p className="text-gray-500 text-sm">{loan.lender} · {loan.type} rate{loan.secured ? " · 🔒 Secured" : ""}</p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-700">{loan.minRate}%</div>
            <div className="text-xs text-gray-500">From p.a.</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{loan.comparisonRate}%</div>
            <div className="text-xs text-gray-500">Comparison</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">${loan.minAmount.toLocaleString()}–${loan.maxAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Loan Amount</div>
          </div>
        </div>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="mt-3 text-blue-600 text-sm hover:underline cursor-pointer">
        {expanded ? "Hide details ▲" : "Show details ▼"}
      </button>
      {expanded && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <h4 className="font-semibold mb-2">Rates & Terms</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Rate range: {loan.minRate}% – {loan.maxRate}% p.a.</li>
              <li>Comparison rate: {loan.comparisonRate}% p.a.</li>
              <li>Term: {loan.minTerm}–{loan.maxTerm} years</li>
              <li>Early repayment: {loan.fees.earlyRepayment === "Yes" ? "⚠️ Fee applies" : "✅ No penalty"}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Fees</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Application: {loan.fees.application === 0 ? "✅ $0" : `$${loan.fees.application}`}</li>
              <li>Monthly: {loan.fees.monthly === 0 ? "✅ $0" : `$${loan.fees.monthly}`}</li>
            </ul>
            <h4 className="font-semibold mb-2 mt-3">Features</h4>
            <ul className="space-y-1 text-gray-600">
              {loan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PersonalLoansPage() {
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("rate-asc");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let loans = loansData.loans;
    if (type !== "all") loans = loans.filter((l) => l.type === type);
    if (search) {
      const q = search.toLowerCase();
      loans = loans.filter((l) => l.name.toLowerCase().includes(q) || l.lender.toLowerCase().includes(q));
    }
    return [...loans].sort((a, b) => {
      switch (sort) {
        case "rate-asc": return a.minRate - b.minRate;
        case "amount-desc": return b.maxAmount - a.maxAmount;
        case "fee-asc": return a.fees.application - b.fees.application;
        default: return 0;
      }
    });
  }, [type, sort, search]);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">🏦 Personal Loan Comparison</h1>
          <p className="text-green-100">Compare {loansData.loans.length} personal loans from major Australian lenders</p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search lenders..." className="border rounded-lg px-4 py-2 flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="border rounded-lg px-4 py-2" value={type} onChange={(e) => setType(e.target.value)}>
            {typeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <select className="border rounded-lg px-4 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <p className="text-gray-500 mb-4 text-sm">Showing {filtered.length} loans · Last updated: {loansData.lastUpdated}</p>
        <div className="space-y-4">
          {filtered.map((loan) => <LoanRow key={loan.id} loan={loan} />)}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No loans match your filters.</p>}
        </div>
      </main>
    </div>
  );
}
