const express = require('express');

const controller = require('../controllers/tasks');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.create);
router.get('/:taskId', authMiddleware, controller.show);
router.patch('/:taskId', authMiddleware, controller.update);
router.delete('/:taskId', authMiddleware, controller.destroy);

module.exports = router;

