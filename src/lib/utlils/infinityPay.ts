export interface InfinityPayOptions {
  baseUrl: string;
  name: string;
  price: number;
  userName: string;
  userPhone: string;
  redirectUrl: string;
  orderNsu?: string;
  customerEmail?: string;
}

export function buildInfinityPayUrl({
  baseUrl,
  name,
  price,
  userName,
  userPhone,
  redirectUrl,
  orderNsu,
  customerEmail,
}: InfinityPayOptions): string {
  if (!baseUrl) return '';

  const base = baseUrl.replace(/\/+$/, '');
  const cents = Math.max(1, Math.round(Number(price) * 100));

  const items = JSON.stringify([
    { name: name.trim(), price: cents, quantity: 1 },
  ]);

  const qs = new URLSearchParams();
  qs.set('items', items);
  qs.set('redirect_url', redirectUrl);
  qs.set('customer_name', userName || '');
  const phone = (userPhone || '').replace(/\D/g, '');
  if (phone) qs.set('customer_cellphone', phone);
  if (customerEmail) qs.set('customer_email', customerEmail);
  if (orderNsu) qs.set('order_nsu', orderNsu);

  return `${base}?${qs.toString()}#payment`;
}
