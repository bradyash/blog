// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
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

let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = collection(db, "blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] === '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] === '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if(item[0] === "!" && item[1] === "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] === "]" && item[i + 1] === "(" && item[item.length - 1] === ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}
