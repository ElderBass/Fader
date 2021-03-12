const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/fader"
);

const artistSeed = [
  {
    stageName: "Elder Bass",
    firstName: "Seth",
    lastName: "Zygarlicke",
    image: "https://quilava-project2.herokuapp.com/assets/elderbass.png",
    genre: "Deep House",
    city: "Minneapolis",
    email: "zygster11@gmail.com",
    password: "root19",
  },
  {
    stageName: "Dirty McKenzie",
    firstName: "Dory",
    lastName: "Kahale",
    image: "https://quilava-project2.herokuapp.com/assets/dirtymckenzie.png",
    genre: "Roller Disco",
    city: "Richfield",
    email: "dory@mail.com",
    password: "root2",
  },
  {
    stageName: "Slimer",
    firstName: "Jack",
    lastName: "Battle",
    image: "https://quilava-project2.herokuapp.com/assets/slimer.png",
    genre: "Psychedelic Rock",
    city: "Minneapolis",
    email: "jack@gmail.com",
    password: "root3",
  },
  {
    stageName: "Half Spoon",
    firstName: "Carson",
    lastName: "Scholberg",
    image: "https://quilava-project2.herokuapp.com/assets/halfspoon.png",
    genre: "Drum and Bass",
    city: "Minneapolis",
    email: "carson@gmail.com",
    password: "root4",
  },
  {
    stageName: "Heyer Hat",
    firstName: "Will",
    lastName: "Heyer",
    image: "https://media.npr.org/assets/img/2020/02/12/1901_matt-sav_kevin-parker_1-1-5706c0e5ae33d1636ad25566656fd99b15158307-s800-c85.jpg",
    genre: "Indie Rock",
    city: "Minneapolis",
    email: "will@gmail.com",
    password: "root5",
  }  
];

db.Artist
  .remove({})
  .then(() => db.Artist.collection.insertMany(artistSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
