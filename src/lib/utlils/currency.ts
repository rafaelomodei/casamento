export function formatCurrency(value: number | string): string {
  let number = 0;
  if (typeof value === 'number') {
    number = value;
  } else if (value) {
    const parsed = parseFloat(value.replace(',', '.'));
    if (!isNaN(parsed)) number = parsed;
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
}

export function formatCurrencyInput(value: string): { formatted: string; numeric: number } {
  const digits = value.replace(/\D/g, '');
  if (!digits) {
    return { formatted: '', numeric: 0 };
  }
  const numeric = parseInt(digits, 10) / 100;
  return { formatted: formatCurrency(numeric), numeric };
}
