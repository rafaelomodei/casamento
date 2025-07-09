export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseCurrency(value: string): number {
  const sanitized = value.replace(/\./g, '').replace(/,/g, '.')
  const parsed = parseFloat(sanitized)
  return isNaN(parsed) ? 0 : parsed
}
