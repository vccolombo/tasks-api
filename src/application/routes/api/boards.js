const express = require('express');

const controller = require('../../controllers/api/boards');
const { verifyAuthentication } = require('../../middlewares/authentication');
const { verifyBoardAuthorization } = require('../../middlewares/authorization');

const router = express.Router();

router.post('/', verifyAuthentication, controller.createBoard);
router.get('/:boardId', [verifyAuthentication, verifyBoardAuthorization], controller.readBoard);
router.patch('/:boardId', [verifyAuthentication, verifyBoardAuthorization], controller.updateBoard);
router.delete('/:boardId', [verifyAuthentication, verifyBoardAuthorization], controller.deleteBoard);

module.exports = router;