const app = require('./application/app');
const mongodb = require('./application/services/mongoose');

const PORT = process.env.PORT || 3000;

const start = async () => {
    await mongodb.connect();

    app.listen(PORT, () => {
        console.log('Server running on port', PORT);
    });
}

start();
