import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABtyhU32MtsYKnVeqdFX3A0VqmkRt0hOg",
  authDomain: "webauth-e9d9a.firebaseapp.com",
  projectId: "webauth-e9d9a",
  storageBucket: "webauth-e9d9a.firebasestorage.app",
  messagingSenderId: "700195913745",
  appId: "1:700195913745:web:e44a7aac0a8ea07c9db1b0",
  measurementId: "G-LQ6ZKMZRB6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const dataBase = getFirestore(app);
export default app;
