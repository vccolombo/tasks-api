const mongoose = require('mongoose');

const connect = async (connURL) => {
    console.log("Connecting to mongodb:", connURL);
    await mongoose.connect(connURL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log("Connected to mongodb with success");
}

module.exports = { connect };

