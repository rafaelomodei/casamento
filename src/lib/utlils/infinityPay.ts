export interface InfinityPayOptions {
  baseUrl: string;
  name: string;
  price: number;
  userName: string;
  userPhone: string;
  redirectUrl: string;
  customerEmail?: string;
  orderNsu?: string;
}

export function buildInfinityPayUrl({
  baseUrl,
  name,
  price,
  userName,
  userPhone,
  redirectUrl,
  customerEmail,
  orderNsu,
}: InfinityPayOptions): string {
  if (!baseUrl) return '';

  const amount = Math.max(1, Math.round(Number(price) * 100));
  const items = JSON.stringify([{ name: name.trim(), amount, quantity: 1 }]);

  const qs = new URLSearchParams();
  qs.set('items', items);
  if (orderNsu) qs.set('order_nsu', orderNsu);
  qs.set('redirect_url', redirectUrl);
  qs.set('customer_name', userName || '');
  qs.set('customer_cellphone', (userPhone || '').replace(/\D/g, ''));
  if (customerEmail) qs.set('customer_email', customerEmail);

  return `${baseUrl}?${qs.toString()}#payment`;
}
