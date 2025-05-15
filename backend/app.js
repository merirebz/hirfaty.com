const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const AllRoutes = require("./routes.js");
require("dotenv").config();

app.use(
  compression({
    filter: (req, res) => {
      if (req.headers["no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

/*app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],

  })
);*/
// Middleware pour gérer les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use("/api", express.static(path.join(__dirname, "./uploads")));


app.use("/api/hello-world", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


app.use("/api/v2", AllRoutes);
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
