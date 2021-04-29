const express = require("express");

const {
  getAnimal,
  getAnimals,
  createAnimal,
  deleteAnimal,
  updateAnimal
} = require('../controllers/pgAnimals.js')

const api = express.Router();

api
  .route("/")
  .get(getAnimals)
  .post(createAnimal)

api
  .route('/:id')
  .get(getAnimal)
  .delete(deleteAnimal)
  .put(updateAnimal);

module.exports = api;
