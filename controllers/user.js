const multer = require("multer");
const { uuid } = require("uuidv4");
const uniqid = require("uniqid");
//
const Image = require("../models/Image");

const id = uniqid();

// multer
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    // const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const fileName = file.originalname.toLowerCase();
    cb(null, id + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// @desc      add image
// @route     POST /api/v1/user/addimage
// @access    public
exports.addImage = async (req, res) => {
  try {
    const singleImage = upload.single("image");
    singleImage(req, res, async function (err) {
      const url = req.protocol + "://" + req.get("host");
      const user = new Image({
        name: req?.file?.originalname,
        // image: req?.file?.filename,
        image: url + "/images/" + req?.file?.filename,
      });
      // const response = await Image.create({
      //   name: req.body.name,
      //   image: url + "/public/" + req?.file?.filename,
      // });
      // console.log("req body", req.body);
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
              _id: result._id,
              profileImg: result.profileImg,
            },
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              error: err,
            });
        });
    });
  } catch (err) {
    console.log("all error", err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      get image
// @route     POST /api/v1/user/getimage
// @access    public
exports.getImage = async (req, res) => {
  try {
    const { user } = req.query;
    const response = await Image.find();
    res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};
