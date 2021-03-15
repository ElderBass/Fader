const config = require("../config/dbconfig");
const db = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  findAll: function (req, res) {
    console.log("inside find all");
    db.Artist.find(req.query)
      .sort({ last_name: -1 })
      .then((dbModel) => {
        console.log("db model in find all = ", dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  getOtherArtists: function (req, res) {
    console.log("inside find others", req.params);
    db.Artist.find({ _id: { $nin: req.params.id } })
      .sort({ last_name: -1 })
      .then((dbModel) => {
        console.log("db model in find others = ", dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  addUser: function ({ body }, res) {
    console.log("req.body inside addUser route = ", body);
    db.Artist.create(body)
      .then((result) => {
        console.log("result in addUser = ", result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  signin: (req, res) => {
    db.Artist.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = user.validatePassword(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.json({
        _id: user._id,
        stageName: user.stageName,
        firstName: user.firstName,
        lastName: user.lastName,
        genre: user.genre,
        city: user.city,
        email: user.email,
        image: user.image,
        connections: user.connections,
        messages: user.messages,
        about: user.about,
        following: user.following,
        accessToken: token,
      });
    });
  },

  getOneArtist: function (req, res) {
    console.log("req params in get artist profile =", req.params.id);
    db.Artist.findById({
      _id: req.params.id,
    })
      .then((result) => {
        console.log("result in get artist profile backend = ", result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  addConnection: function (req, res) {
    // console.log("req.header if it exists = ", req.header)
    console.log("req id inside add connection backend = ", req.body);
    db.Artist.findOneAndUpdate(
      { _id: req.body.user },
      { $push: { connections: req.body.target, following: req.body.targetId } },
      { new: true }
    )

      .then((result) => {
        console.log("result inside add connection", result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  leaveMessage: function (req, res) {
    console.log("req body inside leaveMessage = ", req.body);
    db.Artist.findOneAndUpdate(
      { _id: req.body.artistId },
      { $push: { messages: req.body.message } },
      { new: true }
    )
      .then((result) => {
        console.log("result inside leave message", result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  addAbout: function (req, res) {
    console.log("req body inside add about = ", req.body);
    db.Artist.findOneAndUpdate(
      { _id: req.body.id },
      { about: req.body.about },
      { new: true }
    )
      .then((result) => {
        console.log("result inside of add about = ", result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },
};
