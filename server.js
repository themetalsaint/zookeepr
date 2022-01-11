const express = require("express");
const app = express();
const { animals } = require("./data/animals.json");

app.get("/api/animals", (req, res) => {
  res.json(animals);
});

//end of app.js
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
