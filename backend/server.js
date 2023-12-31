const express = require("express");
let mysql = require("mysql2");
const app = express();
const cors = require("cors");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asd13512",
  insecureAuth: true,
  database: "cinema",
});
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  connection.query(
    "select * from seats",
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});
app.post("/", (req, res) => {
  let a = req.body;
  let isAllSeatsAvailable = true;
  req.body.forEach((seatNum) => {
    connection.query(
      `select * from seats where seat_number = ${seatNum}`,
      (err, rows, fields) => {
        if (err) throw err;
        if (rows[0].status_id !== 1) {
          isAllSeatsAvailable = false;
        }
      }
    );
  });
  if (isAllSeatsAvailable) {
    req.body.forEach((seatNum) => {
      connection.query(
        `update seats set status_id = 2 where seat_number = ${seatNum}`,
        (err, rows, fields) => {
          if (err) throw err;
        }
      );
    });
    res.status(202)
    res.write("Cool!");
  } 
  else{
    res.status(410)
    res.write("Not cool");
  }
  res.end()
});
app.post("/email", (req, res) => {
  const {seats, email} = req.body;
  let isSomeoneFaster = false;
  seats.forEach((seatNum) => {
    connection.query(
      `select * from seats where seat_number = ${seatNum}`,
      (err, rows, fields) => {
        if (err) throw err;
        if (rows[0].status_id === 3) {
          isAllSeatsAvailable = true;
        }
      }
    );
  });
  if (isSomeoneFaster) {
    res.status = 410;
    res.end("The seats have been taken by someone else :c");
  } else {
    seats.forEach((seatNum) => {
      connection.query(
        `update seats set status_id = 3 where seat_number = ${seatNum}`,
        (err, rows, fields) => {
          if (err) throw err;
        }
      );
    });
    res.status = 200;
    console.log(`An email has been sent to ${email}`);
  }
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
