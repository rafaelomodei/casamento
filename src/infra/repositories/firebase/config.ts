import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
  GoogleAuthProvider,
  type Auth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function createFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const appFirebase: FirebaseApp = createFirebaseApp();

/**
 * Instância de `Auth`.
 * • No *server* (SSR ou Edge) não há `window`, então devolve `undefined`.
 * • No *client* devolve o objeto `Auth` configurado com persistência local.
 */
export const auth: Auth | undefined = (() => {
  if (typeof window === 'undefined') return undefined as never;

  const instance = getAuth(appFirebase);
  setPersistence(instance, browserLocalPersistence).catch(() => {});
  if (process.env.NODE_ENV !== 'production') {
    try {
      instance.settings.appVerificationDisabledForTesting = true;
    } catch {
      /* noop */
    }
  }
  return instance;
})();

export const googleProvider = new GoogleAuthProvider();
