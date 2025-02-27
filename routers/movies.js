const express = require("express");
const moviesControllers = require("../controllers/moviesControllers");

const router = express.Router();

//index
router.get("/", moviesControllers.index);
//show
router.get("/:id", moviesControllers.show);
//post
router.post("/:id/reviews", moviesControllers.storeReview);
//destroy
// router.delete("/:id", moviesControllers.destroy);

module.exports = router;
