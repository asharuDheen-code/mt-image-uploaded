const router = require("express").Router();
const { addImage, getImage } = require("../controllers/user");

router.post("/addimage", addImage);
router.get("/getimage", getImage);

module.exports = router;
