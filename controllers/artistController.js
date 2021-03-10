const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Artist
      .find(req.query)
      .sort({ last_name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}