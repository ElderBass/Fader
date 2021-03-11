const router = require("express").Router();
const artistController = require("../../controllers/artistController");

router.route("/").get(artistController.findAll);

router.route("/signup").post(artistController.addUser);


//.put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
