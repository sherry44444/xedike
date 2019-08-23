const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/api/user/index");
const tripRouter = require("./routes/api/trip/index");
mongoose
  .connect("mongodb://localhost:27017/fs05-xedike", { useNewUrlParser: true })
  .then(() => console.log("succesful"))
  .catch(err => console.log(err));

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));

//react form bi mat xxx-urlrecoded nen data no gui di o dang json chu ko bi ma hoa nua nen khi post data dang raw (json) (tu frontedn dang dung react) thi phai dung middleware o duoi
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);
// app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
