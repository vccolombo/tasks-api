const express = require('express');

const controller = require('../../controllers/api/boards');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.createBoard);
router.get('/:boardId', authMiddleware, controller.readBoard);
router.patch('/:boardId', authMiddleware, controller.updateBoard);
router.delete('/:boardId', authMiddleware, controller.deleteBoard);

module.exports = router;