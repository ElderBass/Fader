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
    image: "https://fader-project3.herokuapp.com/static/media/artistcardknob.883bb35f.png",
    genre: "Deep House",
    city: "Minneapolis",
    email: "zygster11@gmail.com",
    password: "root12",
    connections: [],
    messages: [],
    about: "",
  },
  {
    stageName: "Dirty McKenzie",
    firstName: "Dory",
    lastName: "Kahale",
    image: "https://fader-project3.herokuapp.com/static/media/artistcardknob.883bb35f.png",
    genre: "Roller Disco",
    city: "Richfield",
    email: "dory@mail.com",
    password: "root2",
    connections: [],
    messages: [],
    about: "",
  },
  {
    stageName: "Slimer",
    firstName: "Jack",
    lastName: "Battle",
    image: "https://fader-project3.herokuapp.com/static/media/artistcardknob.883bb35f.png",
    genre: "Psychedelic Rock",
    city: "Minneapolis",
    email: "jack@gmail.com",
    password: "root3",
    connections: [],
    messages: [],
    about: "",
  },
  {
    stageName: "Half Spoon",
    firstName: "Carson",
    lastName: "Scholberg",
    image: "https://fader-project3.herokuapp.com/static/media/artistcardknob.883bb35f.png",
    genre: "Drum and Bass",
    city: "Minneapolis",
    email: "carson@gmail.com",
    password: "root4",
    connections: [],
    messages: [],
    about: "",
  },
  {
    stageName: "Heyer Hat",
    firstName: "Will",
    lastName: "Heyer",
    image: "https://fader-project3.herokuapp.com/static/media/artistcardknob.883bb35f.png",
    genre: "Indie Rock",
    city: "Minneapolis",
    email: "will@gmail.com",
    connections: [],
    messages: [],
    about: "",
    password: "root5",
  }  
];

db.Artist
  .remove({})
  .then(() => db.Artist.collection.insertMany(artistSeed))
  .then(data => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
