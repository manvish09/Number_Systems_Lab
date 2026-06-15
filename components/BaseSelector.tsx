import { NumberBase } from "@/lib/types";

interface Props {
  value: NumberBase;
  onChange: (
    value: NumberBase
  ) => void;
}

export default function BaseSelector({
  value,
  onChange,
}: Props) {
  const options = [
    {
      label: "Binary",
      value: 2,
    },
    {
      label: "Octal",
      value: 8,
    },
    {
      label: "Decimal",
      value: 10,
    },
    {
      label: "Hexadecimal",
      value: 16,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() =>
            onChange(
              option.value as NumberBase
            )
          }
          className={`
  rounded-xl
  p-4
  border
  transition-all
  hover:shadow-md
            ${
              value === option.value
                ? "bg-blue-600 text-white"
                : "bg-white"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}