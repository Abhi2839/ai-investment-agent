"use client";

import { CalendarDays, Clock3, Flag } from "lucide-react";

type Props = {
  horizon: string;
};

export default function Timeline({ horizon }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center gap-3">

        <CalendarDays className="text-cyan-400" />

        <h2 className="text-xl font-bold">
          Investment Timeline
        </h2>

      </div>

      <p className="text-slate-400 mt-2">
        Recommended holding period based on AI analysis
      </p>

      {/* Timeline */}

      <div className="relative mt-10">

        {/* Line */}

        <div className="absolute top-5 left-0 w-full h-1 bg-slate-700 rounded-full">

          <div className="w-4/5 h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full"></div>

        </div>

        {/* Points */}

        <div className="relative flex justify-between">

          <TimelinePoint
            icon={<Clock3 size={18} />}
            title="Today"
            subtitle="Start Investing"
          />

          <TimelinePoint
            icon={<CalendarDays size={18} />}
            title="3 Years"
            subtitle="Growth Phase"
          />

          <TimelinePoint
            icon={<Flag size={18} />}
            title={horizon}
            subtitle="Recommended Exit"
            active
          />

        </div>

      </div>

      <div className="mt-10 bg-slate-800 rounded-xl p-5 border border-slate-700">

        <p className="text-slate-300 leading-7">

          📈 <span className="font-semibold">AI Recommendation:</span>

          <br />

          Hold this investment for

          <span className="text-green-400 font-bold">

            {" "}
            {horizon}

          </span>

          {" "}to maximize long-term returns while reducing short-term market volatility.

        </p>

      </div>

    </div>
  );
}

type TimelinePointProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
};

function TimelinePoint({
  icon,
  title,
  subtitle,
  active = false,
}: TimelinePointProps) {
  return (
    <div className="flex flex-col items-center relative z-10">

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
          active
            ? "bg-green-500 border-green-300"
            : "bg-slate-800 border-slate-600"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-1 text-center">
        {subtitle}
      </p>

    </div>
  );
}