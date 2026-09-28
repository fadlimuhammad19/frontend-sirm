import { useState } from "react";
import * as XLSX from "xlsx";
import Modal from "./Modal";
import { Upload, FileSpreadsheet } from "lucide-react";

export default function ImportExcelModal({ isOpen, onClose, onImport, expectedColumns }) {
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setPreview(json);
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirm = () => {
    onImport(preview);
    setPreview([]);
    setFileName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Data dari Excel">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
          <FileSpreadsheet className="mx-auto text-slate-400 mb-2" size={32} />
          <p className="text-sm text-slate-500 mb-3">Pilih file Excel (.xlsx) dengan kolom: {expectedColumns.join(", ")}</p>
          <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
            <Upload size={16} /> Pilih File
            <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="hidden" />
          </label>
          {fileName && <p className="text-xs text-slate-400 mt-2">{fileName}</p>}
        </div>

        {preview.length > 0 && (
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Preview ({preview.length} baris data):</p>
            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    {Object.keys(preview[0]).map((k) => (
                      <th key={k} className="px-2 py-1.5 text-left font-medium text-slate-600">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-2 py-1.5 text-slate-600">{String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {preview.length > 5 && <p className="text-xs text-slate-400 mt-1">...dan {preview.length - 5} baris lainnya</p>}
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={preview.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-2.5 rounded-lg text-sm font-medium"
        >
          Import {preview.length > 0 && `(${preview.length} data)`}
        </button>
      </div>
    </Modal>
  );
}