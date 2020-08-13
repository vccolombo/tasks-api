const request = require('supertest');

const app = require('../src/application/app');
const Task = require('../src/application/models/task');
const {
  userOneId,
  userOneData,
  userOneToken,
  boardId,
  boardData,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(async () => {
  await setupDatabase();
});

test('Should create task in board', async () => {
  const response = await request(app)
    .post(`/api/boards/${boardId}/tasks`)
    .set('Authorization', `Bearer ${userOneToken}`)
    .send({
      title: 'test task',
      description: 'easy task',
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
});
