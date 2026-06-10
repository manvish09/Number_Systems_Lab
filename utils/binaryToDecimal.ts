import { Contribution } from "../types/conversion";

export function getContributions(
  binary: string
): Contribution[] {
  return binary.split("").map((digit, index, arr) => {
    const power = arr.length - index - 1;
    const placeValue = 2 ** power;

    return {
      digit,
      power,
      placeValue,
      contribution:
        Number(digit) * placeValue,
    };
  });
}

export function binaryToDecimal(
  binary: string
) {
  return getContributions(binary).reduce(
    (sum, item) => sum + item.contribution,
    0
  );
}