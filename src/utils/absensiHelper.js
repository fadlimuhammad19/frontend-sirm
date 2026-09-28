import { shiftTypes } from "./shiftData";

export function hitungStatus(shiftKey, checkInTime) {
  if (!shiftKey || shiftKey === "libur") return "libur";
  if (!checkInTime) return "belum-absen";

  const jamMulai = shiftTypes[shiftKey].jam.split(" - ")[0];
  const [jamH, jamM] = jamMulai.split(":").map(Number);
  const [ciH, ciM] = checkInTime.split(":").map(Number);

  const mulaiMenit = jamH * 60 + jamM;
  const ciMenit = ciH * 60 + ciM;
  const toleransi = 15;

  return ciMenit <= mulaiMenit + toleransi ? "tepat-waktu" : "telat";
}