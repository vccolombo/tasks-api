const express = require('express');

const controller = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', controller.create);
router.get('/profile', authMiddleware, controller.profile);
router.get('/:id', authMiddleware, controller.show);
router.patch('/profile', authMiddleware, controller.update);

module.exports = router;
