import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function StepCard({
  title,
  children,
}: Props) {
  return (
    <section
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
          border-b
          bg-slate-50
          px-4 sm:px-6 py-4
        "
      >
        <h3
          className="
            text-lg
            font-semibold
          "
        >
          {title}
        </h3>
      </div>

      <div
        className="
          p-4 sm:p-6
        "
      >
        {children}
      </div>
    </section>
  );
}