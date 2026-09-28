import { useState } from "react";
import { X } from "lucide-react";

const statusOptions = ["kosong", "terisi", "dibersihkan"];

export default function BedModal({ bed, onClose, onSave }) {
  const [status, setStatus] = useState(bed.status);
  const [pasien, setPasien] = useState(bed.pasien || "");

  if (!bed) return null;

  const handleSave = () => {
    onSave({
      ...bed,
      status,
      pasien: status === "terisi" ? pasien : null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Tempat Tidur {bed.id}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <label className="text-sm text-slate-600 mb-1 block">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-3"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === "kosong" ? "Kosong" : s === "terisi" ? "Terisi" : "Sedang Dibersihkan"}
            </option>
          ))}
        </select>

        {status === "terisi" && (
          <>
            <label className="text-sm text-slate-600 mb-1 block">Nama Pasien</label>
            <input
              value={pasien}
              onChange={(e) => setPasien(e.target.value)}
              placeholder="Nama pasien..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-3"
            />
          </>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}