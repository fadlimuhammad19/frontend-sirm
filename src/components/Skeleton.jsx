export function SkeletonText({ width = "100%", height = "1rem" }) {
  return (
    <div
      className="bg-slate-200 rounded animate-pulse"
      style={{ width, height }}
    />
  );
}

export function SkeletonTable({ rows = 5, columns = 3 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="p-4 border-b border-slate-100">
        <SkeletonText width="200px" height="36px" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4">
            {Array.from({ length: columns }).map((_, c) => (
              <SkeletonText key={c} width={`${100 / columns}%`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
      <SkeletonText width="40px" height="40px" />
      <div className="mt-3 space-y-2">
        <SkeletonText width="60%" height="0.8rem" />
        <SkeletonText width="40%" height="1.5rem" />
      </div>
    </div>
  );
}