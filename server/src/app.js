const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


app.use(express.json());


app.use(cors());
app.use(morgan("dev"));

const routes = require("./routes");
app.use(routes);

app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

module.exports = app;
