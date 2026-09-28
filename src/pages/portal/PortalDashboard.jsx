import PageHeader from "../../components/PageHeader";

export default function PortalDashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard Saya"
        subtitle="Ringkasan informasi kesehatan kamu"
        gradient="from-teal-600 via-cyan-600 to-blue-600"
      />
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <p className="text-slate-600">Selamat datang! Di sini kamu bisa melihat riwayat pelayanan dan jadwal kontrol kamu.</p>
      </div>
    </div>
  );
}