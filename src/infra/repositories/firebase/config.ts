import { FirebaseApp, initializeApp } from 'firebase/app';
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

try {
  appFirebase = initializeApp(firebaseConfig);
  auth = getAuth(appFirebase);
  setPersistence(auth, browserLocalPersistence);
  googleProvider = new GoogleAuthProvider();

  console.debug('Firebase successfully initialized');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  appFirebase = null;
  googleProvider = null;
  auth = null;
}

export { appFirebase, auth, googleProvider };
