// src/lib/firebase.ts

// Import the base functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import the backend services you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration (from your snippet)
const firebaseConfig = {
  apiKey: "AIzaSyBfvBdB9AVm0aBQHt3yJUfCXORaA1VwCZ4",
  authDomain: "eco-digital-stride.firebaseapp.com",
  projectId: "eco-digital-stride",
  storageBucket: "eco-digital-stride.firebasestorage.app",
  messagingSenderId: "1083264445382",
  appId: "1:1083264445382:web:acbac34118b4779858a0c7",
  measurementId: "G-0PCMFYLFN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (from your snippet)
const analytics = getAnalytics(app);

// Initialize and EXPORT the services you need for your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);