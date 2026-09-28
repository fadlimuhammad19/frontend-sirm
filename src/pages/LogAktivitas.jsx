import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Search } from "lucide-react";

const dummyLog = [
  { user: "admin", aksi: "Menambahkan data pasien Budi Santoso", modul: "Pasien", waktu: "26 Sep 2026, 10:15" },
  { user: "dr.ani", aksi: "Mengedit rekam medis Siti Aminah", modul: "Rekam Medis", waktu: "26 Sep 2026, 09:40" },
  { user: "admin", aksi: "Menghapus data obat kadaluarsa", modul: "Obat", waktu: "25 Sep 2026, 16:22" },
  { user: "rina.kasir", aksi: "Mencatat transaksi pembayaran", modul: "Keuangan", waktu: "25 Sep 2026, 14:05" },
];

const modulColor = {
  Pasien: "bg-blue-100 text-blue-700",
  "Rekam Medis": "bg-purple-100 text-purple-700",
  Obat: "bg-amber-100 text-amber-700",
  Keuangan: "bg-green-100 text-green-700",
};

export default function LogAktivitas() {
  const [search, setSearch] = useState("");

  const filtered = dummyLog.filter(
    (l) => l.user.toLowerCase().includes(search.toLowerCase()) || l.aksi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Log Aktivitas"
        subtitle="Riwayat aktivitas seluruh user di dalam sistem"
        gradient="from-gray-700 via-slate-700 to-zinc-800"
      />

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari user atau aksi..."
              className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((log, i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center text-xs font-bold">
                  {log.user[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-700"><span className="font-semibold">{log.user}</span> {log.aksi}</p>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${modulColor[log.modul] || "bg-slate-100 text-slate-600"}`}>
                    {log.modul}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{log.waktu}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}