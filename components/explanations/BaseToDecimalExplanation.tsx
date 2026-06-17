import { PositionalExpansion } from "@/lib/types";

import ExplanationTable from "./ExplanationTable";
import FormulaCard from "./FormulaCard";

interface Props {
  expansion: PositionalExpansion;
  sourceBase: number;
}

export default function BaseToDecimalExplanation({
  expansion,
  sourceBase,
}: Props) {

  const integerRows =
    expansion.integer.map((step) => ({
      digit: step.digit,

      power: step.power,

      calculation: (
        <>
          {step.value}
          {" × "}
          {sourceBase}
          <sup>{step.power}</sup>
        </>
      ),

      contribution: step.contribution,
    }));

  const fractionRows =
    expansion.fraction.map((step) => ({
      digit: step.digit,

      power: step.power,

      calculation: (
        <>
          {step.value}
          {" × "}
          {sourceBase}
          <sup>{step.power}</sup>
        </>
      ),

      contribution: step.contribution,
    }));

  return (
    <div className="space-y-10">

      {/* Integer Part */}

      <section>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
          Integer Part
        </h2>

        <p className="text-slate-600 mb-5">
          Convert each digit using its positional weight.
        </p>

        <ExplanationTable
          columns={[
            {
              key: "digit",
              title: "Digit",
            },
            {
              key: "power",
              title: "Power",
            },
            {
              key: "calculation",
              title: "Calculation",
            },
            {
              key: "contribution",
              title: "Contribution",
            },
          ]}
          rows={integerRows}
        />

        <div className="mt-5">

          <FormulaCard
            title="Integer Sum"
            formula={
              expansion.integer
                .map(
                  (step) =>
                    step.contribution
                )
                .join(" + ")
            }
            value={String(
              expansion.integerTotal
            )}
          />

        </div>

      </section>

      {/* Fraction Part */}

      {expansion.fraction.length > 0 && (

        <section>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
            Fractional Part
          </h2>

          <p className="text-slate-600 mb-5">
            Digits after the radix point use negative powers of the base.
          </p>

          <ExplanationTable
            columns={[
              {
                key: "digit",
                title: "Digit",
              },
              {
                key: "power",
                title: "Power",
              },
              {
                key: "calculation",
                title: "Calculation",
              },
              {
                key: "contribution",
                title: "Contribution",
              },
            ]}
            rows={fractionRows}
          />

          <div className="mt-5">

            <FormulaCard
              title="Fraction Sum"
              formula={
                expansion.fraction
                  .map(
                    (step) =>
                      step.contribution
                  )
                  .join(" + ")
              }
              value={String(
                expansion.fractionTotal
              )}
            />

          </div>

        </section>

      )}

      {/* Final Result */}

      <section>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
          Final Decimal Value
        </h2>

        <p className="text-slate-600 mb-5">
          Add the integer and fractional values together.
        </p>

        <FormulaCard
          title="Final Calculation"
          formula={`${expansion.integerTotal} + ${expansion.fractionTotal}`}
          value={String(
            expansion.decimalValue
          )}
        />

      </section>

    </div>
  );
}