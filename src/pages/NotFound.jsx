import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white p-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SearchX size={40} />
        </div>
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-slate-300 mb-6">Halaman yang kamu cari tidak ditemukan.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm font-medium">
          <Home size={16} /> Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}