import type { ReactNode } from "react";

export type CompactColumn<Row> = {
  key: string;
  header: ReactNode;
  /** Cell renderer. Receives the row and its index. */
  render: (row: Row, index: number) => ReactNode;
  /** Optional per-column className for <td>/<th>. */
  className?: string;
};

type CompactTableProps<Row> = {
  columns: CompactColumn<Row>[];
  rows: Row[];
  /** Stable React key for each row. */
  rowKey: (row: Row, index: number) => string;
  /** Shown when there are no rows. */
  emptyMessage?: string;
  className?: string;
};

/**
 * Dense, horizontally-scrollable data table built on the .lf-table classes.
 * Generic over the row type so it stays reusable across the platform.
 */
export default function CompactTable<Row>({
  columns,
  rows,
  rowKey,
  emptyMessage = "Nothing to show yet.",
  className = "",
}: CompactTableProps<Row>) {
  return (
    <div className={`lf-table-wrap ${className}`}>
      <table className="lf-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-lf-slate">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={rowKey(row, index)}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {column.render(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
