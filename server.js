const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const cart = require("./routes/api/cart");
const order = require("./routes/api/order");
const products = require("./routes/api/productsData");
const doctors = require("./routes/api/doctors");
const postRouter = require("./routes/post-router");
const charge = require("./routes/api/charge");
const amount = require("./routes/api/amount");
const commentRouter = require("./routes/comment-router");
const globalErrorHandler = require("./src/controller/errorController");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const app = express();

app.use(cors());
app.use(cors({ credentials: true }));
app.options("*", cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// To read cookies
app.use(cookieParser());
// To prevent NoSQL injection and xss
app.use(mongoSanitize());
app.use(xss());
// DB Config
// const db = require("./config/keys").mongoURI;
const db = process.env.ATLAS_URI;
// console.log(db);
// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use("/api/users", users);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/productsData", products);
app.use("/api/doctors", doctors);

app.use("/api/charge", charge);
app.use("/api/amount", amount);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/build", "index.html"));
    // res.json({
    //   hello: "hello",
    // });
  });
}
// For the Routes which are not implemented Yet
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
// Global Error Middleware
app.use(globalErrorHandler);
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server: Up and running on port ${port} !`));
