const express = require("express");
const app = express();
const port = 3000;

app.use(express.text());

app.get("/", (req, res) => {
  res.send(process.env.MSG);
});

app.post("/", (req, res) => {
  console.log("Received body:", req.body); // This should log "oi"
  res.send("Received: " + req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
