const express = require('express');
const router = express.Router();

const controller = require('../controllers/tasksController');

router.post('/', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);

module.exports = router;

