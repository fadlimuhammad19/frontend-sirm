import { useState, useEffect } from "react";

export default function useCrud(initialData, delay = 600) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Simulasi fetch data dari server (nanti diganti axios.get beneran)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 2500);
  };

  const openAdd = () => {
    setEditing(null);
    setIsOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setIsOpen(true);
  };

  const save = (form) => {
    if (editing) {
      setData((prev) => prev.map((d) => (d.id === editing.id ? { ...form, id: editing.id } : d)));
      showToast("Data berhasil diperbarui");
    } else {
      setData((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Data berhasil ditambahkan");
    }
    setIsOpen(false);
  };

  const askDelete = (row) => setConfirmDelete(row);

  const confirmDeleteAction = () => {
    setData((prev) => prev.filter((d) => d.id !== confirmDelete.id));
    showToast("Data berhasil dihapus", "success");
    setConfirmDelete(null);
  };

  return {
    data,
    loading,
    isOpen,
    setIsOpen,
    editing,
    openAdd,
    openEdit,
    save,
    confirmDelete,
    setConfirmDelete,
    askDelete,
    confirmDeleteAction,
    toast,
  };
}