type Props = {

    text:string;

    color:string;

}

export default function Badge({

text,

color

}:Props){

return(

<span

className={`

px-4

py-2

rounded-full

text-sm

font-semibold

${color}

`}

>

{text}

</span>

);

}