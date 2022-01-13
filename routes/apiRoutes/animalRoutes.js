// Required Packages
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../../lib/animals");
const { animals } = require("../../data/animals");
const router = require("express").Router();

// Start Get Routes
router.get("/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// This is the GET route that sends the html page to the client
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

router.get("/animals", (req, res) => {
  res.sendFile(path, join(__dirname, "./public/animals.html"));
});

router.get("/zookeepers", (req, res) => {
  res.sendFile(path, join(__dirname, "./public/zookeepers.html"));
});

// This is a wildcard route, to catch any other requests the client makes
// The "*" should always be the last GET route, so it doesn't take
// precedence over the other GET routes.
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// End Get Routes

// Start POST Route
router.post("/animals", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});
// End POST Route

// Bottom of File
module.exports = router;
