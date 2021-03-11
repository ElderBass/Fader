const router = require("express").Router();
const artistController = require("../../controllers/artistController");

// Matches with "/api/books"
router.route("/")
  .get(artistController.findAll)
  //.post(artistController.createUser);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
