import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

const avatarColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-red-500",
];

export default function Table({ columns, data, onEdit, onDelete, onRowClick, onBulkDelete }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const filtered = data.filter((row) =>
    columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    const pageIds = paginated.map((r) => r.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleBulkDelete = () => {
    if (onBulkDelete) onBulkDelete(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative max-w-xs">
          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Search size={14} className="text-white" />
          </div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari data..."
            className="w-full border-0 rounded-xl pl-11 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white shadow-sm font-medium"
          />
        </div>
        {selectedIds.length > 0 && onBulkDelete && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Trash2 size={16} /> Hapus {selectedIds.length} data
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              {onBulkDelete && (
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={paginated.length > 0 && paginated.every((r) => selectedIds.includes(r.id))}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-4 font-bold text-white text-xs uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-5 py-4 font-bold text-white text-xs uppercase tracking-wider">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-5 py-12 text-center text-slate-400 font-medium">
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className={`border-t border-slate-100 hover:bg-indigo-50/60 transition-colors duration-150 group ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${selectedIds.includes(row.id) ? "bg-blue-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  {onBulkDelete && (
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        className="rounded"
                      />
                    </td>
                  )}
                  {columns.map((col, idx) => (
                    <td
                      key={col.key}
                      className={`px-5 py-4 text-slate-700 font-medium ${idx === 0 && onRowClick ? "cursor-pointer" : ""}`}
                      onClick={idx === 0 && onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {idx === 0 ? (
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}
                          >
                            {String(row[col.key] ?? "?")[0]?.toUpperCase()}
                          </div>
                          <span className={onRowClick ? "text-blue-700 group-hover:text-indigo-700 font-semibold" : ""}>{row[col.key]}</span>
                        </div>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-5 py-4 space-x-2">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="text-blue-700 bg-blue-100 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="text-red-700 bg-red-100 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                          Hapus
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-5 py-4 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30">
        <span className="text-sm font-semibold text-slate-500">
          Halaman {page} dari {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm disabled:opacity-30 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm disabled:opacity-30 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}