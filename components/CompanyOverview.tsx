import {
  Building2,
  Briefcase,
  Landmark,
  User,
  Globe,
  Calendar,
} from "lucide-react";

type Props = {
  data: any;
};

export default function CompanyOverview({ data }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold mb-8">
        Company Overview
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <InfoCard
          icon={<Building2 size={20} />}
          title="Company"
          value={data.company}
        />

        <InfoCard
          icon={<Briefcase size={20} />}
          title="Industry"
          value={data.overview.industry}
        />

        <InfoCard
          icon={<Landmark size={20} />}
          title="Market Cap"
          value={data.overview.marketCap}
        />

        <InfoCard
          icon={<User size={20} />}
          title="CEO"
          value={data.overview.ceo}
        />

        <InfoCard
          icon={<Globe size={20} />}
          title="Country"
          value={data.overview.country}
        />

        <InfoCard
          icon={<Calendar size={20} />}
          title="Founded"
          value={data.overview.founded}
        />

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-cyan-500 transition">

      <div className="flex items-center gap-3 text-cyan-400">

        {icon}

        <span className="font-semibold">
          {title}
        </span>

      </div>

      <p className="mt-4 text-lg font-medium">
        {value}
      </p>

    </div>
  );
}