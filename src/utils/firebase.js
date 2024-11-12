import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8CN7WpI0KuR50kJ-8N999IwICYUq9i68",
  authDomain: "ipamalihog-delivery.firebaseapp.com",
  databaseURL: "https://ipamalihog-delivery-default-rtdb.firebaseio.com",
  projectId: "ipamalihog-delivery",
  storageBucket: "ipamalihog-delivery.firebasestorage.app",
  messagingSenderId: "582535738787",
  appId: "1:582535738787:web:7f4ac2b9e40fe4bf859616"
};

//This is to initialize the firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
