const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const tasks = require('./routes/tasks');
const boards = require('./routes/boards');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/boards', boards);
app.use('/auth', auth);

const start = (port) => {
    return app.listen(port, () => {
        console.log('Server running on port', port);
    });
}

module.exports = { start };
