export interface InfinityPayOptions {
  baseUrl: string;
  name: string;
  price: number;
  redirectUrl: string;
}

export function buildInfinityPayUrl({
  baseUrl,
  name,
  price,
  redirectUrl,
}: InfinityPayOptions): string {
  if (!baseUrl) return '';
  const formattedName = name.trim().replace(/\s+/g, '+');
  const items = `[{"name":"${formattedName}","price":${Math.round(
    price * 100
  )},"quantity":1}]`;
  return `${baseUrl}?items=${items}&redirect_url=${redirectUrl}`;
}
