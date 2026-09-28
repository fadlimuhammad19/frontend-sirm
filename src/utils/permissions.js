export const rolePermissions = {
  Admin: ["dashboard", "pasien", "pelayanan", "obat", "lab", "bpjs", "laporan", "cabang", "users", "pengaturan", "absensi", "jadwal-shift", "kamar", "analitik"],
  Dokter: ["dashboard", "pasien", "pelayanan", "lab", "absensi", "jadwal-shift"],
  Perawat: ["dashboard", "pasien", "pelayanan", "obat", "lab", "absensi", "jadwal-shift"],
  Kasir: ["dashboard", "pelayanan", "bpjs", "absensi", "jadwal-shift"],
  Pasien: ["dashboard-pasien", "riwayat-saya", "jadwal-saya"],
  Kamar: ["Admin", "Dokter", "Perawat"], // Only Admin, Dokter, and Perawat can access the "kamar" feature
};

export function canAccess(role, feature) {
  return rolePermissions[role]?.includes(feature) ?? false;
}