const express = require("express");
const app = express();
const port = 3000;

app.post("/", (req, res) => {
  res.send("Hello world!");
});
