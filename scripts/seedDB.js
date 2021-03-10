const mongoose = require("mongoose");
const db = require("../models");

// const elderbass = require("../assets/images/elderbass.png");
// const dirty = require("../assets/images/dirtymckenzie.png");
// const slimer = require("../assets/images/slimer.png");
// const halfspoon = require("../assets/images/halfspoon.png");
// const record = require("../assets/images/record.png");


// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/fader"
);

const artistSeed = [
  {
    stage_name: "Elder Bass",
    first_name: "Seth",
    last_name: "Zygarlicke",
    image: "https://quilava-project2.herokuapp.com/assets/elderbass.png",
    genre: "Deep House",
    city: "Minneapolis",
    email: "zygster11@gmail.com",
    password: "root19",
  },
  {
    stage_name: "Dirty McKenzie",
    first_name: "Dory",
    last_name: "Kahale",
    image: "https://quilava-project2.herokuapp.com/assets/dirtymckenzie.png",
    genre: "Roller Disco",
    city: "Richfield",
    email: "dory@mail.com",
    password: "root2",
  },
  {
    stage_name: "Slimer",
    first_name: "Jack",
    last_name: "Battle",
    image: "https://quilava-project2.herokuapp.com/assets/slimer.png",
    genre: "Psychedelic Rock",
    city: "Minneapolis",
    email: "jack@gmail.com",
    password: "root3",
  },
  {
    stage_name: "Half Spoon",
    first_name: "Carson",
    last_name: "Scholberg",
    image: "https://quilava-project2.herokuapp.com/assets/halfspoon.png",
    genre: "Drum and Bass",
    city: "Minneapolis",
    email: "carson@gmail.com",
    password: "root4",
  },
  {
    stage_name: "Heyer Hat",
    first_name: "Will",
    last_name: "Heyer",
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
