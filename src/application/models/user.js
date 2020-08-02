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

userSchema.virtual('boards', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const userObj = this.toObject();

    delete userObj.password;

    return userObj;
}

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

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('name')) {
        // Remove extra spaces from name
        user.name = user.name.replace(/\s+/g, ' ').trim();
    }
    if (user.isModified('email')) {
        user.email = validator.normalizeEmail(user.email);
    }
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
