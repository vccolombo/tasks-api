const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5 * 1e6, // 5MB
  },
  fileFilter(req, file, cb) {
    // THIS IS NOT SAFE ENOUGH
    // For simplicity I will only check the mimetype here
    // but a real system should implement more robust checks
    // to garantee that the file is indeed just a profile picture

    // only accept jpeg or png mimetypes
    if (!file.mimetype.match(/^image\/(jpeg|png)$/)) {
      return cb(new Error('File is not an image'));
    }

    cb(undefined, true);
  },
});

exports.uploadAvatar = upload.single('image');

exports.uploadAvatarErrorHandler = (error, req, res, next) => {
  res.status(400).json({
    error: error.message,
  });
};
