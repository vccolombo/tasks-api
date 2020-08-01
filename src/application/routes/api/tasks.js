const express = require('express');

const controller = require('../../controllers/api/tasks');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.createTask);
router.get('/:taskId', authMiddleware, controller.readTask);
router.patch('/:taskId', authMiddleware, controller.updateTask);
router.delete('/:taskId', authMiddleware, controller.deleteTask);

module.exports = router;

