"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  data: any;
};

export default function FinancialChart({ data }: Props) {
  const chartData =
    data.financialChart || [
      {
        year: "2021",
        revenue: 27,
        profit: 4,
      },
      {
        year: "2022",
        revenue: 33,
        profit: 6,
      },
      {
        year: "2023",
        revenue: 61,
        profit: 29,
      },
      {
        year: "2024",
        revenue: 95,
        profit: 48,
      },
      {
        year: "2025",
        revenue: 130,
        profit: 72,
      },
    ];

  return (
    <div className="bg-gradient-to-br
from-[#101827]
to-[#111827] border border-slate-800 rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Financial Performance
          </h2>

          <p className="text-slate-400 mt-1">
            Revenue vs Profit (Last 5 Years)
          </p>

        </div>

        <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg">

          5 Years

        </div>

      </div>

      <div className="mt-8 h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="year"
              stroke="#CBD5E1"
            />

            <YAxis stroke="#CBD5E1" />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#06B6D4"
              strokeWidth={4}
            />

            <Line
              type="monotone"
              dataKey="profit"
              stroke="#22C55E"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}