interface Column {
  key: string;
  title: string;
}

interface Props {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
}

export default function ExplanationTable({
  columns,
  rows,
}: Props) {
  return (
    <div className="overflow-x-auto">
    <div className="rounded-xl border overflow-hidden min-w-[600px]">
    <table className="w-full text-sm">
        <thead className="bg-slate-100">

          <tr>

            {columns.map((column) => (

              <th
                key={column.key}
                className="p-3 text-left font-semibold"
              >
                {column.title}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {rows.map((row, rowIndex) => (

            <tr
              key={rowIndex}
              className="border-t hover:bg-slate-50"
            >

              {columns.map((column) => (

                <td
                  key={column.key}
                  className="p-3"
                >
                  {row[column.key]}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </div>
  );
}