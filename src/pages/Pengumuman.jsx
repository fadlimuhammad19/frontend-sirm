import { useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import useCrud from "../hooks/useCrud";
import useForm from "../hooks/useForm";
import { required } from "../utils/validators";
import { Plus, Bell } from "lucide-react";

const initialData = [
  { id: 1, judul: "Jadwal dr. Ani berubah", isi: "Praktik dr. Ani hari Jumat dimajukan jadi jam 07:00", tanggal: "2026-09-25" },
  { id: 2, judul: "Stok Amoxicillin menipis", isi: "Segera lakukan pemesanan ulang ke supplier", tanggal: "2026-09-26" },
];

const columns = [
  { key: "judul", label: "Judul" },
  { key: "isi", label: "Isi Pengumuman" },
  { key: "tanggal", label: "Tanggal" },
];

const emptyForm = { judul: "", isi: "", tanggal: "" };
const rules = { judul: required("Judul"), isi: required("Isi pengumuman") };

export default function Pengumuman() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => { form.reset(crud.editing || emptyForm); }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save({ ...form.values, tanggal: form.values.tanggal || new Date().toISOString().slice(0, 10) });
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <PageHeader
        title="Pengumuman / Notifikasi"
        subtitle="Kelola pengumuman internal untuk staff rumah sakit"
        gradient="from-indigo-600 via-blue-600 to-cyan-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Buat Pengumuman
          </button>
        }
      />

      <div className="space-y-3 mb-6">
        {crud.data.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Bell size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-800">{p.judul}</h3>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{p.tanggal}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{p.isi}</p>
              <div className="flex gap-3 mt-2 text-xs">
                <button onClick={() => crud.openEdit(p)} className="text-blue-600 hover:underline font-medium">Edit</button>
                <button onClick={() => crud.askDelete(p)} className="text-red-600 hover:underline font-medium">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Pengumuman" : "Buat Pengumuman"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Judul" error={form.errors.judul}>
            <input value={form.values.judul} onChange={(e) => form.setFieldValue("judul", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.judul ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Isi Pengumuman" error={form.errors.isi}>
            <textarea value={form.values.isi} onChange={(e) => form.setFieldValue("isi", e.target.value)} rows={3}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.isi ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">Simpan</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus pengumuman "${crud.confirmDelete?.judul}"?`} />
    </div>
  );
}