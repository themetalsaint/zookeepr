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
// End Parsing function

// Start filterQuery function
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    personalityTraitsArray.forEach((trait) => {
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}
// End FilterQuery Function

// Start findById function
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}
// End findById function

// Start createNewAnimal Function
function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, "./data/animals.json"),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}
// End createNewAnimal Function

// Start Get Routes
app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
// End Get Routes

// Start POST Route
app.post("/api/animals", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // add animal to json file and animals array in this function
  const animal = createNewAnimal(req.body, animals);

  res.json(animal);
});
// End POST Route

// Bottom of serverJS
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
