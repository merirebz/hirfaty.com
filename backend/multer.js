const multer = require("multer");
const path = require("path");
const SharpMulter = require("sharp-multer");

const storage = SharpMulter({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  imageOptions: {
    fileFormat: "png",
    quality: 70,
    // resize: { width: 250, height: 250 },
  },
});

exports.upload = multer({ storage: storage });
