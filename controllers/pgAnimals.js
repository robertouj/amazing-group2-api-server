const db = require("../dbinit");
const ObjectID = require("bson").ObjectID;

const getAnimals = async (req, res, next) => {
  try {
    const animalQuery = await db.query("SELECT * FROM animals;");
    const animals = [...animalQuery.rows];
    const thumbnailsQuery = await db.query("SELECT * FROM thumbnails");
    const thumbnails = [...thumbnailsQuery.rows];

    const newAnimals = animals.map((animal) => ({
      id: animal.id,
      name: animal.name,
      latinName: animal.latinname,
      idVideo: animal.idvideo,
      img: animal.img,
      thumbnails: thumbnails.filter(
        (thumbnail) => thumbnail.animal_id === animal.id
      ),
    }));

    res.json(newAnimals);
  } catch (err) {
    next(err);
  }
};

const getAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const animalQuery = await db.query("SELECT * FROM animals WHERE id=$1;", [
      id,
    ]);
    const animal = animalQuery.rows[0];
    const thumbnailsQuery = await db.query(
      "SELECT * FROM thumbnails WHERE animal_id=$1;",
      [id]
    );

    const newAnimal = {
      id: animal.id,
      name: animal.name,
      latinName: animal.latinname,
      idVideo: animal.idvideo,
      img: animal.img,
      thumbnails: [...thumbnailsQuery.rows],
    };

    res.json(newAnimal);
  } catch (err) {
    next(err);
  }
};

/* $ curl -d '{"name": "cat", "latinName": "Felis catus", "idVideo": "ylZYirYSiFA", "img" : "//en.wikipedia.org/wiki/Cat#/media/File:Cat_poster_1.jpg", "url" : "//static.wikia.nocoo
kie.net/jadensadventures/images/3/3c/Garfield_1924-480x360.jpg/revision/latest?cb=20121110075001"  }' -H "Content-Type: application/json" -X POST http://localhost:9000/animals   
alsnimals:5000/users
*/


const createAnimal = async (req, res, next) => {
  try {
    const id = new ObjectID();
    const { name, latinName, idVideo, img, url } = req.body;

    const animalQuery = await db.query(
      "INSERT INTO animals (id, name, latinName, idVideo, img) VALUES ($1, $2, $3, $4, $5);",
      [id, name, latinName, idVideo, img]
    );

    /* const animalQuery = await db.query(
      "INSERT INTO animals (id, name, latinName, idVideo, img) VALUES ($1, $2, $3, $4, $5);",
      [id, name, latinName, idVideo, img]
    ); */
    
    const thumbnailsQuery = await db.query("INSERT INTO thumbnails (url, animal_id) VALUES ($1, $2);",
      [url, id]
    );
    const createdAnimal = [ animalQuery, thumbnailsQuery];

    res.status(201).json(createdAnimal) 
      
  } catch (err) {
    next(err);
  }
};

const updateAnimal = (req, res, next) => {
  const { id } = req.params;
  const { name, latinName, idVideo, img } = req.body;

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
