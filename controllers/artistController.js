const config = require("../config/dbconfig");
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  findAll: function (req, res) {
    db.Artist.find(req.query)
      .sort({ last_name: -1 })
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  getOtherArtists: function (req, res) {
    db.Artist.find({ _id: { $nin: req.params.id } })
      .sort({ last_name: -1 })
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  addUser: function ({ body }, res) {
    db.Artist.create(body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  signin: (req, res) => {
    db.Artist.findOne({
      email: req.body.email,
    }).exec(async (err, user) => {
      try {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = await user.validatePassword(req.body.password);

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
          mixes: user.mixes,
          accessToken: token,
        });
      } catch (error) {
        res.json({
          error: error,
          myMessage: "Incorrect Password. Please Try Again."
        });
      }
    });
  },

  getOneArtist: function (req, res) {
    db.Artist.findById({
      _id: req.params.id,
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  addConnection: function (req, res) {
    db.Artist.findOneAndUpdate(
      { _id: req.body.user },
      { $push: { connections: req.body.target, following: req.body.targetId } },
      { new: true }
    )

      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  leaveMessage: function (req, res) {
    db.Artist.findOneAndUpdate(
      { _id: req.body.artistId },
      { $push: { messages: req.body.message } },
      { new: true }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  addAbout: function (req, res) {
    db.Artist.findOneAndUpdate(
      { _id: req.body.id },
      { about: req.body.about },
      { new: true }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  changePicture: function (req, res) {
    db.Artist.findOneAndUpdate(
      { _id: req.body.id },
      { image: req.body.image },
      { new: true }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  //need to change this to Mixes schema
  addMix: function (req, res) {
    db.Mixes.create(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  getAllMixes: function (req, res) {
    db.Mixes.find({ userId: req.params.id }).then((result) => {
      res.json(result);
    });
  },

  getOneMix: function (req, res) {
    db.Mixes.findOne({ _id: req.params.id }).then((result) => {
      res.json(result);
    });
  },
};
