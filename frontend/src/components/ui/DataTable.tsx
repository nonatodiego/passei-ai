export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-app-border bg-app-card">
      <table className="min-w-full divide-y divide-app-border text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-app-muted">
          <tr>
            {columns.map((column) => (
              <th className="whitespace-nowrap px-4 py-3 font-semibold" key={column.key}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-app-border">
          {rows.map((row, index) => (
            <tr className="hover:bg-slate-50" key={index}>
              {columns.map((column) => (
                <td className="whitespace-nowrap px-4 py-3 text-app-text" key={column.key}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
