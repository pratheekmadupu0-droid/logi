import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAr8jAaSFrdRu6awvODIBlubz0RtYhYRrw",
  authDomain: "logi-nutrional-product.firebaseapp.com",
  projectId: "logi-nutrional-product",
  storageBucket: "logi-nutrional-product.firebasestorage.app",
  messagingSenderId: "173689033400",
  appId: "1:173689033400:web:25f77c9df9c1798e661a4d",
  measurementId: "G-98M4J7N3LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const db = getFirestore(app);

export default app;
