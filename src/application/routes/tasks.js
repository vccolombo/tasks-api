const express = require('express');

const controller = require('../controllers/tasks');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.index);
router.get('/:id', authMiddleware, controller.show);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;

