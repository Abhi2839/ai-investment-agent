"use client";

type Props = { score: number };

export default function Gauge({ score }: Props) {
  const percentage = (score / 10) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl border border-slate-800 p-5 h-fit">
      <h2 className="text-xl font-bold">AI Score</h2>

      <div className="mt-4">
        <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 transition-all duration-700 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <h1 className="text-5xl mt-4 font-bold">
          {score}
          <span className="text-xl text-slate-500">/10</span>
        </h1>
      </div>
    </div>
  );
}
