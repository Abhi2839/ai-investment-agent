  "use client";

  import { Search } from "lucide-react";
  import { useState } from "react";

  type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setResult: React.Dispatch<React.SetStateAction<any>>;
  };

  export default function SearchBar({
    setLoading,
    setResult,
  }: Props) {

    const [company, setCompany] = useState("");

    async function handleAnalyze() {
  if (!company.trim()) return;

  setLoading(true);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
      }),
    });

    const text = await response.text();

    console.log("Raw API Response:", text);

    if (!text) {
      alert("Empty response received from server.");
      return;
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON:", text);
      alert("Server returned invalid JSON.");
      return;
    }

    console.log("Parsed Response:", data);

    if (!response.ok) {
      console.error(data);
      alert(data.error || "Server Error");
      return;
    }

    if (data.error) {
      console.error(data);
      alert(data.error);
      console.log(data.raw);
      return;
    }

    // Ensure required objects exist
    data.reasoning ??= {
      growth: "Not Available",
      financial: "Not Available",
      risk: "Not Available",
      future: "Not Available",
    };

    data.overview ??= {
      industry: "N/A",
      marketCap: "N/A",
      ceo: "N/A",
      country: "N/A",
      founded: "N/A",
      headquarters: "N/A",
      employees: "N/A",
    };

    data.metrics ??= {
      revenueGrowth: "N/A",
      eps: "N/A",
      peRatio: "N/A",
      dividendYield: "N/A",
      debtEquity: "N/A",
      roe: "N/A",
      currentRatio: "N/A",
      high52: "N/A",
    };

    data.news ??= [];

    data.financialChart ??= [];

    setResult(data);

  } catch (err) {
    console.error(err);
    alert("Something went wrong while analyzing the company.");
  } finally {
    setLoading(false);
  }
}


    return (

      <div className="max-w-5xl mx-auto mt-12">

        <div className="bg-slate-900 rounded-2xl p-2 flex items-center shadow-xl border border-slate-800">

          <Search className="ml-5 text-slate-400" />

          <input

            type="text"

            placeholder="Search Company (Apple, NVIDIA, Tesla...)"

            value={company}

            onChange={(e) => setCompany(e.target.value)}

            className="flex-1 bg-transparent outline-none px-5 py-4 text-lg"

          />

          <button

            onClick={handleAnalyze}

            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"

          >

            Analyze

          </button>

        </div>

      </div>

    );

  }