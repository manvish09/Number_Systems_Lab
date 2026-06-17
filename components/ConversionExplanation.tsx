import {
  ConversionResult,
} from "@/lib/types";

import {
  getExplanationStrategy,
} from "@/lib/explanations";

import ConversionFlow from "./explanations/ConversionFlow";
import BaseToDecimalExplanation from "./explanations/BaseToDecimalExplanation";
import DecimalToBaseExplanation from "./explanations/DecimalToBaseExplanation";
import BitGrouping from "./visualizations/BitGrouping";

interface Props {
  result: ConversionResult;
}

export default function ConversionExplanation({
  result,
}: Props) {
  const strategy =
    getExplanationStrategy(
      result.source,
      result.target
    );

  const showBitGrouping =
    (result.source === 2 &&
      result.target === 8) ||
    (result.source === 8 &&
      result.target === 2) ||
    (result.source === 2 &&
      result.target === 16) ||
    (result.source === 16 &&
      result.target === 2);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <ConversionFlow
        sourceBase={result.source}
        targetBase={result.target}
      />

      {strategy === "BASE_TO_DECIMAL" && (
        <BaseToDecimalExplanation
          expansion={
            result.positionalExpansion
          }
          sourceBase={result.source}
        />
      )}

      {strategy === "DECIMAL_TO_BASE" && (
        <DecimalToBaseExplanation
          divisionSteps={
            result.divisionSteps
          }
          fractionConversion={
            result.fractionConversion
          }
          targetBase={result.target}
          result={result.output}
        />
      )}

      {strategy === "INDIRECT" && (
        <>
          <div className="rounded-xl border bg-blue-50 p-5">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Phase 1
            </h2>

            <p className="mt-2 text-slate-700">
              Convert the source number
              to decimal using positional
              expansion.
            </p>
          </div>

          <BaseToDecimalExplanation
            expansion={
              result.positionalExpansion
            }
            sourceBase={result.source}
          />

          <div className="rounded-xl border bg-blue-50 p-5">
            <h2 className="text-2xl font-bold">
              Phase 2
            </h2>

            <p className="mt-2 text-slate-700">
              Convert the decimal value
              into Base {result.target}.
            </p>
          </div>

          <DecimalToBaseExplanation
            divisionSteps={
              result.divisionSteps
            }
            fractionConversion={
              result.fractionConversion
            }
            targetBase={result.target}
            result={result.output}
          />
        </>
      )}

      <div className="rounded-xl border-2 border-green-300 bg-green-50 p-5">
        <h2 className="text-2xl font-bold">
          Final Answer
        </h2>

        <div className="mt-3 font-mono text-xl sm:text-2xl md:text-3xl font-bold break-all">
          {result.output}
        </div>
      </div>

      {showBitGrouping && (
        <BitGrouping
          sourceBase={result.source}
          targetBase={result.target}
          input={result.input}
          output={result.output}
        />
      )}
    </div>
  );
}