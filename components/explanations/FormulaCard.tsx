interface Props {
  title: string;
  formula: string;
  value: string;
}

export default function FormulaCard({
  title,
  formula,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-slate-50
        p-5
      "
    >
      <div className="text-sm text-slate-500">
        {title}
      </div>

      <div
        className="
          mt-3
          font-mono
          text-lg
        "
      >
        {formula}
      </div>

      <div
        className="
          mt-4
          text-3xl
          font-bold
          text-green-600
        "
      >
        {value}
      </div>
    </div>
  );
}