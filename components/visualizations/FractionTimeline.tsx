import {
  FractionStep,
  NumberBase,
} from "@/lib/types";

interface Props {
  steps: FractionStep[];
  base: NumberBase;
  result: string;
}

export default function FractionTimeline({
  steps,
  base,
  result,
}: Props) {

  const digits =
    steps.map(
      (
        step
      ) => step.digit
    );

  return (

    <div className="space-y-8">

      {/* Multiplication Steps */}

      <div className="space-y-3">

        {steps.map(
          (
            step,
            index
          ) => (

            <div
              key={index}
              className="
                grid
                grid-cols-4
                gap-6
                rounded-xl
                border
                bg-slate-50
                px-5
                py-4
                items-center
              "
            >

              <div>

                <div className="text-xs text-slate-500">
                  Current Fraction
                </div>

                <div className="font-mono text-xl font-semibold">
                  {step.input.toFixed(6)}
                </div>

              </div>

              <div className="text-center">

                <span
                  className="
                    rounded-full
                    bg-slate-200
                    px-4
                    py-2
                    text-sm
                    font-semibold
                  "
                >
                  × {base}
                </span>

              </div>

              <div>

                <div className="text-xs text-slate-500">
                  Product
                </div>

                <div className="font-mono text-xl font-semibold">
                  {step.multiplied.toFixed(6)}
                </div>

              </div>

              <div>

                <div className="text-xs text-slate-500">
                  Digit
                </div>

                <div
                  className="
                    inline-flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-amber-100
                    px-3
                    font-bold
                    font-mono
                    text-amber-700
                  "
                >
                  {step.digit}
                </div>

              </div>

            </div>

          )
        )}

      </div>

      {/* Construction */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold">
          Constructing the Fraction
        </h3>

        <div>

          <div className="text-sm text-slate-500 mb-3">
            Digits obtained in order
          </div>

          <div className="flex flex-wrap gap-2">

            {digits.map(
              (
                digit,
                index
              ) => (

                <div
                  key={index}
                  className="
                    h-10
                    w-10
                    rounded-lg
                    bg-amber-100
                    flex
                    items-center
                    justify-center
                    font-mono
                    font-bold
                  "
                >
                  {digit}
                </div>

              )
            )}

          </div>

        </div>

        <div
          className="
            rounded-xl
            border-2
            border-green-500
            bg-green-50
            p-5
            text-center
          "
        >

          <div className="text-sm text-slate-500">
            Final Fraction
          </div>

          <div
            className="
              mt-2
              font-mono
              text-3xl
              font-bold
              text-green-700
            "
          >
            .{result}
          </div>

        </div>

      </div>

    </div>

  );

}