const express = require('express');

const controller = require('../../controllers/api/tasks');
const { verifyAuthentication } = require('../../middlewares/authentication');
const { verifyBoardAuthorization } = require('../../middlewares/authorization');

const router = express.Router({
  mergeParams: true,
});

router.get(
  '/',
  [verifyAuthentication, verifyBoardAuthorization],
  controller.readAllTasks
);
router.post(
  '/',
  [verifyAuthentication, verifyBoardAuthorization],
  controller.createTask
);
router.get(
  '/:taskId',
  [verifyAuthentication, verifyBoardAuthorization],
  controller.readTask
);
router.patch(
  '/:taskId',
  [verifyAuthentication, verifyBoardAuthorization],
  controller.updateTask
);
router.delete(
  '/:taskId',
  [verifyAuthentication, verifyBoardAuthorization],
  controller.deleteTask
);

module.exports = router;
