const express = require('express');

const controller = require('../controllers/boards');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.create);

module.exports = router;