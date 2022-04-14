const express = require("express");
const registerRoute = require("./routes/routes");
const login = require("./routes/routes");
const protected = require("./routes/routes");

const connectDB = require("./database/mondbConnection");

const cors = require("cors");

const PORT = 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(registerRoute);
app.use(login);
app.use(protected);

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}...`);
});
