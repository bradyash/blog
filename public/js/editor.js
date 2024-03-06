// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, getDocs, collection} from "firebase/firestore";
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

const blogTitleField = document.querySelector('.title')
const articleField = document.querySelector('.article')

//banner
const bannerImage = document.querySelector('#banner-upload')
const banner = document.querySelector('.banner')
let bannerPath;

const publishBtn = document.querySelector('.publish-btn')
const uploadInput = document.querySelector('#image-upload')


bannerImage.addEventListener('change', function () {
    uploadImage(bannerImage, 'banner');
})

uploadInput.addEventListener('change', function () {
    uploadImage(uploadInput, 'image');
})

publishBtn.addEventListener('click', async function () {
    console.log('Clicked...')
    console.log('db: ' + db)
    if (articleField.value.length && blogTitleField.value.length) {
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info
        if (!bannerPath) {
            bannerPath = ''
        }
        try {
            const collectionRef = await addDoc(collection(db, 'blogs'), {
                title: blogTitleField.value,
                article: articleField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            });
            location.href = `/blog/${docName}`;
        }
        catch (err) {
            console.error(err);
        }
    }
})


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes('image')) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if(uploadType === 'image') {
                    addImage(data,file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`;
                    banner.style.backgroundImage = `url('${bannerPath}')`;
                }
            })
    } else {
        alert('Upload Image Only');
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

