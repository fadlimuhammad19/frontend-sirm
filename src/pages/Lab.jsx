import { useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import FormField from "../components/FormField";
import useCrud from "../hooks/useCrud";
import useForm from "../hooks/useForm";
import { required } from "../utils/validators";
import { Plus } from "lucide-react";

const initialData = [
  { id: 1, nama_pasien: "Budi Santoso", jenis_pemeriksaan: "Darah Lengkap", status: "Selesai" },
  { id: 2, nama_pasien: "Siti Aminah", jenis_pemeriksaan: "Urine", status: "Pending" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "jenis_pemeriksaan", label: "Jenis Pemeriksaan" },
  { key: "status", label: "Status" },
];

const emptyForm = { nama_pasien: "", jenis_pemeriksaan: "", status: "Pending" };

const rules = {
  nama_pasien: required("Nama pasien"),
  jenis_pemeriksaan: required("Jenis pemeriksaan"),
};

export default function Lab() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => {
    form.reset(crud.editing || emptyForm);
  }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Data Lab</h1>
          <p className="text-slate-500 text-sm">Kelola data pemeriksaan laboratorium</p>
        </div>
        <button
          onClick={crud.openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Tambah Pemeriksaan
        </button>
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({ ...d, status: d.status === "Selesai" ? "✅ Selesai" : "⏳ Pending" }))}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Pemeriksaan" : "Tambah Pemeriksaan"}>
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

          <FormField label="Jenis Pemeriksaan" error={form.errors.jenis_pemeriksaan}>
            <input
              value={form.values.jenis_pemeriksaan}
              onChange={(e) => form.setFieldValue("jenis_pemeriksaan", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.jenis_pemeriksaan ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Status">
            <select
              value={form.values.status}
              onChange={(e) => form.setFieldValue("status", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pending</option>
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
        message={`Yakin ingin menghapus data pemeriksaan "${crud.confirmDelete?.nama_pasien}"?`}
      />
    </div>
  );
}