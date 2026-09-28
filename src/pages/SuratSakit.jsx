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
import { Plus, Printer } from "lucide-react";

const initialData = [
  { id: 1, nama_pasien: "Budi Santoso", diagnosis: "ISPA", lama_istirahat: "3 hari", tanggal: "2026-09-20" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "lama_istirahat", label: "Lama Istirahat" },
  { key: "tanggal", label: "Tanggal Terbit" },
];

const emptyForm = { nama_pasien: "", diagnosis: "", lama_istirahat: "", tanggal: "" };
const rules = { nama_pasien: required("Nama pasien"), diagnosis: required("Diagnosis"), lama_istirahat: required("Lama istirahat") };

export default function SuratSakit() {
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
        title="Surat Keterangan Sakit"
        subtitle="Terbitkan dan kelola surat keterangan sakit pasien"
        gradient="from-amber-600 via-yellow-600 to-orange-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-amber-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Buat Surat
          </button>
        }
      />

      <Table
        columns={columns}
        data={crud.data}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Surat" : "Buat Surat Keterangan Sakit"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Pasien" error={form.errors.nama_pasien}>
            <input value={form.values.nama_pasien} onChange={(e) => form.setFieldValue("nama_pasien", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.nama_pasien ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Diagnosis" error={form.errors.diagnosis}>
            <input value={form.values.diagnosis} onChange={(e) => form.setFieldValue("diagnosis", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.diagnosis ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Lama Istirahat" error={form.errors.lama_istirahat}>
            <input value={form.values.lama_istirahat} onChange={(e) => form.setFieldValue("lama_istirahat", e.target.value)} placeholder="Contoh: 3 hari"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.lama_istirahat ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Tanggal Terbit">
            <input type="date" value={form.values.tanggal} onChange={(e) => form.setFieldValue("tanggal", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <button type="submit" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">
            <Printer size={16} /> Simpan & Terbitkan
          </button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus surat "${crud.confirmDelete?.nama_pasien}"?`} />
    </div>
  );
}