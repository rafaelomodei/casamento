import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Providers/auth-provider';

export function useRedirectIfLoggedIn(callback: string) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(callback);
    }
  }, [user, callback, router]);
}
