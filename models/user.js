const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    who: {
        type: String,
        enum: ['admin', 'user', 'shipper'],
        required: true,
        default: 'user',
    },

    identityCard: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    confirmShipper: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('user', userSchema);
module.exports = {
    User,
};
