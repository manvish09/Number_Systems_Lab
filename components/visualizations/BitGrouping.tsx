interface Props {
  sourceBase: number;
  targetBase: number;
  input: string;
  output: string;
}

export default function BitGrouping({
  sourceBase,
  targetBase,
  input,
  output,
}: Props) {
  const [integerPart, fractionalPart = ""] =
    input.toUpperCase().split(".");

  const getGroupSize = () => {
    if (sourceBase === 2 && targetBase === 8) return 3;
    if (sourceBase === 2 && targetBase === 16) return 4;
    if (sourceBase === 8 && targetBase === 2) return 3;
    if (sourceBase === 16 && targetBase === 2) return 4;
    return 0;
  };

  const groupSize = getGroupSize();

  const binaryToGrouped = () => {
    const intRemainder =
      integerPart.length % groupSize;

    const intPadding =
      intRemainder === 0
        ? 0
        : groupSize - intRemainder;

    const paddedInteger =
      "0".repeat(intPadding) +
      integerPart;

    const integerGroups =
      paddedInteger.match(
        new RegExp(
          ".{1," + groupSize + "}",
          "g"
        )
      ) || [];

    let fracPadding = 0;
    let fractionalGroups: string[] = [];

    if (fractionalPart) {
      const fracRemainder =
        fractionalPart.length %
        groupSize;

      fracPadding =
        fracRemainder === 0
          ? 0
          : groupSize - fracRemainder;

      const paddedFraction =
        fractionalPart +
        "0".repeat(fracPadding);

      fractionalGroups =
        paddedFraction.match(
          new RegExp(
            ".{1," + groupSize + "}",
            "g"
          )
        ) || [];
    }

    return {
      intPadding,
      fracPadding,
      integerGroups,
      fractionalGroups,
    };
  };

  const getDigitValue = (
    group: string
  ) => {
    const decimal = parseInt(group, 2);

    if (targetBase === 8) {
      return decimal.toString(8);
    }

    return decimal
      .toString(16)
      .toUpperCase();
  };

  const renderBinaryToBase = () => {
    const {
      intPadding,
      fracPadding,
      integerGroups,
      fractionalGroups,
    } = binaryToGrouped();

    return (
      <>
        <div className="rounded-lg border bg-white p-4">
          <h3 className="font-semibold mb-3">
            Step 1: Original Binary Number
          </h3>

          <div className="font-mono text-2xl">
            {input}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <h3 className="font-semibold mb-3">
            Integer Part
          </h3>

          <div className="mb-4">
            <div className="font-medium mb-2">
              Padding
            </div>

            <div className="font-mono text-xl">
              {intPadding > 0 && (
                <span className="text-red-600 font-bold">
                  {"0".repeat(
                    intPadding
                  )}
                </span>
              )}
              {integerPart}
            </div>
          </div>

          <div className="mb-4">
            <div className="font-medium mb-2">
              Grouping
            </div>

            <div className="flex flex-wrap gap-2">
              {integerGroups.map(
                (group, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-blue-100 px-4 py-2 font-mono text-xl"
                  >
                    {group}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <div className="font-medium mb-2">
              Conversion
            </div>

            <div className="space-y-2">
              {integerGroups.map(
                (group, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 font-mono"
                  >
                    <div className="bg-slate-100 px-3 py-2 rounded">
                      {group}
                    </div>

                    <span>→</span>

                    <div className="bg-green-100 px-3 py-2 rounded font-bold">
                      {getDigitValue(
                        group
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {fractionalPart && (
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-semibold mb-3">
              Fractional Part
            </h3>

            <div className="mb-4">
              <div className="font-medium mb-2">
                Padding
              </div>

              <div className="font-mono text-xl">
                {fractionalPart}

                {fracPadding > 0 && (
                  <span className="text-red-600 font-bold">
                    {"0".repeat(
                      fracPadding
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-medium mb-2">
                Grouping
              </div>

              <div className="flex flex-wrap gap-2">
                {fractionalGroups.map(
                  (group, index) => (
                    <div
                      key={index}
                      className="rounded-md bg-purple-100 px-4 py-2 font-mono text-xl"
                    >
                      {group}
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">
                Conversion
              </div>

              <div className="space-y-2">
                {fractionalGroups.map(
                  (group, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 font-mono"
                    >
                      <div className="bg-slate-100 px-3 py-2 rounded">
                        {group}
                      </div>

                      <span>→</span>

                      <div className="bg-green-100 px-3 py-2 rounded font-bold">
                        {getDigitValue(
                          group
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderBaseToBinary = () => {
    const integerDigits =
      integerPart.split("");

    const fractionalDigits =
      fractionalPart.split("");

    return (
      <>
        <div className="rounded-lg border bg-white p-4">
          <h3 className="font-semibold mb-3">
            Integer Part
          </h3>

          <div className="space-y-2">
            {integerDigits.map(
              (digit, index) => {
                const binary = parseInt(
                  digit,
                  sourceBase
                )
                  .toString(2)
                  .padStart(
                    groupSize,
                    "0"
                  );

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 font-mono"
                  >
                    <div className="bg-blue-100 px-3 py-2 rounded">
                      {digit}
                    </div>

                    <span>→</span>

                    <div className="bg-green-100 px-3 py-2 rounded">
                      {binary}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {fractionalPart && (
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-semibold mb-3">
              Fractional Part
            </h3>

            <div className="space-y-2">
              {fractionalDigits.map(
                (digit, index) => {
                  const binary =
                    parseInt(
                      digit,
                      sourceBase
                    )
                      .toString(2)
                      .padStart(
                        groupSize,
                        "0"
                      );

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 font-mono"
                    >
                      <div className="bg-purple-100 px-3 py-2 rounded">
                        {digit}
                      </div>

                      <span>→</span>

                      <div className="bg-green-100 px-3 py-2 rounded">
                        {binary}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6">
      <h2 className="text-2xl font-bold mb-2">
        Alternative Shortcut Method
      </h2>

      <p className="text-slate-700 mb-6">
        Since bases 2, 8, and 16 are
        closely related, this conversion
        can be performed directly without
        converting through decimal.
      </p>

      <div className="space-y-4">
        {sourceBase === 2
          ? renderBinaryToBase()
          : renderBaseToBinary()}
      </div>

      <div className="mt-6 rounded-lg border-2 border-green-500 bg-white p-5">
        <h3 className="font-semibold mb-2">
          Final Result
        </h3>

        <div className="font-mono text-3xl font-bold text-green-700">
          {output}
        </div>
      </div>
    </div>
  );
}