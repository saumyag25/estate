// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-db928.firebaseapp.com",
  projectId: "mern-estate-db928",
  storageBucket: "mern-estate-db928.appspot.com",
  messagingSenderId: "762206406475",
  appId: "1:762206406475:web:3a5d7144f26de524bc4ace"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);