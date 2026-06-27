export function formatNum(n: number): string {
  if (n < 0) return '-' + formatNum(-n)
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  if (n < 1 && n > 0) return n.toFixed(2)
  return Math.floor(n).toString()
}

export function formatRate(n: number): string {
  if (n === 0) return '0'
  if (n < 0.01) return n.toFixed(3)
  if (n < 1) return n.toFixed(2)
  return formatNum(n)
}
