const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
require("./services/database");

//* IMPORT ROUTE
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const uploadRoute = require("./routes/upload.routes");

//* APP
const app = express();
const port = process.env.PORT || 8080;

//* MIDDLEWARE
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://groupomania-vm.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    const cleanOrigin = origin?.replace(/\/$/, "");
    if (!origin || allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.error("⛔ CORS bloqué :", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(express.json());

//* IMAGES LOCAL
app.use(express.static("public"));
app.use("/public/images", express.static("public/images"));

//* ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoute);

//* LANCEMENT SUR LE PORT
app.listen(port, () => console.log("Listening on port : " + port));
