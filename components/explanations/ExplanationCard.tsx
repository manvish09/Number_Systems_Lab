interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ExplanationCard({
  title,
  children,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-blue-50
        p-5
      "
    >
      <h3
        className="
          text-lg
          font-semibold
          mb-3
        "
      >
        {title}
      </h3>

      <div
        className="
          text-slate-700
          leading-7
        "
      >
        {children}
      </div>
    </div>
  );
}