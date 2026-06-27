import {
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Brain,
} from "lucide-react";

type Props = {
  data: any;
};

export default function AnalysisSummary({ data }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold mb-8">
        AI Analysis Summary
      </h2>

      <div className="space-y-6">

        <SummaryItem
          icon={<TrendingUp size={22} />}
          title="Growth"
          text={data.reasoning?.growth}
        />

        <SummaryItem
          icon={<BarChart3 size={22} />}
          title="Financial Health"
          text={data.reasoning?.financial}
        />

        <SummaryItem
          icon={<ShieldCheck size={22} />}
          title="Risk"
          text={data.reasoning?.risk}
        />

        <SummaryItem
          icon={<Brain size={22} />}
          title="Future Outlook"
          text={data.reasoning?.future}
        />

      </div>

    </div>
  );
}

function SummaryItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5">

      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">

        {icon}

      </div>

      <div>

        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="text-slate-400 leading-7 mt-2">
          {text}
        </p>

      </div>

    </div>
  );
}