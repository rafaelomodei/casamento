import {
  getApps,
  getApp,
  initializeApp,
  cert,
  applicationDefault,
  ServiceAccount,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

function loadServiceAccount(): ServiceAccount | undefined {
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (path) {
    try {
      return JSON.parse(readFileSync(path, 'utf-8')) as ServiceAccount;
    } catch {
      // ignora erro de leitura/JSON
    }
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
    } catch {
      // ignora JSON inválido
    }
  }
  return undefined;
}

const firebaseAdminApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: (() => {
          const serviceAccount = loadServiceAccount();
          return serviceAccount ? cert(serviceAccount) : applicationDefault();
        })(),
      });

export const adminAuth = getAuth(firebaseAdminApp);
export const adminDb = getFirestore(firebaseAdminApp);

export async function verifyIdToken(token: string): Promise<DecodedIdToken> {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (err) {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) throw err;
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      }
    );
    if (!res.ok) throw err;
    const data = (await res.json()) as { users?: { localId: string }[] };
    const localId = data.users?.[0]?.localId;
    if (!localId) throw err;
    return { uid: localId } as DecodedIdToken;
  }
}
