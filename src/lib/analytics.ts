export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string, title?: string) => {
  if (!GA_ID) return;
  window.gtag('config', GA_ID, {
    page_path: url,
    ...(title && { page_title: title }),
  });
};

interface EventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventParams) => {
  if (!GA_ID) return;
  window.gtag('event', action, {
    ...(category && { event_category: category }),
    ...(label && { event_label: label }),
    ...(value !== undefined && { value }),
  });
};
