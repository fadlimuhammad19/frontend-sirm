import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import useCrud from "../hooks/useCrud";
import { Plus } from "lucide-react";

const initialData = [
  { id: 1, nama_cabang: "RS Pusat Tegal", alamat: "Jl. Ahmad Yani No. 1, Tegal", telepon: "0283-123456" },
  { id: 2, nama_cabang: "RS Cabang Slawi", alamat: "Jl. Kolonel Sugiono No. 5, Slawi", telepon: "0283-654321" },
];

const columns = [
  { key: "nama_cabang", label: "Nama Cabang" },
  { key: "alamat", label: "Alamat" },
  { key: "telepon", label: "Telepon" },
];

const emptyForm = { nama_cabang: "", alamat: "", telepon: "" };

export default function Cabang() {
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
          <h1 className="text-2xl font-semibold text-slate-800">Manajemen Cabang</h1>
          <p className="text-slate-500 text-sm">Kelola daftar cabang rumah sakit</p>
        </div>
        <button
          onClick={crud.openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Tambah Cabang
        </button>
      </div>

      <Table columns={columns} data={crud.data} onEdit={crud.openEdit} onDelete={crud.askDelete} />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Cabang" : "Tambah Cabang"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crud.save(form);
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Nama Cabang</label>
            <input
              required
              value={form.nama_cabang}
              onChange={(e) => setForm({ ...form, nama_cabang: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Alamat</label>
            <textarea
              required
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              rows={2}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Telepon</label>
            <input
              required
              value={form.telepon}
              onChange={(e) => setForm({ ...form, telepon: e.target.value })}
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
        message={`Yakin ingin menghapus cabang "${crud.confirmDelete?.nama_cabang}"?`}
      />
    </div>
  );
}