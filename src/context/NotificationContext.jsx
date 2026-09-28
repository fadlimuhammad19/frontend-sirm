import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

const initialNotifs = [
  { id: 1, text: "Stok Amoxicillin menipis (8 strip)", time: "10 menit lalu", read: false },
  { id: 2, text: "Klaim BPJS Siti Aminah disetujui", time: "1 jam lalu", read: false },
  { id: 3, text: "Jadwal dr. Ani berubah hari Jumat", time: "3 jam lalu", read: true },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifs);

  const markAsRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const removeNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, removeNotification, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}