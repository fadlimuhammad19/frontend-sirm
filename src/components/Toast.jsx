import { CheckCircle, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", show }) {
  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {type === "success" ? <CheckCircle size={18} /> : <XCircle size={18} />}
        {message}
      </div>
    </div>
  );
}