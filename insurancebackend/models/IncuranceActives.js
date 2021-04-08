const mongoose = require('mongoose')


const InsuranceActives = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model('actives',InsuranceActives)