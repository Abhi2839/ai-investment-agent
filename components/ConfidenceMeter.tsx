"use client";

import { ShieldCheck } from "lucide-react";

type Props = {
  confidence: number;
};

export default function ConfidenceMeter({
  confidence,
}: Props) {
  let color = "";
  let status = "";

  if (confidence >= 90) {
    color = "bg-green-500";
    status = "Very High";
  } else if (confidence >= 75) {
    color = "bg-cyan-500";
    status = "High";
  } else if (confidence >= 60) {
    color = "bg-yellow-500";
    status = "Moderate";
  } else {
    color = "bg-red-500";
    status = "Low";
  }

  return (
    <div className="bg-gradient-to-br
from-slate-900
to-emerald-950 rounded-2xl border border-slate-800 p-6">

      <div className="flex items-center gap-3">

        <ShieldCheck className="text-cyan-400" />

        <h2 className="text-xl font-bold">
          Confidence Meter
        </h2>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Confidence
          </span>

          <span className="font-semibold">
            {confidence}%
          </span>

        </div>

        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

          <div
            className={`${color} h-4 transition-all duration-700`}
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

        <div className="mt-5 flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              confidence >= 90
                ? "bg-green-500/20 text-green-400"
                : confidence >= 75
                ? "bg-cyan-500/20 text-cyan-400"
                : confidence >= 60
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {status}
          </span>

          <span className="text-slate-400 text-sm">
            AI Reliability
          </span>

        </div>

      </div>

    </div>
  );
}