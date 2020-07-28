const mongoose = require('mongoose');
const validator = require('validator');

const { hashPassword, comparePassword } = require('../libs/password');
const { authSign } = require('../libs/auth');

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
        trim: true,
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

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = authSign({ _id: user._id });

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const normalizedEmail = validator.normalizeEmail(email);

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }
    if (user.isModified('email')) {
        user.email = validator.normalizeEmail(user.email);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
