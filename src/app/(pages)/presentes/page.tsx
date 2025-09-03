import PresentesPage from './PresentesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presentes',
};

export default function Page() {
  return <PresentesPage />;
}
