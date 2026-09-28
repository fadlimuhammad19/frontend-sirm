import { useState } from "react";
import { KeyRound, CheckCircle } from "lucide-react";

export default function GantiPassword() {
  const [form, setForm] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.baru.length < 6) {
      setError("Password baru minimal 6 karakter");
      return;
    }
    if (form.baru !== form.konfirmasi) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    // Sementara: dummy, nanti diganti call API ganti password
    setSuccess(true);
    setForm({ lama: "", baru: "", konfirmasi: "" });
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-slate-800 mb-1">Ganti Password</h1>
      <p className="text-slate-500 text-sm mb-6">Perbarui password akun kamu secara berkala untuk keamanan</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{error}</div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 text-green-600 text-sm px-3 py-2 rounded-lg mb-4">
            <CheckCircle size={16} /> Password berhasil diperbarui
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Password Lama</label>
            <input
              type="password"
              required
              value={form.lama}
              onChange={(e) => setForm({ ...form, lama: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Password Baru</label>
            <input
              type="password"
              required
              value={form.baru}
              onChange={(e) => setForm({ ...form, baru: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Konfirmasi Password Baru</label>
            <input
              type="password"
              required
              value={form.konfirmasi}
              onChange={(e) => setForm({ ...form, konfirmasi: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2"
          >
            <KeyRound size={16} /> Perbarui Password
          </button>
        </form>
      </div>
    </div>
  );
}