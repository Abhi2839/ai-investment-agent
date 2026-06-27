import { StateGraph, Annotation } from "@langchain/langgraph";

// ✅ Fix: Use Annotation to define typed state for LangGraph v0.2+
const StateAnnotation = Annotation.Root({
  company: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  financial: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  news: Annotation<string[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  analysis: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
});

// Create the workflow graph with correct typed state
const workflow = new StateGraph(StateAnnotation);

// Example: add a node for company research
// workflow.addNode("research", async (state) => {
//   // Use state.company to fetch data
//   return { financial: "...", news: [] };
// });
// workflow.addEdge("research", END);
// workflow.setEntryPoint("research");

export default workflow;
export type InvestmentState = typeof StateAnnotation.State;
