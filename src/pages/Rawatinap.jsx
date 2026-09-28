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
import { Plus, BedDouble } from "lucide-react";
import SimplePieChart from "../components/charts/SimplePieChart";

const initialData = [
  { id: 1, nama_pasien: "Budi Santoso", kamar: "VIP 101", tgl_masuk: "2026-09-20", status: "Dirawat" },
  { id: 2, nama_pasien: "Siti Aminah", kamar: "Kelas 1 - 205", tgl_masuk: "2026-09-22", status: "Dirawat" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "kamar", label: "Kamar" },
  { key: "tgl_masuk", label: "Tanggal Masuk" },
  { key: "status", label: "Status" },
];

const emptyForm = { nama_pasien: "", kamar: "", tgl_masuk: "", status: "Dirawat" };

const rules = {
  nama_pasien: required("Nama pasien"),
  kamar: required("Kamar"),
  tgl_masuk: required("Tanggal masuk"),
};

export default function RawatInap() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => {
    form.reset(crud.editing || emptyForm);
  }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  const totalKamar = 12;
  const terpakai = crud.data.filter((d) => d.status === "Dirawat").length;
  const tersedia = totalKamar - terpakai;

  const pieData = [
    { name: "Terpakai", value: terpakai },
    { name: "Tersedia", value: tersedia },
  ];
  const PIE_COLORS = ["#f43f5e", "#10b981"];

  return (
    <div>
      <Toast {...crud.toast} />

      <PageHeader
        title="Rawat Inap"
        subtitle="Kelola data pasien rawat inap dan ketersediaan kamar"
        gradient="from-rose-600 via-pink-600 to-fuchsia-600"
        action={
          <button
            onClick={crud.openAdd}
            className="flex items-center gap-2 bg-white text-rose-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus size={16} /> Tambah Rawat Inap
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
          <BedDouble className="text-rose-500 mb-2" size={22} />
          <p className="text-slate-500 text-sm">Total Kamar</p>
          <h2 className="text-2xl font-bold text-slate-800">{totalKamar}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
          <BedDouble className="text-amber-500 mb-2" size={22} />
          <p className="text-slate-500 text-sm">Sedang Terpakai</p>
          <h2 className="text-2xl font-bold text-slate-800">{terpakai}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
          <BedDouble className="text-emerald-500 mb-2" size={22} />
          <p className="text-slate-500 text-sm">Kamar Tersedia</p>
          <h2 className="text-2xl font-bold text-slate-800">{tersedia}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Okupansi Kamar</h3>
        <SimplePieChart data={pieData} colors={PIE_COLORS} />
      </div>

      <Table columns={columns} data={crud.data} onEdit={crud.openEdit} onDelete={crud.askDelete} />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Rawat Inap" : "Tambah Rawat Inap"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Pasien" error={form.errors.nama_pasien}>
            <input
              value={form.values.nama_pasien}
              onChange={(e) => form.setFieldValue("nama_pasien", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.nama_pasien ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Kamar" error={form.errors.kamar}>
            <input
              value={form.values.kamar}
              onChange={(e) => form.setFieldValue("kamar", e.target.value)}
              placeholder="Contoh: VIP 101"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.kamar ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Tanggal Masuk" error={form.errors.tgl_masuk}>
            <input
              type="date"
              value={form.values.tgl_masuk}
              onChange={(e) => form.setFieldValue("tgl_masuk", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.tgl_masuk ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Status">
            <select
              value={form.values.status}
              onChange={(e) => form.setFieldValue("status", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Dirawat</option>
              <option>Sudah Pulang</option>
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
        message={`Yakin ingin menghapus data rawat inap "${crud.confirmDelete?.nama_pasien}"?`}
      />
    </div>
  );
}