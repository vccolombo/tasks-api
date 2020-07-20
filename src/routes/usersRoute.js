var express = require('express');
var router = express.Router();

var controller = require('../controllers/usersController');

router.post('/', controller.post);

module.exports = router;