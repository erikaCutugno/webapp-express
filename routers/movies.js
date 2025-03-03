const express = require("express");
const multer = require("multer");
const moviesControllers = require("../controllers/moviesControllers");
const router = express.Router();

//rinomino l'immagine
const storage = multer.diskStorage({
  destination: "public/movies_cover",
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });
//index
router.get("/", moviesControllers.index);
//show
router.get("/:id", moviesControllers.show);
//post review
router.post("/:id/reviews", moviesControllers.storeReview);
//post review
router.post("/", upload.single("image"), moviesControllers.store);
//destroy
router.delete("/:id", moviesControllers.destroy);

module.exports = router;
