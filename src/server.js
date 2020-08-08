const app = require('./application/app');
const mongodb = require('./application/services/mongoose');

const DB_CONN = process.env.DB_CONN || 'mongodb://localhost:27017/task-manager-dev';
const PORT = process.env.PORT || 3000;

const start = async () => {
    await mongodb.connect(DB_CONN);
    app.start(PORT);
};

start();
