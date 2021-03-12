const config = require("../config/dbconfig");
const db = require("../models");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  findAll: function(req, res) {
    console.log("inside find all")
    db.Artist
      .find(req.query)
      .sort({ last_name: -1 })
      .then(dbModel => {
        console.log("db model in find all = ", dbModel)
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  addUser: function ({body}, res) {
    console.log("req.body inside addUser route = ", body);
    db.Artist
      .create(body)
      .then(result => {
        console.log("result in addUser = ", result)
        res.json(result);
      })
      .catch(err => res.status(422).json(err));
  },

  signin: (req, res) => {
    db.Artist.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
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
            message: "Invalid Password!"
          });
        }
  
        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        
        res.json({
          id: user._id,
          stageName: user.stageName,
          firstName: user.firstName,
          lastName: user.lastName,
          genre: user.genre,
          city: user.city,
          email: user.email,
          accessToken: token
        });
      });
  }
}