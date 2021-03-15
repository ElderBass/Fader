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
    image: "../client/src/assets/images/artistcardknob.png",
    genre: "Deep House",
    city: "Minneapolis",
    email: "zygster11@gmail.com",
    password: "root19",
    connections: [],
    messages: [],
    about: "",
  },
  {
    stageName: "Dirty McKenzie",
    firstName: "Dory",
    lastName: "Kahale",
    image: "../client/src/assets/images/artistcardknob.png",
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
    image: "../client/src/assets/images/artistcardknob.png",
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
    image: "../client/src/assets/images/artistcardknob.png",
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
    image: "../client/src/assets/images/artistcardknob.png",
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
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
