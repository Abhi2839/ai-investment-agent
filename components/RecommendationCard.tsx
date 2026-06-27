type Props = {
  data: any;
};

export default function RecommendationCard({ data }: Props) {

  return (

    <div className="bg-green-600 rounded-xl p-6 text-center">

      <h2 className="text-4xl font-bold">

        {data.recommendation}

      </h2>

      <p className="mt-2">

        Confidence : {data.confidence}%

      </p>

    </div>

  );

}