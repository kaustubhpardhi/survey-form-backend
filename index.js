// install express with `npm install express`
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/form", require("./Routes/form.routes"));
const uri =
  "mongodb://kaustubh:kaustubh786@ac-5xhog3b-shard-00-00.1ct2btc.mongodb.net:27017,ac-5xhog3b-shard-00-01.1ct2btc.mongodb.net:27017,ac-5xhog3b-shard-00-02.1ct2btc.mongodb.net:27017/?ssl=true&replicaSet=atlas-ove0jr-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);
// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/", (req, res, next) => {
  res.json({ message: "Hello Form App" });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is Runnig at Port Number:${PORT}`);
});

// app.get("/", (req, res) => res.send("Hello World!"));

// export 'app'
module.exports = app;
