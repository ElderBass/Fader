const express = require("express");
const app = express();

const artistController = require("../../controllers/artistController");

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.route("/").get(artistController.findAll);

app.route("/signup").post(artistController.addUser);

app.route("/:id").get(artistController.getArtistProfile);

app.route("/login").post(artistController.signin);

//.put(booksController.update)
//   .delete(booksController.remove);

module.exports = app;
