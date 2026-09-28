export const shiftTypes = {
  pagi: { label: "Pagi", jam: "07:00 - 14:00" },
  siang: { label: "Siang", jam: "14:00 - 21:00" },
  malam: { label: "Malam", jam: "21:00 - 07:00" },
};

// jadwal[tanggal][staffId] = "pagi" | "siang" | "malam" | "libur"
const dummyJadwal = {
  "2026-09-27": { 1: "pagi", 2: "pagi", 3: "siang", 4: "pagi", 5: "pagi", 6: "malam", 7: "siang", 8: "pagi" },
  "2026-09-28": { 1: "siang", 2: "malam", 3: "pagi", 4: "siang", 5: "pagi", 6: "pagi", 7: "malam", 8: "siang" },
};

export default dummyJadwal;