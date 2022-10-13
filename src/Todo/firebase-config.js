// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_RCJN3HoQSLfLhUUPC89tPNav00MAQuo",
  authDomain: "my-chat-app-99e94.firebaseapp.com",
  projectId: "my-chat-app-99e94",
  storageBucket: "my-chat-app-99e94.appspot.com",
  messagingSenderId: "121897744057",
  appId: "1:121897744057:web:f0597249cfd2c8c9b50d68",
  measurementId: "G-58MKTVPBHN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
