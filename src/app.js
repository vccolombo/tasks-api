const express = require('express');
const bodyParser = require('body-parser');

require('./services/mongoose');

const users = require('./routes/usersRoute');

const app = express();
app.use(bodyParser.json());
app.use('/users', users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
