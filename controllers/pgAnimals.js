const db = require("../dbinit");

const getAnimals = (req, res, next) => {
  console.log("getAnimals");
  db.query("SELECT * FROM animals;")
    .then((data) => res.json(data.rows))
    .catch((err) => next(err));
};


const getAnimal = (req, res, next) => {
  const { id } = req.params;

  db.query("SELECT * FROM animals WHERE id=$1;", [id])
    .then((data) => res.json(data.rows[0]))
    .catch((err) => next(err));
};

const createAnimal = (req, res, next) => {
  const { name, latinName, idVideo, img } = req.body;

  db.query(
    "INSERT INTO animals (name, latinName, idVideo, img) values($1, $2, $3, $4)",
    [name, latinName, idVideo, img]
  )
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};

const updateAnimal = (req, res, next) => {
  const { id } = req.params;
  const { name, latinname, idVideo, img } = req.body;

  db.query(
    "UPDATE animals SET name=$1, latinName=$2, idVideo=$3, img=$4 WHERE id=$5;",
    [name, latinName, idVideo, id]
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

const deleteAnimal = (req, res, next) => {
  const { id } = req.params;

  db.query("DELETE FROM animals WHERE id=$1", [id])
    .then((data) => res.json(data.rows))
    .catch((err) => next(err));
};

module.exports = {
  getAnimal,
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};

/*
animals:

  id
  name
  latinName
  idVideo
  img


thumbnails: 
  id
  id_animal
  url
  title

*/
