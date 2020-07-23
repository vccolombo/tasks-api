const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return validator.isAlphanumeric(v);
            },
            message: "username invalid"
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                const nameWithoutSpaces = v.replace(/\s+/g, '');
                return validator.isAlpha(nameWithoutSpaces);
            },
            message: "Name invalid"
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: "Email invalid"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password too short"]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
