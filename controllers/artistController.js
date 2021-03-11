const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Artist
      .find(req.query)
      .sort({ last_name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByGenre: function(req, res) {
    console.log("HEEEEEYYYYYYYYY")
    console.log("req.params in findByGenre = ", req.params)
    db.Artist
      .find({genre: req.params.genre})
      .then(response => {
        console.log("response in find by genre = ", response)
        res.json(response)
      })
      .catch(err => res.status(422).json(err));
  }

}