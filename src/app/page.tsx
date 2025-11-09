import type { Metadata } from 'next';

import LoginPage from '@/components/auth/LoginPage';

export const metadata: Metadata = {
  title: 'Entrar | Maria e Rafael',
  description:
    'Acesse a plataforma para confirmar presença, enviar mensagens e acompanhar todas as novidades do casamento.',
};

export default function Page() {
  return <LoginPage />;
}
