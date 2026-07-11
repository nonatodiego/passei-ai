import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T>({
  columns,
  emptyMessage = 'Nenhum registro encontrado.',
  rows,
}: {
  columns: Column<T>[];
  emptyMessage?: string;
  rows: T[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-app-border bg-white">
      <table className="min-w-full divide-y divide-app-border text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-app-muted">
          <tr>
            {columns.map((column) => (
              <th className="whitespace-nowrap px-4 py-3 font-semibold" key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-app-border">
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr className="hover:bg-slate-50" key={index}>
                {columns.map((column) => (
                  <td className="whitespace-nowrap px-4 py-3 text-app-text" key={column.key}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-8 text-center text-app-muted" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
