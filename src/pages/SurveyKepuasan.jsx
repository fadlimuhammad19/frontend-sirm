import { useState } from "react";
import PageHeader from "../components/PageHeader";
import StarRating from "../components/StarRating";
import { Send, MessageSquare } from "lucide-react";

const dummySurvey = [
  { id: 1, nama_pasien: "Budi Santoso", rating: 5, komentar: "Pelayanan sangat cepat dan ramah", tanggal: "2026-09-20" },
  { id: 2, nama_pasien: "Siti Aminah", rating: 4, komentar: "Bagus, cuma antrian agak lama", tanggal: "2026-09-24" },
];

export default function SurveyKepuasan() {
  const [surveys, setSurveys] = useState(dummySurvey);
  const [form, setForm] = useState({ nama_pasien: "", rating: 0, komentar: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    setSurveys((prev) => [{ ...form, id: Date.now(), tanggal: new Date().toISOString().slice(0, 10) }, ...prev]);
    setForm({ nama_pasien: "", rating: 0, komentar: "" });
  };

  const rataRata = surveys.length > 0 ? (surveys.reduce((sum, s) => sum + s.rating, 0) / surveys.length).toFixed(1) : 0;

  return (
    <div>
      <PageHeader
        title="Survey Kepuasan Pasien"
        subtitle="Kumpulkan dan pantau kepuasan pasien terhadap pelayanan"
        gradient="from-yellow-500 via-amber-500 to-orange-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <MessageSquare size={22} className="text-white" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Survey Masuk</p>
            <h2 className="text-2xl font-bold text-slate-800">{surveys.length}</h2>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 lg:col-span-2">
          <p className="text-slate-500 text-sm mb-2">Rata-rata Rating</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-800">{rataRata}</h2>
            <StarRating value={Math.round(rataRata)} readOnly />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Isi Survey Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Nama Pasien</label>
              <input
                required
                value={form.nama_pasien}
                onChange={(e) => setForm({ ...form, nama_pasien: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Rating Kepuasan</label>
              <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Komentar (opsional)</label>
              <textarea
                value={form.komentar}
                onChange={(e) => setForm({ ...form, komentar: e.target.value })}
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
              <Send size={16} /> Kirim Survey
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Riwayat Survey</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {surveys.map((s) => (
              <div key={s.id} className="border-b border-slate-100 pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-slate-700 text-sm">{s.nama_pasien}</p>
                  <span className="text-xs text-slate-400">{s.tanggal}</span>
                </div>
                <StarRating value={s.rating} readOnly />
                {s.komentar && <p className="text-sm text-slate-500 mt-1">{s.komentar}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}