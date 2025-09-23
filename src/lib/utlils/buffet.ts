export type BuffetType = 'full' | 'half' | 'free';

export function getBuffetType(age?: number): BuffetType {
  if (age === undefined) return 'full';
  if (age <= 4) return 'free';
  if (age <= 8) return 'half';
  return 'full';
}

export function formatBuffetLabel(type: BuffetType): string {
  if (type === 'half') return 'Meia';
  if (type === 'free') return 'Não paga';
  return 'Inteira';
}
