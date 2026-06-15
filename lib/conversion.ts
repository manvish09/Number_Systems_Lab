import {
  NumberBase,
  ConversionResult,
} from "./types";

import {
  getPositionalExpansion,
  getDivisionSteps,
  getFractionMultiplicationSteps,
} from "./explanations";

/* -------------------------------- */
/* Base N → Decimal                 */
/* -------------------------------- */

export function toDecimal(
  value: string,
  base: NumberBase
): number {

  const expansion =
    getPositionalExpansion(
      value,
      base
    );

  return expansion.decimalValue;

}

/* -------------------------------- */
/* Decimal → Base N                 */
/* -------------------------------- */

export function fromDecimal(
  value: number,
  base: NumberBase,
  precision = 8
): string {

  const integerPart =
    Math.floor(value);

  const fractionPart =
    value - integerPart;

  const integer =
    integerPart
      .toString(base)
      .toUpperCase();

  if (fractionPart === 0) {
    return integer;
  }

  const fractionConversion =
    getFractionMultiplicationSteps(
      fractionPart,
      base,
      precision
    );

  return `${integer}.${fractionConversion.displayedFraction}`;

}

/* -------------------------------- */
/* Universal Conversion             */
/* -------------------------------- */

export function convert(
  value: string,
  sourceBase: NumberBase,
  targetBase: NumberBase
): ConversionResult {

  const positionalExpansion =
    getPositionalExpansion(
      value,
      sourceBase
    );

  const decimalValue =
    positionalExpansion.decimalValue;

  const fractionPart =
    decimalValue -
    Math.floor(decimalValue);

  const fractionConversion =
    getFractionMultiplicationSteps(
      fractionPart,
      targetBase
    );

  const output =
    fromDecimal(
      decimalValue,
      targetBase,
      fractionConversion.precision
    );

  const divisionSteps =
    getDivisionSteps(
      decimalValue,
      targetBase
    );

  return {

    source:
      sourceBase,

    target:
      targetBase,

    input:
      value.toUpperCase(),

    output,

    decimalValue,

    positionalExpansion,

    divisionSteps,

    fractionConversion,

  };

}