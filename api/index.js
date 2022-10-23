const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
require("./services/database");
const multer = require("multer");
const cors = require("cors");

const path = require("path");

//* IMPORT ROUTE
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

//* APP
const app = express();
const port = process.env.PORT || 4200;

//* MIDDLEWARE
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(cors());
app.use(express.json());
//* SAVE IMAGES LOCAL
app.use(express.static("public"));
app.use("/images", express.static("images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log({ error: error.message });
  }
});

//* ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//* LANCEMENT SUR LE PORT
app.listen(port, () => console.log("Listening on port : " + port));