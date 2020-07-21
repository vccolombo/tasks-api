const mongoose = require('mongoose');

const DB_CONN = 'mongodb://localhost:27017/task-manager-dev';

mongoose.connect(DB_CONN, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});
