var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/usersRoute');

var app = express();
app.use(bodyParser.json());
app.use('/users', users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});