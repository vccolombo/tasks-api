const request = require('supertest');

const app = require('../src/application/app');
const User = require('../src/application/models/user');
const { authVerify } = require('../src/application/libs/auth');
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
    boards: [
      {
        name: boardData.name,
      },
    ],
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

test('Should upload avatar image', async () => {
  await request(app)
    .post('/api/users/me/avatar')
    .set('Authorization', `Bearer ${userOneToken}`)
    .attach('image', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});
