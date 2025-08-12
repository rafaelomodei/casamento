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

  const cents = Math.max(1, Math.round(Number(price) * 100));

  const itemsJson = JSON.stringify([
    { name: name.trim(), price: cents, quantity: 1 },
  ]);

  const phone = (userPhone || '').replace(/\D/g, '');

  const qs = new URLSearchParams();
  qs.set('items', itemsJson);
  qs.set('customer_name', userName || '');
  if (phone) qs.set('customer_cellphone', phone);
  qs.set('redirect_url', redirectUrl);

  return `${baseUrl}?${qs.toString()}#payment`;
}
