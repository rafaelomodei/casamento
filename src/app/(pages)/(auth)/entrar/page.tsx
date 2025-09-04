import { Suspense } from 'react';
import EntrarForm from './form';

export default function EntrarPage() {
  return (
    <Suspense fallback={null}>
      <EntrarForm />
    </Suspense>
  );
}

