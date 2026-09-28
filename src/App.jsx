import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { CabangProvider } from "./context/CabangContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pasien from "./pages/Pasien";
import PasienDetail from "./pages/PasienDetail";
import Pelayanan from "./pages/Pelayanan";
import Obat from "./pages/Obat";
import Lab from "./pages/Lab";
import Cabang from "./pages/Cabang";
import Bpjs from "./pages/Bpjs";
import Laporan from "./pages/Laporan";
import UserManagement from "./pages/UserManagement";
import GantiPassword from "./pages/GantiPassword";
import Pengaturan from "./pages/Pengaturan";
import Login from "./pages/Login";
import PortalDashboard from "./pages/portal/PortalDashboard";
import RiwayatSaya from "./pages/portal/RiwayatSaya";
import JadwalSaya from "./pages/portal/JadwalSaya";
import RawatInap from "./pages/RawatInap";
import JadwalDokter from "./pages/JadwalDokter";
import RekamMedis from "./pages/RekamMedis";
import Antrian from "./pages/Antrian";
import Keuangan from "./pages/Keuangan";
import GudangFarmasi from "./pages/GudangFarmasi";
import Radiologi from "./pages/Radiologi";
import Rujukan from "./pages/Rujukan";
import SuratSakit from "./pages/SuratSakit";
import Pengumuman from "./pages/Pengumuman";
import LogAktivitas from "./pages/LogAktivitas";
import AnakMagang from "./pages/AnakMagang";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Profil from "./pages/Profil";
import SurveyKepuasan from "./pages/SurveyKepuasan";
import Bantuan from "./pages/Bantuan";
import JadwalShift from "./pages/JadwalShift";
import Absensi from "./pages/Absensi";
import ManajemenKamar from "./pages/ManajemenKamar";
import DashboardAnalitik from "./pages/DashboardAnalitik";

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/pasien" element={<RoleProtectedRoute feature="pasien"><PageWrapper><Pasien /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/pasien/:id" element={<RoleProtectedRoute feature="pasien"><PageWrapper><PasienDetail /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/antrian" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><Antrian /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/pelayanan" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><Pelayanan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/rawat-inap" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><RawatInap /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/rekam-medis" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><RekamMedis /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/jadwal-dokter" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><JadwalDokter /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/radiologi" element={<RoleProtectedRoute feature="lab"><PageWrapper><Radiologi /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/rujukan" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><Rujukan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/surat-sakit" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><SuratSakit /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/obat" element={<RoleProtectedRoute feature="obat"><PageWrapper><Obat /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/gudang-farmasi" element={<RoleProtectedRoute feature="obat"><PageWrapper><GudangFarmasi /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/lab" element={<RoleProtectedRoute feature="lab"><PageWrapper><Lab /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/cabang" element={<RoleProtectedRoute feature="cabang"><PageWrapper><Cabang /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/bpjs" element={<RoleProtectedRoute feature="bpjs"><PageWrapper><Bpjs /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/keuangan" element={<RoleProtectedRoute feature="bpjs"><PageWrapper><Keuangan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/laporan" element={<RoleProtectedRoute feature="laporan"><PageWrapper><Laporan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/pengumuman" element={<PageWrapper><Pengumuman /></PageWrapper>} />
          <Route path="/magang" element={<RoleProtectedRoute feature="users"><PageWrapper><AnakMagang /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/survey-kepuasan" element={<RoleProtectedRoute feature="pelayanan"><PageWrapper><SurveyKepuasan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/bantuan" element={<PageWrapper><Bantuan /></PageWrapper>} />
          <Route path="/users" element={<RoleProtectedRoute feature="users"><PageWrapper><UserManagement /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/log-aktivitas" element={<RoleProtectedRoute feature="users"><PageWrapper><LogAktivitas /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/pengaturan" element={<RoleProtectedRoute feature="pengaturan"><PageWrapper><Pengaturan /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/ganti-password" element={<PageWrapper><GantiPassword /></PageWrapper>} />
          <Route path="/profil" element={<PageWrapper><Profil /></PageWrapper>} />
          <Route path="/portal" element={<RoleProtectedRoute feature="dashboard-pasien"><PageWrapper><PortalDashboard /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/portal/riwayat" element={<RoleProtectedRoute feature="riwayat-saya"><PageWrapper><RiwayatSaya /></PageWrapper></RoleProtectedRoute>} />
          <Route path="/portal/jadwal" element={<RoleProtectedRoute feature="jadwal-saya"><PageWrapper><JadwalSaya /></PageWrapper></RoleProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/jadwal-shift" element={<RoleProtectedRoute feature="jadwal-shift"><PageWrapper><JadwalShift /></PageWrapper></RoleProtectedRoute>} />
        <Route path="/absensi" element={<RoleProtectedRoute feature="absensi"><PageWrapper><Absensi /></PageWrapper></RoleProtectedRoute>} />
        <Route path="/kamar" element={<RoleProtectedRoute feature="kamar"><PageWrapper><ManajemenKamar /></PageWrapper></RoleProtectedRoute>} />
        <Route path="/analitik" element={<RoleProtectedRoute feature="analitik"><PageWrapper><DashboardAnalitik /></PageWrapper></RoleProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <SidebarProvider>
            <CabangProvider>
              <NotificationProvider>
                <BrowserRouter>
                  <AnimatedRoutes />
                </BrowserRouter>
              </NotificationProvider>
            </CabangProvider>
          </SidebarProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;