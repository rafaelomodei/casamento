export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 3)
  const part3 = digits.slice(3, 7)
  const part4 = digits.slice(7, 11)
  let result = ''
  if (part1) result += `(${part1}`
  if (digits.length >= 2) result += `) `
  if (part2) result += `${part2} `
  if (part3) result += part3
  if (part4) result += ` - ${part4}`
  return result
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && !digits.startsWith('55');
}

export function isPlaceholderPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return /^9{7,}/.test(digits)
}

export function displayPhone(value: string): string {
  return isPlaceholderPhone(value) ? '-' : value
}
