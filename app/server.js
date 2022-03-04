require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const config = require("./config");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const taskRouter = require("./routes/task");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
mongoose.connect(config.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.on("connected", () => {
  console.log("Succesfully connected to mongoDB");
});

app.use(passport.initialize());
require("./middlewares/passport")(passport);

app.use("/api/user", userRouter);
app.use("/api/list", listRouter);
app.use("/api/task", taskRouter);
app.get("/", (req, res) => {
  res.send("Welcome to todo api");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
