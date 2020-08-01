const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/api/users');
const boardsRouter = require('./routes/api/boards');
const tasksRouter = require('./routes/api/tasks');
const authRouter = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/auth', authRouter);

const start = (port) => {
    return app.listen(port, () => {
        console.log('Server running on port', port);
    });
}

module.exports = { start };
