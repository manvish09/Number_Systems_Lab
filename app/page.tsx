"use client";

import BinaryExplorer from "../components/BinaryExplorer";
import DecimalToBinary from "../components/DecimalToBinary";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900">
            BitLab
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Explore how binary numbers convert
            to decimal values and how decimal
            numbers are converted back to binary
            using interactive visualizations.
          </p>
        </div>

        {/* Binary → Decimal */}

        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Binary → Decimal
            </h2>

            <p className="text-slate-600 mt-2">
              Discover how each binary digit
              contributes to the final decimal
              value.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <BinaryExplorer />
          </div>
        </section>

        {/* Decimal → Binary */}

        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Decimal → Binary
            </h2>

            <p className="text-slate-600 mt-2">
              Follow the repeated division-by-2
              method and observe how binary
              digits are formed.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <DecimalToBinary />
          </div>
        </section>
      </div>
    </main>
  );
}