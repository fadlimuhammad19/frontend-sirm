export default function SimpleBarChart({ data, bars, labelKey, height = 220 }) {
  const width = 500;
  const padding = 40;
  const allValues = data.flatMap((d) => bars.map((b) => d[b.key]));
  const max = Math.max(...allValues) * 1.15;

  const groupWidth = (width - padding * 2) / data.length;
  const barWidth = (groupWidth * 0.6) / bars.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={padding} y1={height - padding - t * (height - padding * 2)} x2={width - padding} y2={height - padding - t * (height - padding * 2)} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {data.map((d, i) => {
        const groupX = padding + i * groupWidth + groupWidth * 0.2;
        return (
          <g key={i}>
            {bars.map((b, bi) => {
              const barHeight = (d[b.key] / max) * (height - padding * 2);
              const x = groupX + bi * barWidth;
              const y = height - padding - barHeight;
              return (
                <g key={b.key}>
                  <rect x={x} y={y} width={barWidth - 4} height={barHeight} fill={b.color} rx="4">
                    <title>{b.label}: {d[b.key]}</title>
                  </rect>
                </g>
              );
            })}
            <text x={groupX + (barWidth * bars.length) / 2} y={height - padding + 20} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {d[labelKey]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}