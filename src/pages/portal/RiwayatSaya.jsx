import PageHeader from "../../components/PageHeader";

const riwayat = [
  { jenis: "Rawat Jalan", dokter: "dr. Ani", tanggal: "2026-09-20" },
  { jenis: "Lab - Darah Lengkap", dokter: "-", tanggal: "2026-09-15" },
];

export default function RiwayatSaya() {
  return (
    <div>
      <PageHeader title="Riwayat Saya" subtitle="Riwayat pelayanan dan pemeriksaan kamu" gradient="from-teal-600 via-cyan-600 to-blue-600" />
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
        {riwayat.map((r, i) => (
          <div key={i} className="p-4 flex justify-between text-sm">
            <div>
              <p className="font-medium text-slate-700">{r.jenis}</p>
              <p className="text-slate-400">{r.dokter}</p>
            </div>
            <span className="text-slate-500">{r.tanggal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}