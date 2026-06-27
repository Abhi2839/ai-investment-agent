type Props={

score:number;

};

export default function ProgressBar({

score

}:Props){

return(

<div className="w-full h-3 bg-slate-700 rounded-full mt-4">

<div

className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"

style={{

width:`${score*10}%`

}}

>

</div>

</div>

);

}