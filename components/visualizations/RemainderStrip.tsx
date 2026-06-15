interface Props {
  digits: string[];
  result: string;
}

export default function RemainderStrip({
  digits,
  result,
}: Props) {
  return (
    <div
      className="
        space-y-6
      "
    >
      <div>
        <p
          className="
            text-sm
            text-slate-500
            mb-3
          "
        >
          Collected Remainders
        </p>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          {digits.map(
            (
              digit,
              index
            ) => (
              <div
                key={index}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  font-bold
                  font-mono
                "
              >
                {digit}
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="
          text-center
        "
      >
        <div
          className="
            text-sm
            text-slate-500
          "
        >
          Read Bottom → Top
        </div>

        <div
          className="
            mt-3
            font-mono
            text-3xl
            font-bold
            text-green-700
            break-all
          "
        >
          {result}
        </div>
      </div>
    </div>
  );
}