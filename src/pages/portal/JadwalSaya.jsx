import PageHeader from "../../components/PageHeader";

const jadwal = [
  { jenis: "Kontrol Rutin", dokter: "dr. Ani", tanggal: "2026-10-05", jam: "09:00" },
];

export default function JadwalSaya() {
  return (
    <div>
      <PageHeader title="Jadwal Saya" subtitle="Jadwal kontrol dan pemeriksaan mendatang" gradient="from-teal-600 via-cyan-600 to-blue-600" />
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
        {jadwal.map((j, i) => (
          <div key={i} className="p-4 flex justify-between text-sm">
            <div>
              <p className="font-medium text-slate-700">{j.jenis}</p>
              <p className="text-slate-400">{j.dokter}</p>
            </div>
            <span className="text-slate-500">{j.tanggal}, {j.jam}</span>
          </div>
        ))}
      </div>
    </div>
  );
}