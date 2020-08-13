const mongoose = require('mongoose');

const mongodb = require('../../src/application/services/mongoose');
const User = require('../../src/application/models/user');
const Board = require('../../src/application/models/board');
const { authSign } = require('../../src/application/libs/auth');

mongodb.connect('mongodb://localhost:27017/task-manager-test');

const userOneId = mongoose.Types.ObjectId();
const userOneData = {
  _id: userOneId,
  name: 'Tester One',
  email: 'tester1@example.com',
  password: '56what!!42',
};
const userOneToken = authSign({ _id: userOneId });

const boardId = mongoose.Types.ObjectId();
const boardData = {
  _id: boardId,
  name: 'My test board',
  owner: userOneId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Board.deleteMany();

  await User.create(userOneData);
  await Board.create(boardData);
};

module.exports = {
  userOneId,
  userOneData,
  userOneToken,
  boardId,
  boardData,
  setupDatabase,
};
