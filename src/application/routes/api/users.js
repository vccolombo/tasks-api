const express = require('express');

const controller = require('../../controllers/api/users');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', controller.create);
router.get('/me', authMiddleware, controller.me);
router.get('/:userId', authMiddleware, controller.show);
router.patch('/me', authMiddleware, controller.update);

module.exports = router;
