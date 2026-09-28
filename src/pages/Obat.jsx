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
  { id: 1, nama_obat: "Paracetamol 500mg", stok: 120, satuan: "Strip" },
  { id: 2, nama_obat: "Amoxicillin 500mg", stok: 8, satuan: "Strip" },
];

const columns = [
  { key: "nama_obat", label: "Nama Obat" },
  { key: "stok", label: "Stok" },
  { key: "satuan", label: "Satuan" },
];

const emptyForm = { nama_obat: "", stok: "", satuan: "Strip" };

const rules = {
  nama_obat: required("Nama obat"),
  stok: (value) => {
    if (value === "" || value === undefined) return "Stok wajib diisi";
    if (Number(value) < 0) return "Stok tidak boleh negatif";
    return "";
  },
};

export default function Obat() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => {
    form.reset(crud.editing || emptyForm);
  }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save({ ...form.values, stok: Number(form.values.stok) });
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Data Obat-obatan</h1>
          <p className="text-slate-500 text-sm">Kelola stok obat rumah sakit</p>
        </div>
        <button
          onClick={crud.openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Tambah Obat
        </button>
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({ ...d, stok: d.stok <= 10 ? `⚠️ ${d.stok}` : d.stok }))}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Obat" : "Tambah Obat"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Obat" error={form.errors.nama_obat}>
            <input
              value={form.values.nama_obat}
              onChange={(e) => form.setFieldValue("nama_obat", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.nama_obat ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Stok" error={form.errors.stok}>
            <input
              type="number"
              value={form.values.stok}
              onChange={(e) => form.setFieldValue("stok", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.stok ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="Satuan">
            <select
              value={form.values.satuan}
              onChange={(e) => form.setFieldValue("satuan", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Strip</option>
              <option>Botol</option>
              <option>Tablet</option>
              <option>Ampul</option>
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
        message={`Yakin ingin menghapus data "${crud.confirmDelete?.nama_obat}"?`}
      />
    </div>
  );
}