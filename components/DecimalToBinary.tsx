"use client";

import { useState } from "react";
import { decimalToBinarySteps } from "../utils/decimalToBinary";
export default function DecimalToBinary() {
const [decimal, setDecimal] =
  useState("");
 const steps =
  decimal === ""
    ? []
    : decimalToBinarySteps(
        Number(decimal)
      );

  const binary = steps
    .map((step) => step.remainder)
    .reverse()
    .join("");

  return (

    <div className="space-y-6">
    <input
  type="number"
  value={decimal}
  min={0}
  placeholder="Enter a decimal number"
  onChange={(e) =>
    setDecimal(e.target.value)
  }
  className="
    w-full
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-4
    text-2xl
    shadow-sm
    focus:outline-none
    focus:ring-4
    focus:ring-indigo-100
  "
/>
    <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
  <p className="text-blue-900">
    Divide the decimal number repeatedly by 2.
    Each remainder becomes a binary digit.
    Read the remainders from bottom to top to
    get the final binary number.
  </p>
</div>
     <div
  className="
    max-h-[450px]
    overflow-y-auto
    rounded-3xl
    border
    border-slate-200
    bg-slate-50
    p-4
  "
>
  <div className="space-y-3">
    {steps.map((step, index) => (
      <div
        key={index}
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          p-4
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-xs text-slate-500">
              Dividend
            </p>

            <p className="text-2xl font-bold">
              {step.dividend}
            </p>
          </div>

          <div className="text-xl text-slate-400">
            →
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Quotient
            </p>

            <p className="text-2xl font-bold">
              {step.quotient}
            </p>
          </div>

          <div
            className={`
              rounded-full
              w-12
              h-12
              flex
              items-center
              justify-center
              text-lg
              font-bold
              ${
                step.remainder === 1
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }
            `}
          >
            {step.remainder}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8">
  <h3 className="text-2xl font-bold text-indigo-900">
    Binary Assembly
  </h3>

  <p className="mt-2 text-slate-600">
    Read the remainders from bottom to top.
  </p>

  <div className="flex justify-center gap-3 mt-6 flex-wrap">
    {binary.split("").map((digit, index) => (
      <div
        key={index}
        className="
          w-14
          h-14
          rounded-2xl
          bg-indigo-600
          text-white
          flex
          items-center
          justify-center
          text-2xl
          font-bold
        "
      >
        {digit}
      </div>
    ))}
  </div>

  <div className="mt-8 text-center">
    <p className="text-slate-500">
      Binary Result
    </p>

    <p className="text-5xl font-bold text-indigo-700 mt-2">
      {binary}₂
    </p>
  </div>
</div>
    </div>
  );
}