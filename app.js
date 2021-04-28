const express = require('express');
const errorHandler = require('./middlewares/error');
require("dotenv").config();

const app = express();


app.get('/', (req, res) => res.send('hello oli and roby'));
app.use(errorHandler);

app.listen(9000, () => console.log("listening to port 9000"));

console.log(process.env.PGUSER);