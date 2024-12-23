const express = require("express");
const mysql = require("mysql2");

const MESSAGE_TO_SEND = process.env.MSG;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  host: DB_HOST,
  user: "admin",
  password: DB_PASSWORD,
  database: "mydb",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database!");
    connection.release(); // Release the connection back to the pool
  }
});

const app = express();
const port = 3000;

app.use(express.text());
app.use(express.json());

app.get("/messages", (req, res) => {
  pool.query("SELECT * FROM messages", (err, results) => {
    return err
      ? res.status(500).send("Database query failed.")
      : res.status(200).json(results);
  });
});

app.post("/messages", (req, res) => {
  pool.query(
    `insert into messages (value) values ("${req.body.value}");`,
    (err, results) => {
      return err
        ? res.status(500).send("Database query failed.")
        : res.status(201).send();
    }
  );
});

app.get("/", (req, res) => {
  res.send(MESSAGE_TO_SEND);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
