const express = require('express');

const controller = require('../../controllers/api/users');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', controller.createUser);
router.get('/me', authMiddleware, controller.readMe);
router.patch('/me', authMiddleware, controller.updateMe);
router.get('/:userId', authMiddleware, controller.readUser);

module.exports = router;
