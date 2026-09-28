import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Stethoscope, Pill, FlaskConical, X,
  Building2, ShieldCheck, BarChart3, UserCog, KeyRound, Settings,
  Calendar, FileText, BedDouble, CalendarClock, ClipboardList, ListOrdered,
  Wallet, Truck, ScanLine, Send, FileSignature, Megaphone, History, GraduationCap,
  MessageSquare, HelpCircle, CalendarDays, TrendingUp
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { canAccess } from "../utils/permissions";

export default function Sidebar() {
  const location = useLocation();
  const { isOpen, close } = useSidebar();
  const { user } = useAuth();
  const { t } = useLanguage();

  const allMenu = [
    { label: t("dashboard"), path: "/", icon: LayoutDashboard, feature: "dashboard" },
    { label: t("dataPasien"), path: "/pasien", icon: Users, feature: "pasien" },
    { label: t("antrian"), path: "/antrian", icon: ListOrdered, feature: "pelayanan" },
    { label: t("pelayanan"), path: "/pelayanan", icon: Stethoscope, feature: "pelayanan" },
    { label: t("rawatInap"), path: "/rawat-inap", icon: BedDouble, feature: "pelayanan" },
    { label: t("rekamMedis"), path: "/rekam-medis", icon: ClipboardList, feature: "pelayanan" },
    { label: t("jadwalDokter"), path: "/jadwal-dokter", icon: CalendarClock, feature: "pelayanan" },
    { label: t("radiologi"), path: "/radiologi", icon: ScanLine, feature: "lab" },
    { label: t("rujukanPasien"), path: "/rujukan", icon: Send, feature: "pelayanan" },
    { label: t("suratSakit"), path: "/surat-sakit", icon: FileSignature, feature: "pelayanan" },
    { label: t("obat"), path: "/obat", icon: Pill, feature: "obat" },
    { label: t("gudangFarmasi"), path: "/gudang-farmasi", icon: Truck, feature: "obat" },
    { label: t("lab"), path: "/lab", icon: FlaskConical, feature: "lab" },
    { label: t("bpjs"), path: "/bpjs", icon: ShieldCheck, feature: "bpjs" },
    { label: t("keuangan"), path: "/keuangan", icon: Wallet, feature: "bpjs" },
    { label: t("laporan"), path: "/laporan", icon: BarChart3, feature: "laporan" },
    { label: t("pengumuman"), path: "/pengumuman", icon: Megaphone, feature: "dashboard" },
    { label: t("magang"), path: "/magang", icon: GraduationCap, feature: "users" },
    { label: t("manajemenCabang"), path: "/cabang", icon: Building2, feature: "cabang" },
    { label: t("manajemenUser"), path: "/users", icon: UserCog, feature: "users" },
    { label: t("logAktivitas"), path: "/log-aktivitas", icon: History, feature: "users" },
    { label: t("gantiPassword"), path: "/ganti-password", icon: KeyRound, feature: "ganti-password-selalu-ada" },
    { label: t("pengaturan"), path: "/pengaturan", icon: Settings, feature: "pengaturan" },
    { label: "Dashboard Saya", path: "/portal", icon: LayoutDashboard, feature: "dashboard-pasien" },
    { label: "Riwayat Saya", path: "/portal/riwayat", icon: FileText, feature: "riwayat-saya" },
    { label: "Jadwal Saya", path: "/portal/jadwal", icon: Calendar, feature: "jadwal-saya" },
    { label: "Survey Kepuasan", path: "/survey-kepuasan", icon: MessageSquare, feature: "pelayanan" },
    { label: "Bantuan / FAQ", path: "/bantuan", icon: HelpCircle, feature: "dashboard" },
    { label: "Jadwal Shift Staff", path: "/jadwal-shift", icon: CalendarDays, feature: "jadwal-shift" },
    { label: "Absensi Staff", path: "/absensi", icon: ScanLine, feature: "absensi" },
    { label: "Manajemen Kamar", path: "/kamar", icon: BedDouble, feature: "kamar" },
    { label: "Dashboard Analitik", path: "/analitik", icon: TrendingUp, feature: "analitik" },
  ];

  const menu = allMenu.filter((m) => m.feature === "ganti-password-selalu-ada" || canAccess(user?.role, m.feature));

  return (
    <>
      {isOpen && <div onClick={close} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-60 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIMRS
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{user?.role ?? "Sistem Informasi RS"}</p>
          </div>
          <button onClick={close} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {menu.map((m) => {
            const Icon = m.icon;
            const active = location.pathname === m.path;
            return (
              <Link key={m.path} to={m.path} onClick={close} className="relative flex items-center gap-3 mx-3 my-1 px-3 py-2.5 rounded-lg text-sm">
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-3 ${active ? "text-white font-medium" : "text-slate-300"}`}>
                  <Icon size={18} />
                  {m.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}