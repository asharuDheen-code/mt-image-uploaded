const router = require("express").Router();
const { addImage, getImage } = require("../controllers/user");

// const upload = multer({ dest: "uploads/" });
// const { protect, authorize } = require("../middleware/auth");

// router.post("/create_user", protect, authorize("customer"), createUser);
// router.post("/create_user", createUser);
// router.post("/add_user", addUser);

// router.get("/get_customers", getCustomers);
// router.get("/get_all_customers", getAllCustomers);
// router.delete("/delete_customer", deleteCustomer);

router.post("/addimage", addImage);
router.get("/getimage", getImage);

module.exports = router;
