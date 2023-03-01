const express = require('express');
const cors = require('cors');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// creatin upload on multer
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./S3');

const app = express();
app.use(cors());

app.get('/images/:key', (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    console.log("jhehe");
    readStream.pipe(res);//send the image
  })

app.post('/upload', upload.single("image"), async (req, res) => {
    console.log(req.file);
    const file = req.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path)//delete file from the server
    console.log(result);
    res.send({ imagePath: `/images/${result.key}` })
})

// image is the name of the data sent from the client
app.listen(3001, () => {
    console.log("Running on server 3001");
})