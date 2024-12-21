import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, connectAuthEmulator } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_I,
  storageBucket: process.env.VITE_STORAGE_ID,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

if (__DEV__){
  connectFirestoreEmulator(firestore, 'localhost', 8080)
}