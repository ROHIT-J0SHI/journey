// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiJbNlX-0oT9qN7jsq_VHT68rTI50vmUQ",
  authDomain: "ai-trip-planner-by-rohit-joshi.firebaseapp.com",
  projectId: "ai-trip-planner-by-rohit-joshi",
  storageBucket: "ai-trip-planner-by-rohit-joshi.appspot.com",
  messagingSenderId: "143837318118",
  appId: "1:143837318118:web:94859e2c4d2b36c7db6427",
  measurementId: "G-R29DWN7ZH3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)