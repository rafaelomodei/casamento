import type { Metadata } from 'next';

import LoginPage from '@/components/auth/LoginPage';

export const metadata: Metadata = {
  title: 'Entrar | Maria e Rafael',
};

export default function EntrarPage() {
  return <LoginPage />;
}
