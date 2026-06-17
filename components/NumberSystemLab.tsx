"use client";

import { useMemo, useState } from "react";

import BaseSelector from "./BaseSelector";
import ConversionResults from "./ConversionResults";
import ConversionExplanation from "./ConversionExplanation";

import { convert } from "@/lib/conversion";
import { validateInput } from "@/lib/validation";

import { NumberBase } from "@/lib/types";

export default function NumberSystemLab() {
  const [value, setValue] =
    useState("");

  const [sourceBase, setSourceBase] =
    useState<NumberBase>(10);

  const [targetBase, setTargetBase] =
    useState<NumberBase>(2);

  const error =
    validateInput(
      value,
      sourceBase
    );

  const sameBase =
    sourceBase === targetBase;

  const conversion =
    useMemo(() => {

      if (
        !value ||
        error ||
        sameBase
      ) {
        return null;
      }

      return convert(
        value,
        sourceBase,
        targetBase
      );

    }, [
      value,
      sourceBase,
      targetBase,
      error,
      sameBase,
    ]);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">

      {/* Input */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
          "
        >
          Number to Convert
        </label>

        <input
          value={value}
          onChange={(e) =>
            setValue(
              e.target.value.toUpperCase()
            )
          }
          className="
            w-full
            rounded-2xl
            border
          p-3 sm:p-4
text-lg sm:text-xl md:text-2xl
          "
          placeholder="1011.101, 57.3, 59.375, 2A.8"
        />

      </div>

      {/* Source */}

      <div>

        <div
          className="
            mb-2
            text-sm
            text-slate-500
          "
        >
          Convert From
        </div>

        <BaseSelector
          value={sourceBase}
          onChange={setSourceBase}
        />

      </div>

      {/* Target */}

      <div>

        <div
          className="
            mb-2
            text-sm
            text-slate-500
          "
        >
          Convert To
        </div>

        <BaseSelector
          value={targetBase}
          onChange={setTargetBase}
        />

      </div>

      {/* Errors */}

      {error && (

        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-red-600
          "
        >
          {error}
        </div>

      )}

      {/* Same Base */}

      {!error &&
        value &&
        sameBase && (

          <div
            className="
              rounded-xl
              border
              border-amber-200
              bg-amber-50
              p-4
            "
          >
            Source and target bases are identical.
          </div>

      )}

      {/* Result */}

      {conversion && (

        <>

          <ConversionResults
            result={conversion.output}
            targetBase={conversion.target}
          />

          <ConversionExplanation
            result={conversion}
          />

        </>

      )}

    </div>
  );
}