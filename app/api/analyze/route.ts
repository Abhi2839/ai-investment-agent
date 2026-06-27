import { NextResponse } from "next/server";
import { investmentGraph } from "@/lib/graph";

export async function POST(req: Request) {
  const body = await req.json();
  const company = body.company;

  if (!company || typeof company !== "string") {
    return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  }

  try {
    // ── Run the LangGraph pipeline ──────────────────────────────────────────
    // 5 nodes: companyProfile → financials → news → risk → synthesis
    // First 4 run in parallel, synthesis waits for all and produces final report
    const result = await investmentGraph.invoke({ company });

    // ── Parse the final merged report from synthesis node ──────────────────
    const parse = (s: string) => {
      try { return JSON.parse(s.replace(/```json/g,"").replace(/```/g,"").trim()); }
      catch { return {}; }
    };

    const report    = parse(result.finalReport);
    const profile   = report.profile    ?? {};
    const fin       = report.financials ?? {};
    const newsArr   = report.news       ?? [];
    const riskData  = report.risk       ?? {};
    const verdict   = report.verdict    ?? {};

    // ── Score calculation (based on risk node language) ───────────────────
    const growthText    = (riskData.growthAnalysis  ?? "").toLowerCase();
    const financialText = (riskData.financialHealth ?? "").toLowerCase();
    const riskText      = (riskData.riskAnalysis    ?? "").toLowerCase();

    const growth   = growthText.includes("strong")   ? 9 : growthText.includes("moderate")  ? 7 : 5;
    const financial = financialText.includes("strong") ? 9 : financialText.includes("healthy") ? 8 : 5;
    const risk     = riskText.includes("low")        ? 9 : riskText.includes("medium")      ? 6 : 3;

    const weighted = (growth * 0.4 + financial * 0.35 + risk * 0.25).toFixed(1);
    const score    = Number(weighted);

    // ── Recommendation (use Gemini's verdict or fall back to score logic) ──
    let recommendation = verdict.verdict ?? "";
    let confidence     = verdict.confidence ?? 70;
    let horizon        = "1-3 Years";

    if (!recommendation) {
      if (risk >= 7 && score >= 8.5)      { recommendation = "STRONG BUY"; confidence = 95; horizon = "5-10 Years"; }
      else if (risk >= 6 && score >= 7)   { recommendation = "BUY";        confidence = 85; horizon = "3-5 Years";  }
      else if (score >= 5.5)              { recommendation = "HOLD";       confidence = 70; horizon = "1-3 Years";  }
      else                                { recommendation = "PASS";       confidence = 55; horizon = "Short Term"; }
    } else {
      if      (recommendation === "STRONG BUY") horizon = "5-10 Years";
      else if (recommendation === "BUY")        horizon = "3-5 Years";
      else if (recommendation === "HOLD")       horizon = "1-3 Years";
      else                                      horizon = "Short Term";
    }

    // ── Return structured response ─────────────────────────────────────────
    return NextResponse.json({
      company,
      recommendation,
      confidence,
      growth,
      financial,
      risk,
      weighted,
      horizon,
      summary: verdict.summary ?? "",

      overview: {
        industry:     profile.industry     ?? "N/A",
        marketCap:    profile.marketCap    ?? fin.marketCap    ?? "N/A",
        ceo:          profile.ceo          ?? "N/A",
        country:      profile.country      ?? "N/A",
        founded:      profile.founded      ?? "N/A",
        headquarters: profile.headquarters ?? "N/A",
        employees:    profile.employees    ?? "N/A",
      },

      metrics: {
        revenueGrowth: fin.revenueGrowth ?? "N/A",
        eps:           fin.eps           ?? "N/A",
        peRatio:       fin.peRatio       ?? "N/A",
        dividendYield: fin.dividendYield ?? "N/A",
        debtEquity:    fin.debtEquity    ?? "N/A",
        roe:           fin.roe           ?? "N/A",
        currentRatio:  fin.currentRatio  ?? "N/A",
        high52:        fin.high52        ?? "N/A",
      },

      financialChart: fin.financialChart ?? [
        { year: "2021", revenue: 0, profit: 0 },
        { year: "2022", revenue: 0, profit: 0 },
        { year: "2023", revenue: 0, profit: 0 },
        { year: "2024", revenue: 0, profit: 0 },
        { year: "2025", revenue: 0, profit: 0 },
      ],

      news: newsArr,

      reasoning: {
        growth:    riskData.growthAnalysis  ?? "N/A",
        financial: riskData.financialHealth ?? "N/A",
        risk:      riskData.riskAnalysis    ?? "N/A",
        future:    riskData.futureOutlook   ?? "N/A",
      },
    });

  } catch (err: any) {
    console.error("========== GRAPH ERROR ==========", err);

    const isUnavailable =
      err?.status === 503 ||
      err?.message?.toLowerCase().includes("unavailable") ||
      err?.message?.toLowerCase().includes("network");

    return NextResponse.json(
      { error: isUnavailable ? "AI server is not available. Please try again." : err.message ?? "Internal Server Error" },
      { status: isUnavailable ? 503 : 500 }
    );
  }
}
