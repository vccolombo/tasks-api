const express = require('express');
const multer = require('multer');

const controller = require('../../controllers/api/users');
const { verifyAuthentication } = require('../../middlewares/authentication');

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 5 * 1e6 // 5MB
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
    }
});

const router = express.Router();

router.get('/me', verifyAuthentication, controller.readMe);
router.patch('/me', verifyAuthentication, controller.updateMe);
router.post('/me/avatar', [verifyAuthentication, upload.single('image')], controller.uploadAvatar);
router.get('/:userId', verifyAuthentication, controller.readUser);

module.exports = router;
