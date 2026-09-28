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
import { Plus } from "lucide-react";

const initialData = [
  { id: 1, dokter: "dr. Ani Wijaya", poli: "Umum", hari: "Senin, Rabu, Jumat", jam: "08:00 - 12:00" },
  { id: 2, dokter: "dr. Rudi Hartono", poli: "IGD", hari: "Setiap Hari", jam: "24 Jam" },
];

const columns = [
  { key: "dokter", label: "Dokter" },
  { key: "poli", label: "Poli" },
  { key: "hari", label: "Hari Praktik" },
  { key: "jam", label: "Jam" },
];

const emptyForm = { dokter: "", poli: "Umum", hari: "", jam: "" };
const rules = { dokter: required("Nama dokter"), hari: required("Hari praktik"), jam: required("Jam praktik") };

export default function JadwalDokter() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => { form.reset(crud.editing || emptyForm); }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <PageHeader
        title="Jadwal Dokter"
        subtitle="Kelola jadwal praktik dokter per poli"
        gradient="from-cyan-600 via-sky-600 to-blue-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-cyan-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Tambah Jadwal
          </button>
        }
      />

      <Table columns={columns} data={crud.data} onEdit={crud.openEdit} onDelete={crud.askDelete} />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Jadwal" : "Tambah Jadwal Dokter"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Dokter" error={form.errors.dokter}>
            <input value={form.values.dokter} onChange={(e) => form.setFieldValue("dokter", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.dokter ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Poli">
            <select value={form.values.poli} onChange={(e) => form.setFieldValue("poli", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Umum</option>
              <option>Anak</option>
              <option>Gigi</option>
              <option>Kandungan</option>
              <option>IGD</option>
            </select>
          </FormField>
          <FormField label="Hari Praktik" error={form.errors.hari}>
            <input value={form.values.hari} onChange={(e) => form.setFieldValue("hari", e.target.value)} placeholder="Contoh: Senin, Rabu, Jumat"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.hari ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Jam Praktik" error={form.errors.jam}>
            <input value={form.values.jam} onChange={(e) => form.setFieldValue("jam", e.target.value)} placeholder="Contoh: 08:00 - 12:00"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.jam ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">Simpan</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus jadwal "${crud.confirmDelete?.dokter}"?`} />
    </div>
  );
}