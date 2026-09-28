import { useState } from "react";
import PageHeader from "../components/PageHeader";
import QRScanModal from "../components/QRScanModal";
import QRCodeDisplay from "../components/QRCodeDisplay";
import dummyStaff from "../utils/staffData";
import dummyJadwal, { shiftTypes } from "../utils/shiftData";
import dummyAbsensiAwal from "../utils/absensiData";
import { hitungStatus } from "../utils/absensiHelper";
import { ScanLine, LogIn, LogOut, IdCard } from "lucide-react";

const statusStyle = {
  "tepat-waktu": "bg-green-50 text-green-700 border-green-200",
  telat: "bg-red-50 text-red-700 border-red-200",
  "belum-absen": "bg-slate-100 text-slate-500 border-slate-200",
  libur: "bg-slate-50 text-slate-400 border-slate-200",
};

const statusLabel = {
  "tepat-waktu": "Tepat Waktu",
  telat: "Telat",
  "belum-absen": "Belum Absen",
  libur: "Libur",
};

export default function Absensi() {
  const today = new Date().toISOString().slice(0, 10);
  const [absensi, setAbsensi] = useState(dummyAbsensiAwal);
  const [scanOpen, setScanOpen] = useState(false);
  const [kartuStaff, setKartuStaff] = useState(null);

  const jadwalHariIni = dummyJadwal[today] || {};
  const absensiHariIni = absensi[today] || {};

  const jamSekarang = () =>
    new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const updateAbsensi = (staffId, field, metode) => {
    setAbsensi((prev) => {
      const hariIni = prev[today] || {};
      const data = hariIni[staffId] || { checkIn: null, checkOut: null, metode: null };
      return {
        ...prev,
        [today]: { ...hariIni, [staffId]: { ...data, [field]: jamSekarang(), metode } },
      };
    });
  };

  const handleScanSuccess = (decodedText) => {
    setScanOpen(false);
    const match = decodedText.match(/^STAFF-(\d+)$/);
    if (!match) {
      alert("QR tidak dikenali. Pastikan scan kartu ID staff yang benar.");
      return;
    }
    const staffId = Number(match[1]);
    const staff = dummyStaff.find((s) => s.id === staffId);
    if (!staff) {
      alert("Staff tidak ditemukan.");
      return;
    }
    const sudahCheckIn = absensiHariIni[staffId]?.checkIn;
    updateAbsensi(staffId, sudahCheckIn ? "checkOut" : "checkIn", "qr");
  };

  const staffAda = dummyStaff.filter((s) => (jadwalHariIni[s.id] || "libur") !== "libur");

  return (
    <div>
      <PageHeader
        title="Absensi Staff"
        subtitle="Check-in / check-out manual atau scan QR, dicocokkan dengan jadwal shift"
        gradient="from-emerald-600 via-teal-600 to-cyan-600"
      />

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-slate-500">
          Tanggal: <span className="font-medium text-slate-700">{today}</span>
        </p>
        <button
          onClick={() => setScanOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <ScanLine size={16} /> Scan QR Absen
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-left">
              <th className="p-3 font-medium">Nama</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Shift</th>
              <th className="p-3 font-medium">Check-in</th>
              <th className="p-3 font-medium">Check-out</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staffAda.map((s) => {
              const shiftKey = jadwalHariIni[s.id];
              const data = absensiHariIni[s.id] || {};
              const status = hitungStatus(shiftKey, data.checkIn);

              return (
                <tr key={s.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-slate-700">{s.nama}</td>
                  <td className="p-3 text-slate-500">{s.role}</td>
                  <td className="p-3 text-slate-500">
                    {shiftTypes[shiftKey]?.label} ({shiftTypes[shiftKey]?.jam})
                  </td>
                  <td className="p-3 text-slate-600">{data.checkIn || "-"}</td>
                  <td className="p-3 text-slate-600">{data.checkOut || "-"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyle[status]}`}>
                      {statusLabel[status]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {!data.checkIn && (
                        <button
                          onClick={() => updateAbsensi(s.id, "checkIn", "manual")}
                          className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                        >
                          <LogIn size={14} /> Check-in
                        </button>
                      )}
                      {data.checkIn && !data.checkOut && (
                        <button
                          onClick={() => updateAbsensi(s.id, "checkOut", "manual")}
                          className="flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                        >
                          <LogOut size={14} /> Check-out
                        </button>
                      )}
                      <button
                        onClick={() => setKartuStaff(s)}
                        className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                      >
                        <IdCard size={14} /> Kartu ID
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <QRScanModal isOpen={scanOpen} onClose={() => setScanOpen(false)} onScanSuccess={handleScanSuccess} />

      {kartuStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4" onClick={() => setKartuStaff(null)}>
          <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold text-slate-800">{kartuStaff.nama}</p>
            <p className="text-xs text-slate-400">{kartuStaff.role} — {kartuStaff.departemen}</p>
            <QRCodeDisplay value={`STAFF-${kartuStaff.id}`} size={160} />
            <button onClick={() => setKartuStaff(null)} className="text-sm text-slate-500 mt-2">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}