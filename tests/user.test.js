const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/application/app');
const mongodb = require('../src/application/services/mongoose');
const User = require('../src/application/models/user');
const { authSign, authVerify } = require('../src/application/libs/auth');

mongodb.connect('mongodb://localhost:27017/task-manager-test');

const userOneId = mongoose.Types.ObjectId();
const userOneData = {
  _id: userOneId,
  name: 'Tester One',
  email: 'tester1@example.com',
  password: '56what!!42',
};
let userOneToken = authSign({ _id: userOneId });

beforeEach(async () => {
  await User.deleteMany();

  const userOne = await User.create(userOneData);
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/auth/signup')
    .send({
      name: 'Tester Zero',
      email: 'tester0@example.com',
      password: 'Ahuashxzus239&*',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(user.password).not.toBe('Ahuashxzus239&*');

  expect(response.body).toMatchObject({
    user: {
      name: 'Tester Zero',
      email: 'tester0@example.com',
    },
  });
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({
      email: userOneData.email,
      password: userOneData.password,
    })
    .expect(200);

  const receivedId = authVerify(response.body.token)._id;
  expect(receivedId).toBe(userOneId.toString());
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/auth/login')
    .send({
      email: 'fake@example.com',
      password: 'aSuperFakeP4ssword!',
    })
    .expect(400);
});

test('Should not login user with wrong password', async () => {
  await request(app)
    .post('/auth/login')
    .send({
      email: userOneData.email,
      password: 'aSuperFakeP4ssword!',
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  const response = await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${userOneToken}`)
    .send()
    .expect(200);

  expect(response.body).toMatchObject({
    user: {
      name: userOneData.name,
      email: userOneData.email,
    },
    boards: [],
  });
});

test('Should not get profile for user with wrong token', async () => {
  await request(app)
    .get('/api/users/me')
    .set(
      'Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.BQmWM1mXBfpTw_Tv-yR3qodI0OoRmrm3Tlz6ZR60Yi4`
    )
    .send()
    .expect(401);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/api/users/me').send().expect(401);
});
