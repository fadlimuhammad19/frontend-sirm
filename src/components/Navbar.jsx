import { LogOut, Menu, Building2, Sparkles, Sun, Moon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";
import { useCabang } from "../context/CabangContext";
import { useTheme } from "../context/ThemeContext";
import NotificationPanel from "./NotificationPanel";
import GlobalSearch from "./GlobalSearch";

const getTanggalHariIni = () => {
  const hariIni = new Date();
  return hariIni.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();
  const { cabangAktif, setCabangAktif, daftarCabang } = useCabang();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-3.5 bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="lg:hidden text-slate-500 hover:text-slate-700">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center shadow-md">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Selamat datang 👋</h3>
            <p className="text-xs text-slate-500 hidden sm:block">{getTanggalHariIni()}</p>
          </div>
        </div>
      </div>

      <GlobalSearch />

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-white/70 border border-white/60 rounded-xl px-3 py-1.5 shadow-sm">
          <Building2 size={16} className="text-blue-600" />
          <select
            value={cabangAktif.id}
            onChange={(e) => {
              const selected = daftarCabang.find((c) => c.id === Number(e.target.value));
              setCabangAktif(selected);
            }}
            className="text-sm text-slate-700 bg-transparent focus:outline-none font-medium"
          >
            {daftarCabang.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nama}
              </option>
            ))}
          </select>
        </div>

        <button onClick={toggleTheme} className="text-slate-500 hover:text-amber-500 bg-white/70 p-2 rounded-lg shadow-sm transition-colors">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <NotificationPanel />

        <Link to="/profil" className="flex items-center gap-2 bg-white/70 pl-1 pr-3 py-1 rounded-full shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm font-semibold shadow">
            {user?.username?.[0]?.toUpperCase() ?? "A"}
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:inline">{user?.username ?? "Admin"}</span>
        </Link>

        <button onClick={handleLogout} className="text-red-500 hover:text-white hover:bg-red-500 bg-white/70 p-2 rounded-lg shadow-sm transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}