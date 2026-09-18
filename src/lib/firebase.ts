import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app;
let dbInstance: any = null;
let authInstance: any = null;

try {
  app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  authInstance = getAuth(app);

  // Test connection
  getDocFromServer(doc(dbInstance, 'test', 'connection')).catch((error) => {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.log("Firebase client is offline or unconfigured; operating in guest/local mode.");
    }
  });
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export const db = dbInstance;
export const auth = authInstance;
