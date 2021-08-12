const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/router.js");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api", router);

const PORT = process.env.PORT || 8000;

const URL =
  "mongodb+srv://pradeep:passuio@cluster0.i2yya.mongodb.net/STACK?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI || URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}......`);
    });
    console.log("Mongodb is connected");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});
