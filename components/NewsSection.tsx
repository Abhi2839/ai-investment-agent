import { Newspaper } from "lucide-react";

type Props = {
  data: any;
};

export default function NewsSection({
  data,
}: Props) {

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

      <h2 className="text-2xl font-bold mb-8">

        Latest News

      </h2>

      <div className="space-y-5">

        {data.news.map((item: string, index: number) => (

          <div

            key={index}

            className="flex gap-4 items-start bg-slate-800 rounded-xl p-5 hover:border-cyan-500 border border-slate-700 transition"

          >

            <div className="bg-cyan-500/20 p-3 rounded-xl">

              <Newspaper
                size={22}
                className="text-cyan-400"
              />

            </div>

            <div>

              <p className="leading-7">

                {item}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}