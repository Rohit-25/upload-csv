const mongoose = require('mongoose');
const { Schema } = mongoose;

const Data = new Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('data', Data);