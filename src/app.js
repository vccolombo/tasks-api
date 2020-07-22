const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/usersRoute');
const tasks = require('./routes/tasksRoute');

const app = express();
app.use(bodyParser.json());
app.use('/users', users);
app.use('/tasks', tasks);

module.exports = app;
