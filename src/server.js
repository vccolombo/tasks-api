const app = require('./app');
const mongodb = require('./services/mongoose');

const PORT = process.env.PORT || 3000;

const start = async () => {
    await mongodb.connect();

    app.listen(PORT, () => {
        console.log('Server running on port', PORT);
    });
}

start();
