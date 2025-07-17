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

export function formatUserName(value: string): string {
  if (typeof value !== 'string') {
    return value;
  }

  const parts = value
    .trim()
    .split(/\s+/)
    .map((p) => capitalizeFirst(p));
  if (parts.length === 0) {
    return value;
  }

  const first = parts[0];
  const displayFirst = first.length > 20 ? truncateWithEllipsis(first, 10) : first;

  if (parts.length === 1) {
    return displayFirst;
  }

  const lastInitial = parts[parts.length - 1][0].toUpperCase();
  return `${displayFirst} ${lastInitial}.`;
}
