import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";

export default function QRScanModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  const regionId = "qr-scan-region";

  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5Qrcode(regionId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 220 },
        (decodedText) => {
          onScanSuccess(decodedText);
          scanner.stop().catch(() => {});
        },
        () => {}
      )
      .catch((err) => console.error("Gagal buka kamera:", err));

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear();
      }
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Scan QR Absensi</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>
        <div id={regionId} className="rounded-xl overflow-hidden" />
        <p className="text-xs text-slate-400 mt-3 text-center">Arahkan kamera ke QR Code kartu staff</p>
      </div>
    </div>
  );
}