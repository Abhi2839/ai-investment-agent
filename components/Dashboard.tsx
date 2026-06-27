import RecommendationBanner from "./RecommendationBanner";
import CompanyOverview from "./CompanyOverview";
import AnalysisSummary from "./AnalysisSummary";
import FinancialChart from "./FinancialChart";
import KeyMetrics from "./KeyMetrics";
import MetricCard from "./MetricCard";
import NewsSection from "./NewsSection";
import ScoreBreakdown from "./ScoreBreakdown";
import FinalVerdict from "./FinalVerdict";
import Timeline from "./Timeline";
import Gauge from "./Gauge";
import ConfidenceMeter from "./ConfidenceMeter";

type Props = {
  data: any;
};

export default function Dashboard({ data }: Props) {
  return (
    <div className="max-w-[1700px] mx-auto px-8 py-8 space-y-8">

      {/* Recommendation */}

      <RecommendationBanner data={data} />

      {/* Overview */}

      <div className="grid lg:grid-cols-2 gap-8">

        <CompanyOverview data={data} />

        <AnalysisSummary data={data} />

      </div>

      {/* Financial */}

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <FinancialChart data={data} />

        </div>

        <KeyMetrics data={data} />

      </div>

      {/* Scores */}

      <div className="grid lg:grid-cols-4 gap-6">

        <MetricCard
          title="Growth"
          score={data.growth}
          status="Excellent"
          reason={data.reasoning.growth}
        />

       <MetricCard
  title="Growth"
  score={data.growth}
  status="Excellent"
  reason={data.reasoning?.growth ?? "No analysis available"}
/>

<MetricCard
  title="Financial Health"
  score={data.financial}
  status="Strong"
  reason={data.reasoning?.financial ?? "No analysis available"}
/>

<MetricCard
  title="Risk"
  score={data.risk}
  status="Low Risk"
  reason={data.reasoning?.risk ?? "No analysis available"}
/>


    

      </div>

      {/* AI Indicators */}

      <div className="grid lg:grid-cols-3 gap-8">

        <Gauge score={data.weighted} />

        <ConfidenceMeter confidence={data.confidence} />

        <Timeline horizon={data.horizon} />

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <NewsSection data={data} />

        </div>

        <ScoreBreakdown data={data} />

      </div>

      {/* Verdict */}

      <FinalVerdict data={data} />

    </div>
  );
}