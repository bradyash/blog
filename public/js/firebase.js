// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4x-_6syN58HrsTqB-AeobQWvJGuouKn4",
    authDomain: "blog-a0750.firebaseapp.com",
    projectId: "blog-a0750",
    storageBucket: "blog-a0750.appspot.com",
    messagingSenderId: "939477394565",
    appId: "1:939477394565:web:05a602e7fc60d0a2d9b5ec",
    measurementId: "G-GDY1JMSCTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)