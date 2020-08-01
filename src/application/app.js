const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const boards = require('./routes/api/boards');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/boards', boards);
app.use('/auth', auth);

const start = (port) => {
    return app.listen(port, () => {
        console.log('Server running on port', port);
    });
}

module.exports = { start };
