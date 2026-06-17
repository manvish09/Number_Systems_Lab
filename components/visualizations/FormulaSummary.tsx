interface Props {
  expression: string;
  result: string;
}

export default function FormulaSummary({
  expression,
  result,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-green-50
        p-5
      "
    >
      {/* Expression */}

      <div className="overflow-x-auto pb-2">
        <div
          className="
            min-w-max
            whitespace-nowrap
            font-mono
            text-lg
          "
        >
          {expression}
        </div>
      </div>

      <div
        className="
          my-3
          border-t
        "
      />

      {/* Result */}

      <div className="overflow-x-auto pb-2">
        <div
          className="
            min-w-max
            whitespace-nowrap
            font-mono
            text-2xl
            sm:text-3xl
            font-bold
            text-green-700
          "
        >
          = {result}
        </div>
      </div>
    </div>
  );
}