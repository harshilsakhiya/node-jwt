const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const formRoute = require("./routes/formRoute");
const authRoute = require("./routes/userRoute");

dotenv.config();

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/form", formRoute);
app.use("/api/auth", authRoute);

app.use("*", (req, res) =>
  res.status(404).json({ message: "No such path found", success: false })
);

app.use((err, req, res) => {
  const errMessage = err?.message || "Something went wrong!";
  console.log({ errMessage });
  res.status(500).json({ error: errMessage });
});

console.log(process.env.PORT);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
    app.listen(process.env.PORT, () => {
      console.log(`server is run on ${process.env.PORT} port`);
    });
  })
  .catch((err) => {
    console.log(55, err.message);
  });
