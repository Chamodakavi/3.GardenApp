// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-_bZaUlqmR9w_l5-nkrmcq_DwnUV0HXI",
  authDomain: "farm-own-mobile-app.firebaseapp.com",
  projectId: "farm-own-mobile-app",
  storageBucket: "farm-own-mobile-app.firebasestorage.app",
  messagingSenderId: "185295271073",
  appId: "1:185295271073:web:62128960dc40dfe7f7ace0",
  measurementId: "G-GEPKZSVT89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const database = getFirestore(app);

// Optional: Initialize Analytics if you plan to use it
// const analytics = getAnalytics(app);

// Export Firestore instance
export { database };
