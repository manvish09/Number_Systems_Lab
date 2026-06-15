import {
  NumberBase,
  DivisionStep,
  FractionStep,
  FractionConversion,
  PositionStep,
  PositionalExpansion,
  ExplanationStrategy,
} from "./types";

/* -------------------------------- */
/* Base N → Decimal                 */
/* Positional Expansion             */
/* -------------------------------- */

export function getPositionalExpansion(
  value: string,
  base: NumberBase
): PositionalExpansion {

  const [
    integerPart,
    fractionalPart = "",
  ] = value
    .toUpperCase()
    .split(".");

  const integer: PositionStep[] = [];
  let integerTotal = 0;

  integerPart
    .split("")
    .forEach((digit, index) => {

      const power =
        integerPart.length -
        index -
        1;

      const numeric =
        parseInt(
          digit,
          base
        );

      const contribution =
        numeric *
        Math.pow(
          base,
          power
        );

      integer.push({
        digit,
        value: numeric,
        power,
        contribution,
      });

      integerTotal +=
        contribution;
    });

  const fraction: PositionStep[] = [];
  let fractionTotal = 0;

  fractionalPart
    .split("")
    .filter(Boolean)
    .forEach(
      (
        digit,
        index
      ) => {

        const power =
          -(index + 1);

        const numeric =
          parseInt(
            digit,
            base
          );

        const contribution =
          numeric *
          Math.pow(
            base,
            power
          );

        fraction.push({
          digit,
          value: numeric,
          power,
          contribution,
        });

        fractionTotal +=
          contribution;

      }
    );

  return {

    integer,

    fraction,

    integerTotal,

    fractionTotal,

    decimalValue:
      integerTotal +
      fractionTotal,

  };

}

/* -------------------------------- */
/* Decimal Integer → Base           */
/* -------------------------------- */

export function getDivisionSteps(
  decimal: number,
  base: NumberBase
): DivisionStep[] {

  const steps: DivisionStep[] = [];

  let current =
    Math.floor(decimal);

  if (current === 0) {

    return [
      {
        dividend: 0,
        quotient: 0,
        remainder: 0,
      },
    ];

  }

  while (current > 0) {

    const quotient =
      Math.floor(
        current / base
      );

    const remainder =
      current % base;

    steps.push({

      dividend:
        current,

      quotient,

      remainder,

    });

    current =
      quotient;

  }

  return steps;

}

/* -------------------------------- */
/* Decimal Fraction → Base          */
/* -------------------------------- */

export function getFractionMultiplicationSteps(
  fraction: number,
  base: NumberBase,
  precision = 8
): FractionConversion {

  const steps: FractionStep[] = [];

  /**
   * Stores previously seen fractional values.
   *
   * key -> step index
   */
  const seen = new Map<string, number>();

  let current = fraction;

  let digits = "";

  let terminated = false;

  let recurring = false;

  let recurringStartIndex: number | undefined;

  for (let i = 0; i < precision; i++) {

    const key = current.toFixed(12);

    if (seen.has(key)) {

      recurring = true;

      recurringStartIndex = seen.get(key);

      break;

    }

    seen.set(key, i);

    const multiplied = current * base;

    const digit = Math.floor(multiplied);

    const digitString =
      digit
        .toString(base)
        .toUpperCase();

    digits += digitString;

    steps.push({

      input: current,

      multiplied,

      digit: digitString,

    });

    current = multiplied - digit;

    if (Math.abs(current) < Number.EPSILON) {

      terminated = true;

      current = 0;

      break;

    }

  }

  return {

    steps,

    terminated,

    recurring,

    rounded:
      !terminated &&
      steps.length === precision,

    precision,

    exactDigitsGenerated:
      steps.length,

    displayedFraction:
      digits,

    recurringStartIndex,

  };

}
/* -------------------------------- */
/* Decimal Split Helper             */
/* -------------------------------- */

export function splitDecimalNumber(
  decimal: number
) {

  return {

    integer:
      Math.floor(decimal),

    fraction:
      decimal -
      Math.floor(decimal),

  };

}

/* -------------------------------- */
/* Decide Explanation               */
/* -------------------------------- */

export function getExplanationStrategy(
  sourceBase: NumberBase,
  targetBase: NumberBase
): ExplanationStrategy {

  if (
    targetBase === 10
  ) {

    return "BASE_TO_DECIMAL";

  }

  if (
    sourceBase === 10
  ) {

    return "DECIMAL_TO_BASE";

  }

  return "INDIRECT";

}

/* -------------------------------- */
/* Hex Helper                       */
/* -------------------------------- */

export function getHexDigitMeaning(
  digit: string
): number | null {

  const map: Record<
    string,
    number
  > = {

    A: 10,

    B: 11,

    C: 12,

    D: 13,

    E: 14,

    F: 15,

  };

  return (
    map[digit] ??
    null
  );

}