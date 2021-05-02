const db = require("../dbinit");

const getAnimals = async (req, res, next) => {
  
  const animalQuery = await db.query("SELECT * FROM animals;");

  const animals = [...animalQuery.rows];
      
  const thumbnailsQuery = await db.query("SELECT * FROM thumbnails")    
  
  const thumbnails = [...thumbnailsQuery.rows];
  
  const newAnimals = animals.map(animal => ({
    id: animal.id,      
    name: animal.name,
    latinName: animal.latinName,
    idVideo: animal.idVideo,
    img: animal.img,
    thumbnails: thumbnails.filter(thumbnail => thumbnail.animal_id === animal.id)
  }))
 
  res.json(newAnimals);
  //console.log(newAnimals[1]);

  /* db.query("SELECT * FROM animals;")
    .then((data) => {
      const animals = [];
      const thumbnails = [];
      let newAnimals = [];
      
      animals.push(...data.rows);

      db.query("SELECT * FROM thumbnails;")
        .then((data) => thumbnails.push(...data.rows))
        .catch((err) => next(err));

      newAnimals = animals.map(animal => ({
        id: animal.id,      
        name: animal.name,
        latinName: animal.latinName,
        idVideo: animal.idVideo,
        img: animal.img,
        thumbnails: thumbnails.filter(thumbnail => thumbnail.animal_id === animal.id)
      })); 
      
      //console.log(newAnimals);
    })
    .catch((err) => next(err));*/
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
