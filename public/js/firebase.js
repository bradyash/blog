import { initializeApp } from "firebase/app";

let firebaseConfig = {
    apiKey: "AIzaSyA4x-_6syN58HrsTqB-AeobQWvJGuouKn4",
    authDomain: "blog-a0750.firebaseapp.com",
    projectId: "blog-a0750",
    storageBucket: "blog-a0750.appspot.com",
    messagingSenderId: "939477394565",
    appId: "1:939477394565:web:05a602e7fc60d0a2d9b5ec",
    measurementId: "G-GDY1JMSCTT"
};

const app = initializeApp(firebaseConfig);

let db = firebase.firestore();