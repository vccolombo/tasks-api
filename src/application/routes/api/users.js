const express = require('express');

const controller = require('../../controllers/api/users');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', controller.createUser);
router.get('/me', authMiddleware, controller.me);
router.patch('/me', authMiddleware, controller.updateUser);
router.get('/:userId', authMiddleware, controller.readUser);

module.exports = router;
