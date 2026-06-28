# 📈 AI Investment Research Agent

An AI-powered web application that analyzes publicly listed companies and provides intelligent investment recommendations using **Google Gemini**, **LangChain**, **LangGraph**, and **Next.js**.

---

# 🚀 Features

* 🔍 Search any public company
* 🤖 AI-powered investment recommendation
* 📊 Financial score analysis
* 📈 Revenue & Profit visualization
* 💰 Key financial metrics
* ⚠️ Risk assessment
* 📅 Investment timeline
* 📰 Latest company news
* 🏢 Company overview
* 📌 Confidence score
* 🎯 Interactive dashboard with modern UI

---

# 🛠 Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes
* Node.js

## AI

* Google Gemini 2.5 Flash
* LangChain.js
* LangGraph.js

## UI

* Recharts
* Lucide React Icons

---

# 📂 Project Structure

```text
app/
│
├── api/
│   └── analyze/
│       └── route.ts
│
├── page.tsx
├── layout.tsx
│
components/
│
├── Navbar.tsx
├── Hero.tsx
├── SearchBar.tsx
├── Dashboard.tsx
├── RecommendationBanner.tsx
├── MetricCard.tsx
├── CompanyOverview.tsx
├── FinancialChart.tsx
├── KeyMetrics.tsx
├── AnalysisSummary.tsx
├── ScoreBreakdown.tsx
├── ConfidenceMeter.tsx
├── Timeline.tsx
├── FinalVerdict.tsx
└── Footer.tsx

lib/
│
├── gemini.ts
├── agent.ts
├── graph.ts
└── tools.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/ai-investment-agent.git
```

Go inside the project

```bash
cd ai-investment-agent
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run the project

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🧠 How It Works

1. User enters a company name.
2. Next.js API receives the request.
3. LangGraph orchestrates the workflow.
4. LangChain prepares the prompt and invokes Gemini.
5. Gemini analyzes the company and generates structured JSON.
6. Backend computes Growth, Financial, Risk, and Weighted scores.
7. The frontend renders an interactive dashboard.

---

# 🏗 Architecture

```text
                     User
                       │
                       ▼
               React / Next.js UI
                       │
                       ▼
               Search Company Name
                       │
                       ▼
                Next.js API Route
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     LangGraph Workflow       External APIs
          │
          ▼
      LangChain Agent
          │
          ▼
 Google Gemini 2.5 Flash
          │
          ▼
  Structured Investment Report
          │
          ▼
      Interactive Dashboard
```

---

# 📊 Investment Scoring

The AI generates three primary scores:

* Growth Score
* Financial Health Score
* Risk Score

Overall Score is calculated using

```
Weighted Score

= Growth × 40%

+ Financial × 35%

+ Risk × 25%
```

---

# 📋 Dashboard Sections

* Recommendation Banner
* AI Score
* Confidence Meter
* Growth Score
* Financial Health Score
* Risk Score
* Company Overview
* Financial Chart
* Key Metrics
* AI Analysis Summary
* Latest News
* Investment Timeline
* Final Verdict

---

# 📸 Example Run

### Input

```
Amazon
```

### Output

* Recommendation: HOLD
* Confidence: 70%
* Growth: 8/10
* Financial Health: 8/10
* Risk: 6/10
* Investment Horizon: 3–5 Years

---

# 🎯 Design Decisions

* Next.js for full-stack development
* Tailwind CSS for responsive UI
* Gemini for AI reasoning
* LangChain for LLM integration
* LangGraph for workflow orchestration
* Modular React components for maintainability

---

# ⚖️ Trade-offs

Current Version

* Depends on Gemini API quota
* Uses AI-generated financial analysis
* Optimized for demonstration purposes

Future Improvements

* Live stock prices
* Real-time financial APIs
* Portfolio management
* Watchlist
* Authentication
* PDF report generation
* Multi-company comparison
* Sentiment analysis

---

# 🤖 AI Usage

Artificial Intelligence was used during development for:

* Prompt engineering
* Dashboard design
* Component generation
* Backend implementation
* LangChain integration
* LangGraph workflow
* Debugging
* Code optimization
* Documentation

---

# 📦 Dependencies

```bash
npm install @google/generative-ai
npm install @langchain/core
npm install @langchain/google-genai
npm install @langchain/langgraph
npm install recharts
npm install lucide-react
```

---

# 👨‍💻 Author

**Abhey Garg**

AI Investment Research Agent

Built using **Next.js + React + LangChain + LangGraph + Google Gemini**.
