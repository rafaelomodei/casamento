import {
  getApps,
  getApp,
  initializeApp,
  cert,
  applicationDefault,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

function loadServiceAccount(): Record<string, unknown> | undefined {
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (path) {
    try {
      return JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      // ignore invalid path or json
    }
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch {
      // ignore invalid json
    }
  }
  return undefined;
}

const firebaseAdminApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: ((): any => {
        const serviceAccount = loadServiceAccount();
        return serviceAccount ? cert(serviceAccount as any) : applicationDefault();
      })(),
    });

export const adminAuth = getAuth(firebaseAdminApp);
export const adminDb = getFirestore(firebaseAdminApp);
