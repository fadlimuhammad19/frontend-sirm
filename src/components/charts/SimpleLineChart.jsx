export default function SimpleLineChart({ data, dataKey, labelKey, color = "#3b82f6", height = 220 }) {
  const width = 500;
  const padding = 40;
  const values = data.map((d) => d[dataKey]);
  const max = Math.max(...values) * 1.1;
  const min = 0;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d[dataKey] - min) / (max - min)) * (height - padding * 2);
    return { x, y, value: d[dataKey], label: d[labelKey] };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={padding} y1={height - padding - t * (height - padding * 2)} x2={width - padding} y2={height - padding - t * (height - padding * 2)} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      <path d={areaD} fill={color} opacity="0.1" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill={color} />
          <circle cx={p.x} cy={p.y} r="9" fill={color} opacity="0.2" />
          <text x={p.x} y={height - padding + 20} textAnchor="middle" fontSize="11" fill="#94a3b8">{p.label}</text>
          <title>{p.label}: {p.value}</title>
        </g>
      ))}
    </svg>
  );
}