const express = require("express");
require("../database");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

//para aceitar req json;
app.use(express.json());
app.use(helmet());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(cors());

app.use(require("./routers"));

app.listen(3000, () => {
  console.log("app running");
});
