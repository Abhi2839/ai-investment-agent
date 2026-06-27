import { tool } from "@langchain/core/tools";
import { z } from "zod";

// ✅ LangChain tool: fetch company financial summary
export const companyResearchTool = tool(
  async ({ company }: { company: string }) => {
    // In production, call a real financial API here (e.g. Alpha Vantage, Yahoo Finance)
    return `Research data for ${company}: placeholder – integrate a real financial API.`;
  },
  {
    name: "company_research",
    description: "Look up key financial data and news for a given company name.",
    schema: z.object({
      company: z.string().describe("The name of the company to research"),
    }),
  }
);

// ✅ LangChain tool: score investment based on keywords
export const scoringTool = tool(
  async ({ growthText, financialText, riskText }: {
    growthText: string;
    financialText: string;
    riskText: string;
  }) => {
    const growth = growthText.includes("strong") ? 9
      : growthText.includes("moderate") ? 7 : 5;

    const financial = financialText.includes("strong") ? 9
      : financialText.includes("healthy") ? 8 : 5;

    const risk = riskText.includes("low") ? 9
      : riskText.includes("medium") ? 6 : 3;

    const weighted = (growth * 0.4 + financial * 0.35 + risk * 0.25).toFixed(1);

    return JSON.stringify({ growth, financial, risk, weighted });
  },
  {
    name: "investment_scorer",
    description: "Score a company investment based on analysis text for growth, financial health, and risk.",
    schema: z.object({
      growthText: z.string(),
      financialText: z.string(),
      riskText: z.string(),
    }),
  }
);
