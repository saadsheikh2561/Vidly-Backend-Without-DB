const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Joi = require("joi");
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
let genres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Thriller",
  },
  {
    id: 3,
    name: "Romantic",
  },
];

app.get("/api/genres/:name", (req, res) => {
  const genre = genres.find((g) => req.params.name == g.name);
  if (!genre)
    return res.status(404).send("Genere with this Name does not exist");
  res.send(genre);
});
app.post("/api/genres/post", (req, res) => {
  const alreadyExist = genres.find((g) => req.body.name == g.name);
  if (alreadyExist) return res.status(404).send("Genere Already Exist");
  const { error } = validateGeneres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});
app.put("/api/genres/update/:update", (req, res) => {
  const genre = genres.find((g) => req.params.update == g.name);
  if (!genre)
    return res.status(404).send("Genere with this Name does not exist");
  const { error } = validateGeneres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const updatedgnere = req.body.name;
  genre.name = updatedgnere;
  res.send(genre);
});
app.delete("/api/genres/delete/:name", (req, res) => {
  const genre = genres.find((g) => req.params.name == g.name);
  if (!genre)
    return res.status(404).send("Genere with this Name does not exist");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
  console.log(genres);
});
app.listen(port, () => {
  console.log(`App listening on Port ${port}`);
});
function validateGeneres(genres) {
  const schema = {
    name: Joi.string().max(15).min(3).required(),
  };
  return Joi.validate(genres, schema);
}
