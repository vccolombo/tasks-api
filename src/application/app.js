const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/usersRoute');
const tasks = require('./routes/tasksRoute');
const login = require('./routes/loginRoute');

const app = express();
app.use(bodyParser.json());
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/login', login);

const start = (port) => {
    return app.listen(port, () => {
        console.log('Server running on port', port);
    });
}

module.exports = { start };
