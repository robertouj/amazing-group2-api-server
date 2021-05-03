require("dotenv").config();

const cors = require('cors');
const express = require("express");
const errorHandler = require("./middlewares/error");
const animals = require('./api/Animals');
const app = express();


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("hello oli and roby"));
app.use('/animals', animals);
app.use(errorHandler);



app.listen(9000, () => console.log("listening to port 9000"));


