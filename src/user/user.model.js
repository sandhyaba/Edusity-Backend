const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },

}, { timestamps: true })

UserModel.index({ location: '2dsphere' });

module.exports = mongoose.model('users', UserModel)