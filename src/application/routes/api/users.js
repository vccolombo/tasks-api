const express = require('express');

const controller = require('../../controllers/api/users');
const { verifyAuthentication } = require('../../middlewares/authentication');

const router = express.Router();

router.get('/me', verifyAuthentication, controller.readMe);
router.patch('/me', verifyAuthentication, controller.updateMe);
router.get('/:userId', verifyAuthentication, controller.readUser);

module.exports = router;
