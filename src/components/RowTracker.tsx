"use client";

import { useEffect, useRef, useState } from "react";

export type TrackerColumn = {
  key: string;
  label: string;
  kind: "text" | "select" | "date" | "long";
  options?: string[];
  minWidth?: string;
};

export type TrackerRow = Record<string, string>;

type Props = {
  title: string;
  subtitle: string;
  columns: TrackerColumn[];
  storageKey: string;
  csvName: string;
  addLabel: string;
  summarize: (rows: TrackerRow[]) => string;
};

function readRows(storageKey: string): TrackerRow[] | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as TrackerRow[];
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

/** Minimal CSV parser that handles quoted fields and embedded commas. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== "")) rows.push(row);
  return rows;
}

function csvEscape(value: string) {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Lightweight editable row tracker — a simple list the LO keeps open next to
 * the LOS, not a CRM. CSV in/out, manual add, local save.
 */
export default function RowTracker({
  title,
  subtitle,
  columns,
  storageKey,
  csvName,
  addLabel,
  summarize,
}: Props) {
  const [rows, setRows] = useState<TrackerRow[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState("Saved locally in this browser for now.");
  const [copyState, setCopyState] = useState("Copy tracker snapshot");
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setRows(readRows(storageKey) ?? []);
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(rows));
  }, [hydrated, rows, storageKey]);

  function emptyRow(): TrackerRow {
    return Object.fromEntries(columns.map((c) => [c.key, ""]));
  }

  function addRow() {
    setRows((current) => [...current, emptyRow()]);
    setStatus("Row added — saved locally in this browser for now.");
  }

  function updateCell(index: number, key: string, value: string) {
    setRows((current) => current.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
    setStatus("Saved locally in this browser for now.");
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, i) => i !== index));
    setStatus("Row removed — saved locally in this browser for now.");
  }

  function save() {
    window.localStorage.setItem(storageKey, JSON.stringify(rows));
    setStatus(`Saved ${new Date().toLocaleString()} — locally in this browser for now.`);
  }

  function exportCsv() {
    const header = columns.map((c) => csvEscape(c.label)).join(",");
    const body = rows
      .map((r) => columns.map((c) => csvEscape(r[c.key] ?? "")).join(","))
      .join("\n");
    const blob = new Blob([`${header}\n${body}\n`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = csvName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importCsv(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCsv(String(reader.result ?? ""));
      if (parsed.length < 2) {
        setStatus("CSV import: no data rows found.");
        return;
      }
      const headers = parsed[0].map(norm);
      const mapping = columns.map((c) => {
        const byLabel = headers.indexOf(norm(c.label));
        return byLabel >= 0 ? byLabel : headers.indexOf(norm(c.key));
      });
      const imported: TrackerRow[] = parsed.slice(1).map((cells) => {
        const row = emptyRow();
        columns.forEach((c, ci) => {
          const idx = mapping[ci];
          if (idx >= 0 && cells[idx] !== undefined) row[c.key] = cells[idx].trim();
        });
        return row;
      });
      setRows((current) => [...current, ...imported]);
      setStatus(`Imported ${imported.length} rows — saved locally in this browser for now.`);
    };
    reader.readAsText(file);
  }

  async function copySummary() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(summarize(rows));
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy tracker snapshot"), 1400);
    }
  }

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-lf-line px-4 py-2.5">
        <div>
          <h2 className="h-display text-xl">{title}</h2>
          <p className="text-sm text-lf-slate">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={addRow} className="btn-primary">
            {addLabel}
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-secondary">
            Import CSV
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => {
              importCsv(event.target.files?.[0] ?? null);
              event.target.value = "";
            }}
          />
          <button type="button" onClick={exportCsv} className="btn-secondary">
            Export CSV
          </button>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="px-4 py-6 text-sm text-lf-slate">
          Nothing here yet. Add your first entry or import a CSV.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-lf-mist text-xs uppercase tracking-wide text-lf-slate">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-2 py-2" style={{ minWidth: c.minWidth ?? "9rem" }}>
                    {c.label}
                  </th>
                ))}
                <th className="w-8 px-2 py-2" aria-label="Remove row" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-lf-line align-top">
                  {columns.map((c) => (
                    <td key={c.key} className="px-1.5 py-1.5">
                      {c.kind === "select" ? (
                        <select
                          aria-label={c.label}
                          value={row[c.key] ?? ""}
                          onChange={(event) => updateCell(index, c.key, event.target.value)}
                          className="h-9 w-full rounded-lg border border-lf-line bg-white px-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
                        >
                          <option value="" />
                          {(c.options ?? []).map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : c.kind === "long" ? (
                        <textarea
                          aria-label={c.label}
                          value={row[c.key] ?? ""}
                          rows={1}
                          onChange={(event) => updateCell(index, c.key, event.target.value)}
                          className="min-h-9 w-full rounded-lg border border-lf-line bg-white px-2 py-1.5 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
                        />
                      ) : (
                        <input
                          aria-label={c.label}
                          type={c.kind === "date" ? "date" : "text"}
                          value={row[c.key] ?? ""}
                          onChange={(event) => updateCell(index, c.key, event.target.value)}
                          className="h-9 w-full rounded-lg border border-lf-line bg-white px-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-1.5 py-1.5">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      aria-label={`Remove row ${index + 1}`}
                      className="inline-flex h-9 w-7 items-center justify-center rounded-lg text-lf-slate transition hover:bg-lf-mist hover:text-lf-navy"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-lf-line px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-lf-slate">{status}</p>
        <div className="flex gap-2">
          <button type="button" onClick={copySummary} className="btn-secondary">
            {copyState}
          </button>
          <button type="button" onClick={save} className="btn-primary">
            Save tracker
          </button>
        </div>
      </div>
    </section>
  );
}
