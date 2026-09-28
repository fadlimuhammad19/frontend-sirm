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
import { Plus, Wallet } from "lucide-react";

const initialData = [
  { id: 1, nama_pasien: "Budi Santoso", jenis: "Rawat Jalan", jumlah: 50000, tanggal: "2026-09-20", metode: "Tunai" },
  { id: 2, nama_pasien: "Siti Aminah", jenis: "Rawat Inap", jumlah: 1500000, tanggal: "2026-09-22", metode: "Transfer" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "jenis", label: "Jenis Layanan" },
  { key: "jumlah", label: "Jumlah" },
  { key: "metode", label: "Metode" },
  { key: "tanggal", label: "Tanggal" },
];

const emptyForm = { nama_pasien: "", jenis: "Rawat Jalan", jumlah: "", tanggal: "", metode: "Tunai" };
const rules = { nama_pasien: required("Nama pasien"), jumlah: required("Jumlah"), tanggal: required("Tanggal") };

export default function Keuangan() {
  const crud = useCrud(initialData);
  const form = useForm(emptyForm, rules);

  useEffect(() => { form.reset(crud.editing || emptyForm); }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save({ ...form.values, jumlah: Number(form.values.jumlah) });
  };

  const totalPemasukan = crud.data.reduce((sum, d) => sum + Number(d.jumlah), 0);

  return (
    <div>
      <Toast {...crud.toast} />
      <PageHeader
        title="Keuangan / Kasir"
        subtitle="Rekap pembayaran dan pemasukan rumah sakit"
        gradient="from-green-600 via-emerald-600 to-teal-600"
        action={
          <button onClick={crud.openAdd} className="flex items-center gap-2 bg-white text-green-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus size={16} /> Tambah Transaksi
          </button>
        }
      />

      <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
          <Wallet size={22} className="text-white" />
        </div>
        <div>
          <p className="text-slate-500 text-sm">Total Pemasukan</p>
          <h2 className="text-2xl font-bold text-slate-800">Rp {totalPemasukan.toLocaleString("id-ID")}</h2>
        </div>
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({ ...d, jumlah: `Rp ${Number(d.jumlah).toLocaleString("id-ID")}` }))}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Transaksi" : "Tambah Transaksi"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama Pasien" error={form.errors.nama_pasien}>
            <input value={form.values.nama_pasien} onChange={(e) => form.setFieldValue("nama_pasien", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.nama_pasien ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Jenis Layanan">
            <select value={form.values.jenis} onChange={(e) => form.setFieldValue("jenis", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Rawat Jalan</option>
              <option>Rawat Inap</option>
              <option>IGD</option>
              <option>Obat</option>
            </select>
          </FormField>
          <FormField label="Jumlah (Rp)" error={form.errors.jumlah}>
            <input type="number" value={form.values.jumlah} onChange={(e) => form.setFieldValue("jumlah", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.jumlah ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <FormField label="Metode Pembayaran">
            <select value={form.values.metode} onChange={(e) => form.setFieldValue("metode", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Tunai</option>
              <option>Transfer</option>
              <option>Kartu Debit/Kredit</option>
              <option>BPJS</option>
            </select>
          </FormField>
          <FormField label="Tanggal" error={form.errors.tanggal}>
            <input type="date" value={form.values.tanggal} onChange={(e) => form.setFieldValue("tanggal", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${form.errors.tanggal ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"}`} />
          </FormField>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">Simpan</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!crud.confirmDelete} onCancel={() => crud.setConfirmDelete(null)} onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus transaksi "${crud.confirmDelete?.nama_pasien}"?`} />
    </div>
  );
}