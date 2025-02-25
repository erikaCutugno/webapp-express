const express = require("express");
const moviesControllers = require("../controllers/moviesControllers");

const router = express.Router();

//index
router.get("/", moviesControllers.index);
//show
router.get("/:id", moviesControllers.show);
//destroy
// router.delete("/:id", moviesControllers.destroy);

module.exports = router;
