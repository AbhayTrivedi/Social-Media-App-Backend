const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
   require("dotenv").config({ path: "./config/config.env" });
}

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
   origin: "https://social-media-101.netlify.app"
}));

// Importing Routes
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

// using Routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports = app;
