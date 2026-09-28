import PageHeader from "../components/PageHeader";
import { dataKunjungan, dataPendapatan, dataDepartemen } from "../utils/analitikData";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, Wallet, Users } from "lucide-react";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function DashboardAnalitik() {
  const totalKunjunganBulanIni = dataKunjungan[dataKunjungan.length - 1].jumlah;
  const pendapatanBulanIni = dataPendapatan[dataPendapatan.length - 1].pendapatan;
  const totalPasienDepartemen = dataDepartemen.reduce((sum, d) => sum + d.jumlah, 0);

  const kunjunganBulanLalu = dataKunjungan[dataKunjungan.length - 2].jumlah;
  const growthKunjungan = (((totalKunjunganBulanIni - kunjunganBulanLalu) / kunjunganBulanLalu) * 100).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Dashboard Analitik"
        subtitle="Tren kunjungan, pendapatan, dan distribusi pasien per departemen"
        gradient="from-violet-600 via-purple-600 to-indigo-600"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
            <Users size={22} className="text-white" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Kunjungan Bulan Ini</p>
            <h2 className="text-2xl font-bold text-slate-800">{totalKunjunganBulanIni}</h2>
            <p className={`text-xs ${growthKunjungan >= 0 ? "text-green-600" : "text-red-600"}`}>
              {growthKunjungan >= 0 ? "+" : ""}{growthKunjungan}% dari bulan lalu
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Wallet size={22} className="text-white" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Pendapatan Bulan Ini</p>
            <h2 className="text-xl font-bold text-slate-800">{formatRupiah(pendapatanBulanIni)}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <TrendingUp size={22} className="text-white" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Pasien (6 Bulan)</p>
            <h2 className="text-2xl font-bold text-slate-800">{totalPasienDepartemen}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Tren Kunjungan Pasien</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dataKunjungan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="jumlah" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Pendapatan per Bulan</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dataPendapatan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip formatter={(value) => formatRupiah(value)} />
              <Bar dataKey="pendapatan" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Distribusi Pasien per Departemen</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataDepartemen}
              dataKey="jumlah"
              nameKey="nama"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ nama, jumlah }) => `${nama}: ${jumlah}`}
            >
              {dataDepartemen.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}