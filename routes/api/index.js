const router = require("express").Router();
const artistRoutes = require("./artist");

// Book routes
router.use("/artists", artistRoutes);

module.exports = router;
