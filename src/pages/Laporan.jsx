import { useState } from "react";
import { FileDown, TrendingUp, Users, Stethoscope } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataPendapatan = [
  { bulan: "Mei", pendapatan: 42, target: 50 },
  { bulan: "Jun", pendapatan: 55, target: 50 },
  { bulan: "Jul", pendapatan: 38, target: 55 },
  { bulan: "Agu", pendapatan: 61, target: 55 },
  { bulan: "Sep", pendapatan: 74, target: 60 },
];

const dataPasien = [
  { bulan: "Mei", jumlah: 42 },
  { bulan: "Jun", jumlah: 55 },
  { bulan: "Jul", jumlah: 38 },
  { bulan: "Agu", jumlah: 61 },
  { bulan: "Sep", jumlah: 47 },
];

const dataPerJenis = [
  { jenis: "Rawat Jalan", jumlah: 120, persen: 55 },
  { jenis: "Rawat Inap", jumlah: 48, persen: 22 },
  { jenis: "IGD", jumlah: 50, persen: 23 },
];

export default function Laporan() {
  const [periode, setPeriode] = useState("bulan-ini");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Laporan</h1>
          <p className="text-slate-500 text-sm">Ringkasan data pelayanan dan pendapatan rumah sakit</p>
        </div>
        <div className="flex gap-2">
          <select value={periode} onChange={(e) => setPeriode(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="minggu-ini">Minggu Ini</option>
            <option value="bulan-ini">Bulan Ini</option>
            <option value="tahun-ini">Tahun Ini</option>
          </select>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <FileDown size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3"><Users size={20} /></div>
          <p className="text-slate-500 text-sm">Total Pasien Dilayani</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">218</h2>
          <p className="text-green-600 text-xs mt-1">+12% dari periode lalu</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-3"><Stethoscope size={20} /></div>
          <p className="text-slate-500 text-sm">Total Pelayanan</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">243</h2>
          <p className="text-green-600 text-xs mt-1">+8% dari periode lalu</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3"><TrendingUp size={20} /></div>
          <p className="text-slate-500 text-sm">Estimasi Pendapatan</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">Rp 87,4jt</h2>
          <p className="text-red-500 text-xs mt-1">-3% dari periode lalu</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Pendapatan vs Target (juta Rp)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={dataPendapatan}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Legend />
            <Bar dataKey="pendapatan" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Realisasi" />
            <Bar dataKey="target" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Tren Jumlah Pelayanan per Bulan</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dataPasien}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="jumlah" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Distribusi Jenis Pelayanan</h3>
        <div className="space-y-4">
          {dataPerJenis.map((d) => (
            <div key={d.jenis}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{d.jenis}</span>
                <span className="text-slate-500">{d.jumlah} ({d.persen}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${d.persen}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}