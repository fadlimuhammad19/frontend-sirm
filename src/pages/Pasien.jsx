import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import FormField from "../components/FormField";
import ExportPdfButton from "../components/ExportPdfButton";
import ImportExcelModal from "../components/ImportExcelModal";
import useCrudApi from "../hooks/useCrudApi";
import useForm from "../hooks/useForm";
import { required, exactLength, onlyNumbers, combine } from "../utils/validators";
import { Plus, Upload } from "lucide-react";

const columns = [
  { key: "nama", label: "Nama" },
  { key: "nik", label: "NIK" },
  { key: "no_bpjs", label: "No. BPJS" },
];

const emptyForm = { nama: "", nik: "", no_bpjs: "" };

const rules = {
  nama: required("Nama"),
  nik: combine(required("NIK"), onlyNumbers("NIK"), exactLength("NIK", 16)),
  no_bpjs: combine(onlyNumbers("No. BPJS")),
};

export default function Pasien() {
  const crud = useCrudApi("pasien");
  const form = useForm(emptyForm, rules);
  const navigate = useNavigate();
  const [isImportOpen, setIsImportOpen] = useState(false);

  useEffect(() => {
    const e = crud.editing;
    form.reset(
      e
        ? { nama: e.nama ?? "", nik: e.nik ?? "", no_bpjs: e.no_bpjs ?? "" }
        : emptyForm
    );
  }, [crud.editing, crud.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validate()) crud.save(form.values);
  };

  const handleImport = (rows) => {
    crud.addMany(
      rows.map((r) => ({
        nama: r.nama || r.Nama || "",
        nik: String(r.nik || r.NIK || ""),
        no_bpjs: String(r.no_bpjs || r["No. BPJS"] || ""),
      }))
    );
  };

  return (
    <div>
      <Toast {...crud.toast} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Data Pasien</h1>
          <p className="text-slate-500 text-sm">Kelola data pasien rumah sakit</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsImportOpen(true)}
            className="no-print flex items-center gap-2 bg-white text-blue-700 border border-blue-200 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-50"
          >
            <Upload size={16} /> Import Excel
          </button>
          <ExportPdfButton label="Export PDF" />
          <button
            onClick={crud.openAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
          >
            <Plus size={16} /> Tambah Pasien
          </button>
        </div>
      </div>

      <div className="print-area">
        {crud.loading ? (
          <p className="text-slate-500 text-sm">Memuat data...</p>
        ) : (
          <Table
            columns={columns}
            data={crud.data}
            onEdit={crud.openEdit}
            onDelete={crud.askDelete}
            onRowClick={(row) => navigate(`/pasien/${row.id}`)}
          />
        )}
      </div>

      <Modal isOpen={crud.isOpen} onClose={() => crud.setIsOpen(false)} title={crud.editing ? "Edit Pasien" : "Tambah Pasien"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="Nama" error={form.errors.nama}>
            <input
              value={form.values.nama}
              onChange={(e) => form.setFieldValue("nama", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.nama ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="NIK" error={form.errors.nik}>
            <input
              value={form.values.nik}
              onChange={(e) => form.setFieldValue("nik", e.target.value)}
              maxLength={16}
              placeholder="16 digit angka"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.nik ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
          </FormField>

          <FormField label="No. BPJS" error={form.errors.no_bpjs}>
            <input
              value={form.values.no_bpjs}
              onChange={(e) => form.setFieldValue("no_bpjs", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                form.errors.no_bpjs ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500"
              }`}
            />
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
        message={`Yakin ingin menghapus data "${crud.confirmDelete?.nama}"?`}
      />

      <ImportExcelModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
        expectedColumns={["nama", "nik", "no_bpjs"]}
      />
    </div>
  );
}