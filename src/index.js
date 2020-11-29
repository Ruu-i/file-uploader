/* eslint-disable no-console */
import express from 'express';
var multer  = require('multer')
var upload = multer({ dest: 'images/' })
const fs = require('fs')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;

app.post('/images', upload.single('avatar'), function (req, res, next) {
  res.send(req.file)
})
 
app.get('/images/:id', function (req, res) {
  // Validate that req.params.id is 16 bytes hex string
  // Get the stored image type for this image
  res.setHeader('Content-Type', "image/jpeg")
  fs.createReadStream(path.join("images/", req.params.id)).pipe(res)
})

app.get('/images/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})
 
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        Death star deployed on port: ${PORT}
        ----------
        Running on ${process.env.NODE_ENV}
        ----------
        Waiting for the command sir!
         `);
  }
});
