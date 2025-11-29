import React, { useMemo, useState } from "react";

// CustomDataGrid.jsx
// Single-file React component that behaves similarly to MUI DataGrid
// - Props: columns, rows, initialPageSize, pageSizeOptions
// - Features: sorting, client-side pagination, global search, row selection, simple column resizing
// - Styling: TailwindCSS classes (change or remove if not using Tailwind)

export default function CustomDataGrid({
  columns = [], // [{ field: 'id', headerName: 'ID', width: 80, sortable: true, render: (row) => ... }]
  rows = [],
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 25],
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortModel, setSortModel] = useState({ field: null, direction: null }); // direction: 'asc'|'desc'
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [columnWidths, setColumnWidths] = useState(() => {
    const obj = {};
    columns.forEach((c) => (obj[c.field] = c.width || 150));
    return obj;
  });

  // Filtering
  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      columns.some((c) => {
        const val = String(r[c.field] ?? "").toLowerCase();
        return val.includes(q);
      })
    );
  }, [rows, query, columns]);

  // Sorting
  const sorted = useMemo(() => {
    if (!sortModel.field) return filtered;
    const { field, direction } = sortModel;
    const col = columns.find((c) => c.field === field) || {};
    const sorter = (a, b) => {
      const va = a[field];
      const vb = b[field];
      // attempt numeric compare then fallback to string
      if (va == null && vb == null) return 0;
      if (va == null) return -1;
      if (vb == null) return 1;
      if (!isNaN(Number(va)) && !isNaN(Number(vb))) return Number(va) - Number(vb);
      return String(va).localeCompare(String(vb));
    };
    const copy = [...filtered].sort(sorter);
    if (direction === "desc") copy.reverse();
    return copy;
  }, [filtered, sortModel, columns]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const visibleRows = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // Handlers
  const toggleSort = (field) => {
    setPage(0);
    setSortModel((prev) => {
      if (prev.field !== field) return { field, direction: "asc" };
      if (prev.direction === "asc") return { field, direction: "desc" };
      return { field: null, direction: null };
    });
  };

  const toggleSelectRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === visibleRows.length) return setSelected(new Set());
    const s = new Set(visibleRows.map((r) => r.id));
    setSelected(s);
  };

  // Simple column resizing (drag to change width)
  const startResize = (e, field) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = columnWidths[field];
    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      setColumnWidths((prev) => ({ ...prev, [field]: Math.max(40, startW + dx) }));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Render helpers
  const renderHeaderCell = (col) => {
    const isSorted = sortModel.field === col.field;
    return (
      <div
        key={col.field}
        className="flex items-center gap-2 select-none"
        style={{ width: columnWidths[col.field], minWidth: columnWidths[col.field], maxWidth: columnWidths[col.field] }}
      >
        <button
          onClick={() => col.sortable !== false && toggleSort(col.field)}
          className="flex-1 text-left truncate"
          title={col.headerName || col.field}
        >
          {col.headerName || col.field}
        </button>
        {col.sortable !== false && (
          <div className="text-xs">
            {isSorted ? (sortModel.direction === "asc" ? "▲" : "▼") : "⇅"}
          </div>
        )}
        <div
          onMouseDown={(e) => startResize(e, col.field)}
          className="w-1 cursor-col-resize h-6 ml-2"
          title="Drag to resize"
        />
      </div>
    );
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-gray-50">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSelectAll}
            className="px-2 py-1 border rounded text-sm"
            title="Select visible rows"
          >
            {selected.size === visibleRows.length && visibleRows.length > 0 ? "Unselect" : "Select visible"}
          </button>

          <div className="flex items-center gap-1 text-sm">
            <span>Search:</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              className="px-2 py-1 border rounded text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm">Rows:</div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="px-2 py-1 border rounded text-sm"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table header */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex items-center bg-gray-100 border-b">
            <div className="w-12 flex-shrink-0 flex items-center justify-center border-r">#</div>
            {columns.map((col) => (
              <div key={col.field} className="p-2 border-r">
                {renderHeaderCell(col)}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div>
            {visibleRows.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">No rows</div>
            ) : (
              visibleRows.map((row, idx) => (
                <div
                  key={row.id ?? idx}
                  className={`flex items-center border-b hover:bg-gray-50 ${selected.has(row.id) ? 'bg-blue-50' : ''}`}
                  role="row"
                >
                  <div className="w-12 flex-shrink-0 flex items-center justify-center border-r">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                      aria-label={`select-row-${row.id}`}
                    />
                  </div>

                  {columns.map((col) => (
                    <div
                      key={col.field}
                      className="p-2 overflow-hidden whitespace-nowrap text-sm truncate border-r"
                      style={{ width: columnWidths[col.field], minWidth: columnWidths[col.field], maxWidth: columnWidths[col.field] }}
                    >
                      {col.render ? col.render(row) : String(row[col.field] ?? "")}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between p-2 bg-gray-50">
        <div className="text-sm">
          Showing {Math.min(sorted.length, page * pageSize + 1)} - {Math.min(sorted.length, page * pageSize + pageSize)} of {sorted.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(0)}
            disabled={page === 0}
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
          >
            ‹
          </button>

          <div className="px-2 py-1 border rounded text-sm">
            Page {page + 1} / {pageCount}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
          >
            ›
          </button>
          <button
            onClick={() => setPage(pageCount - 1)}
            disabled={page >= pageCount - 1}
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

/*
Usage example:

import CustomDataGrid from './CustomDataGrid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', width: 220, sortable: true },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'email', headerName: 'Email', width: 250 },
];

const rows = [
  { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 32, email: 'bob@example.com' },
  // ...
];

<CustomDataGrid columns={columns} rows={rows} initialPageSize={10} pageSizeOptions={[5,10,25]} />

*/
