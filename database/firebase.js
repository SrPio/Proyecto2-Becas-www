/* import firebase from 'firebase' */
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARxlQ4sqoDD-t7pPbgDau1wiyaARET2Ac",
    authDomain: "proyecto-2-b9d05.firebaseapp.com",
    projectId: "proyecto-2-b9d05",
    storageBucket: "proyecto-2-b9d05.appspot.com",
    messagingSenderId: "82925914909",
    appId: "1:82925914909:web:5169f760f4fa34bb976ff4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


/* 
export default {
    firebase,
    db,

} */