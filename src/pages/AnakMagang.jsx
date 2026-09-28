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
import { Plus, GraduationCap } from "lucide-react";

const initialData = [
  { id: 1, nama: "Dewi Lestari", prodi: "Keperawatan", institusi: "Poltekkes Semarang", unit_penempatan: "Rawat Inap", pembimbing: "Ns. Ratna", tgl_mulai: "2026-08-01", tgl_selesai: "2026-10-31", status: "Aktif" },
  { id: 2, nama: "Fajar Ramadhan", prodi: "Teknik Informatika (IT)", institusi: "Universitas Pancasakti Tegal", unit_penempatan: "IT / Sistem Informasi", pembimbing: "Bpk. Hendra", tgl_mulai: "2026-09-01", tgl_selesai: "2026-12-01", status: "Aktif" },
  { id: 3, nama: "Nabila Putri", prodi: "Farmasi", institusi: "Poltekkes Semarang", unit_penempatan: "Gudang Farmasi", pembimbing: "Apt. Sinta", tgl_mulai: "2026-07-01", tgl_selesai: "2026-09-01", status: "Selesai" },
];

const columns = [
  { key: "nama", label: "Nama" },
  { key: "prodi", label: "Program Studi" },
  { key: "institusi", label: "Institusi" },
  { key: "unit_penempatan", label: "Unit Penempatan" },
  { key: "status", label: "Status" },
];

const daftarProdi = [
  "Keperawatan",
  "Farmasi",
  "Kebidanan",
  "Teknik Informatika (IT)",
  "Teknik Biomedis",
  "Administrasi Rumah Sakit",
  "Gizi",
  "Teknik Radiologi/Radioterapi",
  "Keperawatan Gigi",
  "Kesehatan Lingkungan",
  "Analis Kesehatan",
];

const emptyForm = {
  nama: "",
  prodi: "Keperawatan",
  institusi: "",
  unit_penempatan: "",
  pembimbing: "",
  tgl_mulai: "",
  tgl_selesai: "",
  status: "Aktif",
};

const rules = {
  nama: required("Nama"),
  institusi: required("Institusi/kampus"),
  unit_penempatan: required("Unit penempatan"),
  tgl_mulai: required("Tanggal mulai"),
  tgl_selesai: required("Tanggal selesai"),
};

const prodiColor = {
  Keperawatan: "bg-blue-50 text-blue-600",
  Farmasi: "bg-emerald-50 text-emerald-600",
  Kebidanan: "bg-pink-50 text-pink-600",
  "Teknik Informatika (IT)": "bg-indigo-50 text-indigo-600",
  "Teknik Biomedis": "bg-cyan-50 text-cyan-600",
  "Administrasi Rumah Sakit": "bg-amber-50 text-amber-600",
  Gizi: "bg-lime-50 text-lime-600",
  "Teknik Radiologi/Radioterapi": "bg-slate-100 text-slate-600",
  "Keperawatan Gigi": "bg-teal-50 text-teal-600",
  "Kesehatan Lingkungan": "bg-green-50 text-green-600",
  "Analis Kesehatan": "bg-purple-50 text-purple-600",
};

export default function AnakMagang() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => {
    form.reset(crud.editing || emptyForm);
  }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  const totalAktif = crud.data.filter((d) => d.status === "Aktif").length;
  const jumlahPerProdi = daftarProdi
    .map((p) => ({ prodi: p, jumlah: crud.data.filter((d) => d.prodi === p && d.status === "Aktif").length }))
    .filter((p) => p.jumlah > 0);

  return (
    <div>
      <Toast {...crud.toast} />

      <PageHeader
        title="Anak Magang / PKL"
        subtitle="Kelola data mahasiswa magang dari berbagai program studi"
        gradient="from-teal-600 via-cyan-600 to-blue-600"
        action={
          <button
            onClick={crud.openAdd}
            className="flex items-center gap-2 bg-white text-teal-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus size={16} /> Tambah Anak Magang
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-2">
            <GraduationCap size={20} className="text-white" />
          </div>
          <p className="text-slate-500 text-sm">Total Sedang Magang</p>
          <h2 className="text-2xl font-bold text-slate-800">{totalAktif}</h2>
        </div>
        {jumlahPerProdi.slice(0, 3).map((p) => (
          <div key={p.prodi} className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
            <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium mb-2 ${prodiColor[p.prodi] || "bg-slate-100 text-slate-600"}`}>
              {p.prodi}
            </span>
            <h2 className="text-2xl font-bold text-slate-800">{p.jumlah}</h2>
          </div>
        ))}
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({
          ...d,
          prodi: <span className={`px-2 py-1 rounded-full text-xs font-medium ${prodiColor[d.prodi] || "bg-slate-100 text-slate-600"}`}>{d.prodi}</span>,
          status: d.status === "Aktif" ? "🟢 Aktif" : "⚪ Selesai",
        }))}
        onEdit={(row) => crud.openEdit(crud.data.find((d) => d.id === row.id))}
        onDelete={(row) => crud.askDelete(crud.data.find((d) => d.id === row.id))}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Data Magang" : "Tambah Anak Magang"}>
        <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          <FormField label="Nama" error={form.errors.nama}>
            <input
              value={form.values.nama}
              onChange={(e) => form.setFieldValue("nama", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.nama ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Program Studi">
            <select
              value={form.values.prodi}
              onChange={(e) => form.setFieldValue("prodi", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {daftarProdi.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Institusi / Kampus" error={form.errors.institusi}>
            <input
              value={form.values.institusi}
              onChange={(e) => form.setFieldValue("institusi", e.target.value)}
              placeholder="Contoh: Poltekkes Semarang"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.institusi ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Unit Penempatan" error={form.errors.unit_penempatan}>
            <input
              value={form.values.unit_penempatan}
              onChange={(e) => form.setFieldValue("unit_penempatan", e.target.value)}
              placeholder="Contoh: Rawat Inap, IT, Gudang Farmasi"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.unit_penempatan ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Pembimbing Lapangan">
            <input
              value={form.values.pembimbing}
              onChange={(e) => form.setFieldValue("pembimbing", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Tanggal Mulai" error={form.errors.tgl_mulai}>
              <input
                type="date"
                value={form.values.tgl_mulai}
                onChange={(e) => form.setFieldValue("tgl_mulai", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  form.errors.tgl_mulai ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
                }`}
              />
            </FormField>
            <FormField label="Tanggal Selesai" error={form.errors.tgl_selesai}>
              <input
                type="date"
                value={form.values.tgl_selesai}
                onChange={(e) => form.setFieldValue("tgl_selesai", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  form.errors.tgl_selesai ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
                }`}
              />
            </FormField>
          </div>

          <FormField label="Status">
            <select
              value={form.values.status}
              onChange={(e) => form.setFieldValue("status", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Aktif</option>
              <option>Selesai</option>
            </select>
          </FormField>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">
            Simpan
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!crud.confirmDelete}
        onCancel={() => crud.setConfirmDelete(null)}
        onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus data magang "${crud.confirmDelete?.nama}"?`}
      />
    </div>
  );
}