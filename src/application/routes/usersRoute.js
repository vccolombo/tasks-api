const express = require('express');

const controller = require('../controllers/usersController');
const middleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/profile', middleware.auth, controller.profile);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);

module.exports = router;
