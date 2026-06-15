import React from "react";

interface ConversionFlowProps {
  sourceBase: number;
  targetBase: number;
}

interface FlowStep {
  type: "node" | "label";
  content: React.ReactNode;
}

export default function ConversionFlow({
  sourceBase,
  targetBase,
}: ConversionFlowProps) {
  const steps: FlowStep[] = [];

  steps.push({
    type: "node",
    content: `Base ${sourceBase}`,
  });

  if (sourceBase !== 10) {
    steps.push({
      type: "label",
      content: "Positional Expansion",
    });

    if (targetBase !== 10) {
      steps.push({
        type: "node",
        content: "Decimal",
      });
    }
  }

  if (targetBase !== 10) {
    steps.push({
      type: "label",
      content: (
        <>
          Integer: Repeated Division
          <br />
          Fraction: Repeated Multiplication
        </>
      ),
    });

    steps.push({
      type: "node",
      content: `Base ${targetBase}`,
    });
  }

  return (
    <div className="rounded-xl border bg-slate-50 p-4">
      <h2 className="text-xl font-bold mb-4">
        Conversion Strategy
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={
                step.type === "node"
                  ? "rounded-lg border bg-blue-100 px-4 py-2 font-medium"
                  : "text-sm text-slate-600 text-center"
              }
            >
              {step.content}
            </div>

            {index < steps.length - 1 && (
              <span className="text-slate-400">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}