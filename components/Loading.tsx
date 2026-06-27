"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Connecting to AI engine...",         pct: 10 },
  { label: "Fetching company profile...",        pct: 25 },
  { label: "Pulling financial data...",          pct: 45 },
  { label: "Running investment analysis...",     pct: 65 },
  { label: "Scoring growth & risk factors...",   pct: 80 },
  { label: "Generating final recommendation...", pct: 95 },
];

export default function Loading({ company }: { company?: string }) {
  const [step, setStep] = useState(0);
  const [pct, setPct]   = useState(0);

  useEffect(() => {
    // advance through steps every ~2.5 s
    const iv = setInterval(() => {
      setStep((s) => {
        const next = Math.min(s + 1, STEPS.length - 1);
        setPct(STEPS[next].pct);
        return next;
      });
    }, 2500);
    setPct(STEPS[0].pct);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-14 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          {/* Spinning ring */}
          <span className="relative flex h-10 w-10 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-30" />
            <span className="relative inline-flex rounded-full h-10 w-10 bg-cyan-500/20 items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round"/>
              </svg>
            </span>
          </span>
          <div>
            <h2 className="text-xl font-bold text-white">
              Analyzing {company ? <span className="text-cyan-400">{company}</span> : "company"}…
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">This usually takes 10–20 seconds</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-in-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Step list */}
        <ul className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={i} className={`flex items-center gap-3 text-sm transition-all duration-500 ${
              i < step  ? "text-slate-500 line-through" :
              i === step ? "text-cyan-300 font-semibold" :
              "text-slate-600"
            }`}>
              {i < step ? (
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : i === step ? (
                <span className="w-4 h-4 rounded-full border-2 border-cyan-400 shrink-0 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
              )}
              {s.label}
            </li>
          ))}
        </ul>

        {/* Skeleton cards */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4 space-y-2 animate-pulse">
              <div className="h-3 w-1/2 bg-slate-700 rounded" />
              <div className="h-6 w-3/4 bg-slate-700 rounded" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
