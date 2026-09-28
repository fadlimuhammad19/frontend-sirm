import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDisplay({ value, size = 120 }) {
  return (
    <div className="inline-block p-3 bg-white rounded-xl border border-slate-200">
      <QRCodeSVG value={value} size={size} level="M" />
    </div>
  );
}