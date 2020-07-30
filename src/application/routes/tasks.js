const express = require('express');

const controller = require('../controllers/tasks');

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

