const express = require('express');

const controller = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/logout', authMiddleware, controller.logout);
router.get('/profile', authMiddleware, controller.profile);
router.get('/:id', controller.show);
router.patch('/profile', authMiddleware, controller.update);

module.exports = router;
