const express = require('express');

const controller = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/logout', authMiddleware, controller.logout);

module.exports = router;