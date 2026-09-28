import { AlertTriangle } from "lucide-react";

export default function SessionTimeoutModal({ isOpen, onStay }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertTriangle size={22} />
        </div>
        <h3 className="font-semibold text-slate-800 mb-2">Sesi Akan Berakhir</h3>
        <p className="text-slate-500 text-sm mb-5">Kamu akan otomatis logout dalam 1 menit karena tidak ada aktivitas.</p>
        <button onClick={onStay} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium">
          Tetap Login
        </button>
      </div>
    </div>
  );
}