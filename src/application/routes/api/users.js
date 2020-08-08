const express = require('express');

const controller = require('../../controllers/api/users');
const { verifyAuthentication } = require('../../middlewares/authentication');
const { uploadAvatar, uploadAvatarErrorHandler } = require('../../middlewares/avatar');

const router = express.Router();

router.get('/me', verifyAuthentication, controller.readMe);
router.patch('/me', verifyAuthentication, controller.updateMe);
// /me/avatar expects a form-data field with key 'image' and the jpg/png file as the value
router.post('/me/avatar', [verifyAuthentication, uploadAvatar], controller.uploadAvatar, uploadAvatarErrorHandler);
router.get('/:userId', verifyAuthentication, controller.readUser);

module.exports = router;
