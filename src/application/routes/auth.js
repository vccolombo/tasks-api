const express = require('express');

const controller = require('../controllers/auth');
const { verifyAuthentication } = require('../middlewares/authentication');

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', verifyAuthentication, controller.logout);

module.exports = router;