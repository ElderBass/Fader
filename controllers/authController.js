const config = require("../config/dbconfig");
const db = require("../models");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const signin = (req, res) => {
  console.log("inside signin function");
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
      console.log("user inside sigin function = ", user);
      let passwordIsValid = bcrypt.compareSync(
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

      res.status(200).send({
        id: user._id,
        stageName: user.stageName,
        email: user.email,
        accessToken: token
      });
    });
};

const validateSignin = {
  signin
}
module.exports = validateSignin;