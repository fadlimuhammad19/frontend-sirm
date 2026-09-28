import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Stethoscope, FlaskConical, Printer } from "lucide-react";
import { useState, useEffect } from "react";
import QRCodeDisplay from "../components/QRCodeDisplay";
import KartuPasienPrint from "../components/KartuPasienPrint";
import api from "../utils/api";

// Sementara masih dummy, nanti diganti saat modul Pelayanan dan Lab dibuat di backend
const dummyPelayanan = [
  { jenis: "Rawat Jalan", dokter: "dr. Ani", tanggal: "2026-09-20" },
  { jenis: "IGD", dokter: "dr. Rudi", tanggal: "2026-09-10" },
];

const dummyLab = [
  { jenis_pemeriksaan: "Darah Lengkap", status: "Selesai", tanggal: "2026-09-20" },
  { jenis_pemeriksaan: "Urine", status: "Pending", tanggal: "2026-09-15" },
];

const tabs = [
  { key: "info", label: "Info", icon: User },
  { key: "pelayanan", label: "Riwayat Pelayanan", icon: Stethoscope },
  { key: "lab", label: "Riwayat Lab", icon: FlaskConical },
];

export default function PasienDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [pasien, setPasien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let batal = false;
    setLoading(true);
    setError("");

    api
      .get(`/pasien/${id}`)
      .then((res) => {
        if (!batal) setPasien(res.data.data);
      })
      .catch((err) => {
        if (!batal) {
          setPasien(null);
          setError(err.response?.data?.error || "Tidak bisa terhubung ke server");
        }
      })
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-slate-500 text-sm">Memuat data pasien...</p>;
  }

  if (!pasien) {
    return (
      <div>
        <p className="text-slate-500 mb-2">{error || "Pasien tidak ditemukan."}</p>
        <Link to="/pasien" className="text-blue-600 hover:underline text-sm">
          &larr; Kembali ke Data Pasien
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Link to="/pasien" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} /> Kembali ke Data Pasien
        </Link>
        <button
          onClick={() => window.print()}
          className="no-print flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Printer size={16} /> Cetak Kartu
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
            {pasien.nama?.[0]}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{pasien.nama}</h1>
            <p className="text-slate-500 text-sm">NIK: {pasien.nik}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-slate-200">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === "info" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="sm:col-span-1 flex justify-center sm:justify-start">
            <QRCodeDisplay value={`PASIEN-${pasien.id}-${pasien.nik}`} />
          </div>
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400">Tanggal Lahir</p>
              <p className="text-slate-700 font-medium">{pasien.tanggal_lahir || "-"}</p>
            </div>
            <div>
              <p className="text-slate-400">No. BPJS</p>
              <p className="text-slate-700 font-medium">{pasien.no_bpjs || "-"}</p>
            </div>
            <div>
              <p className="text-slate-400">Departemen</p>
              <p className="text-slate-700 font-medium">{pasien.departemen || "-"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-400">Alamat</p>
              <p className="text-slate-700 font-medium">{pasien.alamat || "-"}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pelayanan" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          {dummyPelayanan.map((p, i) => (
            <div key={i} className="p-4 flex justify-between items-center text-sm">
              <div>
                <p className="font-medium text-slate-700">{p.jenis}</p>
                <p className="text-slate-400">{p.dokter}</p>
              </div>
              <span className="text-slate-500">{p.tanggal}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "lab" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          {dummyLab.map((l, i) => (
            <div key={i} className="p-4 flex justify-between items-center text-sm">
              <div>
                <p className="font-medium text-slate-700">{l.jenis_pemeriksaan}</p>
                <p className="text-slate-400">{l.tanggal}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  l.status === "Selesai" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {l.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <KartuPasienPrint pasien={pasien} />
    </div>
  );
}