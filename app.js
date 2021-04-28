import express from "express";

const app = express();

app.get('/', (req, res) => res.send('hello oli and roby'));

app.listen(9000, () => console.log("listening to port 9000"));