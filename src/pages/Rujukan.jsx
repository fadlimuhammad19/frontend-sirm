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
  { id: 1, nama_pasien: "Budi Santoso", tujuan: "RS Kariadi Semarang", alasan: "Perlu penanganan spesialis jantung", tanggal: "2026-09-20" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "tujuan", label: "RS Tujuan" },
  { key: "alasan", label: "Alasan Rujukan" },
  { key: "tanggal", label: "Tanggal" },
];

const emptyForm = { nama_pasien: "", tujuan: "", alasan: "", tanggal: "" };
const rules = { nama_pasien: required("Nama pasien"), tujuan: required("RS tujuan"), tanggal: required("Tanggal") };

export default function Rujukan() {
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
        title="Rujukan Pasien"
        subtitle="Kelola surat rujukan pasien ke rumah sakit lain"
        gradient="from-sky-600 via-blue-600 to-indigo-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-sky-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Buat Rujukan
          </button>
        }
      />

      <Table columns={columns} data={crud.data} onEdit={crud.openEdit} onDelete={crud.askDelete} />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Rujukan" : "Buat Rujukan Baru"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Pasien" error={form.errors.nama_pasien}>
            <input value={form.values.nama_pasien} onChange={(e) => form.setFieldValue("nama_pasien", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.nama_pasien ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="RS Tujuan" error={form.errors.tujuan}>
            <input value={form.values.tujuan} onChange={(e) => form.setFieldValue("tujuan", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.tujuan ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Alasan Rujukan">
            <textarea value={form.values.alasan} onChange={(e) => form.setFieldValue("alasan", e.target.value)} rows={2}
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
        message={`Yakin ingin menghapus rujukan "${crud.confirmDelete?.nama_pasien}"?`} />
    </div>
  );
}