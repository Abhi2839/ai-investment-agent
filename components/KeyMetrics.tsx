"use client";

import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Activity,
  Landmark,
  Percent,
  ArrowUp,
  Wallet,
} from "lucide-react";

type Props = {
  data: any;
};

export default function KeyMetrics({ data }: Props) {
  const metrics = [
    {
      title: "Revenue Growth",
      value: data.metrics?.revenueGrowth || "+32%",
      icon: <TrendingUp size={18} />,
      color: "text-green-400",
      border: "hover:border-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "EPS",
      value: data.metrics?.eps || "$4.18",
      icon: <DollarSign size={18} />,
      color: "text-cyan-400",
      border: "hover:border-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      title: "P/E Ratio",
      value: data.metrics?.peRatio || "28.5",
      icon: <BarChart3 size={18} />,
      color: "text-yellow-400",
      border: "hover:border-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Dividend Yield",
      value: data.metrics?.dividendYield || "1.8%",
      icon: <Percent size={18} />,
      color: "text-green-400",
      border: "hover:border-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Debt / Equity",
      value: data.metrics?.debtEquity || "0.24",
      icon: <Landmark size={18} />,
      color: "text-red-400",
      border: "hover:border-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "ROE",
      value: data.metrics?.roe || "27%",
      icon: <Activity size={18} />,
      color: "text-blue-400",
      border: "hover:border-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Current Ratio",
      value: data.metrics?.currentRatio || "2.4",
      icon: <Wallet size={18} />,
      color: "text-purple-400",
      border: "hover:border-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "52 Week High",
      value: data.metrics?.high52 || "$198",
      icon: <ArrowUp size={18} />,
      color: "text-orange-400",
      border: "hover:border-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Key Financial Metrics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            title={String(metric.value)}  /* full value on hover tooltip */
            className={`
              relative bg-slate-800 border border-slate-700 rounded-xl p-4
              ${metric.border} transition-all duration-300 cursor-default
              flex flex-col gap-3 min-w-0
            `}
          >
            {/* Icon badge */}
            <div className={`w-8 h-8 rounded-lg ${metric.bg} flex items-center justify-center ${metric.color} shrink-0`}>
              {metric.icon}
            </div>

            {/* Label */}
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wide leading-tight">
              {metric.title}
            </p>

            {/* Value — auto-sizes down for long strings */}
            <p
              className={`font-bold leading-tight break-words ${metric.color} ${
                String(metric.value).length > 20
                  ? "text-sm"
                  : String(metric.value).length > 12
                  ? "text-base"
                  : "text-xl"
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
