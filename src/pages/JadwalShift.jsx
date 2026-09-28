import { useState } from "react";
import PageHeader from "../components/PageHeader";
import dummyStaff from "../utils/staffData";
import dummyJadwalAwal, { shiftTypes } from "../utils/shiftData";
import { CalendarDays } from "lucide-react";

const shiftColor = {
  pagi: "bg-amber-50 text-amber-700 border-amber-200",
  siang: "bg-blue-50 text-blue-700 border-blue-200",
  malam: "bg-indigo-50 text-indigo-700 border-indigo-200",
  libur: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function JadwalShift() {
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [jadwal, setJadwal] = useState(dummyJadwalAwal);
  const [filterRole, setFilterRole] = useState("Semua");

  const jadwalHariIni = jadwal[tanggal] || {};

  const handleUbahShift = (staffId, shiftBaru) => {
    setJadwal((prev) => ({
      ...prev,
      [tanggal]: { ...(prev[tanggal] || {}), [staffId]: shiftBaru },
    }));
  };

  const roles = ["Semua", ...new Set(dummyStaff.map((s) => s.role))];
  const staffTampil = filterRole === "Semua" ? dummyStaff : dummyStaff.filter((s) => s.role === filterRole);

  return (
    <div>
      <PageHeader
        title="Jadwal Shift Staff"
        subtitle="Atur jadwal shift pagi, siang, malam untuk seluruh staff RS"
        gradient="from-indigo-600 via-blue-600 to-cyan-600"
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <CalendarDays size={16} className="text-slate-400" />
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="text-sm outline-none"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {Object.entries(shiftTypes).map(([key, s]) => (
          <div key={key} className={`rounded-xl border p-3 ${shiftColor[key]}`}>
            <p className="text-xs font-semibold uppercase">{s.label}</p>
            <p className="text-sm">{s.jam}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-left">
              <th className="p-3 font-medium">Nama</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Departemen</th>
              <th className="p-3 font-medium">Shift</th>
            </tr>
          </thead>
          <tbody>
            {staffTampil.map((s) => {
              const shiftSaatIni = jadwalHariIni[s.id] || "libur";
              return (
                <tr key={s.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-slate-700">{s.nama}</td>
                  <td className="p-3 text-slate-500">{s.role}</td>
                  <td className="p-3 text-slate-500">{s.departemen}</td>
                  <td className="p-3">
                    <select
                      value={shiftSaatIni}
                      onChange={(e) => handleUbahShift(s.id, e.target.value)}
                      className={`border rounded-lg px-2 py-1 text-xs font-medium ${shiftColor[shiftSaatIni]}`}
                    >
                      <option value="pagi">Pagi (07:00-14:00)</option>
                      <option value="siang">Siang (14:00-21:00)</option>
                      <option value="malam">Malam (21:00-07:00)</option>
                      <option value="libur">Libur</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}