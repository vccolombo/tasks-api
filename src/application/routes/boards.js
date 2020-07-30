const express = require('express');

const controller = require('../controllers/boards');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.create);
router.get('/:id', authMiddleware, controller.show);

module.exports = router;