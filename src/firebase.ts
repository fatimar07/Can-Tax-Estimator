// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔁 Replace this with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyA2Sy8ASaHkuo7YonwrRnVsYgGo36yEdbM",
  authDomain: "can-tax-estimator.firebaseapp.com",
  projectId: "can-tax-estimator",
  storageBucket: "can-tax-estimator.firebasestorage.app",
  messagingSenderId: "4066361023",
  appId: "1:4066361023:web:5c39ed758bb59a48cf100a",
  measurementId: "G-CTRR2BVRVR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
