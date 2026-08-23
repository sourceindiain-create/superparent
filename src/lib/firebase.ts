import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfigData from '../../firebase-applet-config.json';

const configData = firebaseConfigData as Record<string, any>;

const firebaseConfig = {
  projectId: configData.projectId || "studio-6989353372-64cd3",
  appId: configData.appId || "1:366648669779:web:2d087f960dd7f01fecb8a6",
  apiKey: configData.apiKey || "AIzaSyCGKRa6QfqVNn82k_dJNCx4QYsVTgGLU1s",
  authDomain: configData.authDomain || "studio-6989353372-64cd3.firebaseapp.com",
  firestoreDatabaseId: configData.firestoreDatabaseId || "ai-studio-superparent-bfab3fc7-3e58-4959-9afc-f918498ac589",
  storageBucket: configData.storageBucket || "studio-6989353372-64cd3.firebasestorage.app",
  messagingSenderId: configData.messagingSenderId || "366648669779"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export const auth: Auth = getAuth(app);
export default app;
export { firebaseConfig };
