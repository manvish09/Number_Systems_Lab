import {
  DivisionStep,
  NumberBase,
} from "@/lib/types";

interface Props {
  steps: DivisionStep[];
  base: NumberBase;
  result: string;
}

export default function DivisionPipeline({
  steps,
  base,
  result,
}: Props) {

  const remainders =
    steps.map(
      (step) =>
        step.remainder
          .toString(base)
          .toUpperCase()
    );

  const reversed =
    [...remainders].reverse();

  return (

    <div className="space-y-8">

      {/* Division Process */}

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
                  Dividend
                </div>

                <div className="font-mono text-xl font-semibold">
                  {step.dividend}
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
                  ÷ {base}
                </span>

              </div>

              <div>

                <div className="text-xs text-slate-500">
                  Quotient
                </div>

                <div className="font-mono text-xl font-semibold">
                  {step.quotient}
                </div>

              </div>

              <div>

                <div className="text-xs text-slate-500">
                  Remainder
                </div>

                <div
                  className="
                    inline-flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-100
                    px-3
                    font-mono
                    font-bold
                    text-blue-700
                  "
                >
                  {step.remainder}
                </div>

              </div>

            </div>

          )
        )}

      </div>

      {/* Completion */}

      <div
        className="
          rounded-xl
          bg-green-50
          p-4
        "
      >
        <span className="font-semibold text-green-700">
          ✓
        </span>

        {" "}

        Integer conversion completed once the quotient becomes 0.
      </div>

      {/* Binary Construction */}

      <div className="space-y-5">

        <h3 className="text-lg font-semibold">
          Constructing the Number
        </h3>

        <div>

          <div className="text-sm text-slate-500 mb-3">
            Remainders (Top → Bottom)
          </div>

          <div className="flex flex-wrap gap-2">

            {remainders.map(
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
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    font-mono
                    font-semibold
                  "
                >
                  {digit}
                </div>

              )
            )}

          </div>

        </div>

        <div className="text-center text-3xl">
          ↓
        </div>

        <div>

          <div className="text-sm text-slate-500 mb-3">
            Read Bottom → Top
          </div>

          <div className="flex flex-wrap gap-2">

            {reversed.map(
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
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    font-mono
                    font-bold
                    text-blue-700
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
            Final Integer Representation
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
            {result}
          </div>

        </div>

      </div>

    </div>

  );

}