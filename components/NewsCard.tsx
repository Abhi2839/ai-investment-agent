type Props = {
  data: any;
};

export default function NewsCard({ data }: Props) {

  return (

    <div className="bg-[#162033]
hover:bg-[#1E293B] rounded-xl p-6 border border-slate-700">

      <h2 className="text-xl font-bold mb-4">

        Latest News

      </h2>

      <ul>

        {data.news.map((item: string, index: number) => (

          <li key={index} className="mb-3">

            • {item}

          </li>

        ))}

      </ul>

    </div>

  );

}