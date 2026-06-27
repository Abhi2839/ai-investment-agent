export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto mt-10">

      <div className="bg-slate-800 rounded-xl p-6">

        <h2 className="text-2xl font-bold">

          AI is analyzing...

        </h2>

        <div className="mt-6 space-y-4">

          <div className="h-5 bg-slate-700 rounded animate-pulse"></div>

          <div className="h-5 bg-slate-700 rounded animate-pulse"></div>

          <div className="h-5 bg-slate-700 rounded animate-pulse"></div>

          <div className="h-5 bg-slate-700 rounded animate-pulse"></div>

        </div>

      </div>

    </div>
  );
}