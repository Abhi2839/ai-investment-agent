"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any;
};

export default function ScoreBreakdown({ data }: Props) {

  const chartData = [
    {
      name: "Growth",
      value: data.growth,
    },
    {
      name: "Financial",
      value: data.financial,
    },
    {
      name: "Risk",
      value: data.risk,
    },
    {
      name: "Weighted",
      value: data.weighted,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

      <h2 className="text-2xl font-bold mb-8">

        Score Breakdown

      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie

              data={chartData}

              dataKey="value"

              outerRadius={100}

              innerRadius={55}

            >

              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}