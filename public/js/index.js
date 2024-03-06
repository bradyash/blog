// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
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

const blogSection = document.querySelector('.blogs-section');

async function retrieveBlogs() {
    try {
        const docs = await getDocs(collection(db, "blogs"));
        docs.forEach(blog => {
            if (blog.id !== decodeURI(location.pathname.split("/").pop())) {
                createBlog(blog);
            }
        });
    } catch (e) {
        console.log(e)
    }
}
function createBlog(blog) {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/blog/${blog.id}" class="btn-dark">READ</a>
    </div>
    `;
}

retrieveBlogs();
