import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  const body = await req.json();
  const company = body.company;

  if (!company || typeof company !== "string") {
    return NextResponse.json(
      { error: "Company name is required." },
      { status: 400 }
    );
  }

  const prompt = `
You are a professional investment analyst.

Analyze the company "${company}".

Return ONLY valid JSON — no markdown, no explanation, no code fences.

{
  "industry":"",
  "marketCap":"",
  "ceo":"",
  "country":"",
  "founded":"",
  "headquarters":"",
  "employees":"",

  "metrics":{
      "revenueGrowth":"",
      "eps":"",
      "peRatio":"",
      "dividendYield":"",
      "debtEquity":"",
      "roe":"",
      "currentRatio":"",
      "high52":""
  },

  "financialChart":[
      { "year":"2021", "revenue":0, "profit":0 },
      { "year":"2022", "revenue":0, "profit":0 },
      { "year":"2023", "revenue":0, "profit":0 },
      { "year":"2024", "revenue":0, "profit":0 },
      { "year":"2025", "revenue":0, "profit":0 }
  ],

  "growthAnalysis":"",
  "financialHealth":"",
  "riskAnalysis":"",
  "futureOutlook":"",

  "news":["","",""]
}
`;

  let text = "";

  try {
    // ✅ Fix: Wrap the Gemini API call in its own try/catch
    // so "Server Not Available" errors from the AI API are properly caught
    // and returned as a clean JSON error response instead of crashing.
    const result = await model.generateContent(prompt);
    text = result.response.text();
  } catch (apiErr: any) {
    console.error("========== GEMINI API ERROR ==========");
    console.error(apiErr);

    // Surface a clear "server not available" message to the client
    const isUnavailable =
      apiErr?.status === 503 ||
      apiErr?.message?.toLowerCase().includes("unavailable") ||
      apiErr?.message?.toLowerCase().includes("network") ||
      apiErr?.message?.toLowerCase().includes("fetch failed");

    return NextResponse.json(
      {
        error: isUnavailable
          ? "AI server is not available. Please try again later."
          : apiErr.message || "Failed to reach the AI service.",
      },
      { status: 503 }
    );
  }

  try {
    // Strip markdown code fences if Gemini wrapped the JSON
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const json = JSON.parse(cleaned);

    // ── Score Calculation ─────────────────────────────────
    const growthText    = (json.growthAnalysis  ?? "").toLowerCase();
    const financialText = (json.financialHealth ?? "").toLowerCase();
    const riskText      = (json.riskAnalysis    ?? "").toLowerCase();

    const growth   = growthText.includes("strong")   ? 9 : growthText.includes("moderate")  ? 7 : 5;
    const financial = financialText.includes("strong") ? 9 : financialText.includes("healthy") ? 8 : 5;
    const risk     = riskText.includes("low")        ? 9 : riskText.includes("medium")      ? 6 : 3;

    const weighted = (growth * 0.4 + financial * 0.35 + risk * 0.25).toFixed(1);

    // ── Recommendation ────────────────────────────────────
    const score = Number(weighted);
    let recommendation: string;
    let confidence: number;
    let horizon: string;

    if (risk >= 7 && score >= 8.5) {
      recommendation = "STRONG BUY"; confidence = 95; horizon = "5-10 Years";
    } else if (risk >= 6 && score >= 7) {
      recommendation = "BUY";        confidence = 85; horizon = "3-5 Years";
    } else if (score >= 5.5) {
      recommendation = "HOLD";       confidence = 70; horizon = "1-3 Years";
    } else {
      recommendation = "PASS";       confidence = 55; horizon = "Short Term";
    }

    return NextResponse.json({
      company,
      recommendation,
      confidence,
      growth,
      financial,
      risk,
      weighted,
      horizon,
      overview: {
        industry:     json.industry     ?? "N/A",
        marketCap:    json.marketCap    ?? "N/A",
        ceo:          json.ceo          ?? "N/A",
        country:      json.country      ?? "N/A",
        founded:      json.founded      ?? "N/A",
        headquarters: json.headquarters ?? "N/A",
        employees:    json.employees    ?? "N/A",
      },
      financialChart: json.financialChart ?? [
        { year: "2021", revenue: 0, profit: 0 },
        { year: "2022", revenue: 0, profit: 0 },
        { year: "2023", revenue: 0, profit: 0 },
        { year: "2024", revenue: 0, profit: 0 },
        { year: "2025", revenue: 0, profit: 0 },
      ],
      news: json.news ?? [],
      reasoning: {
        growth:    json.growthAnalysis  ?? "No growth analysis available.",
        financial: json.financialHealth ?? "No financial analysis available.",
        risk:      json.riskAnalysis    ?? "No risk analysis available.",
        future:    json.futureOutlook   ?? "No future outlook available.",
      },
      metrics: {
        revenueGrowth: json.metrics?.revenueGrowth ?? "N/A",
        eps:           json.metrics?.eps           ?? "N/A",
        peRatio:       json.metrics?.peRatio       ?? "N/A",
        dividendYield: json.metrics?.dividendYield ?? "N/A",
        debtEquity:    json.metrics?.debtEquity    ?? "N/A",
        roe:           json.metrics?.roe           ?? "N/A",
        currentRatio:  json.metrics?.currentRatio  ?? "N/A",
        high52:        json.metrics?.high52        ?? "N/A",
      },
    });
  } catch (err: any) {
    console.error("========== JSON PARSE ERROR ==========");
    console.error(err);

    return NextResponse.json(
      {
        error: "AI returned an unexpected response format. Please try again.",
        raw: text,
      },
      { status: 500 }
    );
  }
}
