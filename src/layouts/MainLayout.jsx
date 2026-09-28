import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SessionTimeoutModal from "../components/SessionTimeoutModal";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleTimeout = () => {
    logout();
    navigate("/login");
  };

  const { showWarning, stayActive } = useSessionTimeout(handleTimeout);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen w-full relative">
        <div className="fixed inset-0 lg:left-60 bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 -z-10" />
        <div className="fixed top-[-150px] right-[-100px] w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px] opacity-50 -z-10 animate-blob" />
        <div className="fixed bottom-[-150px] left-[30%] w-[500px] h-[500px] bg-purple-400 rounded-full blur-[120px] opacity-40 -z-10 animate-blob animation-delay-2000" />
        <div className="fixed top-[40%] right-[10%] w-[350px] h-[350px] bg-pink-300 rounded-full blur-[120px] opacity-40 -z-10 animate-blob animation-delay-4000" />

        <Navbar />
        <main className="p-4 sm:p-6 relative">
          <Outlet />
        </main>

        <SessionTimeoutModal isOpen={showWarning} onStay={stayActive} />
      </div>
    </div>
  );
}