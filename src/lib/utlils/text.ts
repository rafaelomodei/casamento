export function capitalizeFirst(value: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}

export function truncateWithEllipsis(value: string, maxLength: number): string {
  if (typeof value !== 'string') {
    return value;
  }

  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength) + '...';
}
