const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/usersRoute');

const app = express();
app.use(bodyParser.json());
app.use('/users', users);

module.exports = app;
