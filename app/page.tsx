"use client";

import NumberSystemLab from "@/components/NumberSystemLab";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Universal Number System Lab
          </h1>

          <p className="mt-4 text-slate-600">
            Convert between Binary,
            Octal, Decimal and
            Hexadecimal with
            step-by-step explanations.
          </p>
        </div>

        <NumberSystemLab />
      </div>
    </main>
  );
}