// Necessary Packages
const express = require("express");
const { animals } = require("./data/animals");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// Start Parsing function
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// End Parsing function





// Bottom of serverJS
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
