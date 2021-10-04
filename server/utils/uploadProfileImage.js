const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let uuid = uuidv4()

const Filter = (req, file, cb) => {
  if (
    file.mimetype.includes('image/jpg') ||
    file.mimetype.includes('image/jpeg') ||
    file.mimetype.includes('image/png')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images JPG,JPEG,PNG are allowed'));
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/server/public/profile-image/');
  },

  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`);
  }
});

let uploadFile = multer({
  storage: storage,
  fileFilter: Filter,
  uuid
});
module.exports = uploadFile;
