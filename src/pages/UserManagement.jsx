import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import useCrud from "../hooks/useCrud";
import { Plus } from "lucide-react";

const initialData = [
  { id: 1, nama: "dr. Ani Wijaya", username: "dr.ani", role: "Dokter", status: "Aktif" },
  { id: 2, nama: "Rina Kasih", username: "rina.kasir", role: "Kasir", status: "Aktif" },
  { id: 3, nama: "Admin Utama", username: "admin", role: "Admin", status: "Aktif" },
];

const columns = [
  { key: "nama", label: "Nama" },
  { key: "username", label: "Username" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const emptyForm = { nama: "", username: "", password: "", role: "Perawat", status: "Aktif" };

const roleBadge = {
  Admin: "bg-purple-50 text-purple-600",
  Dokter: "bg-blue-50 text-blue-600",
  Perawat: "bg-teal-50 text-teal-600",
  Kasir: "bg-amber-50 text-amber-600",
};

export default function UserManagement() {
  const crud = useCrud(initialData);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(crud.editing ? { ...crud.editing, password: "" } : emptyForm);
  }, [crud.editing, crud.isOpen]);

  return (
    <div>
      <Toast {...crud.toast} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Manajemen User & Role</h1>
          <p className="text-slate-500 text-sm">Kelola akun staff dan hak akses sistem</p>
        </div>
        <button
          onClick={crud.openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Tambah User
        </button>
      </div>

      <Table
        columns={columns}
        data={crud.data.map((d) => ({
          ...d,
          role: <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge[d.role] || "bg-slate-100 text-slate-600"}`}>{d.role}</span>,
        }))}
        onEdit={(row) => crud.openEdit(crud.data.find((d) => d.id === row.id))}
        onDelete={(row) => crud.askDelete(crud.data.find((d) => d.id === row.id))}
      />

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit User" : "Tambah User"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crud.save(form);
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Nama Lengkap</label>
            <input
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">
              Password {crud.editing && <span className="text-slate-400">(kosongkan jika tidak diubah)</span>}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Admin</option>
              <option>Dokter</option>
              <option>Perawat</option>
              <option>Kasir</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
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
        message={`Yakin ingin menghapus user "${crud.confirmDelete?.nama}"?`}
      />
    </div>
  );
}