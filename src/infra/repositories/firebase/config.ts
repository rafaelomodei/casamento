import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
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
let appFirebase: FirebaseApp | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let auth: Auth | null = null;

export function initFirebase() {
  if (appFirebase) return;
  try {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    appFirebase = app;
    if (typeof window !== 'undefined') {
      auth = getAuth(app);
      setPersistence(auth, browserLocalPersistence).catch(() => {});
      googleProvider = new GoogleAuthProvider();
    }
    console.debug('Firebase successfully initialized');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    appFirebase = null;
    googleProvider = null;
    auth = null;
  }
}

initFirebase();

export { appFirebase, auth, googleProvider };
