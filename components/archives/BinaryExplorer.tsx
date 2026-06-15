"use client";

import { useState } from "react";
import {
  binaryToDecimal,
  getContributions,
} from "../utils/binaryToDecimal";

export default function BinaryExplorer() {
  const [binary, setBinary] =
    useState("");

  const [selected, setSelected] =
    useState<number | null>(null);

  const contributions =
    binary
      ? getContributions(binary)
      : [];

  const decimalValue =
    binary
      ? binaryToDecimal(binary)
      : 0;

  const current =
    selected !== null &&
    contributions[selected]
      ? contributions[selected]
      : null;

  return (
    <div className="space-y-8">
      {/* Input */}

      <div>
        <label className="block mb-3 text-sm font-medium text-slate-600">
          Binary Number
        </label>

        <input
          type="text"
          value={binary}
          placeholder="Enter a binary number"
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /[^01]/g,
                ""
              );

            if (value === "") {
              setBinary("");
              setSelected(null);
            } else {
              setBinary(
                value.replace(
                  /^0+(?=\d)/,
                  ""
                )
              );
            }
          }}
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            text-2xl
            font-mono
            shadow-sm
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      {/* Result */}

      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          p-8
          text-center
        "
      >
        <p className="text-lg opacity-90">
          Decimal Value
        </p>

        <div className="text-5xl font-bold mt-3">
          {decimalValue}
        </div>

        {binary && (
          <div className="mt-3 text-lg">
            {binary}₂ = {decimalValue}₁₀
          </div>
        )}
      </div>

      {/* Workspace */}

      {binary && (
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3">
            Binary Workspace
          </h3>

          <div
            className="
              overflow-x-auto
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >
            <div className="flex gap-3 w-max">
              {contributions.map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelected(
                        index
                      )
                    }
                    className={`
                      rounded-2xl
                      p-4
                      min-w-[95px]
                      border-2
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg

                      ${
                        selected === index
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-slate-200 bg-white"
                      }
                    `}
                  >
                    <div className="text-3xl font-bold">
                      {item.digit}
                    </div>

                    <div className="text-sm text-slate-500 mt-2">
                      2^{item.power}
                    </div>

                    <div className="font-semibold mt-2">
                      {item.placeValue}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-2">
            Scroll horizontally for larger binary numbers.
          </p>
        </div>
      )}

      {/* Explanation */}

      {current && (
        <div
          className="
            rounded-3xl
            border
            border-blue-200
            bg-blue-50
            p-8
          "
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Selected Bit Analysis
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Digit
              </p>

              <p className="text-4xl font-bold mt-2">
                {current.digit}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Power
              </p>

              <p className="text-4xl font-bold mt-2">
                2^{current.power}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Place Value
              </p>

              <p className="text-4xl font-bold mt-2">
                {current.placeValue}
              </p>
            </div>
          </div>

          <div
            className="
              bg-white
              rounded-2xl
              p-6
              mt-6
              text-center
              shadow-sm
            "
          >
            <p className="text-slate-500 mb-2">
              Contribution
            </p>

            <p className="text-3xl font-bold">
              {current.digit}
              {" × "}
              {current.placeValue}
              {" = "}
              {current.contribution}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}