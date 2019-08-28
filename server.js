const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/api/user/index");
const tripRouter = require("./routes/api/trip/index");

// const mongoUri =
//   process.env.NODE_ENV === "dev"
//     ? process.env.MONGO_URI_DEV
//     : process.env.MONGO_URI_PROD;

mongoose
  .connect("mongodb://localhost:27017/xedike", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("succesful"))
  .catch(err => console.log(err));

const app = express();

app.use("/", express.static("public"));

//middleware
app.use(express.urlencoded({ extended: true }));

//react form bi mat xxx-urlrecoded nen data no gui di o dang json chu ko bi ma hoa nua nen khi post data dang raw (json) (tu frontedn dang dung react) thi phai dung middleware o duoi
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);
// app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
