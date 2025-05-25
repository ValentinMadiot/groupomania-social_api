//* CLOUDINARY CONFIGUE
const { cloudinary } = require("../services/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "groupomania",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;

//* SCHOOL PROJECT
// //* IMPORT MULTER
// const multer = require('multer')

// //* TYPES D'IMAGES ACCEPTE
// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpeg',
//   'image/png': 'png'
// }

// //* STOCKAGE DE L'IMAGE
// const storage = multer.diskStorage ({
//   destination: (req, file, callback) => {
//     callback(null, 'images')
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_')
//     const extension = MIME_TYPES[file.mimetype]
//     callback(null, name + Date.now() + '.' + extension)
//   }
// })

// //* EXPORT DE LA CONFIGURATION DE MULTER
// module.exports = multer({ storage }).single('image')
