import { ArrowUpCircle } from "lucide-react";

type Props={

data:any;

};

export default function RecommendationBanner({

data

}:Props){

return(

<div
className="
rounded-3xl
bg-gradient-to-r
from-emerald-600
via-green-500
to-lime-500
shadow-[0_0_60px_rgba(34,197,94,0.35)]
p-10
"

>

<div className="flex justify-between">

<div>

<p className="uppercase tracking-widest">

Recommendation

</p>

<h1 className="text-6xl font-bold mt-4">

{data.recommendation}

</h1>

<p className="mt-6 text-lg">

Confidence

<strong>

{" "}

{data.confidence}%

</strong>

</p>

<p className="mt-3">

Investment Horizon

<strong>

{" "}

{data.horizon}

</strong>

</p>

</div>

<ArrowUpCircle size={120}/>

</div>

</div>

);

}