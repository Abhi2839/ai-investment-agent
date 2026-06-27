import { StateGraph, Annotation, END } from "@langchain/langgraph";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Gemini model ────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const gemini = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function askGemini(prompt: string): Promise<string> {
  const result = await gemini.generateContent(prompt);
  return result.response.text();
}

// ─── State definition ────────────────────────────────────────────────────────
const InvestmentState = Annotation.Root({
  company:       Annotation<string>({ reducer: (_, n) => n, default: () => "" }),

  // Node outputs (each node writes its own field)
  profile:       Annotation<string>({ reducer: (_, n) => n, default: () => "" }),
  financials:    Annotation<string>({ reducer: (_, n) => n, default: () => "" }),
  news:          Annotation<string>({ reducer: (_, n) => n, default: () => "" }),
  risk:          Annotation<string>({ reducer: (_, n) => n, default: () => "" }),

  // Final synthesis
  finalReport:   Annotation<string>({ reducer: (_, n) => n, default: () => "" }),
});

export type InvestmentStateType = typeof InvestmentState.State;

// ─── Node 1: Company Profile ─────────────────────────────────────────────────
async function nodeCompanyProfile(state: InvestmentStateType) {
  const prompt = `
You are a company research analyst.
Research the company "${state.company}" and return ONLY a JSON object:
{
  "industry": "",
  "marketCap": "",
  "ceo": "",
  "country": "",
  "founded": "",
  "headquarters": "",
  "employees": ""
}
Return ONLY valid JSON, no markdown, no explanation.`;

  const text = await askGemini(prompt);
  return { profile: text };
}

// ─── Node 2: Financial Data ───────────────────────────────────────────────────
async function nodeFinancials(state: InvestmentStateType) {
  const prompt = `
You are a financial data analyst.
Provide key financial metrics for "${state.company}" and return ONLY a JSON object:
{
  "revenueGrowth": "",
  "eps": "",
  "peRatio": "",
  "dividendYield": "",
  "debtEquity": "",
  "roe": "",
  "currentRatio": "",
  "high52": "",
  "financialChart": [
    { "year": "2021", "revenue": 0, "profit": 0 },
    { "year": "2022", "revenue": 0, "profit": 0 },
    { "year": "2023", "revenue": 0, "profit": 0 },
    { "year": "2024", "revenue": 0, "profit": 0 },
    { "year": "2025", "revenue": 0, "profit": 0 }
  ]
}
Return ONLY valid JSON, no markdown, no explanation.`;

  const text = await askGemini(prompt);
  return { financials: text };
}

// ─── Node 3: News & Sentiment ─────────────────────────────────────────────────
async function nodeNews(state: InvestmentStateType) {
  const prompt = `
You are a financial news analyst.
List the 3 most important recent news headlines or developments for "${state.company}".
Return ONLY a JSON array of 3 strings:
["headline 1", "headline 2", "headline 3"]
Return ONLY valid JSON, no markdown, no explanation.`;

  const text = await askGemini(prompt);
  return { news: text };
}

// ─── Node 4: Risk Analysis ────────────────────────────────────────────────────
async function nodeRisk(state: InvestmentStateType) {
  const prompt = `
You are an investment risk analyst.
Analyze "${state.company}" for investment risk and return ONLY a JSON object:
{
  "growthAnalysis": "2-3 sentence growth analysis mentioning strong/moderate/weak",
  "financialHealth": "2-3 sentence financial health mentioning strong/healthy/weak",
  "riskAnalysis": "2-3 sentence risk analysis mentioning low/medium/high risk",
  "futureOutlook": "2-3 sentence future outlook"
}
Return ONLY valid JSON, no markdown, no explanation.`;

  const text = await askGemini(prompt);
  return { risk: text };
}

// ─── Node 5: Final Synthesis ──────────────────────────────────────────────────
async function nodeSynthesis(state: InvestmentStateType) {
  // Parse all prior node outputs
  const parse = (s: string) => {
    try { return JSON.parse(s.replace(/```json/g,"").replace(/```/g,"").trim()); }
    catch { return {}; }
  };

  const profile    = parse(state.profile);
  const financials = parse(state.financials);
  const newsArr    = parse(state.news);
  const riskData   = parse(state.risk);

  const prompt = `
You are a senior investment analyst. You have been given structured research data about "${state.company}".

Company Profile:
${JSON.stringify(profile, null, 2)}

Financial Metrics:
${JSON.stringify(financials, null, 2)}

Recent News:
${JSON.stringify(newsArr, null, 2)}

Risk Assessment:
${JSON.stringify(riskData, null, 2)}

Based on ALL the above data, produce a final investment report. Return ONLY valid JSON:
{
  "summary": "A 3-4 sentence executive summary of the investment case",
  "verdict": "STRONG BUY | BUY | HOLD | PASS",
  "confidence": 85
}
Return ONLY valid JSON, no markdown, no explanation.`;

  const text = await askGemini(prompt);

  // Merge everything into one final report string
  const verdict = parse(text);

  const report = JSON.stringify({
    profile,
    financials,
    news: Array.isArray(newsArr) ? newsArr : [],
    risk: riskData,
    verdict,
  });

  return { finalReport: report };
}

// ─── Build the Graph ──────────────────────────────────────────────────────────
const graph = new StateGraph(InvestmentState)
  .addNode("companyProfile", nodeCompanyProfile)
  .addNode("financials",     nodeFinancials)
  .addNode("news",           nodeNews)
  .addNode("risk",           nodeRisk)
  .addNode("synthesis",      nodeSynthesis)

  // Node 1,2,3,4 run in parallel from START
  .addEdge("__start__", "companyProfile")
  .addEdge("__start__", "financials")
  .addEdge("__start__", "news")
  .addEdge("__start__", "risk")

  // All 4 feed into synthesis
  .addEdge("companyProfile", "synthesis")
  .addEdge("financials",     "synthesis")
  .addEdge("news",           "synthesis")
  .addEdge("risk",           "synthesis")

  // Synthesis → END
  .addEdge("synthesis", END);

export const investmentGraph = graph.compile();
