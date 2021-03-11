const router = require("express").Router();
const artistController = require("../../controllers/artistController");

router.route("/")
  .get(artistController.findAll)
  //.post(artistController.createUser);

router
  .route("/:genre")
  .get(artistController.findByGenre)
  //.put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
