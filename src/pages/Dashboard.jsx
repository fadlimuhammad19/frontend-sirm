import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Stethoscope, Pill, FlaskConical, TrendingUp, Activity } from "lucide-react";
import { SkeletonCard } from "../components/Skeleton";
import SimpleLineChart from "../components/charts/SimpleLineChart";
import SimplePieChart from "../components/charts/SimplePieChart";

const summary = [
  { label: "Total Pasien", value: 128, icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { label: "Pelayanan Hari Ini", value: 14, icon: Stethoscope, gradient: "from-emerald-500 to-green-500" },
  { label: "Stok Obat Menipis", value: 5, icon: Pill, gradient: "from-amber-500 to-orange-500" },
  { label: "Pemeriksaan Lab Pending", value: 3, icon: FlaskConical, gradient: "from-fuchsia-500 to-purple-500" },
];

const dataPasienBulanan = [
  { bulan: "Mei", pasien: 82 },
  { bulan: "Jun", pasien: 95 },
  { bulan: "Jul", pasien: 78 },
  { bulan: "Agu", pasien: 110 },
  { bulan: "Sep", pasien: 128 },
];

const dataJenisLayanan = [
  { name: "Rawat Jalan", value: 120 },
  { name: "Rawat Inap", value: 48 },
  { name: "IGD", value: 50 },
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b"];

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-lg shadow-indigo-200"
      >
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="absolute right-20 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
        <div className="relative">
          <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-blue-100 text-sm">Ringkasan aktivitas rumah sakit hari ini</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : summary.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} variants={cardVariants} whileHover={{ y: -6 }} className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-slate-500 text-sm">{item.label}</p>
                  <h2 className="text-3xl font-bold text-slate-800 mt-1">{item.value}</h2>
                </motion.div>
              );
            })}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Tren Jumlah Pasien</h3>
          <SimpleLineChart data={dataPasienBulanan} dataKey="pasien" labelKey="bulan" color="#3b82f6" />
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Distribusi Jenis Layanan</h3>
          <SimplePieChart data={dataJenisLayanan} colors={PIE_COLORS} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-blue-600" />
            <h3 className="font-semibold text-slate-800">Aktivitas Terbaru</h3>
          </div>
          <div className="space-y-3">
            {[
              { text: "Pasien baru: Budi Santoso terdaftar", time: "10 menit lalu" },
              { text: "Klaim BPJS Siti Aminah disetujui", time: "1 jam lalu" },
              { text: "Stok Amoxicillin menipis (8 strip)", time: "3 jam lalu" },
            ].map((a, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-700">{a.text}</span>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-md p-6 text-white flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-green-400" />
            <h3 className="font-semibold">Status Sistem</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between"><span>Server</span><span className="text-green-400">Online</span></div>
            <div className="flex justify-between"><span>Database</span><span className="text-green-400">Terhubung</span></div>
            <div className="flex justify-between"><span>Update terakhir</span><span>27 Sep 2026</span></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}