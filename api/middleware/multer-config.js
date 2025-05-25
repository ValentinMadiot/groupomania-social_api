//* CLOUDINARY CONFIGUE
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../services/cloudinary");

// Configuration du storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "groupomania-social",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  }),
});

// Filtrage des types MIME
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload.single("file");

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
