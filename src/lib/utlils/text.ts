export function capitalizeFirst(value: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}
