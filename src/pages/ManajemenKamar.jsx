import { useState } from "react";
import PageHeader from "../components/PageHeader";
import BedModal from "../components/BedModal";
import dummyKamarAwal from "../utils/KamarData";
import { BedDouble, User } from "lucide-react";

const statusStyle = {
  kosong: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
  terisi: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
  dibersihkan: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
};

const statusLabel = { kosong: "Kosong", terisi: "Terisi", dibersihkan: "Dibersihkan" };

export default function ManajemenKamar() {
  const [kamarList, setKamarList] = useState(dummyKamarAwal);
  const [selectedBed, setSelectedBed] = useState(null);

  const allBeds = kamarList.flatMap((k) => k.tempatTidur);
  const total = allBeds.length;
  const kosong = allBeds.filter((b) => b.status === "kosong").length;
  const terisi = allBeds.filter((b) => b.status === "terisi").length;
  const dibersihkan = allBeds.filter((b) => b.status === "dibersihkan").length;
  const okupansi = total > 0 ? Math.round((terisi / total) * 100) : 0;

  const handleSaveBed = (kamarId, updatedBed) => {
    setKamarList((prev) =>
      prev.map((k) =>
        k.id === kamarId
          ? { ...k, tempatTidur: k.tempatTidur.map((b) => (b.id === updatedBed.id ? updatedBed : b)) }
          : k
      )
    );
  };

  return (
    <div>
      <PageHeader
        title="Manajemen Kamar & Tempat Tidur"
        subtitle="Pantau ketersediaan kamar rawat inap secara real-time"
        gradient="from-rose-600 via-pink-600 to-fuchsia-600"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs">Total Bed</p>
          <p className="text-2xl font-bold text-slate-800">{total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-green-500 text-xs">Kosong</p>
          <p className="text-2xl font-bold text-green-600">{kosong}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-red-500 text-xs">Terisi</p>
          <p className="text-2xl font-bold text-red-600">{terisi}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs">Okupansi</p>
          <p className="text-2xl font-bold text-slate-800">{okupansi}%</p>
        </div>
      </div>

      <div className="space-y-5">
        {kamarList.map((kamar) => (
          <div key={kamar.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold text-slate-800">{kamar.nama}</h3>
                <p className="text-xs text-slate-400">{kamar.tipe} · Lantai {kamar.lantai}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {kamar.tempatTidur.map((bed) => (
                <button
                  key={bed.id}
                  onClick={() => setSelectedBed({ ...bed, kamarId: kamar.id })}
                  className={`w-32 border rounded-xl p-3 text-left transition-colors ${statusStyle[bed.status]}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <BedDouble size={14} />
                    <span className="text-xs font-semibold">{bed.id}</span>
                  </div>
                  <p className="text-xs font-medium">{statusLabel[bed.status]}</p>
                  {bed.pasien && (
                    <p className="text-[11px] flex items-center gap-1 mt-1 truncate">
                      <User size={11} /> {bed.pasien}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedBed && (
        <BedModal
          bed={selectedBed}
          onClose={() => setSelectedBed(null)}
          onSave={(updatedBed) => handleSaveBed(selectedBed.kamarId, updatedBed)}
        />
      )}
    </div>
  );
}