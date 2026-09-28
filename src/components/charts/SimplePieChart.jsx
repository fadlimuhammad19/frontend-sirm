export default function SimplePieChart({ data, colors, size = 220 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  let cumulativeAngle = -90;

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelX = cx + (radius * 0.65) * Math.cos(midRad);
    const labelY = cy + (radius * 0.65) * Math.sin(midRad);

    return { path, color: colors[i % colors.length], label: d.name, value: d.value, labelX, labelY, percent: Math.round((d.value / total) * 100) };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color}>
            <title>{s.label}: {s.value} ({s.percent}%)</title>
          </path>
        ))}
      </svg>
      <div className="flex flex-wrap gap-3 justify-center">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            {s.label} ({s.percent}%)
          </div>
        ))}
      </div>
    </div>
  );
}