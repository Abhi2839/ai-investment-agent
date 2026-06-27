"use client";

import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setResult:  React.Dispatch<React.SetStateAction<any>>;
  setCompany?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
};

export default function SearchBar({ setLoading, setResult, setCompany, isLoading }: Props) {
  const [company, setLocalCompany] = useState("");

  async function handleAnalyze() {
    if (!company.trim() || isLoading) return;

    // pass company name up so Loading can display it
    setCompany?.(company.trim());
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company }),
      });

      const text = await response.text();

      if (!text) {
        alert("Empty response received from server.");
        return;
      }

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Server returned invalid response. Please try again.");
        return;
      }

      if (!response.ok || data.error) {
        alert(data.error || "Server error. Please try again.");
        return;
      }

      // Safe defaults
      data.reasoning    ??= { growth: "N/A", financial: "N/A", risk: "N/A", future: "N/A" };
      data.overview     ??= { industry: "N/A", marketCap: "N/A", ceo: "N/A", country: "N/A", founded: "N/A", headquarters: "N/A", employees: "N/A" };
      data.metrics      ??= { revenueGrowth: "N/A", eps: "N/A", peRatio: "N/A", dividendYield: "N/A", debtEquity: "N/A", roe: "N/A", currentRatio: "N/A", high52: "N/A" };
      data.news         ??= [];
      data.financialChart ??= [];

      setResult(data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <div className="bg-slate-900 rounded-2xl p-2 flex items-center shadow-xl border border-slate-800 focus-within:border-cyan-500 transition-colors">

        <Search className="ml-5 text-slate-400 shrink-0" />

        <input
          type="text"
          placeholder="Search Company (Apple, NVIDIA, Tesla...)"
          value={company}
          onChange={(e) => setLocalCompany(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none px-5 py-4 text-lg disabled:opacity-50"
        />

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !company.trim()}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-semibold
                     hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed
                     disabled:hover:scale-100 flex items-center gap-2 min-w-[120px] justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing
            </>
          ) : (
            "Analyze"
          )}
        </button>

      </div>
    </div>
  );
}
