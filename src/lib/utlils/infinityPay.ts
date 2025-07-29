export interface InfinityPayOptions {
  baseUrl: string;
  name: string;
  price: number;
  userName: string;
  userPhone: string;
  redirectUrl: string;
}

export function buildInfinityPayUrl({
  baseUrl,
  name,
  price,
  userName,
  userPhone,
  redirectUrl,
}: InfinityPayOptions): string {
  if (!baseUrl) return '';
  const formattedName = name.trim().replace(/\s+/g, '+');
  const items = `[{"name":"${formattedName}","price":${Math.round(
    price * 100
  )},"quantity":1}]`;
  return `${baseUrl}?items=${items}&customer_name=${userName}&customer_cellphone=${userPhone}&redirect_url=${redirectUrl}`;
}
