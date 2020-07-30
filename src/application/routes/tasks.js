const express = require('express');
const router = express.Router();

const controller = require('../controllers/tasks');

router.post('/', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

