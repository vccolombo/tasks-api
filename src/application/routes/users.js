const express = require('express');

const controller = require('../controllers/users');
const middleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/logout', middleware.auth, controller.logout);
router.get('/profile', middleware.auth, controller.profile);
router.get('/:id', controller.show);
router.patch('/profile', middleware.auth, controller.update);

module.exports = router;
