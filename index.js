const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const redisClient = require("./Config/redis.config");
const helmet = require("helmet");

redisClient.on("ready", () => {
  console.log("connected to redis cache");
});

server.setTimeout(300000);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("X-Frame-Options", "DENY");
  next();
});

// Add X-XSS-Protection middleware using helmet
app.use(helmet.xssFilter());

// Add Cache-control: no-store and Pragma: no-cache headers
app.use(function (req, res, next) {
  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");
  next();
});

app.use("/form", require("./Routes/form.routes"));
app.use("/surveyor", require("./Routes/auth.routes"));
app.use("/tracking", require("./Routes/surveyor.routes"));

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
    console.log("connected to mongodb");
  }
);
// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/", (req, res, next) => {
  res.json({ message: "Hello Form App" });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`server is running on port number:${PORT}`);
});

// app.get("/", (req, res) => res.send("Hello World!"));

// export 'app'
module.exports = app;
