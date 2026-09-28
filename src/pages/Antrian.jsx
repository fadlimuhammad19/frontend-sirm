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
import { Plus, Megaphone } from "lucide-react";
import SimpleBarChart from "../components/charts/SimpleBarChart";

const initialData = [
  { id: 1, no_antrian: "A-01", nama_pasien: "Budi Santoso", poli: "Umum", status: "Menunggu" },
  { id: 2, no_antrian: "A-02", nama_pasien: "Siti Aminah", poli: "Gigi", status: "Dipanggil" },
];

const columns = [
  { key: "no_antrian", label: "No. Antrian" },
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "poli", label: "Poli" },
  { key: "status", label: "Status" },
];

const emptyForm = { no_antrian: "", nama_pasien: "", poli: "Umum", status: "Menunggu" };
const rules = { no_antrian: required("No. antrian"), nama_pasien: required("Nama pasien") };

export default function Antrian() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => { form.reset(crud.editing || emptyForm); }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  const menunggu = crud.data.filter((d) => d.status === "Menunggu").length;

  const perPoli = ["Umum", "Gigi", "Anak", "Kandungan"]
    .map((p) => ({ poli: p, jumlah: crud.data.filter((d) => d.poli === p).length }))
    .filter((p) => p.jumlah > 0);

  return (
    <div>
      <Toast {...crud.toast} />
      <PageHeader
        title="Antrian Pasien"
        subtitle="Kelola nomor antrian dan status panggilan pasien"
        gradient="from-orange-600 via-red-600 to-rose-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-orange-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Tambah Antrian
          </button>
        }
      />

      <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Megaphone size={22} className="text-white" />
        </div>
        <div>
          <p className="text-slate-500 text-sm">Pasien Menunggu</p>
          <h2 className="text-2xl font-bold text-slate-800">{menunggu}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Jumlah Antrian per Poli</h3>
        {perPoli.length > 0 ? (
          <SimpleBarChart data={perPoli} bars={[{ key: "jumlah", label: "Jumlah", color: "#f97316" }]} labelKey="poli" />
        ) : (
          <p className="text-slate-400 text-sm text-center py-8">Belum ada data</p>
        )}
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({
          ...d,
          status: d.status === "Dipanggil" ? "📢 Dipanggil" : d.status === "Selesai" ? "✅ Selesai" : "⏳ Menunggu",
        }))}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Antrian" : "Tambah Antrian"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="No. Antrian" error={form.errors.no_antrian}>
            <input value={form.values.no_antrian} onChange={(e) => form.setFieldValue("no_antrian", e.target.value)} placeholder="Contoh: A-03"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.no_antrian ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Nama Pasien" error={form.errors.nama_pasien}>
            <input value={form.values.nama_pasien} onChange={(e) => form.setFieldValue("nama_pasien", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.nama_pasien ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Poli">
            <select value={form.values.poli} onChange={(e) => form.setFieldValue("poli", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Umum</option>
              <option>Gigi</option>
              <option>Anak</option>
              <option>Kandungan</option>
            </select>
          </FormField>
          <FormField label="Status">
            <select value={form.values.status} onChange={(e) => form.setFieldValue("status", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Menunggu</option>
              <option>Dipanggil</option>
              <option>Selesai</option>
            </select>
          </FormField>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">Simpan</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus antrian "${crud.confirmDelete?.nama_pasien}"?`} />
    </div>
  );
}