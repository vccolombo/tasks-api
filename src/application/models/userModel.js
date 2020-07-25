const mongoose = require('mongoose');
const validator = require('validator');

const hashPassword = require('../libs/password').hash;

const userSchema = new mongoose.Schema({
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
        required: true,
        unique: true,
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

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
