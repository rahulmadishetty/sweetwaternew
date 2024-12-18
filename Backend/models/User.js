const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(.*@(pfw\.edu|sf\.edu))$/, // Only allow specific domains
            'Please use a valid university email address (pfw.edu or sf.edu)'
        ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);