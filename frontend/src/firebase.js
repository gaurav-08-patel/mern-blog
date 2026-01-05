// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c651f.firebaseapp.com",
  projectId: "mern-blog-c651f",
  storageBucket: "mern-blog-c651f.firebasestorage.app",
  messagingSenderId: "572431946890",
  appId: "1:572431946890:web:6687d134b203077d284973"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);