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
import { Plus, Truck } from "lucide-react";

const initialData = [
  { id: 1, nama_obat: "Paracetamol 500mg", supplier: "PT Kimia Farma", jumlah_masuk: 500, tanggal: "2026-09-15" },
  { id: 2, nama_obat: "Amoxicillin 500mg", supplier: "PT Kalbe Farma", jumlah_masuk: 200, tanggal: "2026-09-18" },
];

const columns = [
  { key: "nama_obat", label: "Nama Obat" },
  { key: "supplier", label: "Supplier" },
  { key: "jumlah_masuk", label: "Jumlah Masuk" },
  { key: "tanggal", label: "Tanggal" },
];

const emptyForm = { nama_obat: "", supplier: "", jumlah_masuk: "", tanggal: "" };
const rules = { nama_obat: required("Nama obat"), supplier: required("Supplier"), tanggal: required("Tanggal") };

export default function GudangFarmasi() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => { form.reset(crud.editing || emptyForm); }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save({ ...form.values, jumlah_masuk: Number(form.values.jumlah_masuk) });
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <PageHeader
        title="Gudang Farmasi"
        subtitle="Kelola stok masuk obat dan data supplier"
        gradient="from-lime-600 via-green-600 to-emerald-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-green-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Tambah Stok Masuk
          </button>
        }
      />

      <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 flex items-center justify-center">
          <Truck size={22} className="text-white" />
        </div>
        <div>
          <p className="text-slate-500 text-sm">Total Transaksi Masuk</p>
          <h2 className="text-2xl font-bold text-slate-800">{crud.data.length}</h2>
        </div>
      </div>

      <Table columns={columns} data={crud.data} onEdit={crud.openEdit} onDelete={crud.askDelete} />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Stok Masuk" : "Tambah Stok Masuk"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Obat" error={form.errors.nama_obat}>
            <input value={form.values.nama_obat} onChange={(e) => form.setFieldValue("nama_obat", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.nama_obat ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Supplier" error={form.errors.supplier}>
            <input value={form.values.supplier} onChange={(e) => form.setFieldValue("supplier", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.supplier ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Jumlah Masuk">
            <input type="number" value={form.values.jumlah_masuk} onChange={(e) => form.setFieldValue("jumlah_masuk", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Tanggal" error={form.errors.tanggal}>
            <input type="date" value={form.values.tanggal} onChange={(e) => form.setFieldValue("tanggal", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.tanggal ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">Simpan</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus data "${crud.confirmDelete?.nama_obat}"?`} />
    </div>
  );
}