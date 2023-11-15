// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnYE27q-S8CkE-y5aL7h9RjtT12C43_74",
  authDomain: "trips-d41d1.firebaseapp.com",
  databaseURL: "https://trips-d41d1.firebaseio.com",
  projectId: "trips-d41d1",
  storageBucket: "trips-d41d1.appspot.com",
  messagingSenderId: "1007606651333",
  appId: "1:1007606651333:web:ac617da1087668eefb53ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)