import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJiSRDFyPcsDMu1GCT3BEULRalOmWGk2U",
  authDomain: "ikl-delivery.firebaseapp.com",
  projectId: "ikl-delivery",
  storageBucket: "ikl-delivery.firebasestorage.app",
  messagingSenderId: "680638948156",
  appId: "1:680638948156:web:82909b6cf003c390bd3439"
};

//This is to initialize the firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
