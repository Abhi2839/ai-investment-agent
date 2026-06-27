import { Building2, Briefcase, Landmark, User, Globe, Calendar } from "lucide-react";

type Props = { data: any };

export default function CompanyOverview({ data }: Props) {
  const items = [
    { icon: <Building2 size={16} />, title: "Company",    value: data.company },
    { icon: <Briefcase  size={16} />, title: "Industry",   value: data.overview.industry },
    { icon: <Landmark   size={16} />, title: "Market Cap", value: data.overview.marketCap },
    { icon: <User       size={16} />, title: "CEO",        value: data.overview.ceo },
    { icon: <Globe      size={16} />, title: "Country",    value: data.overview.country },
    { icon: <Calendar   size={16} />, title: "Founded",    value: data.overview.founded },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-4">Company Overview</h2>

      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon, title, value }) => (
          <div
            key={title}
            className="bg-slate-800 rounded-xl p-3 border border-slate-700 hover:border-cyan-500 transition"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
              {icon}
              <span className="text-xs font-semibold uppercase tracking-wide">{title}</span>
            </div>
            <p className="text-sm font-medium text-white leading-snug">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
