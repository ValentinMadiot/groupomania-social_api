//* CLOUDINARY CONFIGUE
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-config");

router.post("/", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      imageUrl: req.file.path, // lien cloudinary
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

//* SCHOOL PROJECT
// const express = require("express");
// const multer = require("multer");

// const router = express.Router()

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });
// const upload = multer({ storage });

// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploaded successfully");
//   } catch (error) {
//     console.log({ error: error.message });
//   }
// });

// module.exports = router;
