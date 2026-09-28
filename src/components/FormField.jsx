export default function FormField({ label, error, children }) {
  return (
    <div>
      <label className="text-sm text-slate-600 mb-1 block">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}