interface Props {
  result: string;
  targetBase: number;
}

const baseNames: Record<number, string> = {
  2: "Binary",
  8: "Octal",
  10: "Decimal",
  16: "Hexadecimal",
};

export default function ConversionResults({
  result,
  targetBase,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        shadow-sm
        overflow-hidden
      "
    >
      <div
        className="
          bg-slate-100
          px-4 sm:px-6 py-4
        "
      >
        <div
          className="
            text-sm
            text-slate-500
          "
        >
          Conversion Result
        </div>

        <div
          className="
            mt-1
            text-lg
            font-semibold
          "
        >
          {baseNames[targetBase]}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="w-full overflow-x-auto pb-2">
          <div
            className="
              min-w-max
              whitespace-nowrap
              font-mono
              text-xl sm:text-2xl md:text-4xl
              font-bold
              text-blue-600
            "
          >
            {result}
          </div>
        </div>

        <div
          className="
            mt-4
            inline-flex
            rounded-full
            bg-blue-100
            px-4
            py-2
            text-sm
            font-medium
            text-blue-700
          "
        >
          Base {targetBase}
        </div>
      </div>
    </div>
  );
}