import { NumberBase } from "./types";

export function validateInput(
  value: string,
  base: NumberBase
) {
  if (!value.trim()) {
    return "Enter a value";
  }

  const patterns = {
    2: /^[01]+(\.[01]+)?$/,
    8: /^[0-7]+(\.[0-7]+)?$/,
    10: /^[0-9]+(\.[0-9]+)?$/,
    16: /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/,
  };

  return patterns[base].test(value)
    ? null
    : `Invalid Base ${base} Number`;
}