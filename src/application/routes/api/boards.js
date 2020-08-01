const express = require('express');

const controller = require('../../controllers/api/boards');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.create);
router.get('/:boardId', authMiddleware, controller.show);
router.patch('/:boardId', authMiddleware, controller.update);
router.delete('/:boardId', authMiddleware, controller.destroy);

module.exports = router;