import { getApps, getApp, initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: process.env.FIREBASE_SERVICE_ACCOUNT
        ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
        : applicationDefault(),
    });

export const adminAuth = getAuth(firebaseAdminApp);
