const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/api/users');
const boardsRouter = require('./routes/api/boards');
const tasksRouter = require('./routes/api/tasks');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/boards/:boardId/tasks', tasksRouter);
app.use('/auth', authRouter);

module.exports = app;
