import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

type Props={

title:string;

score:number;

status:string;

reason:string;

};

export default function MetricCard({

title,

score,

status,

reason

}:Props){

const color=

status==="Excellent"

?

"bg-green-500/20 text-green-400"

:

status==="Strong"

?

"bg-blue-500/20 text-blue-400"

:

status==="Low Risk"

?

"bg-emerald-500/20 text-emerald-400"

:

"bg-yellow-500/20 text-yellow-400";

return(

<div

className="

bg-[#0F172A]
hover:bg-[#162033]

rounded-2xl

border

border-slate-700
p-6
hover:border-cyan-500
hover:shadow-lg
hover:shadow-cyan-500/20
transition-all
duration-300

"

>

<div className="flex justify-between items-center">

<h2 className="text-lg font-semibold">

{title}

</h2>

<Badge

text={status}

color={color}

/>

</div>

<h1 className="text-5xl font-bold mt-5">

{score}

<span className="text-xl text-slate-500">

/10

</span>

</h1>

<ProgressBar

score={score}

/>

<p

className="text-slate-400 mt-5 leading-7"

>

{reason}

</p>

</div>

);

}