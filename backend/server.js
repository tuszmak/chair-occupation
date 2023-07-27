const express = require("express");
let mysql = require('mysql2');
const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asd13512',
  insecureAuth: true
})
const port = 3000;

app.post("/", (req, res) => {
  res.send("Hello world!");
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})