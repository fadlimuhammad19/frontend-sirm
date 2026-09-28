export default function PageHeader({ title, subtitle, action, gradient = "from-blue-600 via-indigo-600 to-purple-600" }) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-lg`}>
      <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4" />
      <div className="absolute right-24 bottom-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2" />
      <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{title}</h1>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}