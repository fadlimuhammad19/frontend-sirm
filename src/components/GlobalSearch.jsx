import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

// Data dummy gabungan buat dicari (nanti diganti hasil query beneran dari semua modul)
const searchableData = [
  { label: "Budi Santoso", type: "Pasien", path: "/pasien" },
  { label: "Siti Aminah", type: "Pasien", path: "/pasien" },
  { label: "Paracetamol 500mg", type: "Obat", path: "/obat" },
  { label: "Amoxicillin 500mg", type: "Obat", path: "/obat" },
  { label: "dr. Ani Wijaya", type: "Jadwal Dokter", path: "/jadwal-dokter" },
  { label: "Antrian A-01", type: "Antrian", path: "/antrian" },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.length > 0 ? searchableData.filter((d) => d.label.toLowerCase().includes(query.toLowerCase())) : [];

  const handleSelect = (item) => {
    navigate(item.path);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative hidden md:block" ref={ref}>
      <div className="flex items-center gap-2 bg-white/70 border border-white/60 rounded-xl px-3 py-1.5 shadow-sm w-56">
        <Search size={16} className="text-slate-400 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Cari data..."
          className="text-sm bg-transparent focus:outline-none w-full"
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <X size={14} className="text-slate-400" />
          </button>
        )}
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-6">Tidak ditemukan</p>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                onClick={() => handleSelect(r)}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex justify-between items-center"
              >
                <span className="text-sm text-slate-700">{r.label}</span>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{r.type}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}