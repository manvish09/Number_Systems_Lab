import {
  DivisionStep,
  FractionConversion,
  NumberBase,
} from "@/lib/types";

import StepCard from "../visualizations/StepCard";
import DivisionPipeline from "../visualizations/DivisionPipeline";
import RemainderStrip from "../visualizations/RemainderStrip";
import FormulaSummary from "../visualizations/FormulaSummary";
import ExplanationTable from "./ExplanationTable";

interface Props {
  divisionSteps: DivisionStep[];
  fractionConversion: FractionConversion;
  targetBase: NumberBase;
  result: string;
}

export default function DecimalToBaseExplanation({
  divisionSteps,
  fractionConversion,
  targetBase,
  result,
}: Props) {

  const integerResult =
    result.split(".")[0];

  const fractionResult =
    result.includes(".")
      ? result.split(".")[1]
      : "";

  const remainderDigits =
    [...divisionSteps]
      .reverse()
      .map(step =>
        step.remainder
          .toString(targetBase)
          .toUpperCase()
      );

  const fractionRows =
    fractionConversion.steps.map(
      (step, index) => ({
        step: index + 1,

        input:
          step.input.toFixed(6),

        multiplied:
          `${step.input.toFixed(6)} × ${targetBase}`,

        value:
          step.multiplied.toFixed(6),

        digit:
          step.digit,
      })
    );

  return (

    <div className="space-y-8">

      {/* ------------------------- */}
      {/* Integer Part */}
      {/* ------------------------- */}

      <StepCard
        title={`Repeated Division (÷ ${targetBase})`}
      >

        <DivisionPipeline
          steps={divisionSteps}
          base={targetBase}
          result={integerResult}
        />

      </StepCard>

      <StepCard
        title="Collected Remainders"
      >

        <RemainderStrip
          digits={remainderDigits}
          result={integerResult}
        />

      </StepCard>

      {/* ------------------------- */}
      {/* Fraction Part */}
      {/* ------------------------- */}

      {fractionConversion.steps.length > 0 && (

        <StepCard
          title={`Repeated Multiplication (× ${targetBase})`}
        >

          {/* Status Card */}

          <div className="mb-6 rounded-xl border bg-slate-50 p-5">

            <div className="text-sm text-slate-500">
              Fraction Status
            </div>

            <div className="mt-2 text-lg font-semibold">

              {fractionConversion.terminated &&
                "🟢 Terminating"}

              {fractionConversion.recurring &&
                "🟠 Recurring"}

              {fractionConversion.rounded &&
                "🟡 Rounded"}

            </div>

            <div className="mt-3 text-sm text-slate-600">

              {fractionConversion.terminated && (
                <>
                  This fraction terminates after{" "}
                  <strong>
                    {fractionConversion.exactDigitsGenerated}
                  </strong>{" "}
                  digit(s).
                </>
              )}

              {fractionConversion.recurring && (
                <>
                  This fraction repeats indefinitely.
                  Showing the first{" "}
                  <strong>
                    {fractionConversion.precision}
                  </strong>{" "}
                  digits.
                </>
              )}

              {fractionConversion.rounded && (
                <>
                  The expansion did not terminate within the
                  configured precision. Display has been rounded
                  to{" "}
                  <strong>
                    {fractionConversion.precision}
                  </strong>{" "}
                  digits.
                </>
              )}

            </div>

          </div>

          {/* Multiplication Table */}

          <ExplanationTable
            columns={[
              {
                key: "step",
                title: "Step",
              },
              {
                key: "input",
                title: "Current Fraction",
              },
              {
                key: "multiplied",
                title: "Multiply",
              },
              {
                key: "value",
                title: "Result",
              },
              {
                key: "digit",
                title: "Digit",
              },
            ]}
            rows={fractionRows}
          />

          {/* Fraction Result */}

          <div className="mt-6 rounded-xl bg-blue-50 p-5">

            <div className="text-sm text-slate-500">
              Fractional Digits
            </div>

            <div className="mt-2 font-mono text-2xl font-bold break-all">
              {fractionResult}
            </div>

          </div>

          {/* Recurring Position */}

          {fractionConversion.recurring &&
            fractionConversion.recurringStartIndex !== undefined && (

              <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 p-4">

                <div className="font-medium">
                  Recurring Pattern
                </div>

                <div className="mt-2 text-sm text-slate-600">
                  The repeating sequence begins after digit{" "}
                  <strong>
                    {fractionConversion.recurringStartIndex + 1}
                  </strong>.
                </div>

              </div>

          )}

        </StepCard>

      )}

      {/* ------------------------- */}
      {/* Final Result */}
      {/* ------------------------- */}

      <FormulaSummary
        expression={`Decimal → Base ${targetBase}`}
        result={result}
      />

    </div>

  );

}