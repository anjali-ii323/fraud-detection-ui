function SimpleLineChart({ data, stroke = '#22d3ee', height = 180 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * 100
      const y = 100 - ((d - min) / (max - min || 1)) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 100 100" className="w-full" style={{ height }}>
      <polyline fill="none" stroke={stroke} strokeWidth="2.2" points={points} />
    </svg>
  )
}

export default SimpleLineChart
