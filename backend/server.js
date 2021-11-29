const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const multer = require('multer')
const upload = multer({
  dest: '../frontend/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/adoption', {
  useNewUrlParser: true
});

const animalSchema = new mongoose.Schema({
  name: String,
  path: String,
  species: String,
  description: String
});

const Animal = mongoose.model('Animal', animalSchema);


app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/animals', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    path: req.body.path,
    species: req.body.species,
    description: req.body.description
  });
  try {
    await animal.save();
    res.send(animal);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/animals', async (req, res) => {
  try {
    let animals = await animal.find();
    res.send(animals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/animals/:id', async (req, res) => {
  try {
    let animal = await Animal.findOne({
      _id: req.params.id
    });
    animal.name = req.body.name;
    animal.species = req.body.species;
    animal.description = req.body.description;
    animal.save(animal);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/animals/:id', async (req, res) => {
  try {
    await Animal.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));