import {
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";

type Props = {
  data: any;
};

export default function FinalVerdict({
  data,
}: Props) {

  return (

    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-10 border border-slate-700">

      <h2 className="text-3xl font-bold">

        Final AI Verdict

      </h2>

      <div className="mt-8 grid md:grid-cols-2 gap-10">

        <div>

          <h3 className="text-green-400 text-xl font-bold mb-5">

            Strengths

          </h3>

          <ul className="space-y-4">

            <li className="flex gap-3">

              <CircleCheckBig
                className="text-green-400"
              />

              Strong revenue growth

            </li>

            <li className="flex gap-3">

              <CircleCheckBig
                className="text-green-400"
              />

              Healthy financials

            </li>

            <li className="flex gap-3">

              <CircleCheckBig
                className="text-green-400"
              />

              Positive future outlook

            </li>

          </ul>

        </div>

        <div>

          <h3 className="text-red-400 text-xl font-bold mb-5">

            Risks

          </h3>

          <ul className="space-y-4">

            <li className="flex gap-3">

              <CircleAlert
                className="text-red-400"
              />

              {data.reasoning.risk}

            </li>

          </ul>

        </div>

      </div>

    </div>

  );

}