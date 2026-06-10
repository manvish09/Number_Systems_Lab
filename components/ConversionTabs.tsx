type ConversionTabsProps = {
  mode: "binaryToDecimal" | "decimalToBinary";
  onChange: (
    mode:
      | "binaryToDecimal"
      | "decimalToBinary"
  ) => void;
};