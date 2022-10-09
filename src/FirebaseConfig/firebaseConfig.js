import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Ksw1JGolqWyQcCutKaDyUMwk8gI0gXc",
  authDomain: "codermeals.firebaseapp.com",
  projectId: "codermeals",
  storageBucket: "codermeals.appspot.com",
  messagingSenderId: "424794636616",
  appId: "1:424794636616:web:e73d2df5027f66cfe6b37d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };