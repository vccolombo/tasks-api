const mongoose = require('mongoose');

const DB_CONN = 'mongodb://localhost:27017/task-manager-dev';

const connect = async () => {
    console.log("Connecting to mongodb:", DB_CONN);
    await mongoose.connect(DB_CONN, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log("Connected to mongodb with success");
}

module.exports = { connect };

