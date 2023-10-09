// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdLRBNbHayvlGteYssMm5g3Dx3PbH2-tU",
  authDomain: "kvizmester-ace48.firebaseapp.com",
  databaseURL: "https://kvizmester-ace48-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kvizmester-ace48",
  storageBucket: "kvizmester-ace48.appspot.com",
  messagingSenderId: "1055830362464",
  appId: "1:1055830362464:web:c8cdc1a5b5cff583223605",
  measurementId: "G-WR8V6J82CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db