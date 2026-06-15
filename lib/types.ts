export type NumberBase =
  | 2
  | 8
  | 10
  | 16;

/* -------------------------------- */
/* Decimal → Target Base            */
/* -------------------------------- */

export interface DivisionStep {
  dividend: number;
  quotient: number;
  remainder: number;
}

/* -------------------------------- */
/* Decimal Fraction → Target Base   */
/* -------------------------------- */

export interface FractionStep {
  input: number;

  multiplied: number;

  digit: string;
}

/* -------------------------------- */
/* Fraction Conversion Summary      */
/* -------------------------------- */

export interface FractionConversion {

  /**
   * Complete multiplication process.
   */
  steps: FractionStep[];

  /**
   * Fraction terminated exactly.
   */
 terminated: boolean;

  /**
   * A recurring cycle was detected.
   */
  recurring: boolean;

  /**
   * Output was truncated because
   * the requested precision was reached.
   */
  rounded: boolean;

  /**
   * Maximum digits requested.
   */
  precision: number;

  /**
   * Actual digits generated.
   */
  exactDigitsGenerated: number;

  /**
   * Fraction digits shown.
   */
  displayedFraction: string;

  /**
   * Index where the recurring
   * sequence begins.
   *
   * Example
   * 0.000110011...
   *        ^
   */
  recurringStartIndex?: number;
}
/* -------------------------------- */
/* Base → Decimal                   */
/* -------------------------------- */

export interface PositionStep {

  digit: string;

  value: number;

  power: number;

  contribution: number;

}

export interface PositionalExpansion {

  integer: PositionStep[];

  fraction: PositionStep[];

  integerTotal: number;

  fractionTotal: number;

  decimalValue: number;

}

/* -------------------------------- */
/* Final Conversion Result          */
/* -------------------------------- */

export interface ConversionResult {

  source: NumberBase;

  target: NumberBase;

  input: string;

  output: string;

  decimalValue: number;

  positionalExpansion: PositionalExpansion;

  divisionSteps: DivisionStep[];

  /**
   * Rich information about
   * fractional conversion.
   */
  fractionConversion: FractionConversion;

}

/* -------------------------------- */
/* Explanation Routing              */
/* -------------------------------- */

export type ExplanationStrategy =
  | "BASE_TO_DECIMAL"
  | "DECIMAL_TO_BASE"
  | "INDIRECT"
  | "BIT_GROUPING";