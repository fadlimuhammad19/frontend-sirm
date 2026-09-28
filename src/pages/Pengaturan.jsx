import { useState } from "react";
import { Save, Building, DollarSign, DatabaseBackup, CheckCircle } from "lucide-react";

const tabs = [
  { key: "umum", label: "Umum", icon: Building },
  { key: "tarif", label: "Tarif Layanan", icon: DollarSign },
  { key: "backup", label: "Backup & Restore", icon: DatabaseBackup },
];

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState("umum");
  const [saved, setSaved] = useState(false);

  const [formUmum, setFormUmum] = useState({
    nama_rs: "RS Pusat Tegal",
    alamat: "Jl. Ahmad Yani No. 1, Tegal",
    telepon: "0283-123456",
    email: "info@rspusattegal.co.id",
  });

  const [tarif, setTarif] = useState({
    rawat_jalan: 50000,
    rawat_inap: 350000,
    igd: 150000,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-1">Pengaturan Sistem</h1>
      <p className="text-slate-500 text-sm mb-6">Konfigurasi umum, tarif layanan, dan backup data</p>

      <div className="flex gap-2 mb-4 border-b border-slate-200 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 text-green-600 text-sm px-3 py-2 rounded-lg mb-4">
          <CheckCircle size={16} /> Perubahan berhasil disimpan
        </div>
      )}

      {activeTab === "umum" && (
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-3 max-w-lg">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Nama Rumah Sakit</label>
            <input
              value={formUmum.nama_rs}
              onChange={(e) => setFormUmum({ ...formUmum, nama_rs: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Alamat</label>
            <textarea
              value={formUmum.alamat}
              onChange={(e) => setFormUmum({ ...formUmum, alamat: e.target.value })}
              rows={2}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Telepon</label>
            <input
              value={formUmum.telepon}
              onChange={(e) => setFormUmum({ ...formUmum, telepon: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Email</label>
            <input
              type="email"
              value={formUmum.email}
              onChange={(e) => setFormUmum({ ...formUmum, email: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium mt-2"
          >
            <Save size={16} /> Simpan Perubahan
          </button>
        </form>
      )}

      {activeTab === "tarif" && (
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-3 max-w-lg">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Tarif Rawat Jalan (Rp)</label>
            <input
              type="number"
              value={tarif.rawat_jalan}
              onChange={(e) => setTarif({ ...tarif, rawat_jalan: Number(e.target.value) })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Tarif Rawat Inap / hari (Rp)</label>
            <input
              type="number"
              value={tarif.rawat_inap}
              onChange={(e) => setTarif({ ...tarif, rawat_inap: Number(e.target.value) })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Tarif IGD (Rp)</label>
            <input
              type="number"
              value={tarif.igd}
              onChange={(e) => setTarif({ ...tarif, igd: Number(e.target.value) })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium mt-2"
          >
            <Save size={16} /> Simpan Tarif
          </button>
        </form>
      )}

      {activeTab === "backup" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-lg space-y-4">
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Backup Data</h3>
            <p className="text-sm text-slate-500 mb-3">Unduh salinan seluruh data sistem sebagai file cadangan.</p>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Download Backup
            </button>
          </div>
          <hr className="border-slate-100" />
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Restore Data</h3>
            <p className="text-sm text-slate-500 mb-3">Pulihkan data dari file cadangan sebelumnya.</p>
            <input
              type="file"
              className="text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 file:text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}