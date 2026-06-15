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
      <div
        className="
          font-mono
          text-lg
          break-all
        "
      >
        {expression}
      </div>

      <div
        className="
          my-3
          border-t
        "
      />

      <div
        className="
          text-3xl
          font-bold
          text-green-700
        "
      >
        = {result}
      </div>
    </div>
  );
}