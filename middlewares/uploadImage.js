const multer = require("multer");

const uploadImage = type => {
  // type = "avatar" / "car"
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `./uploads/${type}s`);
    },
    filename: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

  return upload.single(type);
};

module.exports = {
  uploadImage
};
