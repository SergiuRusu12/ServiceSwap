// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjwwQNqU16l_1tx98GWWF2LGoiwsMwOdU",
  authDomain: "serviceswap-b5da9.firebaseapp.com",
  projectId: "serviceswap-b5da9",
  storageBucket: "serviceswap-b5da9.appspot.com",
  messagingSenderId: "1068751293009",
  appId: "1:1068751293009:web:3dc88d52aae7fd3916c670",
  measurementId: "G-H4PFT1TWX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics };
