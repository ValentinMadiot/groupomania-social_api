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
const port = process.env.PORT || 4200;

//* MIDDLEWARE
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
const allowedOrigins = [
  "http://localhost:4200",
  "https://groupomania-vm.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//* IMAGES LOCAL
app.use(express.static("public"));
app.use("/images", express.static("images"));

//* ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoute);

//* LANCEMENT SUR LE PORT
app.listen(port, () => console.log("Listening on port : " + port));
