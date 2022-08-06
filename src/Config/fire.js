// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDBOP5T6MR08X7hbO799QztUkThpzCGZg",
  authDomain: "iitintbproject.firebaseapp.com",
  databaseURL: "https://iitintbproject-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iitintbproject",
  storageBucket: "iitintbproject.appspot.com",
  messagingSenderId: "748610233360",
  appId: "1:748610233360:web:854c2de7ea288d04621695",
  measurementId: "G-M6N7WXH543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

export {app, analytics, auth, db}