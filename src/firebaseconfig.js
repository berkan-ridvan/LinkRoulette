// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVYAUlx4IecgEQkYoqqbZYWBCX45DLNw",
  authDomain: "linkroulette-47f24.firebaseapp.com",
  projectId: "linkroulette-47f24",
  storageBucket: "linkroulette-47f24.appspot.com",
  messagingSenderId: "426835656542",
  appId: "1:426835656542:web:07041ad4d17cb1bc3959cf",
  measurementId: "G-P6B5B2XPD7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);