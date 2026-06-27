"use client";

import { ShieldCheck } from "lucide-react";

type Props = { confidence: number };

export default function ConfidenceMeter({ confidence }: Props) {
  const { color, status, badge } =
    confidence >= 90 ? { color: "bg-green-500",  status: "Very High", badge: "bg-green-500/20 text-green-400"  } :
    confidence >= 75 ? { color: "bg-cyan-500",   status: "High",      badge: "bg-cyan-500/20 text-cyan-400"   } :
    confidence >= 60 ? { color: "bg-yellow-500", status: "Moderate",  badge: "bg-yellow-500/20 text-yellow-400" } :
                       { color: "bg-red-500",    status: "Low",       badge: "bg-red-500/20 text-red-400"     };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-2xl border border-slate-800 p-5 h-fit">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="text-cyan-400" />
        <h2 className="text-xl font-bold">Confidence Meter</h2>
      </div>

      <div className="flex justify-between mb-2 text-sm">
        <span className="text-slate-400">Confidence</span>
        <span className="font-semibold">{confidence}%</span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${confidence}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
          {status}
        </span>
        <span className="text-slate-400 text-xs">AI Reliability</span>
      </div>
    </div>
  );
}
