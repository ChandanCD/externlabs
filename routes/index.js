const express = require('express');
const router = express.Router();
const multer  = require('multer');
const auth = require('../controllers/auth');

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storage }).single("file");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post("/upload", auth, (req, res) => {
  upload(req, res, (err) => {
   if(err) {
     res.status(400).json({
      message: "Something went wrong!",
      error: "file not uploaded",
    });
   }
   res.status(200).json({
    message: "Successfully uploaded!"
  });
 });
});

router.get('/gallery/:fileName', (req, res, next) => {

  const options = {
    root: './public/uploads/'
  };

  res.sendFile(req.params.fileName, options, (err) => {
    if (err) next(err);
    else console.log('Sent:', req.params.fileName);
  });
});

router.get('/download/:fileName', (req, res) => {
  const file = `./public/uploads/${req.params.fileName}`;
  res.download(file, (err) => {
    if (err) console.error("Error : ", err);
  });
});

module.exports = router;
