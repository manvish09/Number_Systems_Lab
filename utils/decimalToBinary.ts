import { DivisionStep } from "../types/conversion";

export function decimalToBinarySteps(
  decimal: number
): DivisionStep[] {
  const steps: DivisionStep[] = [];

  let current = decimal;

  while (current > 0) {
    const quotient = Math.floor(
      current / 2
    );

    const remainder = current % 2;

    steps.push({
      dividend: current,
      quotient,
      remainder,
    });

    current = quotient;
  }

  return steps;
}