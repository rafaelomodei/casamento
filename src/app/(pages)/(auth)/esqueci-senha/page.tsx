import type { Metadata } from 'next';

import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage';

export const metadata: Metadata = {
  title: 'Recuperar senha | Maria e Rafael',
  description:
    'Solicite um novo acesso para continuar acompanhando todas as novidades do casamento Maria e Rafael.',
};

export default function Page() {
  return <ForgotPasswordPage />;
}
