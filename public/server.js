// const express = require('express');
// const path = require('path');
// const fileupload = require('express-fileupload');
//
// let initial_path = path.join(__dirname, "public");
//
// const app = express();
// app.use(express.static(initial_path));
// app.use(fileupload());
//
// app.get('/', (req, res) => {
//     res.sendFile(path.join(initial_path, "index.html"));
// })
//
// app.get('/editor', (req,res) => {
//     res.sendFile(path.join(initial_path, "editor.html"))
// })
//
// app.post('/upload', (req, res) => {
//     let file = req.files.image;
//     let date = new Date();
//
//     let imagename = date.getDate() + date.getTime() + file.name;
//
//     let path = 'public/uploads/' + imagename;
//
//     file.mv(path, (err, result) => {
//         if(err) {
//             throw err;
//         } else {
//             res.json(`uploads/${imagename}`)
//         }
//     })
// })
//
// app.get("/:blog", (req, res) => {
//     res.sendFile(path.join(initial_path, "blog.html"));
// })
//
// app.use((req, res) => {
//     res.json("404");
// })
//
// app.listen("5000", () => {
//     console.log('listening......');
// })

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const express = require('express');
const fileupload = require('express-fileupload');

admin.initializeApp();

const app = express();
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.image;
    const date = new Date();

    const imagename = date.getDate() + date.getTime() + file.name;
    const tempFilePath = path.join(os.tmpdir(), imagename);
    const filePath = path.join('public', 'uploads', imagename);

    file.mv(tempFilePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        admin.storage().bucket().upload(tempFilePath, {
            destination: filePath,
            metadata: {
                metadata: {
                    contentType: file.mimetype
                }
            }
        })
            .then(() => {
                fs.unlinkSync(tempFilePath);
                res.json(`uploads/${imagename}`);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err);
            });
    });
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.use((req, res) => {
    res.status(404).json("404");
});

exports.app = functions.https.onRequest(app);
