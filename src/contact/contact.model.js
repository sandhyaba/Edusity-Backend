const mongoose = require('mongoose')

const  ContactModel = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },

}, { timestamps: true })
module.exports = mongoose.model('contacts', ContactModel)
