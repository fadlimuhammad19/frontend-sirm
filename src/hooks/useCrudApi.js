import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export default function useCrudApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 2500);
  };

  const errorMessage = (err) => err.response?.data?.error || "Tidak bisa terhubung ke server";

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get(`/${endpoint}`);
      setData(res.data.data);
    } catch (err) {
      showToast(errorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditing(null);
    setIsOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setIsOpen(true);
  };

  const save = async (form) => {
    try {
      if (editing) {
        await api.put(`/${endpoint}/${editing.id}`, form);
        showToast("Data berhasil diperbarui");
      } else {
        await api.post(`/${endpoint}`, form);
        showToast("Data berhasil ditambahkan");
      }
      setIsOpen(false);
      await fetchData();
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  const addMany = async (rows) => {
    const results = await Promise.allSettled(rows.map((r) => api.post(`/${endpoint}`, r)));
    const ok = results.filter((r) => r.status === "fulfilled").length;
    const gagal = results.length - ok;
    await fetchData();
    if (gagal > 0) {
      showToast(`${ok} data masuk, ${gagal} gagal (mungkin data duplikat)`, "error");
    } else {
      showToast(`${ok} data berhasil diimpor`);
    }
  };

  const askDelete = (row) => setConfirmDelete(row);

  const confirmDeleteAction = async () => {
    try {
      await api.delete(`/${endpoint}/${confirmDelete.id}`);
      showToast("Data berhasil dihapus");
      await fetchData();
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
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
    addMany,
    confirmDelete,
    setConfirmDelete,
    askDelete,
    confirmDeleteAction,
    toast,
  };
}