import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import useCrud from "../hooks/useCrud";
import { Plus } from "lucide-react";

const initialData = [
  { id: 1, nama_pasien: "Budi Santoso", no_bpjs: "0001234567890", jenis_layanan: "Rawat Jalan", status: "Disetujui", tanggal_klaim: "2026-09-20" },
  { id: 2, nama_pasien: "Siti Aminah", no_bpjs: "0009876543210", jenis_layanan: "Rawat Inap", status: "Verifikasi", tanggal_klaim: "2026-09-24" },
];

const columns = [
  { key: "nama_pasien", label: "Nama Pasien" },
  { key: "no_bpjs", label: "No. BPJS" },
  { key: "jenis_layanan", label: "Jenis Layanan" },
  { key: "status", label: "Status" },
  { key: "tanggal_klaim", label: "Tanggal Klaim" },
];

const emptyForm = { nama_pasien: "", no_bpjs: "", jenis_layanan: "Rawat Jalan", status: "Verifikasi", tanggal_klaim: "" };

const statusStyle = {
  Verifikasi: "bg-amber-50 text-amber-600",
  Disetujui: "bg-green-50 text-green-600",
  Ditolak: "bg-red-50 text-red-600",
};

export default function Bpjs() {
  const crud = useCrud(initialData);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(crud.editing || emptyForm);
  }, [crud.editing, crud.isOpen]);

  return (
    <div>
      <Toast {...crud.toast} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">BPJS / Klaim</h1>
          <p className="text-slate-500 text-sm">Kelola pengajuan dan status klaim BPJS pasien</p>
        </div>
        <button
          onClick={crud.openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajukan Klaim
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {["Verifikasi", "Disetujui", "Ditolak"].map((s) => (
          <div key={s} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm">{s}</p>
            <h2 className="text-xl font-bold text-slate-800 mt-1">
              {crud.data.filter((d) => d.status === s).length}
            </h2>
          </div>
        ))}
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({ ...d, status: d.status }))}
        onEdit={crud.openEdit}
        onDelete={crud.askDelete}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Klaim" : "Ajukan Klaim BPJS"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crud.save(form);
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Nama Pasien</label>
            <input
              required
              value={form.nama_pasien}
              onChange={(e) => setForm({ ...form, nama_pasien: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">No. BPJS</label>
            <input
              required
              value={form.no_bpjs}
              onChange={(e) => setForm({ ...form, no_bpjs: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Jenis Layanan</label>
            <select
              value={form.jenis_layanan}
              onChange={(e) => setForm({ ...form, jenis_layanan: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Rawat Jalan</option>
              <option>Rawat Inap</option>
              <option>IGD</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Verifikasi</option>
              <option>Disetujui</option>
              <option>Ditolak</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Tanggal Klaim</label>
            <input
              type="date"
              required
              value={form.tanggal_klaim}
              onChange={(e) => setForm({ ...form, tanggal_klaim: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium mt-2">
            Simpan
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!crud.confirmDelete}
        onCancel={() => crud.setConfirmDelete(null)}
        onConfirm={crud.confirmDeleteAction}
        message={`Yakin ingin menghapus klaim "${crud.confirmDelete?.nama_pasien}"?`}
      />
    </div>
  );
}