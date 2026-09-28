import { useState, useRef, useEffect } from "react";
import { Bell, X, Check } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, removeNotification, unreadCount } = useNotifications();
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="relative text-slate-500 hover:text-blue-600 bg-white/70 p-2 rounded-lg shadow-sm">
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[9px] text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50">
            <h4 className="font-semibold text-sm text-slate-800">Notifikasi</h4>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline font-medium">
                Tandai semua dibaca
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-slate-400 py-8">Tidak ada notifikasi</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-2 px-4 py-3 border-b border-slate-50 ${!n.read ? "bg-blue-50/50" : ""}`}>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                  <div className="flex gap-1">
                    {!n.read && (
                      <button onClick={() => markAsRead(n.id)} className="text-slate-400 hover:text-green-600 p-1">
                        <Check size={14} />
                      </button>
                    )}
                    <button onClick={() => removeNotification(n.id)} className="text-slate-400 hover:text-red-600 p-1">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}