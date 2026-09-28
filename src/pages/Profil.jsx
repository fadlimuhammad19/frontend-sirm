import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import { Save, CheckCircle } from "lucide-react";

export default function Profil() {
  const { user } = useAuth();
  const [form, setForm] = useState({ nama: user?.username || "", email: "", telepon: "" });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Profil Saya" subtitle="Kelola informasi akun kamu" gradient="from-blue-600 via-indigo-600 to-purple-600" />

      <div className="max-w-lg">
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-600 text-sm px-3 py-2 rounded-lg mb-4">
            <CheckCircle size={16} /> Profil berhasil diperbarui
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold">
              {user?.username?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{user?.username}</p>
              <p className="text-sm text-slate-500">{user?.role}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Nama Lengkap</label>
              <input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">No. Telepon</label>
              <input
                value={form.telepon}
                onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium mt-2">
              <Save size={16} /> Simpan Profil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}