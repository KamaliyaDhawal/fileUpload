const express = require('express');
const cors = require('cors');
require('dotenv');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
  	req.body.filePath = `/uploads/${req.body.name}-${file.originalname}`;
    cb(null, req.body.name + '-' + file.originalname)
  }
})
 
const upload = multer({ storage: storage })


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
const PORT = process.env.PORT || 3300

app.post('/upload', upload.single('image'), (req, res) => {
	res.send(req.body.filePath);
});

app.listen(PORT, () => {
	console.log(`Servr is ready on port ${PORT}`);
});