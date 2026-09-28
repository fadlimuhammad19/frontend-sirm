import QRCodeDisplay from "./QRCodeDisplay";
import { Hospital } from "lucide-react";

export default function KartuPasienPrint({ pasien }) {
  if (!pasien) return null;

  return (
    <div className="print-area fixed inset-0 bg-white z-[100] flex items-center justify-center hidden print:flex">
      <div className="w-[340px] border-2 border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 border-b border-slate-300 pb-2 mb-3">
          <Hospital size={20} />
          <div>
            <p className="font-bold text-sm">RS Pusat Tegal</p>
            <p className="text-[10px] text-slate-500">Kartu Identitas Berobat</p>
          </div>
        </div>
        <div className="flex gap-4">
          <QRCodeDisplay value={`PASIEN-${pasien.id}-${pasien.nik}`} size={90} />
          <div className="text-sm">
            <p className="text-slate-500 text-xs">Nama</p>
            <p className="font-semibold mb-1">{pasien.nama}</p>
            <p className="text-slate-500 text-xs">No. Rekam Medis</p>
            <p className="font-semibold mb-1">RM-{String(pasien.id).padStart(6, "0")}</p>
            <p className="text-slate-500 text-xs">NIK</p>
            <p className="font-semibold">{pasien.nik}</p>
          </div>
        </div>
      </div>
    </div>
  );
}