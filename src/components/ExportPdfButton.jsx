import { FileDown } from "lucide-react";

export default function ExportPdfButton({ label = "Export PDF" }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
    >
      <FileDown size={16} /> {label}
    </button>
  );
}