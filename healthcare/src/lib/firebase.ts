import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "aura-health-connect",
  appId: "1:26883350211:web:a4dd109038251ab4978c76",
  storageBucket: "aura-health-connect.firebasestorage.app",
  apiKey: "AIzaSyCyL7d-2wjUAIg10CBAXBLWJIRlJahB0ZY",
  authDomain: "aura-health-connect.firebaseapp.com",
  messagingSenderId: "26883350211",
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
